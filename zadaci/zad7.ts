interface Oblik {
  povrsina(): number
  opseg(): number
}

class Krug implements Oblik {
  constructor(private radijus: number) {}

  povrsina(): number {
    return Math.PI * this.radijus * this.radijus
  }

  opseg(): number {
    return 2 * Math.PI * this.radijus
  }
}

class Pravokutnik implements Oblik {
  constructor(
    private duljina: number,
    private širina: number,
  ) {}

  povrsina(): number {
    return this.duljina * this.širina
  }

  opseg(): number {
    return 2 * (this.duljina + this.širina)
  }
}

const krug = new Krug(15)
const pravokutnik = new Pravokutnik(8, 10)
console.log('Površina kruga: ', krug.povrsina())
console.log('Opseg kruga: ', krug.opseg())
console.log('Površina pravokutnika:', pravokutnik.povrsina())
console.log('Opseg pravokutnika: ', pravokutnik.opseg())

export default Oblik
