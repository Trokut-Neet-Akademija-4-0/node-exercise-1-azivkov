import express from 'express'
import {
  getAllProducts,
  getProductById,
  deleteProductById,
} from '../controllers/productController'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.get('/remove/:id', deleteProductById)

export default router
