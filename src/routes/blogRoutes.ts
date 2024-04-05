import express, { Request, Response } from 'express'
import blogService from '../services/blogService'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send(blogService.getAllBlogs())
})

router.get('/:id', (req: Request, res: Response) => {
  res.send(blogService.getBlogById(Number.parseInt(req.params.id, 10)))
})

export default router
