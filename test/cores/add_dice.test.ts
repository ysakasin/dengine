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
  expect(res).toStrictEqual({
    total: 83,
    mainMassage: "83",
    status: Status.Unknown,
    process: ["1D100", "83[83]", "83"],
    isSecret: false,
    dice: [{ faces: 100, value: 83 }]
  });
});

test("D100", () => {
  const randMock = new RandomMock("83/100");
  const input = "D100";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 83,
    mainMassage: "83",
    status: Status.Unknown,
    process: ["1D100", "83[83]", "83"],
    isSecret: false,
    dice: [{ faces: 100, value: 83 }]
  });
});

test("1D6 + 2D3", () => {
  const randMock = new RandomMock("4/6", "1/3", "3/3");
  const input = "1D6 + 2D3";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 8,
    mainMassage: "8",
    status: Status.Unknown,
    process: ["1D6 + 2D3", "4[4] + 4[1,3]", "8"],
    isSecret: false,
    dice: [
      { faces: 6, value: 4 },
      { faces: 3, value: 1 },
      { faces: 3, value: 3 }
    ]
  });
});

test("1D6 + 2", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 + 2";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 7,
    mainMassage: "7",
    status: Status.Unknown,
    process: ["1D6 + 2", "5[5] + 2", "7"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }]
  });
});

test("1D6 - 2", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 - 2";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "3",
    status: Status.Unknown,
    process: ["1D6 - 2", "5[5] - 2", "3"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }]
  });
});

test("1D6 + 2 >= 4", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 + 2 >= 4";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 7,
    mainMassage: "成功",
    status: Status.Success,
    process: ["1D6 + 2 >= 4", "5[5] + 2 >= 4", "7", "成功"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }]
  });
});

test("1D6 + 2 < 1 + 4", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6 + 2 < 1 + 4";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 7,
    mainMassage: "失敗",
    status: Status.Failure,
    process: ["1D6 + 2 < 5", "5[5] + 2 < 5", "7", "失敗"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }]
  });
});

test("1D6 + 1 + 2D3", () => {
  const randMock = new RandomMock("4/6", "1/3", "3/3");
  const input = "1D6 + 1 + 2D3";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage: "9",
    status: Status.Unknown,
    process: ["1D6 + 1 + 2D3", "4[4] + 1 + 4[1,3]", "9"],
    isSecret: false,
    dice: [
      { faces: 6, value: 4 },
      { faces: 3, value: 1 },
      { faces: 3, value: 3 }
    ]
  });
});

test("Div floor", () => {
  const randMock = new RandomMock("3/6");
  const input = "1D6/2";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "1",
    status: Status.Unknown,
    process: ["1D6 / 2", "3[3] / 2", "1"],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }]
  });
});

test("Div ceil", () => {
  const randMock = new RandomMock("3/6");
  const input = "1D6/2U";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "2",
    status: Status.Unknown,
    process: ["1D6 / 2U", "3[3] / 2U", "2"],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }]
  });
});

test("Div round upper case", () => {
  const randMock = new RandomMock("5/6");
  const input = "1D6/3R";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "2",
    status: Status.Unknown,
    process: ["1D6 / 3R", "5[5] / 3R", "2"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }]
  });
});

test("Div round down case", () => {
  const randMock = new RandomMock("4/6");
  const input = "1D6/3R";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "1",
    status: Status.Unknown,
    process: ["1D6 / 3R", "4[4] / 3R", "1"],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }]
  });
});

test("(1 + 1)D(2 + 4)", () => {
  const randMock = new RandomMock("2/6", "1/6");
  const input = "(1 + 1)D(2 + 4)";

  const res = rollAddDice(randMock, input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "3",
    status: Status.Unknown,
    process: ["2D6", "3[2,1]", "3"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 1 }]
  });
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
