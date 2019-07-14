import Random from "../random";
import { Result, Status } from "../interface";
import { newResult, joinDiceValue } from "../helper";

export default function addDice(rand: Random, tokens: string[]): Result | null {
  try {
    let parser = new AddDiceParser(rand, tokens);
    parser.parse();
    return parser.result;
  } catch {
    return null;
  }
}

const CONDITION_OPS = ["==", "=", ">", ">=", "<", "<="];

class AddDiceParser {
  rand: Random;
  tokens: string[];
  index: number = 0;
  result: Result;

  constructor(rand: Random, tokens: string[]) {
    this.rand = rand;
    this.tokens = tokens;
    this.result = newResult();
  }

  parse() {
    let suc = this.parseResult();

    if (suc !== null) {
      this.result.status = suc ? Status.Success : Status.Failure;
      this.result.mainMassage = suc ? "成功" : "失敗";
      this.result.process.push(this.result.mainMassage);
    } else {
      this.result.mainMassage = this.result.total.toString();
    }
  }

  parseResult(): boolean | null {
    let res: boolean | null = null;

    let left = this.parseAdd();
    this.result.total = left.value;

    if (!left.isRolled) {
      throw new ParseError("Command does not have diceroll expression", 0);
    }

    const op = this.curToken();
    if (CONDITION_OPS.includes(op)) {
      this.next();
      const right = this.parseAdd();
      res = this.checkCondition(left, op, right);
      left = this.newNodeCondop(left, op, right);
    }

    this.result.process.push(left.expr, left.rolledExpr, left.value.toString());
    return res;
  }

  checkCondition(left: Node, op: string, right: Node): boolean {
    if (op == "==" || op == "=") {
      return left.value == right.value;
    } else if (op == ">=") {
      return left.value >= right.value;
    } else if (op == ">") {
      return left.value > right.value;
    } else if (op == "<=") {
      return left.value <= right.value;
    } else if (op == "<") {
      return left.value < right.value;
    }
    return false;
  }

  parseAdd(): Node {
    let left = this.parseMul();

    let op: string = this.curToken();
    while (op == "+" || op == "-") {
      this.next();
      const right = this.parseMul();

      let value: number;
      if (op == "+") {
        value = left.value + right.value;
      } else {
        value = left.value - right.value;
      }

      left = this.newNodeBinop(left, op, right, value);
      op = this.curToken();
    }
    return left;
  }

  parseMul(): Node {
    let left = this.parseD();

    let op: string = this.curToken();
    while (op == "*" || op == "/") {
      this.next();
      const right = this.parseD();

      let value: number;
      if (op == "*") {
        value = left.value * right.value;
      } else {
        value = Math.floor(left.value / right.value);
      }

      left = this.newNodeBinop(left, op, right, value);
      op = this.curToken();
    }
    return left;
  }

  parseD(): Node {
    const left = this.parseUnary();

    const op: string = this.curToken();
    if (op == "D") {
      this.next();
      const right = this.parseUnary();
      if (left.isRolled || right.isRolled) {
        throw new ParseError("Nested diceroll is unsupported.", this.index);
      }
      if (left.value < 0 || right.value < 0) {
        throw new ParseError("Negative diceroll is unsupported.", this.index);
      }

      const value = this.rand.nDk(left.value, right.value);
      const expr = `${left.value}D${right.value}`;
      const dice = this.rand.dice.slice(this.rand.dice.length - left.value);
      const rolledExpr = `${value}[${joinDiceValue(dice)}]`;

      return { value, expr, rolledExpr, isRolled: true };
    }
    return left;
  }

  parseUnary(): Node {
    if (this.curToken() == "-") {
      this.next();
      let node = this.parseTerm();
      node.value = -node.value;
      node.expr = "-" + node.expr;
      node.rolledExpr = "-" + node.rolledExpr;
      return node;
    }

    if (this.curToken() == "+") {
      this.next();
      return this.parseTerm();
    }

    if (this.curToken() == "D") {
      this.next();
      const right = this.parseTerm();
      if (right.isRolled) {
        throw new ParseError("Nested diceroll is unsupported.", this.index);
      }
      if (right.value < 0) {
        throw new ParseError("Negative diceroll is unsupported.", this.index);
      }

      const value = this.rand.D(right.value);
      const expr = `1D${right.value}`;
      const rolledExpr = `${value}[${value}]`;
      return { value, expr, rolledExpr, isRolled: true };
    }

    return this.parseTerm();
  }

  parseTerm(): Node {
    if (this.curToken() == "(") {
      this.next(); // take "("
      let node = this.parseAdd();
      this.expect(")");

      node.expr = "(" + node.expr + ")";
      node.rolledExpr = "(" + node.rolledExpr + ")";
      return node;
    }

    return this.parseNumber();
  }

  parseNumber(): Node {
    const token = this.curToken();
    if (!/^\d+$/.test(token)) {
      throw new ParseError("Current token is not Number string.", this.index);
    }
    this.next();

    const num = parseInt(token);
    return {
      value: num,
      expr: num.toString(),
      rolledExpr: num.toString(),
      isRolled: false
    };
  }

  curToken(): string {
    return this.tokens[this.index];
  }

  next(): number {
    if (this.index >= this.tokens.length) {
      throw new ParseError("Already reached End of Tokens", this.index);
    }
    return this.index++;
  }

  expect(token: string) {
    if (this.curToken() != token) {
      throw new ParseError(
        `Unexpected token. expected: ${token}, actual: ${this.curToken()}`,
        this.index
      );
    }
    this.next();
  }

  newNodeBinop(left: Node, op: string, right: Node, value: number): Node {
    const expr = `${left.expr} ${op} ${right.expr}`;
    const rolledExpr = `${left.rolledExpr} ${op} ${right.rolledExpr}`;
    const isRolled = left.isRolled || right.isRolled;
    return { value, expr, rolledExpr, isRolled };
  }

  newNodeCondop(left: Node, op: string, right: Node): Node {
    const value = left.value;
    const isRolled = left.isRolled || right.isRolled;

    let expr: string;
    let rolledExpr: string;
    if (right.isRolled) {
      expr = `${left.expr} ${op} ${right.expr}`;
      rolledExpr = `${left.rolledExpr} ${op} ${right.rolledExpr}`;
    } else {
      expr = `${left.expr} ${op} ${right.value.toString()}`;
      rolledExpr = `${left.rolledExpr} ${op} ${right.value.toString()}`;
    }

    return { value, expr, rolledExpr, isRolled };
  }
}

interface Node {
  value: number;
  expr: string;
  rolledExpr: string;
  isRolled: boolean;
}

class ParseError implements Error {
  name = "ParseError";

  constructor(public message: string, public index: number) {}

  toString() {
    return this.name + ": " + this.message;
  }
}
