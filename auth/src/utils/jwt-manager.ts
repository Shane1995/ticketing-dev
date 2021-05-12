import { UserDoc } from './../models/user'
import jwt from 'jsonwebtoken'
import { UserPayload } from '../middleware/current-user'

export class JwtManager {
  static signUserJwt(user: UserDoc) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY! /* We know that his env variable is defined. */
    )
  }

  static Verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload
    return payload
  }
}
