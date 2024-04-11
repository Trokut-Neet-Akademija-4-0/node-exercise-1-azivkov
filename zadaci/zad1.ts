class Osoba {
  constructor(
    private ime: string,
    public dob: number,
  ) {}

  public setIme(tvojeIme: string): void {
    this.ime = tvojeIme
  }

  public getIme(): string {
    return this.ime
  }

  public setDob(tvojaDob: number): void {
    this.dob = tvojaDob
  }

  public getDob(): number {
    return this.dob
  }

  public get imeIDob() {
    return `${this.ime} i ${this.dob}`
  }

  public predstaviSe(): string {
    return `Meine Name ist ${this.ime} und ich bin ${this.dob} Jahre alt!`
  }
}

// const osoba = new Osoba('test ime', 99)
// console.log(osoba.imeIDob)
// osoba.setIme('testttt')
// osoba.setDob(23124)
// console.log(osoba.imeIDob)
const ja = new Osoba('Anamaria', 30)
console.log('Predstavljanje:', ja.predstaviSe())

export default Osoba
