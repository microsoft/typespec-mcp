import { code, List, MemberScope, OutputSymbolFlags, refkey, useBinder } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { createTSSymbol, useTSScope } from "@alloy-js/typescript";
import { useTsp } from "@typespec/emitter-framework";
import { InterfaceExpression } from "@typespec/emitter-framework/typescript";
import { getServers, type HttpOperation } from "@typespec/http";
import { useMCPServerContext } from "typespec-mcp-server-js";
import type { ToolDescriptor } from "../../../typespec-mcp-server-js/dist/src/context/utils/tool-descriptor.js";
import { urlTemplate } from "../externals/url-template.js";
import { HttpOperationMapper } from "./http-operation-mapper.jsx";

export function HttpToolBasicHandler(props: { op: HttpOperation; tool: ToolDescriptor }) {
  const { $ } = useTsp();
  const mcpContext = useMCPServerContext();
  const server = mcpContext.server;
  const argsRefkey = refkey();

  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }
  const servers = getServers($.program, server.container);
  const host = servers![0];
  const binder = useBinder();
  const scope = useTSScope();
  const sym = createTSSymbol({
    binder,
    scope: scope,
    name: "httpToolHandler",
    flags: OutputSymbolFlags.StaticMemberContainer,
  });

  return (
    <ts.ArrowFunction
      parameters={[
        {
          name: "data",
          refkey: argsRefkey,
          type: (
            <MemberScope owner={sym}>
              <InterfaceExpression type={props.tool.implementationOp.parameters} />
            </MemberScope>
          ),
        },
      ]}
      async
    >
      <List semicolon>
        <ts.VarDeclaration const name="urlTemplate">
          {urlTemplate.parseTemplate}("{host.url}
          {props.op.uriTemplate}");
        </ts.VarDeclaration>
        <ts.VarDeclaration const name="httpRequest" type={refkey("HttpRequest")}>
          <HttpOperationMapper argsRefkey={argsRefkey} op={props.op} argsStyle="named" />
        </ts.VarDeclaration>

        <ts.VarDeclaration const name="url">
          {code`
            urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});
            `}
        </ts.VarDeclaration>
        <ts.VarDeclaration const name="response">
          {code`
              await fetch(url, {
                headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
                body: httpRequest.body?.value,
              });
            `}
        </ts.VarDeclaration>
        {code`
            if (!response.ok) {
              throw new Error(\`HTTP error: \${response.status} \${response.statusText}\\n\\n\${response.text()}\`);
            }
            return await response.json();
          `}
      </List>
    </ts.ArrowFunction>
  );
}

export function HttpRequestType(props: {}) {
  return (
    <ts.InterfaceDeclaration name="HttpRequest" refkey={refkey("HttpRequest")}>
      <List semicolon>
        <ts.InterfaceMember name="headers" optional type="Record<string, any>" />
        <ts.InterfaceMember name="pathParams" optional type="Record<string, any>" />
        <ts.InterfaceMember name="queryParams" optional type="Record<string, any>" />
        <ts.InterfaceMember name="body" optional type="{value: any, contentType: string}" />
      </List>
    </ts.InterfaceDeclaration>
  );
}
