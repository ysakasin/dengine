export function parseArithmetic(
  tokens: string[],
  index: number = 0
): [number, number] {
  let parser = new ArithmeticParser(tokens, index);
  const res = parser.parse();
  return [parser.index, res];
}

class ArithmeticParser {
  tokens: string[];
  index: number;

  constructor(tokens: string[], index: number = 0) {
    this.tokens = tokens;
    this.index = index;
  }

  parse(): number {
    return this.parseAdd();
  }

  parseAdd(): number {
    let left = this.parseMul();

    let op: string = this.tokens[this.index];
    while (op == "+" || op == "-") {
      if (op == "+") {
        this.next();
        left = left + this.parseMul();
      } else if (op == "-") {
        this.next();
        left = left - this.parseMul();
      }
      op = this.tokens[this.index];
    }
    return left;
  }

  parseMul(): number {
    let left = this.parseNumber();

    let op: string = this.tokens[this.index];
    while (op == "*" || op == "/") {
      if (op == "*") {
        this.next();
        left = left * this.parseNumber();
      } else if (op == "/") {
        this.next();
        left = left / this.parseNumber();
      }
      op = this.tokens[this.index];
    }
    return left;
  }

  parseNumber(): number {
    if (this.tokens[this.index] == "(") {
      this.next(); // take "("
      const ret = this.parse();
      this.next(); // take ")"
      return ret;
    }
    if (this.tokens[this.index] == "-") {
      this.next();
      return -parseInt(this.tokens[this.next()]);
    }
    return parseInt(this.tokens[this.next()]);
  }

  next(): number {
    if (this.index >= this.tokens.length) {
      throw new ParseError("Already reached End of Tokens", this.index);
    }
    return this.index++;
  }
}

class ParseError implements Error {
  name = "ParseError";

  constructor(public message: string, public index: number) {}

  toString() {
    return this.name + ": " + this.message;
  }
}
