import { Request, Response } from 'express'
import { Todo } from './types'
import { TodoStatus } from './enums'

let todos: Todo[] = []
let todoId = 1

const findTodoById = (id: number): Todo | undefined => todos.find((t) => t.id === id)

const sendNotFoundResponse = (res: Response, itemId: string) => {
  res.status(404).send(`Todo with id: ${itemId} not found`)
}

export const getAllTodos = (_req: Request, res: Response) => {
  todos.length ? res.json(todos) : res.status(200).json("You don't have any todos yet")
}

export const getTodoById = (req: Request, res: Response) => {
  const { itemId } = req.params
  const todo = findTodoById(Number(itemId))
  todo ? res.json(todo) : sendNotFoundResponse(res, itemId)
}

export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).send('Title is required')
  }
  const newTodo: Todo = { id: todoId++, title, status: TodoStatus.NEW }
  todos.push(newTodo)
  res.status(201).json(newTodo)
}

export const updateTodo = (req: Request, res: Response) => {
  const { itemId } = req.params
  const todo = findTodoById(Number(itemId))
  if (todo) {
    todo.status = todo.status === TodoStatus.NEW ? TodoStatus.DONE : TodoStatus.NEW
    res.json(todo)
  } else {
    sendNotFoundResponse(res, itemId)
  }
}

export const deleteTodo = (req: Request, res: Response) => {
  const { itemId } = req.params
  const todo = findTodoById(Number(itemId))
  if (todo) {
    todos = todos.filter((t) => t.id !== Number(itemId))
    res.status(200).send(`Todo with id: ${itemId} deleted`)
  } else {
    sendNotFoundResponse(res, itemId)
  }
}
