import { code, For, List } from "@alloy-js/core";
import { ArrayExpression, ObjectExpression, ObjectProperty, VarDeclaration } from "@alloy-js/typescript";
import { useMCPServerContext } from "typespec-mcp-server-js";

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
                      return await toolMap["${tool.id}"](data);
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
function StartServerWithTools() {
  return code`
        import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
        import { server } from "./server/mcp-server/server.js";

        const transport = new StdioServerTransport();
        await server.connect(transport);
    `;
}
