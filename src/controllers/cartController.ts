import { Request, Response } from 'express'
import cartService from '../services/cartService'

const getCart = (req: Request, res: Response) => {
  res.send(cartService.getCart())
}

const addProductToCart = (req: Request, res: Response) => {
  res.send(
    cartService.addProductById(Number.parseInt(req.params.productId, 10)),
  )
}

const removeProductFromCart = (req: Request, res: Response) => {
  res.send(
    cartService.removeProductById(Number.parseInt(req.params.productId, 10)),
  )
}

const clearCart = (req: Request, res: Response) => {
  res.send(cartService.clearCart())
}

export { getCart, addProductToCart, removeProductFromCart, clearCart }
