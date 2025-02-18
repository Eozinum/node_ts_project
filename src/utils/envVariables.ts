export const APP_PORT =
  process.env.APP_PORT ??
  (() => {
    throw new Error('APP_PORT is not set')
  })()

export const APP_ENV =
  process.env.APP_ENV ??
  (() => {
    throw new Error('APP_ENV is not set')
  })()
