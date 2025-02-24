import { Request, Response } from 'express'
import { Todo } from './types'
import { TodoStatus } from './enums'
import { createTodoSchema, getTodoByIdSchema } from './validationShemas'
import { validateParams, validateRequest } from './validationMiddleware'

const todos: Todo[] = []
let todoId = 1

const findTodoById = (id: number): Todo | undefined => todos.find((t) => t.id === id)

const sendNotFoundResponse = (res: Response, itemId: string) => {
  res.status(404).send(`Todo with id: ${itemId} not found`)
}

export const getAllTodos = (_req: Request, res: Response) => {
  todos.length ? res.json(todos) : res.status(200).json("You don't have any todos yet")
}

export const getTodoById = [
  validateParams(getTodoByIdSchema),
  (req: Request, res: Response) => {
    const { itemId } = req.params
    const todo = findTodoById(Number(itemId))
    todo ? res.json(todo) : sendNotFoundResponse(res, itemId)
  },
]

export const createTodo = [
  validateRequest(createTodoSchema),
  (req: Request, res: Response) => {
    const { title } = req.body
    const newTodo: Todo = { id: todoId++, title, status: TodoStatus.NEW }
    todos.push(newTodo)
    res.status(201).json(newTodo)
  },
]

export const updateTodo = [
  validateParams(getTodoByIdSchema),
  (req: Request, res: Response) => {
    const { itemId } = req.params
    const todo = findTodoById(Number(itemId))
    if (todo) {
      todo.status = todo.status === TodoStatus.NEW ? TodoStatus.DONE : TodoStatus.NEW
      res.json(todo)
    } else {
      sendNotFoundResponse(res, itemId)
    }
  },
]

export const deleteTodo = [
  validateParams(getTodoByIdSchema),
  (req: Request, res: Response) => {
    const { itemId } = req.params
    const todo = findTodoById(Number(itemId))
    if (todo) {
      todos.splice(todos.indexOf(todo), 1)
      res.status(200).send(`Todo with id: ${itemId} deleted`)
    } else {
      sendNotFoundResponse(res, itemId)
    }
  },
]
