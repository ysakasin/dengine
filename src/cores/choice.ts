import Random from "../random";
import { Result, Status } from "../interface";

export default function choice(rand: Random, tokens: string[]): Result | null {
  if (tokens[0] != "choice" || tokens.length < 2) {
    return null;
  }

  const arg = tokens[1];
  if (!arg.startsWith("[") || !arg.endsWith("]")) {
    return null;
  }

  const args = arg
    .slice(1, arg.length - 1)
    .split(",")
    .map(x => x.trim());
  if (args.length < 2) {
    return null;
  }

  const val = rand.D(args.length);
  const chosen = args[val - 1];

  const result: Result = {
    dice: rand.dice,
    total: val,
    mainMassage: chosen,
    process: [`choice[${args.join(", ")}]`, chosen],
    isSecret: false,
    status: Status.Unknown
  };
  return result;
}
