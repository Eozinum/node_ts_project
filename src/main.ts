import { logger } from './modules/logger/logger'
import { APP_PORT } from './utils/envVariables'
import express from 'express'
import todosRouter from './modules/todos/todosRouter'

const app = express()
app.use(express.json())
app.use('/', todosRouter)

app.listen(APP_PORT, () => {
  logger.debug(`Express server is running on http://localhost:${APP_PORT}`)
})
