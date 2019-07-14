import RandomMock from "../rand_mock";
import addDice from "../../src/cores/add_dice";
import Lexer from "../../src/lexer";
import { Status } from "../../src/interface";

function rollAddDice(rand: RandomMock, input: string) {
  const lexer = new Lexer(input);
  return addDice(rand, lexer.lex());
}

test("1D100", () => {
  const randMock = new RandomMock("83/100");
  const input = "1D100";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(83);
  expect(res!.mainMassage).toBe("83");
  expect(res!.status).toBe(Status.Unknown);
  expect(res!.process).toStrictEqual(["1D100", "83[83]", "83"]);
  expect(res!.isSecret).toBe(false);
});

test("D100", () => {
  const randMock = new RandomMock("83/100");
  const input = "D100";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(83);
  expect(res!.mainMassage).toBe("83");
  expect(res!.status).toBe(Status.Unknown);
  expect(res!.process).toStrictEqual(["1D100", "83[83]", "83"]);
  expect(res!.isSecret).toBe(false);
});

test("1D6 + 2D3", () => {
  const randMock = new RandomMock("4/6", "1/3", "3/3");
  const input = "1D6 + 2D3";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(8);
  expect(res!.mainMassage).toBe("8");
  expect(res!.status).toBe(Status.Unknown);
  expect(res!.process).toStrictEqual(["1D6 + 2D3", "4[4] + 4[1,3]", "8"]);
  expect(res!.isSecret).toBe(false);
});

test("1D6 + 2", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 + 2";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(7);
  expect(res!.mainMassage).toBe("7");
  expect(res!.status).toBe(Status.Unknown);
  expect(res!.process).toStrictEqual(["1D6 + 2", "5[5] + 2", "7"]);
  expect(res!.isSecret).toBe(false);
});

test("1D6 - 2", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 - 2";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(3);
  expect(res!.mainMassage).toBe("3");
  expect(res!.status).toBe(Status.Unknown);
  expect(res!.process).toStrictEqual(["1D6 - 2", "5[5] - 2", "3"]);
  expect(res!.isSecret).toBe(false);
});

test("1D6 + 2 >= 4", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 + 2 >= 4";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(7);
  expect(res!.mainMassage).toBe("成功");
  expect(res!.status).toBe(Status.Success);
  expect(res!.process).toStrictEqual([
    "1D6 + 2 >= 4",
    "5[5] + 2 >= 4",
    "7",
    "成功"
  ]);
  expect(res!.isSecret).toBe(false);
});

test("1D6 + 2 < 1 + 4", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 + 2 < 1 + 4";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(7);
  expect(res!.mainMassage).toBe("失敗");
  expect(res!.status).toBe(Status.Failure);
  expect(res!.process).toStrictEqual([
    "1D6 + 2 < 5",
    "5[5] + 2 < 5",
    "7",
    "失敗"
  ]);
  expect(res!.isSecret).toBe(false);
});

test("1D6 + 1 + 2D3", () => {
  const randMock = new RandomMock("4/6", "1/3", "3/3");
  const input = "1D6 + 1 + 2D3";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(9);
  expect(res!.mainMassage).toBe("9");
  expect(res!.status).toBe(Status.Unknown);
  expect(res!.process).toStrictEqual([
    "1D6 + 1 + 2D3",
    "4[4] + 1 + 4[1,3]",
    "9"
  ]);
  expect(res!.isSecret).toBe(false);
});

test("(1 + 1)D(2 + 4)", () => {
  const randMock = new RandomMock("2/6", "1/6");
  const input = "(1 + 1)D(2 + 4)";

  const res = rollAddDice(randMock, input);
  expect(res).not.toBeNull();
  expect(res!.total).toBe(3);
  expect(res!.mainMassage).toBe("3");
  expect(res!.status).toBe(Status.Unknown);
  expect(res!.process).toStrictEqual(["2D6", "3[2,1]", "3"]);
  expect(res!.isSecret).toBe(false);
});

test("Nested diceroll on unary D must be falied", () => {
  const randMock = new RandomMock();
  const input = "(1D1)D(2 + 4)";

  const res = rollAddDice(randMock, input);
  expect(res).toBeNull();
});

test("Nested diceroll on unary D must be falied", () => {
  const randMock = new RandomMock();
  const input = "D(2D4)";

  const res = rollAddDice(randMock, input);
  expect(res).toBeNull();
});

test("Right-hand side dice literal is invalid", () => {
  const randMock = new RandomMock();
  const input = "1D6 <= 2D6";

  const res = rollAddDice(randMock, input);
  expect(res).toBeNull();
});

test("Invalid case returns null", () => {
  const randMock = new RandomMock();
  const input = "1RU6";

  const res = rollAddDice(randMock, input);
  expect(res).toBeNull();
});
