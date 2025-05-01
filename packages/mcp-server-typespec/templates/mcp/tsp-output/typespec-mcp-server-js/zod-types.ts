import { z } from "zod";

export const Todo = z.object({
    id: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("ID of the todo"),
    text: z.string().describe("Text of the todo"),
    status: z.union([z.literal("todo"), z.literal("done")])
      .describe("Status of the todo - `todo` - The todo is not done - `done` - The todo is done"),
  })
  .describe("A todo item");

export const TodoArray = z.array(Todo);

export const addTodoParameters = z.object({
  text: z.string().describe("The text of the todo"),
});

export const addTodoReturnType = Todo;

export const listTodosParameters = z.object({
  filter: z.union([z.literal("done"), z.literal("todo")])
    .optional()
    .describe("filter by status. List all if not provided"),
});

export const listTodosReturnType = TodoArray;

export const deleteTodoParameters = z.object({
  id: z.number()
    .int()
    .gte(-2147483648)
    .lte(2147483647)
    .describe("The ID of the todo"),
});

export const deleteTodoReturnType = z.string();