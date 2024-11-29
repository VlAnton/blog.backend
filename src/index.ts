import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
// @ts-ignore
import xss from 'xss-clean'

import routes from './routes/index'

dotenv.config()

import express from 'express'

const app = express()

app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(xss())
app.use(bodyParser.json())
app.use('/api', routes)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
