import ICart from './interfaces/cartInterface'
import ICartProduct from './interfaces/cartProductInterface'

class Cart implements ICart {
  constructor() {
    this.id = 0
    this.products = []
    this.total = 0
    this.discountedTotal = 0
    this.userId = 0
    this.totalProducts = 0
    this.totalQuantity = 0
  }

  id: number

  products: ICartProduct[]

  total: number

  discountedTotal: number

  userId: number

  totalProducts: number

  totalQuantity: number
}

export default new Cart()

// exportamo new UserCart() jer želimo da nam vrati objekt a ne klasu
