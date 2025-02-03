import { EventEmitter } from 'node:events'
import { EmitEventLogType } from './enums'
import fs from 'node:fs'

// class LogEmitter extends EventEmitter {}

// const logEmitter = new LogEmitter()

// logEmitter.on(EmitEventLogType.CONSOLE, (msg: string) => {
//   console.log(msg)
// })

// logEmitter.on(EmitEventLogType.FILE, (msg: string, path: string) =>
//   setImmediate(() => {
//     fs.appendFile(path, `${msg} \n`, (err) => {
//       if (err) {
//         console.error('Error while try to put data to file', err.message)
//       }
//     })
//   }),
// )

// export const emitConsoleLog = (msg: string) => {
//   logEmitter.emit(EmitEventLogType.CONSOLE, msg)
// }

// export const emitFileLog = (msg: string, path: string) => {
//   logEmitter.emit(EmitEventLogType.FILE, msg, path)
// }

class LogEmitter extends EventEmitter {
  constructor() {
    super()
    this.setupListeners()
  }

  private setupListeners() {
    this.on(EmitEventLogType.CONSOLE, (msg: string) => {
      console.log(msg)
    })

    this.on(EmitEventLogType.FILE, (msg: string, path: string) =>
      setImmediate(() => {
        fs.appendFile(path, `${msg} \n`, (err) => {
          if (err) {
            console.error('Error while trying to write data to file', err.message)
          }
        })
      }),
    )
  }

  public emitConsoleLog(msg: string) {
    this.emit(EmitEventLogType.CONSOLE, msg)
  }

  public emitFileLog(msg: string, path: string) {
    this.emit(EmitEventLogType.FILE, msg, path)
  }
}

const logEmitter = new LogEmitter()

export default logEmitter
