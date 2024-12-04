require('module-alias/register')

import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

// @ts-ignore
import xss from 'xss-clean'
import routes from '@/routes/index'
import express from 'express'
import { dbConnect } from '@/db/db-client'

const app = express()

app.use(cors())

app.use('/static', express.static(path.join(__dirname, 'uploads')))
const port = Number(process.env.SERVER_PORT) || 3001

dbConnect()

app.use(xss())
app.use(bodyParser.json())
app.use('/api', routes)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
