import path from 'path'
import dotenv from 'dotenv'
import * as env from './services/env'

const envPath = path.resolve(__dirname, '../.env')

env.createIfNotExists(envPath)
dotenv.config({ path: envPath }) // Load env variables from .env file

const JWT_SECRET = process.env.JWT_SECRET || ''

if (JWT_SECRET.length < 16) {
    throw new Error("env 'JWT_SECRET' length is less than 16")
}

import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import cors from 'cors'
import swagger from './swagger/middleware'
import cookieParser from 'cookie-parser'
import sockets from './api/sockets'

import { HttpErrorHandler, JoiErrorHandler, SqliteErrorHandler } from './api/middleware/error'

import RootRoute from './api/routes/root'
import UserRoute from './api/routes/user'
import ReportRoute from './api/routes/report'
import ValidationRoute from './api/routes/validation'

const devOrigin = 'http://localhost:3000'
const prodOrigin = 'https://algn18.me'

const app = express()
const port = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'
const loggingMode = isProd ? 'combined' : 'dev'

app.set('trust proxy', 1) // trust nginx

/* Request pre-processor middleware */
app.use(cors({ origin: isProd ? prodOrigin : devOrigin, credentials: true }))
app.use(cookieParser(JWT_SECRET))
app.use(express.json())
app.use(morgan(loggingMode))
app.use('/docs', ...swagger)

/* API routes */

app.use(RootRoute)
app.use(UserRoute)
app.use(ReportRoute)
app.use(ValidationRoute)

/* Error handler middleware */

app.use(HttpErrorHandler)
app.use(JoiErrorHandler)
app.use(SqliteErrorHandler)

/* Start the server */

const server = app.listen(port, () => {
    console.log(chalk.green(`Server listening to port ${port}`))
})

sockets(server)
