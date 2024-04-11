class Automobile {
  static instanceNumber: number
  constructor(
    private marka: string,
    private godiste: number,
  ) {
    Automobile.instanceNumber = Automobile.instanceNumber ?? 0 //ako je vrijednost 0 onda je 0, ako je veća onda instanceNumber
    Automobile.instanceNumber += 1
  }

  static GetCreatedInstances() {
    return Automobile.instanceNumber
  }

  static ResetInstances() {
    Automobile.instanceNumber = 0
  }

  public getMarka() {
    return this.marka
  }
}

console.log(Automobile.GetCreatedInstances())
console.log(new Automobile('BMW', 2023))
console.log(Automobile.GetCreatedInstances())
console.log(new Automobile('VW', 2023))
console.log(Automobile.GetCreatedInstances())
console.log(new Automobile('Mercedes', 2023))
console.log(Automobile.GetCreatedInstances())

export default Automobile
