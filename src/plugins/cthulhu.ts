import { Result, Status } from "../interface";
import Random from "../random";
import { newResult } from "../helper";
import { parseArithmetic } from "../parser";

export default class Cthulhu {
  prefixes = ["CC", "CCB"];

  roll(rand: Random, command: string, tokens: string[]): Result | null {
    let cmd = tokens[0];
    let idx = 1;

    if (cmd == "CC" || cmd == "CCB") {
      let option: skillCheckOption = {};
      if (tokens[idx] == "(") {
        option.brokenNumber = parseInt(tokens[idx + 1]);
        idx += 3; // take ["(", Number, ")"]
      }

      if (tokens[idx] == "<=") {
        [idx, option.parsentail] = parseArithmetic(tokens, idx + 1);
      }

      return this.skillCheck(rand, cmd, option);
    }

    if (cmd == "RES" || cmd == "RESB") {
      const a = parseInt(tokens[idx + 1]);
      const b = parseInt(tokens[idx + 3]);
      return this.regist(rand, cmd, a - b);
    }

    if (cmd == "CBR" || cmd == "CBRB") {
      const a = parseInt(tokens[idx + 1]);
      const b = parseInt(tokens[idx + 3]);
      return this.combination(rand, cmd, a, b);
    }
    return null;
  }

  skillCheck(rand: Random, cmd: string, option: skillCheckOption): Result {
    const total = rand.D100();
    const dice = rand.dice;
    const isSecret = false;
    let status = Status.Unknown;
    let actions: string[] = [];
    let messages: string[] = [];
    let mainMsgs: string[] = [];

    // actions
    const effect = option.parsentail ? `1D100<=${option.parsentail}` : "1D100";
    actions.push(effect);

    let isBroken = false;
    if (option.brokenNumber) {
      actions.push(`故障ナンバー[${option.brokenNumber}]`);
      isBroken = total >= option.brokenNumber;
    }

    // messages
    messages.push(total.toString());

    if (option.parsentail && isBroken) {
      const msg = this.getBrokenText(total, option.parsentail, cmd);
      mainMsgs.push(msg);
      status = Status.Failure;
    } else if (option.parsentail) {
      const msg = this.getParsentailText(total, option.parsentail, cmd);
      mainMsgs.push(msg);
      status = total <= option.parsentail ? Status.Success : Status.Failure;
    }

    let mainMassage = mainMsgs.join("/");
    if (mainMassage != "") {
      messages.push(mainMassage);
    }

    return { total, dice, isSecret, status, actions, messages, mainMassage };
  }

  getParsentailText(total: number, parsentail: number, cmd: string): string {
    const [critical, fumble] = this.getCritical(cmd);
    const special = Math.floor(parsentail * 0.2);
    if (total <= parsentail) {
      if (total <= special) {
        if (total <= critical) {
          return "決定的成功/スペシャル";
        } else {
          return "スペシャル";
        }
      } else {
        if (total <= critical) {
          return "決定的成功";
        } else {
          return "成功";
        }
      }
    } else {
      if (total >= fumble) {
        return "致命的失敗";
      } else {
        return "失敗";
      }
    }
  }

  regist(rand: Random, cmd: string, diff: number) {
    const parsentail = diff * 5 + 50;

    if (parsentail <= 0) {
      return this.getAutoChecked(parsentail, "自動失敗", false);
    }

    if (parsentail >= 100) {
      return this.getAutoChecked(parsentail, "自動成功", true);
    }

    let result = newResult();
    result.total = rand.D100();
    result.dice = rand.dice;
    result.actions.push(`1D100<=${parsentail}`);

    result.mainMassage = this.getParsentailText(result.total, parsentail, cmd);
    result.messages.push(result.total.toString());
    result.messages.push(result.mainMassage);

    return result;
  }

  getAutoChecked(
    parsentail: number,
    message: string,
    isSuccess: boolean
  ): Result {
    let result = newResult();
    result.status = isSuccess ? Status.Success : Status.Failure;
    result.actions = [`1D100<=${parsentail}`];
    result.messages = [message];
    result.mainMassage = message;
    return result;
  }

  combination(
    rand: Random,
    cmd: string,
    parsentail1: number,
    parsentail2: number
  ): Result {
    let result = newResult();
    result.total = rand.D100();

    result.actions.push(`1D100<=${parsentail1},${parsentail2}`);

    const result1 = this.getParsentailText(result.total, parsentail1, cmd);
    const result2 = this.getParsentailText(result.total, parsentail2, cmd);

    if (result.total <= parsentail1 && result.total <= parsentail2) {
      result.mainMassage = "成功";
      result.status = Status.Success;
    } else if (result.total <= parsentail1 || result.total <= parsentail2) {
      result.mainMassage = "部分的成功";
      result.status = Status.Unknown;
    } else {
      result.mainMassage = "失敗";
      result.status = Status.Failure;
    }
    result.messages.push(`${result.total}[${result1},${result2}]`);
    result.messages.push(result.mainMassage);

    return result;
  }

  getBrokenText(total: number, parsentail: number, cmd: string): string {
    const [, fumble] = this.getCritical(cmd);
    if (fumble <= total) {
      if (total <= parsentail) {
        return "故障";
      } else {
        return "致命的失敗/故障";
      }
    } else {
      return "故障";
    }
  }

  getCritical(cmd: string): [number, number] {
    let critical, fumble;
    if (cmd.endsWith("B")) {
      critical = 5;
      fumble = 96;
    } else {
      critical = 1;
      fumble = 100;
    }

    return [critical, fumble];
  }
}

interface skillCheckOption {
  parsentail?: number;
  brokenNumber?: number;
}
