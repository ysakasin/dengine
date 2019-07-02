import { Result, Status } from "../interface";
import Random from "../random";
import { newResult } from "../helper";

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
        option.parsentail = parseInt(tokens[idx + 1]);
        idx += 2; // take ["<=", Number]
      }

      return this.skillCheck(rand, cmd, option);
    }

    if (cmd == "RES" || cmd == "RESB") {
      const a = parseInt(tokens[idx + 1]);
      const b = parseInt(tokens[idx + 3]);
      return this.regist(rand, cmd, a - b);
    } else if (cmd == "CBR" || cmd == "CBRB") {
    }
    return null;
  }

  skillCheck(rand: Random, cmd: string, option: skillCheckOption): Result {
    const [critical, fumble] = this.getCritical(cmd);
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

    if (option.brokenNumber) {
      actions.push(`故障ナンバー[${option.brokenNumber}]`);
    }

    // messages
    messages.push(total.toString());

    if (option.parsentail) {
      const msg = this.getParsentailText(
        total,
        option.parsentail,
        critical,
        fumble
      );
      mainMsgs.push(msg);
      status = total <= option.parsentail ? Status.Success : Status.Failure;
    }

    if (option.brokenNumber) {
      if (total >= option.brokenNumber) {
        const msg = "故障";
        mainMsgs.push(msg);
      }
    }

    let mainMassage = mainMsgs.join("/");
    if (mainMassage != "") {
      messages.push(mainMassage);
    }

    return { total, dice, isSecret, status, actions, messages, mainMassage };
  }

  getParsentailText(
    total: number,
    parsentail: number,
    critical: number,
    fumble: number
  ): string {
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
      return this.getAutoChecked(parsentail, "自動失敗");
    }

    if (parsentail > 100) {
      return this.getAutoChecked(parsentail, "自動成功");
    }

    const [critical, fumble] = this.getCritical(cmd);
    let result = newResult();
    result.total = rand.D100();
    result.dice = rand.dice;
    result.actions.push(`1D100<=${parsentail}`);

    result.mainMassage = this.getParsentailText(
      result.total,
      parsentail,
      critical,
      fumble
    );
    result.messages.push(result.total.toString());
    result.messages.push(result.mainMassage);

    return result;
  }

  getAutoChecked(parsentail: number, message: string): Result {
    let result = newResult();
    result.actions = [`1D100<=${parsentail}`];
    result.messages = [message];
    result.mainMassage = message;
    return result;
  }

  getCritical(cmd: string): [number, number] {
    let critical, fumble;
    if (cmd.endsWith("B")) {
      critical = 5;
      fumble = 96;
    } else {
      critical = 1;
      fumble = 99;
    }

    return [critical, fumble];
  }
}

interface skillCheckOption {
  parsentail?: number;
  brokenNumber?: number;
}
