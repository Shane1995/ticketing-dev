import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

let mongo: MongoMemoryServer

// Jest setup hook, runs first
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfgh'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

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
