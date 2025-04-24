export interface Todo {
  id: number
  text: string
  status: "todo" | "done";
}

export interface TodoArray extends Array<Todo> {

}