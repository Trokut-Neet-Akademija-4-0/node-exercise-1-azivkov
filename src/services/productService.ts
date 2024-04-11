import IProduct from '../routes/models/interfaces/productInterface'
import products from '../routes/models/productModel'
import HttpError from '../utils/HttpError'

class ProductService {
  private products: IProduct[] = products

  getAllProducts(): IProduct[] {
    return this.products
  }

  getProductById(id: number): IProduct | undefined {
    const foundProduct = this.products.find((product) => product.id === id)
    if (!foundProduct)
      throw new HttpError(404, `Product with id ${id} not found`)
    return foundProduct
  }

  deleteProductById(id: number): IProduct | undefined {
    const indexToDelete = this.products.findIndex(
      (product) => product.id === id,
    )

    if (indexToDelete < 0)
      throw new HttpError(404, `Product with id ${id} not found`)

    const deletedProduct = this.products.splice(indexToDelete, 1)
    return deletedProduct[0]
  }

  addNewProduct(product: IProduct): IProduct {
    this.products.push(product)
    return product
  }
}

export default new ProductService()
