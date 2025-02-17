import Logger from './logger/logger'
// import { sleep, sleep2 } from './utils/sleeper'

const logger = new Logger()

console.log('Hello World')

logger.warning('Warning message')
// logger.error(new Error('Error name'))

// await sleep(1000)

logger.info('Info message')

console.log('Hello World 2')

// await sleep(5000)

logger.error('Error message without Error instance')

// await sleep2(3000)

// logger.info('Info message 666')

// await sleep2(2000)

// logger.warning('We want more logs!!!')
