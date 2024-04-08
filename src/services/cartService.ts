import productService from './productService'
import Cart from '../routes/models/cartModel'
import ICart from '../routes/models/interfaces/cartInterface'
import CartProduct from '../routes/models/cartProductModel'
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

    if (product !== undefined) {
      const existingCartProduct = this.cart.products.find(
        (cartProduct) => cartProduct.product.id === product.id,
      )

      if (existingCartProduct) {
        if (existingCartProduct.quantity + quantityModifier > 0)
          existingCartProduct.quantity += quantityModifier
        else this.deleteProductById(product.id)
      } else if (quantityModifier > 0)
        this.cart.products.push(
          new CartProduct(
            this.getNextAvailableCartProductId(),
            product,
            quantityModifier,
          ),
        )
    }
  }

  getCartProductByProductId(id: number): CartProduct | undefined {
    return this.cart.products.find(
      (cartProducts) => cartProducts.product.id === id,
    )
  }

  getCartProductIndexByProductId(id: number): number {
    return this.cart.products.findIndex(
      (cartProduct) => cartProduct.product.id === id,
    )
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
