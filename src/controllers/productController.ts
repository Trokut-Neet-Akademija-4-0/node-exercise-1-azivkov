import { Request, Response } from 'express'
import productService from '../services/productService'
import IProduct from '../models/interfaces/productInterface'

const getAllProducts = (req: Request, res: Response) => {
  res.send(productService.getAllProducts())
}

const getProductById = (req: Request, res: Response) => {
  res.send(productService.getProductById(Number.parseInt(req.params.id, 10)))
}

const deleteProductById = (req: Request, res: Response) => {
  res.send(productService.deleteProductById(Number.parseInt(req.params.id, 10)))
}

const createProduct = (req: Request, res: Response) => {
  const newProduct = req.body as IProduct
  console.log(req.body)
  res.send(productService.addNewProduct(newProduct))
}

export { getAllProducts, getProductById, deleteProductById, createProduct }
