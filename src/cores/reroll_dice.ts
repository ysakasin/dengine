import Random from "../random";
import { Result, Status } from "../interface";
import { newResult } from "../helper";
import { ArithmeticParser } from "../parser";

export default function rerollDice(
  rand: Random,
  tokens: string[]
): Result | null {
  try {
    let parser = new RerollDiceParser(rand, tokens);
    return parser.parseResult();
  } catch {
    return null;
  }
}

export function rerollDiceWithException(
  rand: Random,
  tokens: string[]
): Result | null {
    let parser = new RerollDiceParser(rand, tokens);
    return parser.parseResult();
}

const REROLL_LIMIT = 100;

class RerollDiceParser extends ArithmeticParser {
  rand: Random;

  constructor(rand: Random, tokens: string[]) {
    super(tokens, 0);
    this.rand = rand;
  }

  parseResult(): Result {
    const n = this.parseTerm();
    this.expect("R");
    const k = this.parseTerm();

    const op = this.curToken();
    this.next();
    const cond = this.parseAdd();

    const expr = `${n}R${k}${op}${cond}`;
    const condFunc = this.getCondFunc(op, cond);

    let total = 0;
    let x = n;
    let arr: string[] = [];
    for (let i = 0; x > 0 && i < REROLL_LIMIT; i++) {
      let str;
      [str, x] = this.nRk(x, k, condFunc);

      arr.push(str);
      total += x;
    }

    let result = newResult();
    result.dice = this.rand.dice;
    result.total = total;
    result.mainMassage = `成功数${total}`;
    result.process = [expr, arr.join(" + "), result.mainMassage];
    result.status = Status.Unknown;

    return result;
  }

  nRk(
    n: number,
    k: number,
    condFunc: (lhs: number) => boolean
  ): [string, number] {
    this.rand.nDk(n, k);
    const dice = this.rand.dice.slice(this.rand.dice.length - n);
    const values = dice.map(v => v.value);

    const str = values.join(",");
    let x = 0;
    for (let v of values) {
      if (condFunc(v)) {
        x++;
      }
    }
    return [str, x];
  }

  getCondFunc(op: string, cond: number): (lhs: number) => boolean {
    if (op == "==" || op == "=") {
      return l => l == cond;
    } else if (op == ">=") {
      return l => l >= cond;
    } else if (op == ">") {
      return l => l > cond;
    } else if (op == "<=") {
      return l => l <= cond;
    } else if (op == "<") {
      return l => l < cond;
    }
    throw new ParseError("Unsupported op", 0);
  }
}

class ParseError implements Error {
  name = "ParseError";

  constructor(public message: string, public index: number) {}

  toString() {
    return this.name + ": " + this.message;
  }
}
