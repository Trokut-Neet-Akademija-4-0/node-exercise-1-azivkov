import Kategorija from '../entities/Kategorija'
import Proizvod from '../entities/Proizvod'
import IProduct from '../models/interfaces/productInterface'
import products from '../models/productModel'
import HttpError from '../utils/HttpError'
import ProductResponse from '../models/response/ProductResponse'

class ProductService {
  private products: IProduct[] = products

  async getAllProducts(): Promise<Proizvod[]> {
    return Proizvod.find()
  }

  async getProductById(id: number): Promise<Proizvod> {
    const foundProduct = await Proizvod.findOneBy({
      id: id,
    })
    if (!foundProduct)
      throw new HttpError(404, `Product with id ${id} not found`)
    return foundProduct
  }

  async updateProduct(
    productId: number,
    existingProduct: Proizvod,
  ): Promise<Proizvod> {
    const product = await this.getProductById(productId)
    product.updateExistingProduct(existingProduct)
    return product.save()
  }

  async deleteProductById(id: number): Promise<Proizvod> {
    const product = await this.getProductById(id)
    return product.remove()
  }

  async addNewProduct(product: Proizvod): Promise<Proizvod> {
    const proizvod = Proizvod.create(product)
    return proizvod.save()
  }

  async getAllCategories(): Promise<Kategorija[]> {
    return Kategorija.find()
  }
}

export default new ProductService()
