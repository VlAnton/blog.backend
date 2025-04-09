require('module-alias/register')
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

// @ts-ignore
import xss from 'xss-clean'
import { WebSocket } from 'ws'
import websocket from './websocket'
import routes from '@/routes'
import express from 'express'
import { dbConnect } from '@/db/db-client'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
websocket.setupWebSocket(wss)

app.use(cors())

app.use('/static', express.static(path.join(__dirname, 'uploads')))
const port = Number(process.env.SERVER_PORT) || 3001

dbConnect()

app.use(xss())
app.use(bodyParser.json())
app.use('/api', routes)

server.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
