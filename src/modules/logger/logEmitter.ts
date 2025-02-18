import { EventEmitter } from 'node:events'
import { EmitEventLogType } from './enums'
import fs from 'node:fs'
import { LogTransformerStream } from './transformerStream'
import { LogLevel } from '../../enums'

export class LogEmitter extends EventEmitter {
  readonly logStream: fs.WriteStream
  readonly transformer: LogTransformerStream

  constructor(private readonly logPath: string) {
    super()
    this.logStream = fs.createWriteStream(this.logPath, { flags: 'a' })
    this.transformer = new LogTransformerStream()
    this.setupListeners()
  }

  private setupListeners() {
    this.on(EmitEventLogType.CONSOLE, (msg: string) => {
      console.log(msg)
    })

    this.on(EmitEventLogType.FILE, (msg: string, level: LogLevel) => this.transformer.write({ message: msg, level }))
    this.transformer.pipe(this.logStream)
  }

  public emitConsoleLog(msg: string) {
    this.emit(EmitEventLogType.CONSOLE, msg)
  }

  public emitFileLog(msg: string, type: LogLevel) {
    this.emit(EmitEventLogType.FILE, msg, type)
  }
}
