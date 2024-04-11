abstract class KucniLjubimac {
  public ime!: string
  abstract glasajSe(): string
}

class Pas extends KucniLjubimac {
  private zvuk: string

  constructor() {
    super()
    this.zvuk = 'Vau vau!'
    this.ime = 'Pas'
  }

  glasajSe(): string {
    return this.zvuk
  }
}

class Macka extends KucniLjubimac {
  private zvuk: string

  constructor() {
    super()
    this.zvuk = 'Mjau mjau!'
    this.ime = 'Mačka'
  }

  glasajSe(): string {
    return this.zvuk
  }

  static DohvatiIme(): string {
    return 'Mackaaa'
  }
}

const peso = new Pas()
const maca = new Macka()
console.log(peso.glasajSe())
console.log(maca.glasajSe())
console.log(Macka.DohvatiIme()) //kad napravimo STATIC klasu možemo je dohvatiti ovako kroz samu klasu, ne moramo raditi novu varijablu
console.log(maca instanceof KucniLjubimac) //vraća boolean true ili false
