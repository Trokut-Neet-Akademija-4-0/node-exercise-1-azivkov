import Kosarica from '../entities/Kosarica'
import ICart from './interfaces/cartInterface'
import ICartProduct from './interfaces/cartProductInterface'

class Cart extends Kosarica {
  public get products() {
    return this.proizvodKupacs.map((pk) => {
      const product = pk.proizvod
      product.updateQuantityAndPrice(pk.kolicina, pk.cijena)
      return product
    })
  }
}

export default Cart
