import { setToolHandler } from "../tsp-output/typespec-mcp-server-js/tools.js";
import { server } from "../tsp-output/typespec-mcp-server-js/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createTodoFileStore } from "./file-store.js";

const store = await createTodoFileStore();

setToolHandler({
  addTodo: async (text) => {
    await store.add({ text, status: "todo" });
    return `Added todo: ${text}`;
  },
  listTodos: async () => {
    const result = await store.list();
    return result.filter((todo) => todo.status === "todo");
  },
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Server started");
