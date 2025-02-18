import { logger } from './modules/logger/logger'
import { APP_PORT } from './utils/envVariables'
import express from 'express'

const app = express()

app.listen(APP_PORT, () => {
  logger.debug(`Express server is running on http://localhost:${APP_PORT}`)
})
