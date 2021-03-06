import express from 'express'
import 'express-async-errors'

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
    secure: process.env.NODE_ENV !== 'test'
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

export { app }
