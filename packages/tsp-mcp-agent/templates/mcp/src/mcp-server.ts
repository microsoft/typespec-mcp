import { setToolHandler } from "../tsp-output/typespec-mcp-server-js/tools.js";
import { server } from "../tsp-output/typespec-mcp-server-js/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client } from "pg";
import { Todo } from "../tsp-output/typespec-mcp-server-js/ts-types.js";

const client = new Client({
  database: "postgres",
});
await client.connect();

// Drop table and create a new one with sample data
await client.query("DROP TABLE IF EXISTS todos;");
await client.query(
  "CREATE TABLE todos (id SERIAL PRIMARY KEY, data JSONB NOT NULL);"
);
await client.query("INSERT INTO todos (data) VALUES ($1), ($2), ($3)", [
  { text: "Learn TypeSpec", status: "todo" },
  { text: "Learn Model Context Protocol", status: "todo" },
  { text: "Learn TypeSpec MCP Agent", status: "todo" },
]);

const result = await client.query("SELECT * FROM todos;");

setToolHandler({
  addTodo: async (text) => {
    await client.query("INSERT INTO todos (data) VALUES ($1)", [
      { text, status: "todo" },
    ]);
    return `Added todo: ${text}`;
  },
  listTodos: async () => {
    const result = await client.query<{ id: number; data: Omit<Todo, "id"> }>(
      "SELECT * FROM todos WHERE data->>'status' = 'todo'"
    );

    const todos = result.rows.map((row) => ({
      id: row.id,
      ...row.data,
    }));

    return todos;
    // return [
    //   `
    //   Currently you have ${todos.length} todos:
    // `,
    //   ...todos.map((x) => ` - ${x.text}`),
    // ].join("\n");
  },
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Server started");
