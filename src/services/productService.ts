import IProduct from '../routes/models/interfaces/productInterface'
import products from '../routes/models/productModel'

class ProductService {
  private products: IProduct[] = products

  getAllProducts(): IProduct[] {
    return this.products
  }

  getProductById(id: number): IProduct | undefined {
    return this.products.find((product) => product.id === id)
  }

  deleteProductById(id: number): IProduct | undefined {
    const indexToDelete = this.products.findIndex(
      (product) => product.id === id,
    )

    if (indexToDelete < 0) return undefined

    const deletedProduct = this.products.splice(indexToDelete, 1)
    return deletedProduct[0]
  }
}

export default new ProductService()
