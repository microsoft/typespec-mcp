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
  const params = props.httpOp.parameters.properties.filter((p) => p.kind === "path" || p.kind === "query");
  const uri = `${props.server.url}${props.httpOp.uriTemplate}`;
  if (params.length === 0) {
    return code`"${uri}"`;
  }
  return code`
    Std.UriTemplate.Expand("${uri}", ${(<UriTemplateParameters params={params} />)})
  `;
}

function UriTemplateParameters(props: { params: (HttpProperty & { kind: "path" | "query" })[] }) {
  return (
    <List>
      {`new Dictionary<string, object?>`}
      <Block>
        <For each={props.params}>
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
