import { AddDiceParser } from "./add_dice";
import Random from "../random";
import { Result, Status } from "../interface";

export function check2D6(
  condOp: string,
  random: Random,
  tokens: string[],
  fn: (left: number, right: number) => [string, Status]
) {
  return specificDice(2, 6, condOp, random, tokens, fn);
}

export function specificDice(
  n: number,
  k: number,
  condOp: string,
  random: Random,
  tokens: string[],
  fn: (left: number, right: number) => [string, Status]
): Result | null {
  try {
    let parser = new SpecificDiceParser(random, tokens);
    return parser.parseSpecific(n, k, condOp, fn);
  } catch {
    return null;
  }
}

class SpecificDiceParser extends AddDiceParser {
  parseSpecific(
    n: number,
    k: number,
    condOp: string,
    fn: (left: number, right: number) => [string, Status]
  ): Result | null {
    let left = this.parseAdd();
    this.result.total = left.value;
    this.result.dice = this.rand.dice;

    if (!this.isnDk(n, k)) {
      return null;
    }

    this.expect(condOp);
    const right = this.parseAdd();
    left = this.newNodeCondop(left, condOp, right);

    const [msg, status] = fn(left.value, right.value);

    this.result.process.push(
      left.expr,
      left.rolledExpr,
      left.value.toString(),
      msg
    );
    this.result.status = status;
    this.result.mainMassage = msg;

    return this.result;
  }

  isnDk(n: number, k: number): boolean {
    if (this.result.dice.length != n) {
      return false;
    }

    for (let d of this.result.dice) {
      if (d.faces != k) {
        return false;
      }
    }
    return true;
  }
}
