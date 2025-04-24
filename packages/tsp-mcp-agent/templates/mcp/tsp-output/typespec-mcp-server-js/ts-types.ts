export interface Todo {
  id: string
  text: string
  status: "todo" | "done";
}

export interface TodoArray extends Array<Todo> {

}