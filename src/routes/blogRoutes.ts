import express from 'express'
import {
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  createBlog,
} from '../controllers/blogController'

const router = express.Router()

router.get('/', getAllBlogs)

router.get('/:id', getBlogById)

router.get('/remove/:id', deleteBlogById)

router.post('/', createBlog)

export default router
