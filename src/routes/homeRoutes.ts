import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the homepage!')
})

router.get('/test', (req: Request, res: Response) => {
  res.send('Welcome to the homepage test!')
})

export default router
