import { Request, Response } from 'express'
import productService from '../services/productService'
import IProduct from '../models/interfaces/productInterface'
import Proizvod from '../entities/Proizvod'

const getAllProducts = async (req: Request, res: Response) => {
  res.send(await productService.getAllProducts())
}

const getProductById = async (req: Request, res: Response) => {
  res.send(
    await productService.getProductById(Number.parseInt(req.params.id, 10)),
  )
}

const deleteProductById = async (req: Request, res: Response) => {
  res.send(
    await productService.deleteProductById(Number.parseInt(req.params.id, 10)),
  )
}

const createProduct = async (req: Request, res: Response) => {
  const newProduct = req.body as Proizvod
  // console.log(req.body)
  res.send(await productService.addNewProduct(newProduct))
}

const updateProductById = async (req: Request, res: Response) => {
  const productId = Number.parseInt(req.params.id, 10)
  const existingProduct = req.body as Proizvod
  res.send(await productService.updateProduct(productId, existingProduct))
}

const getAllCategories = async (req: Request, res: Response) => {
  res.send(await productService.getAllCategories())
}

export {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
  getAllCategories,
}
