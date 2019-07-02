import { Result, Status } from "./interface";

export function getFullText(result: Result | null) {
  if (result == null) {
    return "";
  }
  const msgs = result.actions.concat(result.messages);
  return msgs.join(" ＞ ");
}

export function newResult(): Result {
  return {
    dice: [],
    total: 0,
    isSecret: false,
    status: Status.Unknown,
    actions: [],
    messages: [],
    mainMassage: ""
  };
}
