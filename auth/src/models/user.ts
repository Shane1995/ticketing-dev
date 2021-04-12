import mongoose, { Schema, Document, Model } from 'mongoose'

interface UserAttrs {
  email: string
  password: string
}

interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
})

userSchema.statics.build = (attrs: UserAttrs): mongoose.Document<UserAttrs, {}> => {
  return new User(attrs)
}

const User = mongoose.model<any, UserModel>('User', userSchema)

User.build({
  email: 'ee',
  password: 'eee',
})

export { User }
