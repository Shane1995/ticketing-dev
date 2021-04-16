import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/sign-in'
import { signOutRouter } from './routes/sign-out'
import { signUpRouter } from './routes/sign-up'
import { errorHandler } from './middleware/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

// Ensure express is aware of being behind nginx.
app.set('trust proxy', true)
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
)
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT Key is undefined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to mongoDb')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!')
  })
}

start()
