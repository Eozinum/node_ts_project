import http from 'node:http'

const getRandomDelay = () => Math.floor(Math.random() * 2000) + 1000

const shouldReturnError = () => Math.random() < 0.1

export const server = http.createServer((req, res) => {
  const delay = getRandomDelay()

  setTimeout(() => {
    if (shouldReturnError()) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Internal Server Error')
      console.log(`500 Error - ${req.method} ${req.url}`)
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Request successful')
      console.log(`200 OK - ${req.method} ${req.url} (Delay: ${delay}ms)`)
    }
  }, delay)
})
