import fs from "fs/promises";
import path from "path";
import { Todo } from "../tsp-output/typespec-mcp-server-js/ts-types.js";

export interface Data {
  idCounter: number;
  todos: Record<string, Omit<Todo, "id">>;
}

const TODO_FILE_PATH = path.resolve(import.meta.dirname, "todos.json");

export interface TodoStore {
  list(): Promise<Todo[]>;
  add(todo: Omit<Todo, "id">): Promise<Todo>;
  get(id: number): Promise<Todo | undefined>;
  update(newTodo: Todo): Promise<Todo | undefined>;
  delete(id: number): Promise<void>;
}

export async function createTodoFileStore(): Promise<TodoStore> {
  const data: Data = await load();

  if (Object.keys(data.todos).length === 0) {
    await setDemoData(data);
  }
  return {
    list: async () => {
      const todos = Object.entries(data.todos).map(([id, todo]) => ({
        id: parseInt(id, 10),
        ...todo,
      }));
      return todos;
    },
    add: async (todo: Omit<Todo, "id">): Promise<Todo> => {
      const id = ++data.idCounter;
      data.todos[id.toString()] = todo;
      await save(data);
      return { id, ...todo };
    },
    get: async (id: number): Promise<Todo | undefined> => {
      const todo = data.todos[id.toString()];
      return todo && { id, ...todo };
    },
    update: async (newTodo: Todo): Promise<Todo | undefined> => {
      const { id, ...rest } = newTodo;
      if (data.todos[id]) {
        data.todos[id] = rest;
        await save(data);
        return newTodo;
      }
      return undefined;
    },
    delete: async (id: number): Promise<void> => {
      delete data.todos[id.toString()];
      await save(data);
    },
  };
}

async function load(): Promise<Data> {
  try {
    const data = await fs.readFile(TODO_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { todos: {}, idCounter: 0 };
  }
}

async function save(data: Data) {
  try {
    await fs.writeFile(TODO_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving todos:", error);
  }
}

const DEMO_DATA = [
  { text: "Learn TypeSpec", status: "todo" },
  { text: "Learn Model Context Protocol", status: "todo" },
  { text: "Learn TypeSpec MCP Agent", status: "todo" },
] as const;

/** Populate the store with some demo values. */
async function setDemoData(data: Data) {
  for (const todo of DEMO_DATA) {
    const id = ++data.idCounter;
    data.todos[id.toString()] = todo;
  }
  await save(data);
}
