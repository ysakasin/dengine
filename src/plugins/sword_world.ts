import { Result, Status } from "../interface";
import Random from "../random";
import { check2D6 } from "../cores/specific_dice";

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
    return null;
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
