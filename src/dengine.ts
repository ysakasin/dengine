import { Result, Plugin } from "./interface";
import Random from "./random";
import Lexer from "./lexer";

export default class Dengine {
  plugin: Plugin;
  rand: Random | undefined;

  constructor(plugin: Plugin) {
    this.plugin = plugin;
  }

  roll(command: string): Result | null {
    if (!this.rand) {
      this.rand = new Random();
    }
    let tokens = new Lexer(command).lex();
    let isSecret = false;

    if (tokens[0] == "S") {
      isSecret = true;
      tokens.shift();
    } else if (this.plugin.prefixes) {
      for (const prefix of this.plugin.prefixes) {
        if (tokens[0] == "S" + prefix) {
          isSecret = true;
          tokens[0] = tokens[0].substring(1);
        }
      }
    }

    const res = this.plugin.roll(this.rand, command, tokens);
    if (res) {
      res.isSecret = isSecret;
    }

    return res;
  }

  setRand(rand: Random) {
    this.rand = rand;
  }
}
