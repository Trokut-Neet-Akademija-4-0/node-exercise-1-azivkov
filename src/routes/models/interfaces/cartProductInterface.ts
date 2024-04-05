import IProduct from './productInterface'

interface ICartProduct {
  id: number
  product: IProduct
  quantity: number
}

export default ICartProduct

// ovo smo napravili za quantity, da broji umjesto da se dupla
