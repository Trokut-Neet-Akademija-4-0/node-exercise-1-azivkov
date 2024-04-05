import express, { Request, Response } from 'express'
import productService from '../services/productService'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send(productService.getAllProducts())
})

router.get('/:id', (req: Request, res: Response) => {
  res.send(productService.getProductById(Number.parseInt(req.params.id, 10)))
})

export default router
