export default class Lexer {
  str: string;
  constructor(str: string) {
    this.str = str;
  }

  lex(): string[] {
    let tokens: string[] = [];
    while (this.str.length != 0) {
      this.skipBlank();
      tokens.push(this.take());
    }
    return tokens;
  }

  skipBlank() {
    const matched = this.str.match(/^\s+/);
    if (matched) {
      this.str = this.str.substring(matched[0].length);
    }
  }

  take(): string {
    let match = this.str.match(/^[a-zA-Z]+/);
    if (match != null) {
      const token = match[0].toUpperCase();
      this.str = this.str.substring(token.length);
      return token;
    }

    const regexs = [/^\d+/, /^(>=|<=|==)/, /^\[.*\]/];
    for (let regex of regexs) {
      let match = this.str.match(regex);
      if (match != null) {
        const token = match[0];
        this.str = this.str.substring(token.length);
        return token;
      }
    }

    const token = this.str[0];
    this.str = this.str.substring(1);

    return token;
  }
}
