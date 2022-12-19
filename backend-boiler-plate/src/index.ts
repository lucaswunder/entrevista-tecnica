import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import notFoundHandler from './_shared/notFoundHandler'
import errorHandler from './_shared/errorHandler'

const HOST = process.env.HOST || 'https://localhost'
const PORT = process.env.PORT || 8000
const LOGMSG = '⚡️[Paketá Credito Live-Coding BoilerPlate]:'

mongoose.connect(
    process.env.MONGO_URL || 'mongodb://admin:paketa2023@localhost',
    { dbName: 'paketa' },
    err => {
        const msg = err
            ? `${LOGMSG} Failed to connect to MongoDB: ${err}`
            : `${LOGMSG} MongoDB connection established successfully`
        console.log(msg)
    },
)

import container from './container'

const menuRoutes = container.cradle['routesMenu']
const userRoutes = container.cradle['routesUser']

const app = express()

app.use(express.json())

app.use('/user', userRoutes)

app.use('/menu', menuRoutes)

app.use('/*', notFoundHandler)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`${LOGMSG} Server is running at ${HOST}:${PORT}`)
})
