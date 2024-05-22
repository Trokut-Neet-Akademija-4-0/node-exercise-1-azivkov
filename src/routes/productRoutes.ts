import express from 'express'
import {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
  getAllCategories,
} from '../controllers/productController'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/categories', getAllCategories)

router.get('/:id', getProductById)

router.delete('/:id', deleteProductById)

router.post('/', createProduct)

router.put('/:id', updateProductById)

export default router
