import { Result, Status } from "./interface";

export function getFullText(result: Result | null) {
  if (result == null) {
    return "";
  }
  return result.process.join(" ＞ ");
}

export function newResult(): Result {
  return {
    dice: [],
    total: 0,
    isSecret: false,
    status: Status.Unknown,
    process: [],
    mainMassage: ""
  };
}
