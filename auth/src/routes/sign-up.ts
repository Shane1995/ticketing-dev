import { Router, Request, Response } from 'express'
import { body, Result, validationResult, ValidationError } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

const router = Router()

const signUpValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters.'),
]

router.post('/api/users/signUp', signUpValidation, (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req)
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  throw new DatabaseConnectionError()
  console.log('Creating a user...')

  res.send({})
})

export { router as signUpRouter }
