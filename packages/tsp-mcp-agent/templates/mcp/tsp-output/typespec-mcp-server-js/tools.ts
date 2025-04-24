import { Todo } from "./ts-types.js";

interface Tools {
  /**
   * Add a todo
   **/
  addTodo(text: string): string

  /**
   * List all non completed todos
   **/
  listTodos(): Array<Todo>
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}