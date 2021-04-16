import { JwtManager } from './../utils/jwt-manager'
import { PasswordManager } from '../utils/password-manager'
import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middleware/validate-request'
import { User } from '../models/user'

const router = Router()

const signInValidation = [
  body('email').isEmail().withMessage('Email must be valid.'),
  body('password').trim().notEmpty().withMessage('You must enter in a password.'),
]

router.post('/api/users/signIn', signInValidation, validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials')
  }

  const passwordsMatch = await PasswordManager.compare(existingUser.password, password)

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials')
  }

  req.session = {
    jwt: JwtManager.signUserJwt(existingUser),
  }

  res.status(200).send(existingUser)
})

export { router as signInRouter }
