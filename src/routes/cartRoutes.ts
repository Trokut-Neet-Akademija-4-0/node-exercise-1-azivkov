import express from 'express'
import {
  getCart,
  getCartById,
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
} from '../controllers/cartController'
import AuthMiddleware from '../middlewares/authHandler'
import Role from '../models/enums/Role'

const router = express.Router()

// dohvat cije kosarice
router.get('/', getCart)
router.get('/:id', getCartById)
router.get(
  '/',
  AuthMiddleware.authenticateJWT,
  AuthMiddleware.authorizeRoles([Role.Admin, Role.User, Role.Manager]),
  getCart,
)
// dodavanje proizvoda na kosaricu pomocu product id-a
router.post('/:cartId/products/:productId/add', addProductToCart)
router.put('/:cartId/products/:productId', updateProductQuantity)
router.delete('/:cartId/products/:productId', removeProductFromCart)
// ciscenje kosarice
router.delete('/clear', clearCart)

export default router
