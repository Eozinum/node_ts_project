import { Transform } from 'node:stream'
import { LogLevel } from '../enums'
import { formatMessage } from '../utils/formatMessage'

export class LogTransformerStream extends Transform {
  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk: { message: string; level: LogLevel }, encoding: BufferEncoding, callback: Function) {
    const formattedMessage = formatMessage(chunk.level, chunk.message)
    this.push(formattedMessage + '\n')
    callback()
  }
}
