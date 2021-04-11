import { Router, Request, Response } from 'express'
import { body, Result, validationResult, ValidationError } from 'express-validator'

const router = Router()

router.post('/api/users/signIn', (req: Request, res: Response) => {
  res.send({})
})

export { router as signInRouter }
