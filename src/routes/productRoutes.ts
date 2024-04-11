import express from 'express'
import {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
} from '../controllers/productController'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.get('/remove/:id', deleteProductById)

router.post('/', createProduct)

export default router
