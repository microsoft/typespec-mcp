import "typespec-mcp";

using MCP;

@mcpServer(#{ name: "My Todo app" })
namespace Todos;

/** A todo item */
model Todo {
  /** ID of the todo */
  id: int32;

  /** Text of the todo */
  text: string;

  /**
   * Status of the todo
   * - `todo` - The todo is not done
   * - `done` - The todo is done
   */
  status: "todo" | "done";
}

/**
 * Add a new todo
 * @param text - The text of the todo
 */
@tool op addTodo(text: string): Todo;

/**
 * List todos.
 * Group the result by status. Todo first and done last.
 * @param filter - filter by status. List all if not provided
 */
@tool op listTodos(filter?: "done" | "todo"): Todo[];

/**
 * Delete a todo
 * @param id - The ID of the todo
 */
@tool op deleteTodo(id: Todo.id): string;
