import { code, For, List } from "@alloy-js/core";
import {
  ArrayExpression,
  FunctionCallExpression,
  ObjectExpression,
  ObjectProperty,
  VarDeclaration,
} from "@alloy-js/typescript";
import { useMCPServerContext } from "typespec-mcp-server-js";
import { getToolImplementationRefKey } from "../utils/ref-keys.js";

export function StartServer() {
  return <StartServerWithDispatcher />;
}

function StartServerWithDispatcher() {
  const tools = useMCPServerContext().tools;
  return (
    <List enderPunctuation semicolon>
      {`import { startHttpDispatcher } from "typespec-http-dispatcher";`}
      <VarDeclaration name="endpoints">
        <ArrayExpression>
          <For each={tools} softline enderPunctuation comma>
            {(tool) => {
              return (
                <ObjectExpression>
                  <List softline enderPunctuation comma>
                    <ObjectProperty name="name" jsValue={tool.id} />
                    <ObjectProperty name="schema" value={tool.keys.jsonSchemas.parameters} />
                    <ObjectProperty
                      name="handler"
                      value={code`
                    async (data: any) => {
                      return await ${(<FunctionCallExpression target={getToolImplementationRefKey(tool)} args={["data"]} />)};
                    }  
                  `}
                    />
                  </List>
                </ObjectExpression>
              );
            }}
          </For>
        </ArrayExpression>
      </VarDeclaration>
      {`startHttpDispatcher({endpoints});`}
    </List>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StartServerWithTools() {
  return code`
        import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
        import { server } from "./server/mcp-server/server.js";

        const transport = new StdioServerTransport();
        await server.connect(transport);
    `;
}
