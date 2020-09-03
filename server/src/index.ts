import dotenv from 'dotenv'
import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'

import ErrorHandler from './api/middleware/error'
import RootRoute from './api/routes/root'

// Load env variables from .env file
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const { NODE_ENV } = process.env

app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(RootRoute)

app.use(ErrorHandler)

app.listen(port, () => {
    console.log(chalk.green(`Server listening to port ${port}`))
})
