import { Result, Status } from "../interface";
import Random from "../random";
import { newResult } from "../helper";
import { parseArithmetic } from "../parser";

const helpMessage: string = `
c=クリティカル値 ／ f=ファンブル値 ／ s=スペシャル

1d100<=n    c・f・sすべてオフ（単純な数値比較判定のみ行います）

・cfs判定付き判定コマンド

CC	 1d100ロールを行う c=1、f=100
CCB  同上、c=5、f=96

例：CC<=80  （技能値80で行為判定。1%ルールでcf適用）
例：CCB<=55 （技能値55で行為判定。5%ルールでcf適用）

・組み合わせロールについて

CBR(x,y)	c=1、f=100
CBRB(x,y)	c=5、f=96

・抵抗表ロールについて
RES(x-y)	c=1、f=100
RESB(x-y)	c=5、f=96

※故障ナンバー判定

・CC(x) c=1、f=100
x=故障ナンバー。出目x以上が出た上で、ファンブルが同時に発生した場合、共に出力する（テキスト「ファンブル＆故障」）
ファンブルでない場合、成功・失敗に関わらずテキスト「故障」のみを出力する（成功・失敗を出力せず、上書きしたものを出力する形）

・CCB(x) c=5、f=96
同上
`.trim();

export default {
  id: "Cthulhu",
  name: "クトゥルフ",
  helpMessage,
  prefixes: ["CC", "CCB", "RES", "RESB", "CBR", "CBRB"],

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
        const arithmetic = parseArithmetic(tokens, idx + 1);
        if (arithmetic == null) {
          return null;
        }

        [idx, option.parsentail] = arithmetic;
      }

      return skillCheck(rand, cmd, option);
    }

    if (cmd == "RES" || cmd == "RESB") {
      const a = parseInt(tokens[idx + 1]);
      const b = parseInt(tokens[idx + 3]);
      return regist(rand, cmd, a - b);
    }

    if (cmd == "CBR" || cmd == "CBRB") {
      const a = parseInt(tokens[idx + 1]);
      const b = parseInt(tokens[idx + 3]);
      return combination(rand, cmd, a, b);
    }
    return null;
  }
};

function skillCheck(
  rand: Random,
  cmd: string,
  option: skillCheckOption
): Result {
  let result = newResult();

  result.total = rand.D100();
  result.dice = rand.dice;

  // actions
  const effect = option.parsentail ? `1D100<=${option.parsentail}` : "1D100";
  result.process.push(effect);

  let isBroken = false;
  if (option.brokenNumber) {
    result.process.push(`故障ナンバー[${option.brokenNumber}]`);
    isBroken = result.total >= option.brokenNumber;
  }

  // messages
  result.process.push(result.total.toString());

  let mainMsgs: string[] = [];
  if (option.parsentail && isBroken) {
    const msg = getBrokenText(result.total, option.parsentail, cmd);
    mainMsgs.push(msg);
    result.status = Status.Failure;
  } else if (option.parsentail) {
    const msg = getParsentailText(result.total, option.parsentail, cmd);
    mainMsgs.push(msg);
    result.status = result.total <= option.parsentail ? Status.Success : Status.Failure;
  }

  result.mainMassage = mainMsgs.join("/");
  if (result.mainMassage != "") {
    result.process.push(result.mainMassage);
  }

  return result
}

function getParsentailText(
  total: number,
  parsentail: number,
  cmd: string
): string {
  const [critical, fumble] = getCritical(cmd);
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

function regist(rand: Random, cmd: string, diff: number) {
  const parsentail = diff * 5 + 50;

  if (parsentail <= 0) {
    return getExactlyResult(parsentail, "自動失敗", false);
  }

  if (parsentail >= 100) {
    return getExactlyResult(parsentail, "自動成功", true);
  }

  let result = newResult();
  result.total = rand.D100();
  result.dice = rand.dice;
  result.mainMassage = getParsentailText(result.total, parsentail, cmd);

  result.process.push(`1D100<=${parsentail}`);
  result.process.push(result.total.toString());
  result.process.push(result.mainMassage);

  return result;
}

function getExactlyResult(
  parsentail: number,
  message: string,
  isSuccess: boolean
): Result {
  let result = newResult();
  result.status = isSuccess ? Status.Success : Status.Failure;
  result.process = [`1D100<=${parsentail}`, message];
  result.mainMassage = message;
  return result;
}

function combination(
  rand: Random,
  cmd: string,
  parsentail1: number,
  parsentail2: number
): Result {
  let result = newResult();
  result.total = rand.D100();

  result.process.push(`1D100<=${parsentail1},${parsentail2}`);

  const result1 = getParsentailText(result.total, parsentail1, cmd);
  const result2 = getParsentailText(result.total, parsentail2, cmd);

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
  result.process.push(`${result.total}[${result1},${result2}]`);
  result.process.push(result.mainMassage);

  return result;
}

function getBrokenText(total: number, parsentail: number, cmd: string): string {
  const [, fumble] = getCritical(cmd);
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

function getCritical(cmd: string): [number, number] {
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

interface skillCheckOption {
  parsentail?: number;
  brokenNumber?: number;
}
