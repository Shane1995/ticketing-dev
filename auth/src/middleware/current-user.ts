import { Request, Response, NextFunction } from 'express'
import { JwtManager } from '../utils/jwt-manager'

export interface UserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = JwtManager.Verify(req.session.jwt)
    req.currentUser = payload
  } catch (err) {}

  next()
}
