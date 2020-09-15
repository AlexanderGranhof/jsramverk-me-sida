import dotenv from 'dotenv'
import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import crypto from 'crypto'
import session from 'express-session'
import cors from 'cors'
import path from 'path'
import swagger from './swagger/middleware'
import sessionFileStore from 'session-file-store'

import { HttpErrorHandler, JoiErrorHandler, SqliteErrorHandler } from './api/middleware/error'

import RootRoute from './api/routes/root'
import UserRoute from './api/routes/user'
import ReportRoute from './api/routes/report'
import ValidationRoute from './api/routes/validation'

import * as env from './services/env'

const envPath = path.resolve(__dirname, '../.env')

env.createIfNotExists(envPath)
dotenv.config({ path: envPath }) // Load env variables from .env file

const devOrigin = 'http://localhost:3000'
const prodOrigin = 'https://algn18.me'
const FileStore = sessionFileStore(session)

const app = express()
const port = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'
const loggingMode = isProd ? 'combined' : 'dev'
const sessionSecret = process.env.SESSION_SECRET || ''

if (sessionSecret.length < 16) {
    throw new Error('Session secret is not a string or is shorter than 16')
}

app.set('trust proxy', 1) // trust nginx

/* Request pre-processor middleware */
app.use(cors({ origin: isProd ? prodOrigin : devOrigin, credentials: true }))
app.use(express.json())
app.use(morgan(loggingMode))
app.use('/docs', ...swagger)
app.use(
    session({
        store: new FileStore(),
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: isProd },
    }),
)

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

app.listen(port, () => {
    console.log(chalk.green(`Server listening to port ${port}`))
})
