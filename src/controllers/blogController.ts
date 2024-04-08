import { Request, Response } from 'express'
import blogService from '../services/blogService'

const getAllBlogs = (req: Request, res: Response) => {
  res.send(blogService.getAllBlogs())
}

const getBlogById = (req: Request, res: Response) => {
  res.send(blogService.getBlogById(Number.parseInt(req.params.id, 10)))
}

const deleteBlogById = (req: Request, res: Response) => {
  res.send(blogService.deleteBlogById(Number.parseInt(req.params.id, 10)))
}

export { getAllBlogs, getBlogById, deleteBlogById }
