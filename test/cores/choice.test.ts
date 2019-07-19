import RandomMock from "../rand_mock";
import choice from "../../src/cores/choice";
import Lexer from "../../src/lexer";
import { Status } from "../../src/interface";

function rollChoice(rand: RandomMock, input: string) {
  const lexer = new Lexer(input);
  return choice(rand, lexer.lex());
}

test("Two args", () => {
  const randMock = new RandomMock("1/2");
  const input = "choice[ sakata , sinji ]";

  const res = rollChoice(randMock, input);
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "sakata",
    status: Status.Unknown,
    process: ["choice[sakata, sinji]", "sakata"],
    isSecret: false,
    dice: [{ faces: 2, value: 1 }]
  });
});

test("Japanese", () => {
  const randMock = new RandomMock("2/2");
  const input = "choice[ 酒田 , シンジ ]";

  const res = rollChoice(randMock, input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "シンジ",
    status: Status.Unknown,
    process: ["choice[酒田, シンジ]", "シンジ"],
    isSecret: false,
    dice: [{ faces: 2, value: 2 }]
  });
});

test("Internal space", () => {
  const randMock = new RandomMock("4/6");
  const input =
    "choice[Reinhard von Lohengramm, Siegfried Kircheis, Oskar von Reuentahl, Yang Wen-li, Walter von Schönkopf, Alexandre Bewcock]";

  const res = rollChoice(randMock, input);
  expect(res).toStrictEqual({
    total: 4,
    mainMassage: "Yang Wen-li",
    status: Status.Unknown,
    process: [
      "choice[Reinhard von Lohengramm, Siegfried Kircheis, Oskar von Reuentahl, Yang Wen-li, Walter von Schönkopf, Alexandre Bewcock]",
      "Yang Wen-li"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }]
  });
});

test("No bracket", () => {
  const randMock = new RandomMock();
  const input = "choice";

  const res = rollChoice(randMock, input);
  expect(res).toBeNull();
});

test("No args", () => {
  const randMock = new RandomMock();
  const input = "choice[]";

  const res = rollChoice(randMock, input);
  expect(res).toBeNull();
});

test("Only one arg", () => {
  const randMock = new RandomMock();
  const input = "choice[ysakasin]";

  const res = rollChoice(randMock, input);
  expect(res).toBeNull();
});
