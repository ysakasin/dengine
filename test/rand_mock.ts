import Random from "../src/random";
import { Dice } from "../src/interface";

export default class RandomMock extends Random {
  rands: Dice[];
  index: number;

  constructor(...rands: string[]) {
    super();
    this.rands = rands.map(x => {
      const a = x.split("/");
      const faces = parseInt(a[1]);
      const value = parseInt(a[0]);
      return { faces, value };
    });
    this.index = 0;
  }

  D(faces: number): number {
    if (this.index >= this.rands.length) {
      throw new Error("Random is called more than expected");
    }
    if (this.rands[this.index].faces != faces) {
      throw new DiceMissmatchError(this.rands[this.index], faces);
    }
    return this.rands[this.index++].value;
  }
}

class DiceMissmatchError implements Error {
  name = "DiceMissmatchError";
  message: string;

  constructor(public expected: Dice, public actual: number) {
    this.message = `${this.name}: expected ${this.expected.value}/${this.expected.faces}, actual face ${this.actual}`;
  }

  toString() {
    return this.message;
  }
}
