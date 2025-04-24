import { Todo } from "../tsp-output/typespec-mcp-server-js/ts-types.js";

export class TodoStore {
  #todos: Todo[] = [];
  #idCounter = 0;

  constructor() {
    this.#todos = [];
  }

  add(input: Omit<Todo, "id">): Todo {
    const todo: Todo = {
      id: (this.#idCounter++).toString(),
      ...input,
    };
    this.#todos.push(todo);
    return todo;
  }

  list(): Todo[] {
    return this.#todos;
  }
}
