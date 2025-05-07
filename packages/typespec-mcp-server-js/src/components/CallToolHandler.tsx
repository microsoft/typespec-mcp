import { Block, Children, code, For, List, refkey, Refkey, Show, StatementList } from "@alloy-js/core";
import {
  ArrayExpression,
  CaseClause,
  CommaList,
  FunctionCallExpression,
  ObjectExpression,
  ObjectProperty,
  VarDeclaration,
} from "@alloy-js/typescript";
import { Type } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import {
  ArrayResultDescriptor,
  SingleResultDescriptor,
  ToolDescriptor,
  useMCPServerContext,
} from "../context/McpServer.js";
import { zodValidationError } from "../externals/zod-validation-error.js";

export interface CallToolHandlerProps {
  tool: ToolDescriptor;
  args: Refkey;
}

export function CallToolHandler(props: CallToolHandlerProps) {
  const {
    keys: { getToolHandler },
  } = useMCPServerContext();
  const parseResultKey = refkey();
  return (
    <CaseClause expression={`"${props.tool.op.name}"`} block>
      <Show when={props.tool.op.parameters.properties.size > 0}>
        <List ender>
          <VarDeclaration name="parsed">
            {props.tool.keys.zodParametersSchema}.safeParse({props.args});
          </VarDeclaration>
          {code`
            if (!parsed.success) {
              throw ${zodValidationError.fromZodError}(parsed.error, { prefix: "Request validation error" });
            }
          `}
        </List>
      </Show>
      <StatementList>
        <VarDeclaration name="rawResult">
          await{" "}
          <FunctionCallExpression
            target={
              <>
                {getToolHandler}.{props.tool.op.name}
              </>
            }
            args={[...props.tool.parameters.properties.values()].map((p) => {
              return <>parsed.data.{p.name}</>;
            })}
          />
        </VarDeclaration>
        <VarDeclaration name="maybeResult">{props.tool.keys.zodReturnSchema}.safeParse(rawResult)</VarDeclaration>
        {code`
          if (!maybeResult.success) {
            throw ${zodValidationError.fromZodError}(maybeResult.error, { prefix: "Response validation error"});
          }
        `}
        <VarDeclaration name="result" refkey={parseResultKey}>
          maybeResult.data
        </VarDeclaration>
        <>
          return{" "}
          <ObjectExpression
            jsValue={{
              content: () => <MarshalResult tool={props.tool} parsedResult={parseResultKey} />,
            }}
          />
        </>
      </StatementList>
    </CaseClause>
  );
}

export interface PackResultProps {
  tool: ToolDescriptor;
  parsedResult: Refkey;
}

/**
 * Takes the parsed result from a response from the tool implementation
 * and packs it into the format expected by the MCP server.
 */
export function MarshalResult(props: PackResultProps) {
  const result = props.tool.result;

  if (result.kind === "single") {
    return (
      <ArrayExpression>
        <MarshalSingleResult result={result} parsedResult={props.parsedResult} />
      </ArrayExpression>
    );
  } else if (result.kind === "array") {
    return <MarshalArrayResult result={result} parsedResult={props.parsedResult} />;
  }
}

export interface MarshalSingleResultProps {
  result: SingleResultDescriptor;
  parsedResult: Children;
}

export function MarshalSingleResult(props: MarshalSingleResultProps) {
  const { $ } = useTsp();
  if ($.union.is(props.result.resultType)) {
    const variantTypes = Array.from(props.result.resultType.variants.values()).map((v) => v.type);
    if (variantTypes.some($.mcp.isKnownMcpResult)) {
      // special handling of top-level unions-of-known-results
      // which is to determine which variant was returned and serialize
      // it accordingly.
      return (
        <For each={variantTypes}>
          {(variant, index) => {
            const check = $.scalar.extendsString(variant) ? (
              <>typeof {props.parsedResult} === "string"</>
            ) : $.mcp.audioResult.is(variant) ? (
              <>{props.parsedResult}.type === "audio"</>
            ) : $.mcp.imageResult.is(variant) ? (
              <>{props.parsedResult}.type === "image"</>
            ) : (
              <>false</>
            );

            return (
              <>
                {index < variantTypes.length - 1 && <>{check} ? </>}
                <MaybeResultEnvelope resultType={variant}>
                  <MaybeSerialize resultType={variant}>{props.parsedResult}</MaybeSerialize>
                </MaybeResultEnvelope>
                {index < variantTypes.length - 1 && <> : </>}
              </>
            );
          }}
        </For>
      );
    }
  }
  return (
    <MaybeResultEnvelope resultType={props.result.resultType}>
      <MaybeSerialize resultType={props.result.resultType}>{props.parsedResult}</MaybeSerialize>
    </MaybeResultEnvelope>
  );
}

interface MaybeEnvelopeProps {
  resultType: Type;
  children: Children;
}

function MaybeResultEnvelope(props: MaybeEnvelopeProps) {
  const { $ } = useTsp();
  // When we have a single result, the only thing that doesn't need an envelope
  // added is a single audio or image result. Everything else will come in from
  // business logic as the naked type and needs to be packed into a results
  // envelope.
  const needsEnvelope = !$.mcp.audioResult.is(props.resultType) && !$.mcp.imageResult.is(props.resultType);

  if (needsEnvelope) {
    return (
      <ObjectExpression>
        <List comma softline enderPunctuation>
          <ObjectProperty name="type" jsValue="text" />
          <ObjectProperty name="text">{props.children}</ObjectProperty>
        </List>
      </ObjectExpression>
    );
  } else {
    return <>{props.children}</>;
  }
}

interface MaybeSerializeProps {
  resultType: Type;
  children: Children;
}

function MaybeSerialize(props: MaybeSerializeProps) {
  const { $ } = useTsp();

  const resultType = props.resultType;
  if ($.scalar.extendsString(resultType)) {
    // nothing to do for strings
    return <>{props.children}</>;
  } else if ($.mcp.audioResult.is(resultType) || $.mcp.imageResult.is(resultType)) {
    // todo: embedded resource
    return (
      <ObjectExpression>
        <CommaList>
          <>type: {props.children}.type</>
          <>mimeType: {props.children}.mimeType</>
          <>
            data: <FunctionCallExpression target={"Buffer.from"} args={[<>{props.children}.data</>]} />
            .toString("base64")
          </>
        </CommaList>
      </ObjectExpression>
    );
  } else if ($.scalar.extendsBytes(resultType)) {
    // todo: embedded resource
    return (
      <>
        <FunctionCallExpression target={"Buffer.from"} args={[props.children]} />
        .toString("base64")
      </>
    );
  } else {
    // serialize the rest as JSON
    return <FunctionCallExpression target={"JSON.stringify"} args={[props.children, "null", "2"]} />;
  }
}

export interface MarshalArrayResultProps {
  result: ArrayResultDescriptor;
  parsedResult: Refkey;
}

// todo: update with function expression
function MarshalArrayResult(props: MarshalArrayResultProps) {
  return (
    <>
      {props.parsedResult}.map((item) =&gt;{" "}
      <Block>
        return <MarshalSingleResult parsedResult="item" result={props.result.elementDescriptor} />
      </Block>
      )
    </>
  );
}
