import dotenv from 'dotenv'
import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'

import { HttpErrorHandler, JoiErrorHandler } from './api/middleware/error'

import RootRoute from './api/routes/root'
import UserRoute from './api/routes/user'

dotenv.config() // Load env variables from .env file

const app = express()
const port = process.env.PORT || 3000
const { NODE_ENV } = process.env

/* Request pre-processor middleware */

app.use(express.json())
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'))

/* API routes */

app.use(RootRoute)
app.use(UserRoute)

/* Error handler middleware */

app.use(HttpErrorHandler)
app.use(JoiErrorHandler)

app.listen(port, () => {
    console.log(chalk.green(`Server listening to port ${port}`))
})
