export function parseArithmetic(
  tokens: string[],
  index: number = 0
): [number, number] | null {
  try {
    let parser = new ArithmeticParser(tokens, index);
    const res = parser.parse();
    return [parser.index, res];
  } catch {
    return null;
  }
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

    let op: string = this.curToken();
    while (op == "+" || op == "-") {
      if (op == "+") {
        this.next();
        left = left + this.parseMul();
      } else if (op == "-") {
        this.next();
        left = left - this.parseMul();
      }
      op = this.curToken();
    }
    return left;
  }

  parseMul(): number {
    let left = this.parseTerm();

    let op: string = this.curToken();
    while (op == "*" || op == "/") {
      if (op == "*") {
        this.next();
        left = left * this.parseTerm();
      } else if (op == "/") {
        this.next();
        left = left / this.parseTerm();
      }
      op = this.curToken();
    }
    return left;
  }

  parseTerm(): number {
    if (this.curToken() == "(") {
      this.next(); // take "("
      const ret = this.parse();
      this.expect(")");
      return ret;
    }
    if (this.curToken() == "-") {
      this.next();
      return -this.parseNumber();
    }
    if (this.curToken() == "+") {
      this.next();
      return this.parseNumber();
    }
    return this.parseNumber();
  }

  parseNumber(): number {
    const token = this.curToken();
    if (!/^\d+$/.test(token)) {
      throw new ParseError("Current token is not Number string.", this.index);
    }
    this.next();
    return parseInt(token);
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
}

class ParseError implements Error {
  name = "ParseError";

  constructor(public message: string, public index: number) {}

  toString() {
    return this.name + ": " + this.message;
  }
}
