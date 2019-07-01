export default class Lexer {
  str:string;
  constructor(str: string) {
    this.str = str;
  }

  lex(): string[] {
    let tokens: string[] = [];
    while(this.str.length != 0) {
      this.skipBlank();
      tokens.push(this.take());
    }
    return tokens;
  }

  skipBlank() {
    let idx = 0;
    while(this.str[idx] == ' ') {
      idx++;
    }

    this.str = this.str.substring(idx);
  }

  take(): string {
    const regexs = [/^[a-zA-Z]+/, /^\d+/, /^(\+|\-|\*|\/)/, /^(>=|<=|>|<|==|=)/, /^(\(|\)|@)/, /^\[.*\]/]
    for (let regex of regexs) {
      let match = this.str.match(regex);
      if (match != null) {
        const token = match[0];
        this.str = this.str.substring(token.length);
        return token;
      }
    }

    return "";
  }
}
