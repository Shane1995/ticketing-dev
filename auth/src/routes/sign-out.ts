import { Router, Request, Response } from 'express'

const router = Router()

router.post('/api/users/signOut', (req: Request, res: Response) => {
  req.session = null
  res.send({})
})

export { router as signOutRouter }
