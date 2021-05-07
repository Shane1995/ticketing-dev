import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

declare global {
  namespace NodeJS {
    interface Global {
      getAuthCookie(): Promise<string[]>
    }
  }
}

let mongo: MongoMemoryServer

// Jest setup hook, runs first
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfgh'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}, 18000)

// Jest setup hook, runs after each test
beforeEach(async () => {
  // Check for all collection and delete each collection
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

// Jest hook, runs after all tests are complete
afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.getAuthCookie = async () => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app).post('/api/users/signup').send({ email, password }).expect(201)
  const cookie = response.get('Set-Cookie')
  return cookie
}
