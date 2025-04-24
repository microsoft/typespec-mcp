import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { addTodoParameters, listTodosParameters, addTodoReturnType, listTodosReturnType } from "./zod-types.js";
import { fromZodError } from "zod-validation-error";
import { toolHandler } from "./tools.js";

export const server = new Server(
  {
    name: "My Todo app",
    version: "1.0.0",
    instructions: undefined,
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

server.setRequestHandler(
  ListToolsRequestSchema,
  async function listTools(request) {
    return {
      tools: [
        {
          name: "addTodo",
          description: "Add a todo",
          inputSchema: zodToJsonSchema(
            addTodoParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "listTodos",
          description: "List all non completed todos",
          inputSchema: zodToJsonSchema(
            listTodosParameters,
            {
              $refStrategy: "none",
            }
          ),
        }
      ],
    };
  }
)

server.setRequestHandler(
  CallToolRequestSchema,
  async function callTool(request) {
    const name = request.params.name;
    const args = request.params.arguments;
    switch (name) {
      case "addTodo": {
        const parsed = addTodoParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = toolHandler.addTodo(parsed.data.text);
        const maybeResult = addTodoReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: [
            {
              type: "text",
              text: result,
            }
          ],
        };
      }

      case "listTodos": {
        const rawResult = toolHandler.listTodos();
        const maybeResult = listTodosReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: result.map((item) => {
            return {
              type: "text",
              text: JSON.stringify(item, null, 2),
            }
          }),
        };
      }
    };
    return { content: [{ type: "text", text: "Unknown tool" }] };
  }
)