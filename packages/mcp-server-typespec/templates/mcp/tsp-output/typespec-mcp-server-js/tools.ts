import { Todo } from "./ts-types.js";

interface Tools {
  /**
   * Add a new todo
   **/
  addTodo(text: string): Todo | Promise<Todo>

  /**
   * List todos.
   * Present the result with todo status first and done last.
   **/
  listTodos(filter?: "done" | "todo"): Array<Todo> | Promise<Array<Todo>>

  /**
   * Delete a todo
   **/
  deleteTodo(id: number): string | Promise<string>
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}