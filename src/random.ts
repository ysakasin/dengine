import { Random as RandomJS, MersenneTwister19937 } from "random-js"
import { Dice } from "./interface"

export default class Random {
  rand: RandomJS;
  dice: Dice[] = [];

  constructor() {
    this.rand = new RandomJS(MersenneTwister19937.autoSeed());
  }

  D100(): number {
    return this.D(100);
  }

  nDk(n: number, k: number): number {
    let total = 0;
    for (let i = 0; i < n; i++) {
      total += this.D(k);
    }
    return total;
  }

  D(faces: number): number {
    const value = this.rand.integer(1, faces);
    this.dice.push({faces, value});
    return value;
  }
}
