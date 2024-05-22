class BankovniRacun {
  private stanje: number
  constructor(pareNaRacunu: number) {
    this.stanje = pareNaRacunu
  }

  public uplataNaRacun(uplata: number) {
    this.stanje = this.stanje + uplata
    return `Uplatili ste ${uplata} eura na račun. Trenutno na računu imate ${this.stanje} eura.`
  }

  public isplataIzRacuna(isplata: number) {
    if (this.stanje - isplata > 0) {
      this.stanje = this.stanje - isplata
      return `Isplaćeno je ${isplata} eura. Trenutno na računu imate ${this.stanje} eura.`
    } else {
      return 'Nemate dovoljno novaca na računu.'
    }
  }

  public stanjeNaRacunu() {
    return `Na računu imate ${this.stanje} eura.`
  }
}

const racun = new BankovniRacun(583)
console.log('Račun:', racun)
console.log('Isplata:', racun.isplataIzRacuna(32))
console.log('Stanje:', racun.stanjeNaRacunu())
console.log('Uplata:', racun.uplataNaRacun(44))
console.log('Stanje:', racun.stanjeNaRacunu())
console.log('Isplata:', racun.isplataIzRacuna(542323))
console.log('Stanje:', racun.stanjeNaRacunu())
