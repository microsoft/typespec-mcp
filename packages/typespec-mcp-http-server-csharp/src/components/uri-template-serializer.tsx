import { Block, For, List, code } from "@alloy-js/core";
import { useTsp } from "@typespec/emitter-framework";
import type { HttpOperation, HttpProperty, HttpServer } from "@typespec/http";

export interface UriTemplateSerializerProps {
  server: HttpServer;
  httpOp: HttpOperation;
}

/**
 *
 * @param props
 */
export function UriTemplateSerializer(props: UriTemplateSerializerProps) {
  const uri = `${props.server.url}${props.httpOp.uriTemplate}`;
  return code`
    Std.UriTemplate.Expand("${uri}", ${(<UriTemplateParameters httpOp={props.httpOp} />)});
  `;
}

function UriTemplateParameters(props: { httpOp: HttpOperation }) {
  const params = props.httpOp.parameters.properties.filter((p) => p.kind === "path" || p.kind === "query");
  return (
    <List>
      {`new Dictionary<string, object?>`}
      <Block newline>
        <For each={params}>
          {(param) => (
            <Block inline>{code`"${param.options.name}", ${(<UriTemplateParameter property={param} />)}`}</Block>
          )}
        </For>
      </Block>
    </List>
  );
}

function UriTemplateParameter(props: { property: HttpProperty }) {
  const { $ } = useTsp();
  const prop = props.property.property;
  return (
    <>
      {prop.name}
      {prop.optional ? "?" : ""}
      {prop.type === $.builtin.utcDateTime || prop.type === $.builtin.offsetDateTime ? `.ToString("o")` : ""}
    </>
  );
}
