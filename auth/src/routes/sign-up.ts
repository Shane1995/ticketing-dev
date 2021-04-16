import { JwtManager } from './../utils/jwt-manager'

import { BadRequestError } from './../errors/bad-request-error'
import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { validateRequest } from '../middleware/validate-request'

const router = Router()

const signUpValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters.'),
]

router.post('/api/users/signUp', signUpValidation, validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new BadRequestError('Email in use')
  }

  const user = User.build({ email, password })

  await user.save()

  // Store it on session object
  req.session = {
    jwt: JwtManager.signUserJwt(user),
  }

  return res.status(201).send(user)
})

export { router as signUpRouter }
