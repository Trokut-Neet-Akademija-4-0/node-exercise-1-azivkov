class Singleton {
  static instance: Singleton

  constructor(
    private isCalledFromParent: boolean = false,
    public numberOfCalls: number = 0,
  ) {
    if (Singleton.instance === undefined && !this.isCalledFromParent) {
      Singleton.instance = new Singleton(true)
      this.numberOfCalls += 1
    }
  }

  getInstance(): Singleton {
    return Singleton.instance
  }
}

const sin1 = new Singleton()
console.log(sin1.getInstance())
const sin2 = new Singleton()
console.log(sin2.getInstance())
const sin3 = new Singleton()
console.log(sin3.getInstance())
console.log(Singleton.instance)

// alternativno

// class Singleton {
//   private static instance: Singleton;

//   private constructor() {}

//   static getInstance(): Singleton {
//     if (!Singleton.instance) {
//       Singleton.instance = new Singleton();
//     }
//     return Singleton.instance;
//   }
// }
