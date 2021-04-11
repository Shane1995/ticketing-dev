import { Router, Request, Response } from 'express'

const router = Router()

router.post('/api/users/signOut', (req: Request, res: Response) => {
  res.send('hi')
})

export { router as signOutRouter }
