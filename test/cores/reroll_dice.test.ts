import RandomMock from "../rand_mock";
import Random from "../../src/random";
import {rerollDiceWithException} from "../../src/cores/reroll_dice";
import Lexer from "../../src/lexer";
import { Status } from "../../src/interface";

function rollRerollDice(rand: Random, input: string) {
  const lexer = new Lexer(input);
  return rerollDiceWithException(rand, lexer.lex());
}

test("2R6>=4", () => {
  const randMock = new RandomMock("2/6", "4/6", "1/6");
  const input = "2R6>=4";

  const res = rollRerollDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "成功数1",
    status: Status.Unknown,
    process: ["2R6>=4", "2,4 + 1", "成功数1"],
    isSecret: false,
    dice: [
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 1 }
    ]
  });
});

test("(1 + 1)R(2*3)>=(5-1)", () => {
  const randMock = new RandomMock("2/6", "4/6", "1/6");
  const input = "(1 + 1)R(2 * 3)>=(5-1)";

  const res = rollRerollDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "成功数1",
    status: Status.Unknown,
    process: ["2R6>=4", "2,4 + 1", "成功数1"],
    isSecret: false,
    dice: [
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 1 }
    ]
  });
});

test("2R6>4", () => {
  const randMock = new RandomMock("2/6", "4/6");
  const input = "2R6>4";

  const res = rollRerollDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res).toStrictEqual({
    total: 0,
    mainMassage: "成功数0",
    status: Status.Unknown,
    process: ["2R6>4", "2,4", "成功数0"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 4 }]
  });
});

test("2R6<=2", () => {
  const randMock = new RandomMock("2/6", "4/6", "6/6");
  const input = "2R6<=2";

  const res = rollRerollDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "成功数1",
    status: Status.Unknown,
    process: ["2R6<=2", "2,4 + 6", "成功数1"],
    isSecret: false,
    dice: [
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 }
    ]
  });
});

test("2R6==4", () => {
  const randMock = new RandomMock("2/6", "4/6", "6/6");
  const input = "2R6==4";

  const res = rollRerollDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "成功数1",
    status: Status.Unknown,
    process: ["2R6==4", "2,4 + 6", "成功数1"],
    isSecret: false,
    dice: [
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 }
    ]
  });
});

test("Nested diceroll on R must be falied", () => {
  const randMock = new Random();
  const input = "(1R1)R(2 + 4) >= 6";

  expect(() => rollRerollDice(randMock, input)).toThrow();
});

test("unary R must be falied", () => {
  const randMock = new Random();
  const input = "R6 >= 6";

  expect(() => rollRerollDice(randMock, input)).toThrow();
});

test("No support add op", () => {
  const randMock = new Random();
  const input = "1R6 + 3 >= 6";

  expect(() => rollRerollDice(randMock, input)).toThrow();
});

test("Right-hand side dice literal is invalid", () => {
  const randMock = new RandomMock("4/6", "2/6");
  const input = "1R6 >= 4R6";

  const res = rollRerollDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "成功数1",
    status: Status.Unknown,
    process: ["1R6>=4", "4 + 2", "成功数1"],
    isSecret: false,
    dice: [
      { faces: 6, value: 4 },
      { faces: 6, value: 2 }
    ]
  });
});

test("Invalid case returns null", () => {
  const randMock = new Random();
  const input = "1RU6";

  expect(() => rollRerollDice(randMock, input)).toThrow();
});
