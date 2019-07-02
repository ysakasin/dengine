import Cthulhu from "../../src/plugins/cthulhu";
import Lexer from "../../src/lexer";
import RandomMock from "../rand_mock";
import { getFullText } from "../../src/helper";

let plugin = new Cthulhu();

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("83/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 83 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("1/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 1 ＞ 決定的成功/スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("29/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 29 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("72/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 72 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("98/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 98 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("97/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 97 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("87/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 87 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("63/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 63 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("39/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 39 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-10) 1%", () => {
  let randMock = new RandomMock("11/100");
  const input = "RES(12-10)";
  const expected = "1D100<=60 ＞ 11 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1%", () => {
  let randMock = new RandomMock("90/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 90 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1%", () => {
  let randMock = new RandomMock("38/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 38 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1%", () => {
  let randMock = new RandomMock("78/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 78 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1%", () => {
  let randMock = new RandomMock("39/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 39 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1%", () => {
  let randMock = new RandomMock("71/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 71 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1%", () => {
  let randMock = new RandomMock("4/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 4 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1%", () => {
  let randMock = new RandomMock("45/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 45 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1% 80", () => {
  let randMock = new RandomMock("80/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 80 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1% 13", () => {
  let randMock = new RandomMock("13/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 13 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(10-15) 1% 16", () => {
  let randMock = new RandomMock("16/100");
  const input = "RES(10-15)";
  const expected = "1D100<=25 ＞ 16 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(70,30) 1% 30", () => {
  let randMock = new RandomMock("30/100");
  const input = "CBR(70,30)";
  const expected = "1D100<=70,30 ＞ 30[成功,成功] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(70,30) 1% 50", () => {
  let randMock = new RandomMock("50/100");
  const input = "CBR(70,30)";
  const expected = "1D100<=70,30 ＞ 50[成功,失敗] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(10,90) 1% 30", () => {
  let randMock = new RandomMock("30/100");
  const input = "CBR(10,90)";
  const expected = "1D100<=10,90 ＞ 30[失敗,成功] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(70,30) 1% 71", () => {
  let randMock = new RandomMock("71/100");
  const input = "CBR(70,30)";
  const expected = "1D100<=70,30 ＞ 71[失敗,失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(70,30) 1%", () => {
  let randMock = new RandomMock("5/100");
  const input = "CBR(70,30)";
  const expected = "1D100<=70,30 ＞ 5[スペシャル,スペシャル] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(25,20) 1%", () => {
  let randMock = new RandomMock("5/100");
  const input = "CBR(25,20)";
  const expected = "1D100<=25,20 ＞ 5[スペシャル,成功] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(70,30) 1%", () => {
  let randMock = new RandomMock("1/100");
  const input = "CBR(70,30)";
  const expected =
    "1D100<=70,30 ＞ 1[決定的成功/スペシャル,決定的成功/スペシャル] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(25,20) 1%", () => {
  let randMock = new RandomMock("1/100");
  const input = "CBR(25,20)";
  const expected =
    "1D100<=25,20 ＞ 1[決定的成功/スペシャル,決定的成功/スペシャル] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(25,1) 1%", () => {
  let randMock = new RandomMock("5/100");
  const input = "CBR(25,1)";
  const expected = "1D100<=25,1 ＞ 5[スペシャル,失敗] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(90,99) 1%", () => {
  let randMock = new RandomMock("96/100");
  const input = "CBR(90,99)";
  const expected = "1D100<=90,99 ＞ 96[失敗,成功] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(90,95) 1%", () => {
  let randMock = new RandomMock("96/100");
  const input = "CBR(90,95)";
  const expected = "1D100<=90,95 ＞ 96[失敗,失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(90,99) 1%", () => {
  let randMock = new RandomMock("100/100");
  const input = "CBR(90,99)";
  const expected = "1D100<=90,99 ＞ 100[致命的失敗,致命的失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(90,95) 1%", () => {
  let randMock = new RandomMock("100/100");
  const input = "CBR(90,95)";
  const expected = "1D100<=90,95 ＞ 100[致命的失敗,致命的失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%) ##################", () => {
  let randMock = new RandomMock("98/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 98 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (99) (1%)", () => {
  let randMock = new RandomMock("99/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 99 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (100) (1%)", () => {
  let randMock = new RandomMock("100/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 100 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("45/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 45 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("56/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 56 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("62/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 62 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("70/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 70 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("78/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 78 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("84/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 84 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("51/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 51 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("20/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 20 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=10 (1%)", () => {
  let randMock = new RandomMock("76/100");
  const input = "CC<=10";
  const expected = "1D100<=10 ＞ 76 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("43/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 43 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("24/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 24 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("25/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 25 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("75/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 75 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("71/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 71 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("78/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 78 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("14/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 14 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("61/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 61 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("27/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 27 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=90 (1%)", () => {
  let randMock = new RandomMock("37/100");
  const input = "CC<=90";
  const expected = "1D100<=90 ＞ 37 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("65/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 65 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("6/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 6 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("42/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 42 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("7/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 7 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("2/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 2 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("1/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 1 ＞ 決定的成功/スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("73/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 73 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("72/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 72 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("46/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 46 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("37/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 37 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=50 (1%)", () => {
  let randMock = new RandomMock("6/100");
  const input = "CC<=50";
  const expected = "1D100<=50 ＞ 6 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%) ##################", () => {
  let randMock = new RandomMock("98/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 98 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (99) (5%)", () => {
  let randMock = new RandomMock("99/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 99 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (100) (5%)", () => {
  let randMock = new RandomMock("100/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 100 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("45/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 45 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("56/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 56 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("62/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 62 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("70/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 70 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("78/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 78 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("84/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 84 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("51/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 51 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("20/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 20 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=10 (5%)", () => {
  let randMock = new RandomMock("76/100");
  const input = "CCB<=10";
  const expected = "1D100<=10 ＞ 76 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("43/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 43 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("24/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 24 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("25/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 25 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("75/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 75 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("71/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 71 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("78/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 78 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("14/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 14 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("61/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 61 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("27/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 27 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=90 (5%)", () => {
  let randMock = new RandomMock("37/100");
  const input = "CCB<=90";
  const expected = "1D100<=90 ＞ 37 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("65/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 65 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("6/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 6 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("42/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 42 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("7/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 7 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("2/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 2 ＞ 決定的成功/スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("1/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 1 ＞ 決定的成功/スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("73/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 73 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("72/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 72 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("46/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 46 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("37/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 37 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=50 (5%)", () => {
  let randMock = new RandomMock("6/100");
  const input = "CCB<=50";
  const expected = "1D100<=50 ＞ 6 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("83/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 83 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("1/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 1 ＞ 決定的成功/スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("29/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 29 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("72/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 72 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("98/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 98 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("97/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 97 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("87/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 87 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("63/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 63 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("39/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 39 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(12-10) (5%)", () => {
  let randMock = new RandomMock("11/100");
  const input = "RESB(12-10)";
  const expected = "1D100<=60 ＞ 11 ＞ スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("90/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 90 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("38/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 38 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("78/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 78 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("39/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 39 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("71/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 71 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("4/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 4 ＞ 決定的成功/スペシャル";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("45/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 45 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("80/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 80 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("13/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 13 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RESB(10-15) (5%)", () => {
  let randMock = new RandomMock("16/100");
  const input = "RESB(10-15)";
  const expected = "1D100<=25 ＞ 16 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(70,30) (5%)", () => {
  let randMock = new RandomMock("30/100");
  const input = "CBRB(70,30)";
  const expected = "1D100<=70,30 ＞ 30[成功,成功] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(70,30) (5%)", () => {
  let randMock = new RandomMock("50/100");
  const input = "CBRB(70,30)";
  const expected = "1D100<=70,30 ＞ 50[成功,失敗] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(10,90) (5%)", () => {
  let randMock = new RandomMock("30/100");
  const input = "CBRB(10,90)";
  const expected = "1D100<=10,90 ＞ 30[失敗,成功] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(70,30) (5%)", () => {
  let randMock = new RandomMock("71/100");
  const input = "CBRB(70,30)";
  const expected = "1D100<=70,30 ＞ 71[失敗,失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(70,30) (5%)", () => {
  let randMock = new RandomMock("5/100");
  const input = "CBRB(70,30)";
  const expected =
    "1D100<=70,30 ＞ 5[決定的成功/スペシャル,決定的成功/スペシャル] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(25,20) (5%)", () => {
  let randMock = new RandomMock("5/100");
  const input = "CBRB(25,20)";
  const expected =
    "1D100<=25,20 ＞ 5[決定的成功/スペシャル,決定的成功] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(25,1) (5%)", () => {
  let randMock = new RandomMock("5/100");
  const input = "CBRB(25,1)";
  const expected = "1D100<=25,1 ＞ 5[決定的成功/スペシャル,失敗] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(90,99) (5%)", () => {
  let randMock = new RandomMock("96/100");
  const input = "CBRB(90,99)";
  const expected = "1D100<=90,99 ＞ 96[致命的失敗,成功] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(90,95) (5%)", () => {
  let randMock = new RandomMock("96/100");
  const input = "CBRB(90,95)";
  const expected = "1D100<=90,95 ＞ 96[致命的失敗,致命的失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC<=(68+30) (1%) 計算込み", () => {
  let randMock = new RandomMock("99/100");
  const input = "CC<=(68+30)";
  const expected = "1D100<=98 ＞ 99 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB<=(68+30) (5%) 計算込み", () => {
  let randMock = new RandomMock("99/100");
  const input = "CCB<=(68+30)";
  const expected = "1D100<=98 ＞ 99 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB>=(68+12) (5%) 1D100代替（不等号違いにより判定なし）", () => {
  let randMock = new RandomMock("11/100");
  const input = "CCB>=(68+12)";
  const expected = "1D100 ＞ 11";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC (1%) 1D100単純置換", () => {
  let randMock = new RandomMock("60/100");
  const input = "CC";
  const expected = "1D100 ＞ 60";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB (5%) 1D100単純置換", () => {
  let randMock = new RandomMock("61/100");
  const input = "CCB";
  const expected = "1D100 ＞ 61";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("SCC<=25 (1%) シークレット", () => {
  let randMock = new RandomMock("5/100");
  const input = "SCC<=25";
  const expected = "1D100<=25 ＞ 5 ＞ スペシャル###secret dice###";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("SCCB<=25 (5%) シークレット", () => {
  let randMock = new RandomMock("5/100");
  const input = "SCCB<=25";
  const expected = "1D100<=25 ＞ 5 ＞ 決定的成功/スペシャル###secret dice###";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC(94)<=98 (1%) 故障ナンバー：故障1", () => {
  let randMock = new RandomMock("97/100");
  const input = "CC(94)<=98";
  const expected = "1D100<=98 ＞ 故障ナンバー[94] ＞ 97 ＞ 故障";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC(94)<=98 (1%) 故障ナンバー：故障2", () => {
  let randMock = new RandomMock("99/100");
  const input = "CC(94)<=98";
  const expected = "1D100<=98 ＞ 故障ナンバー[94] ＞ 99 ＞ 故障";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC(94)<=98 (1%) 故障ナンバー：致命的失敗", () => {
  let randMock = new RandomMock("100/100");
  const input = "CC(94)<=98";
  const expected = "1D100<=98 ＞ 故障ナンバー[94] ＞ 100 ＞ 致命的失敗/故障";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB(98)<=80 (5%) 故障ナンバー：成功", () => {
  let randMock = new RandomMock("80/100");
  const input = "CCB(98)<=80";
  const expected = "1D100<=80 ＞ 故障ナンバー[98] ＞ 80 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB(98)<=80 (5%) 故障ナンバー：故障1", () => {
  let randMock = new RandomMock("96/100");
  const input = "CCB(98)<=80";
  const expected = "1D100<=80 ＞ 故障ナンバー[98] ＞ 96 ＞ 致命的失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB(98)<=80 (5%) 故障ナンバー：故障2", () => {
  let randMock = new RandomMock("99/100");
  const input = "CCB(98)<=80";
  const expected = "1D100<=80 ＞ 故障ナンバー[98] ＞ 99 ＞ 致命的失敗/故障";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB(98)<=80 (5%) 故障ナンバー：致命的失敗", () => {
  let randMock = new RandomMock("100/100");
  const input = "CCB(98)<=80";
  const expected = "1D100<=80 ＞ 故障ナンバー[98] ＞ 100 ＞ 致命的失敗/故障";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(50,80) (1%)", () => {
  let randMock = new RandomMock("20/100");
  const input = "CBR(50,80)";
  const expected = "1D100<=50,80 ＞ 20[成功,成功] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(10,80) (1%)", () => {
  let randMock = new RandomMock("10/100");
  const input = "CBR(10,80)";
  const expected = "1D100<=10,80 ＞ 10[成功,スペシャル] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(10,80) (1%)", () => {
  let randMock = new RandomMock("1/100");
  const input = "CBR(10,80)";
  const expected =
    "1D100<=10,80 ＞ 1[決定的成功/スペシャル,決定的成功/スペシャル] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(10,80) (1%)", () => {
  let randMock = new RandomMock("50/100");
  const input = "CBR(10,80)";
  const expected = "1D100<=10,80 ＞ 50[失敗,成功] ＞ 部分的成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(10,80) (1%)", () => {
  let randMock = new RandomMock("90/100");
  const input = "CBR(10,80)";
  const expected = "1D100<=10,80 ＞ 90[失敗,失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBR(10,80) (1%)", () => {
  let randMock = new RandomMock("100/100");
  const input = "CBR(10,80)";
  const expected = "1D100<=10,80 ＞ 100[致命的失敗,致命的失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(10,80) (5%)", () => {
  let randMock = new RandomMock("5/100");
  const input = "CBRB(10,80)";
  const expected =
    "1D100<=10,80 ＞ 5[決定的成功,決定的成功/スペシャル] ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CBRB(10,80) (5%)", () => {
  let randMock = new RandomMock("99/100");
  const input = "CBRB(10,80)";
  const expected = "1D100<=10,80 ＞ 99[致命的失敗,致命的失敗] ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CC(94)<=(60+38) (1%) 故障ナンバー：計算込み", () => {
  let randMock = new RandomMock("99/100");
  const input = "CC(94)<=(60+38)";
  const expected = "1D100<=98 ＞ 故障ナンバー[94] ＞ 99 ＞ 故障";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("CCB(94)<=(60+38) (5%) 故障ナンバー：計算込み", () => {
  let randMock = new RandomMock("99/100");
  const input = "CCB(94)<=(60+38)";
  const expected = "1D100<=98 ＞ 故障ナンバー[94] ＞ 99 ＞ 致命的失敗/故障";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-12) 0+50", () => {
  let randMock = new RandomMock("75/100");
  const input = "RES(12-12)";
  const expected = "1D100<=50 ＞ 75 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-7) 25+50", () => {
  let randMock = new RandomMock("75/100");
  const input = "RES(12-7)";
  const expected = "1D100<=75 ＞ 75 ＞ 成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-2) 50+50 自動成功", () => {
  let randMock = new RandomMock("");
  const input = "RES(12-2)";
  const expected = "1D100<=100 ＞ 自動成功";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-15) -15+50", () => {
  let randMock = new RandomMock("75/100");
  const input = "RES(12-15)";
  const expected = "1D100<=35 ＞ 75 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-21) -45+50", () => {
  let randMock = new RandomMock("75/100");
  const input = "RES(12-21)";
  const expected = "1D100<=5 ＞ 75 ＞ 失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});

test("RES(12-22) -50+50 自動失敗", () => {
  let randMock = new RandomMock("");
  const input = "RES(12-22)";
  const expected = "1D100<=0 ＞ 自動失敗";
  const res = plugin.roll(randMock, input, new Lexer(input).lex());
  expect(getFullText(res)).toBe(expected);
});
