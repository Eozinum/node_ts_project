import Logger from './logger/logger'

const logger = new Logger()

logger.warning('Warning message')
logger.error(new Error('Error name'))
logger.info('Info message')
logger.error('Error message without Error instance')
