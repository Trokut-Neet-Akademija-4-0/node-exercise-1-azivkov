import productService from './productService'
import Cart from '../models/cartModel'
import ICart from '../models/interfaces/cartInterface'
import CartProduct from '../models/cartProductModel'
import HttpError from '../utils/HttpError'

class CartService {
  private cart: ICart = Cart

  getCart(): ICart {
    return this.cart
  }

  addProductById(id: number): ICart {
    this.changeProductQuantity(id, 1)
    this.updateCartInformation()
    return this.cart
  }

  removeProductById(id: number): ICart {
    this.changeProductQuantity(id, -1)
    this.updateCartInformation()
    return this.cart
  }

  deleteProductById(id: number): ICart {
    const indexToDelete = this.getCartProductIndexByProductId(id)

    if (indexToDelete < 0)
      throw new HttpError(404, `Cart product with id ${id} not found`)

    if (indexToDelete >= 0) {
      this.cart.products.splice(indexToDelete, 1)
    }

    return this.cart
  }

  changeProductQuantity(productId: number, quantityModifier: number): void {
    const product = productService.getProductById(productId)

    try {
      const existingCartProduct = this.getCartProductByProductId(product.id)
      if (existingCartProduct.quantity + quantityModifier > 0)
        existingCartProduct.quantity += quantityModifier
      else this.deleteProductById(existingCartProduct.id)
    } catch (error) {
      if (error instanceof HttpError)
        this.cart.products.push(
          new CartProduct(
            this.getNextAvailableCartProductId(),
            product,
            quantityModifier,
          ),
        )
    }
  }

  getCartProductByProductId(id: number): CartProduct {
    const foundCartProduct = this.cart.products.find(
      (cartProduct) => cartProduct.product.id === id,
    )
    if (!foundCartProduct)
      throw new HttpError(404, `Cart product with product id ${id} not found`)
    return foundCartProduct
  }

  getCartProductIndexByProductId(id: number): number {
    const cartProductIndex = this.cart.products.findIndex(
      (cartProduct) => cartProduct.product.id === id,
    )
    if (cartProductIndex < 0)
      throw new HttpError(404, `Cart product with product id ${id} not found`)
    return cartProductIndex
  }

  getNextAvailableCartProductId(): number {
    let greatestId = 0
    this.cart.products.forEach((cartProduct) => {
      greatestId = cartProduct.id > greatestId ? cartProduct.id : greatestId
    })
    return greatestId + 1
  }

  updateCartInformation() {
    let totalQuantity = 0
    let total = 0
    // let totalDiscounted = 0
    this.cart.products.forEach((cartProduct) => {
      const totalProductPrice = cartProduct.quantity * cartProduct.product.price
      total += totalProductPrice
      // totalDiscounted += totalProductPrice * (cartProduct.product.discountPercentage / 100)
      totalQuantity += cartProduct.quantity
    })

    //moj json nema discount, ali ovako bi se pisalo totalDiscounted da je u postotcima ^

    this.cart.totalProducts = this.cart.products.length
    this.cart.total = total
    this.cart.totalQuantity = totalQuantity
  }

  clearCart(): ICart {
    this.cart.products = []
    this.updateCartInformation()
    return this.cart
  }
}

export default new CartService()
