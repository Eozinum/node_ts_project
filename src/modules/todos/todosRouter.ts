import { Router } from 'express'
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from './todoHandlers'

const todosRouter = Router()

todosRouter
  .get('/items', getAllTodos)
  .get('/items/:itemId', getTodoById)
  .post('/items', createTodo)
  .put('/items/:itemId', updateTodo)
  .delete('/items/:itemId', deleteTodo)

export default todosRouter
