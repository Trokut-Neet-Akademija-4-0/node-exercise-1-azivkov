import { Request, Response } from 'express'
import blogService from '../services/blogService'
import IBlog from '../routes/models/interfaces/blogInterface'

const getAllBlogs = (req: Request, res: Response) => {
  res.send(blogService.getAllBlogs())
}

const getBlogById = (req: Request, res: Response) => {
  res.send(blogService.getBlogById(Number.parseInt(req.params.id, 10)))
}

const deleteBlogById = (req: Request, res: Response) => {
  res.send(blogService.deleteBlogById(Number.parseInt(req.params.id, 10)))
}

const createBlog = (req: Request, res: Response) => {
  const newBlog = req.body as IBlog
  console.log(req.body)
  res.send(blogService.addNewBlog(newBlog))
}

export { getAllBlogs, getBlogById, deleteBlogById, createBlog }
