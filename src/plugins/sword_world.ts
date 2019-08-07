import { Result, Status } from "../interface";
import Random from "../random";
import { check2D6 } from "../cores/specific_dice";
import { ArithmeticParser } from "../parser";
import { ratingTable } from "./sword_world_tables";
import { newResult } from "../helper";

const helpMessage: string =
  "・SW　レーティング表　　　　　(Kx[c]+m$f) (x:キー, c:クリティカル値, m:ボーナス, f:出目修正)";

export default {
  id: "SwordWorld",
  name: "ソードワールド",
  helpMessage,
  prefixes: [],

  roll(rand: Random, command: string, tokens: string[]): Result | null {
    const skillCheckResult = skillCheck(rand, tokens);
    if (skillCheckResult) {
      return skillCheckResult;
    }

    let sw = new SwordWorld(tokens, rand);
    return sw.ratingTable();
  }
};

function skillCheck(rand: Random, tokens: string[]) {
  const ret = check2D6(">=", rand, tokens, (left, right) => {
    if (left >= 12) {
      return ["自動的成功", Status.Success];
    } else if (left <= 2) {
      return ["自動的失敗", Status.Failure];
    } else if (left >= right) {
      return ["成功", Status.Success];
    } else {
      return ["失敗", Status.Failure];
    }
  });
  return ret;
}

class SwordWorld extends ArithmeticParser {
  critical: number = 10;
  destinyChanging?: number;
  criticalRay?: number;
  rateUp?: number;
  greatestFortune: boolean = false;
  random: Random;

  constructor(tokens: string[], random: Random) {
    super(tokens);
    this.random = random;
  }

  ratingTable(): Result {
    this.expect("K");
    const key = this.parseTerm();
    this.parseOptions();

    let fixedValue = 0;
    let op = this.curToken();
    while (op == "+" || op == "-") {
      this.next();
      if (op == "+") {
        fixedValue += this.parseMul();
      } else if (op == "-") {
        fixedValue -= this.parseMul();
      }
      op = this.curToken();
    }
    this.parseOptions();

    const command = this.getCommandText(key, fixedValue);

    let val = this.critical; // initiali val is dummy
    let vals: number[] = [];
    while (val >= this.critical) {
      val = this.random.nDk(2, 6);

      if (this.destinyChanging) {
        val = this.destinyChanging;
        this.destinyChanging = 0;
      } else if (this.criticalRay) {
        val += this.criticalRay;
        this.criticalRay = 0;
      }

      val = this.sanitizeDiceValue(val);
      vals.push(val);
    }

    const ratedVals = vals.map(x => ratingTable[key][x]);
    const total = ratedVals.reduce((x, y) => x + y) + fixedValue;
    let result = newResult();
    result.process.push(command);
    result.process.push(this.getDiceText(vals, fixedValue));
    result.process.push(ratedVals.join(","));
    if (vals.length > 1) {
      result.process.push(`${vals.length - 1}回転`);
      result.process.push(total.toString());
    }
    result.mainMassage = total.toString();
    result.total = total;
    result.dice = this.random.dice;
    return result;
  }

  parseOptions() {
    while (true) {
      const token = this.curToken();
      if (!token) {
        break;
      }

      if (token[0] == "[") {
        this.next();
        this.critical = parseInt(token.substr(1));
      } else if (token == "@") {
        this.next();
        this.critical = this.parseTerm();
      } else if (token == "gf") {
        this.next();
        this.greatestFortune = true;
      } else if (token == "$") {
        this.parseDollor();
      } else if (token == "r") {
        this.next();
        this.rateUp = this.parseTerm();
      } else {
        break;
      }
    }
  }

  parseDollor() {
    this.expect("$");
    const token = this.curToken();
    if (token == "+" || token == "-") {
      this.criticalRay = this.parseTerm();
    } else {
      this.destinyChanging = this.parseTerm();
    }
  }

  sanitizeDiceValue(value: number): number {
    if (value < 2) {
      return 2;
    } else if (value > 12) {
      return 12;
    } else {
      return value;
    }
  }

  getCommandText(key: number, fixedValue: number): string {
    let ret = `KeyNo.${key}c[${this.critical}]`;
    if (this.destinyChanging) {
      ret += `m[${this.destinyChanging}]`;
    }
    if (this.criticalRay) {
      ret += `m[${withSign(this.criticalRay)}]`;
    }
    ret += withSign(fixedValue);
    return ret;
  }

  getDiceText(vals: number[]): string {
    const dice = this.random.dice;
    let pairs: string[] = [];
    for (let i = 0; i < dice.length; i += 2) {
      pairs.push(`${dice[i].value},${dice[i + 1].value}`);
    }

    return `2D:[${pairs.join(" ")}]=${vals.join(",")}`;
  }
}

function withSign(x: number): string {
  if (x > 0) {
    return `+${x}`;
  } else if (x < 0) {
    return x.toString();
  } else {
    return "";
  }
}
