import fs from 'node:fs'
import path from 'node:path'
import { formatMessage } from './formatMessage'
import { LogLevel, AppEnv } from './enums'
import { LOG_PATH } from './constants'
import logEmitter from '../events/logEmitter'

const APP_ENV =
  process.env.APP_ENV ??
  (() => {
    throw new Error('APP_ENV is not set')
  })()

export default class Logger {
  constructor(private readonly logPath = LOG_PATH) {
    this.init()
  }

  private init() {
    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), {
        recursive: true,
      })
    }
  }

  private log(level: LogLevel, msg: string | Error) {
    const formattedMsg = formatMessage(level, msg)

    if (APP_ENV === AppEnv.LOCAL) {
      logEmitter.emitConsoleLog(formattedMsg)
    } else {
      logEmitter.emitFileLog(formattedMsg, this.logPath)
    }
  }

  public info(msg: string | Error) {
    this.log(LogLevel.INFO, msg)
  }

  public warning(msg: string | Error) {
    this.log(LogLevel.WARNING, msg)
  }

  public error(msg: string | Error) {
    this.log(LogLevel.ERROR, msg)
  }
}
