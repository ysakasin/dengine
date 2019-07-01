import { Result, Status } from "../interface"
import Random from "../random"

export default class Cthulhu {
  prefixes = ['CC', 'CCB']

  roll(rand: Random, command: string, tokens: string[]): Result | null {
    let cmd = tokens[0];
    let idx = 1;

    if (cmd == "CC" || cmd == "CCB") {
      let option: Option = {};
      if (tokens[idx] == "(") {
        option.brokenNumber = parseInt(tokens[idx + 1]);
        idx += 3; // take ["(", Number, ")"]
      }

      if (tokens[idx] == "<=") {
        option.parsentail = parseInt(tokens[idx + 1]);
        idx += 2; // take ["<=", Number]
      }

      return this.skillCheck(rand, cmd, option);
    }

    if (cmd == "RES" || cmd == "RESB") {

    } else if (cmd == "CBR" || cmd == "CBRB") {

    }
    return null
  }

  skillCheck(rand: Random, cmd: string, option: Option): Result {
    const [critical, fumble] = this.getCritical(cmd);
    const total = rand.D100();
    const dice = rand.dice;
    const isSecret = false;
    let status = Status.Unknown;
    let messages: string[] = [];
    let mainMassage = "";

    if (option.parsentail) {
      mainMassage = this.getParsentailText(total, option.parsentail, critical, fumble);
      messages.push(mainMassage);
      status = (total <= option.parsentail) ? Status.Success : Status.Failure;
    }

    if (option.brokenNumber) {
      messages.push(`故障ナンバー[${option.brokenNumber}]`)
      if (total >= option.brokenNumber) {
        messages.push("故障")
      }
    }

    return {total, dice, isSecret, status, messages, mainMassage}
  }

  getParsentailText(total: number, parsentail: number, critical: number, fumble: number): string {
    const special = Math.floor(parsentail * 0.2);
    if (total <= parsentail) {
      if (total <= special) {
        if (total <= critical) {
          return "決定的成功/スペシャル"
        } else {
          return "スペシャル";
        }
      } else {
        if (total <= critical) {
          return "決定的成功"
        } else {
          return "成功";
        }
      }
    } else {
      if (total >= fumble) {
        return "決定的失敗";
      } else {
        return "失敗";
      }
    }
  }

  getCritical(cmd: string): [number, number] {
    let critical, fumble;
    if (cmd.endsWith('B')) {
      critical = 5;
      fumble = 96;
    } else {
      critical = 1;
      fumble = 99;
    }

    return [critical, fumble];
  }
}

interface Option {
  parsentail?: number;
  brokenNumber?: number;
}
