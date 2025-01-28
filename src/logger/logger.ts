import fs from 'node:fs'
import path from 'node:path'
import { formatMessage } from './formatMessage'
import { LogLevel } from './logLevels'
import { AppEnv } from './envTypes'

const APP_ENV =
  process.env.APP_ENV ??
  (() => {
    throw new Error('APP_ENV is not set')
  })()

export default class Logger {
  constructor(private readonly logPath = 'logs/app.log') {
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
      console.log(formattedMsg)
    } else {
      fs.appendFile(this.logPath, `${formattedMsg} \n`, (err) => {
        if (err) {
          console.error('Error while try to put data to file', err.message)
        }
      })
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
