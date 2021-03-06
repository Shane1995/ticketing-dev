import { app } from './app'
import mongoose from 'mongoose'

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
