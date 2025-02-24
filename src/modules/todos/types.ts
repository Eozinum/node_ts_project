import { TodoStatus } from './enums'

export type Todo = {
  id: number
  title: string
  status: TodoStatus
}
