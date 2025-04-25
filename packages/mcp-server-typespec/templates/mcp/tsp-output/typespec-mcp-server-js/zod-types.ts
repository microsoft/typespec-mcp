import { z } from "zod";

export const Todo = z.object({
  id: z.number().int().gte(-2147483648).lte(2147483647),
  text: z.string(),
  status: z.union([z.literal("todo"), z.literal("done")]),
});

export const TodoArray = z.array(Todo);

export const addTodoParameters = z.object({
  text: z.string(),
});

export const addTodoReturnType = z.string();

export const listTodosParameters = z.object({});

export const listTodosReturnType = TodoArray;