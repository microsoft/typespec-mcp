import "typespec-mcp";

using MCP;

@mcpServer(#{ name: "My Todo app" })
namespace Todos;

model Todo {
  id: string;
  text: string;
  status: "todo" | "done";
}

/** Add a todo  */
@tool op addTodo(text: string): string;

/** List all non completed todos */
@tool op listTodos(): Todo[];