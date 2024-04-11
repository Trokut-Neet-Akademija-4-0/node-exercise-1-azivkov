import Student from './zad2'

interface Response<T> {
  content: T
  statusCode: number
}

class Kutija<T> {
  sadrzaj: T[]

  constructor() {
    this.sadrzaj = []
  }

  dodajStvar(stvar: T) {
    this.sadrzaj.push(stvar)
  }
}

const kutijaBrojeva = new Kutija<number>()
kutijaBrojeva.dodajStvar(1)
kutijaBrojeva.dodajStvar(2)
console.log(kutijaBrojeva.sadrzaj)

const kutijaStringova = new Kutija<string>()
kutijaStringova.dodajStvar('hello')
kutijaStringova.dodajStvar('goodbye')
console.log(kutijaStringova.sadrzaj)

const KutijaStudenata = new Kutija<Student>()
KutijaStudenata.dodajStvar(new Student('Mate', 20, 131))
KutijaStudenata.dodajStvar(new Student('Ante', 23, 432))
console.log(KutijaStudenata.sadrzaj)
