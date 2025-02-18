import { server } from './server/server'
import { logger } from './modules/logger/logger'
import { APP_PORT } from './utils/envVariables'

server.listen(APP_PORT, () => {
  console.log(`Server running on http://localhost:${APP_PORT}`)
})

logger.error('Error message without Error instance')
