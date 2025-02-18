import fs from 'node:fs'
import path from 'node:path'
import { formatMessage } from '../utils/formatMessage'
import { LogLevel, AppEnv } from '../enums'
import { LOG_PATH } from './constants'
import { LogEmitter } from '../events/logEmitter'
import { APP_ENV } from '../utils/envVariables'

class Logger {
  readonly logEmitter: LogEmitter

  constructor(private readonly logPath = LOG_PATH) {
    this.init()
    this.logEmitter = new LogEmitter(this.logPath)
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
      this.logEmitter.emitConsoleLog(formattedMsg)
    } else {
      this.logEmitter.emitFileLog(formattedMsg, level)
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

export const logger = new Logger()
