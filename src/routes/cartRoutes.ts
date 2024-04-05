import express, { Request, Response } from 'express'
import cartService from '../services/cartService'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send(cartService.getCart())
})

router.get('/add/:productId', (req: Request, res: Response) => {
  res.send(
    cartService.addProductById(Number.parseInt(req.params.productId, 10)),
  )
})

router.get('/remove/:productId', (req: Request, res: Response) => {
  res.send(
    cartService.deleteProductById(Number.parseInt(req.params.productId, 10)),
  )
})

export default router
