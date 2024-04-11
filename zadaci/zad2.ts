import Osoba from './zad1'

class Student extends Osoba {
  constructor(
    ime: string,
    dob: number,
    private brojIndeksa: number,
  ) {
    super(ime, dob)
  }

  kloniraj() {
    return new Student(this.getIme(), this.getDob(), this.brojIndeksa)
  }
}

// console.log(new Student('blabla', 55, 123))

const student1 = new Student('Marko', 23, 4532)
console.log('Student1:', student1)
console.log('Student2:', student1.kloniraj())

export default Student
