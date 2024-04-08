import express from 'express'
import {
  getAllBlogs,
  getBlogById,
  deleteBlogById,
} from '../controllers/blogController'

const router = express.Router()

router.get('/', getAllBlogs)

router.get('/:id', getBlogById)

router.get('/remove/:id', deleteBlogById)

export default router
