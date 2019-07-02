import { Result } from "./interface";

export function getFullText(result: Result | null) {
  if (result == null) {
    return "";
  }
  const msgs = result.actions.concat(result.messages);
  return msgs.join(" ＞ ");
}
