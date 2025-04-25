import { Client } from "pg";

const client = new Client({
  database: "postgres",
});
await client.connect();
await client.query("DROP TABLE IF EXISTS todos;");
await client.query(
  "CREATE TABLE todos (id SERIAL PRIMARY KEY, data JSONB NOT NULL);",
);
await client.query("INSERT INTO todos (data) VALUES ($1), ($2), ($3)", [
  { text: "Learn TypeSpec", status: "todo" },
  { text: "Learn Model Context Protocol", status: "todo" },
  { text: "Learn TypeSpec MCP Agent", status: "todo" },
]);

const result = await client.query("SELECT * FROM todos;");
console.log(result.rows);
console.log("Reset complete");
client.end();
