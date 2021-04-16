import { UserDoc } from './../models/user'
import jwt from 'jsonwebtoken'

export class JwtManager {
  static signUserJwt(user: UserDoc) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! /* We know that his env variable is defined. */
    )
  }
}
