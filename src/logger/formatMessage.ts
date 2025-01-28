import chalk from 'chalk'
import { LogLevel } from './logLevels'

export const formatMessage = (level: LogLevel, msg: string | Error) => {
  const timeStamp = new Date().toISOString()

  const errorMsg =
    msg instanceof Error
      ? chalk.red(`[${timeStamp}], ERROR: ${msg.message}\nERROR MESSAGE: ${msg.message}\nERROR STACK: ${msg.stack}`)
      : chalk.red(`[${timeStamp}], ERROR: ${msg}`)

  switch (level) {
    case LogLevel.INFO:
      return chalk.blue(`[${timeStamp}], INFO: ${msg}`)

    case LogLevel.WARNING:
      return chalk.yellow(`[${timeStamp}], WARNING: ${msg}`)

    case LogLevel.ERROR:
      return errorMsg

    default:
      return chalk.gray(`[${timeStamp}], UNKNOW: ${msg}`)
  }
}
