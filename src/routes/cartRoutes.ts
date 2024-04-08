import express from 'express'
import {
  getCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from '../controllers/cartController'

const router = express.Router()

router.get('/', getCart)

router.get('/add/:productId', addProductToCart)

router.get('/remove/:productId', removeProductFromCart)

router.delete('/clear', clearCart)

export default router
