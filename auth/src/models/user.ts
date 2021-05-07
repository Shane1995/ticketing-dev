import mongoose, { Schema, Document, Model } from 'mongoose'
import { PasswordManager } from '../utils/password-manager'

export interface UserAttrs {
  email: string
  password: string
}

interface UserModel extends Model<any> {
  build(attrs: UserAttrs): UserDoc
}

export interface UserDoc extends Document {
  email: string
  password: string
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
      },
      versionKey: false
    }
  }
)

// Use the 'function' key word for correct context of 'this'
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'))
    this.set('password', hashed)
  }

  done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
