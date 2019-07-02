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

  D(_: number): number {
    if (this.index >= this.rands.length) {
      return -1;
    }
    return this.rands[this.index++].value;
  }
}
