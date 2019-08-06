import SwordWorld from "../../src/plugins/sword_world";
import RandomMock from "../rand_mock";
import { Plugin, Status } from "../../src/interface";
import Dengine from "../../src/dengine";

let plugin: Plugin = SwordWorld;
let dengine = new Dengine(plugin);

test("2d6>=4 自動的失敗", () => {
  let randMock = new RandomMock("1/6", "1/6");
  dengine.setRand(randMock);
  const input = "2D6>=4";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "自動的失敗",
    status: Status.Failure,
    process: ["2D6 >= 4", "2[1,1] >= 4", "2", "自動的失敗"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 1 }]
  });
});

test("2d6>=4 自動的失敗", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "2D6>=4";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage: "自動的成功",
    status: Status.Success,
    process: ["2D6 >= 4", "12[6,6] >= 4", "12", "自動的成功"],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("2d6>=4 成功", () => {
  let randMock = new RandomMock("2/6", "2/6");
  dengine.setRand(randMock);
  const input = "2D6>=4";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 4,
    mainMassage: "成功",
    status: Status.Success,
    process: ["2D6 >= 4", "4[2,2] >= 4", "4", "成功"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 2 }]
  });
});

test("2d6>=4 失敗", () => {
  let randMock = new RandomMock("2/6", "1/6");
  dengine.setRand(randMock);
  const input = "2D6>=4";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "失敗",
    status: Status.Failure,
    process: ["2D6 >= 4", "3[2,1] >= 4", "3", "失敗"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 1 }]
  });
});

test("2d6>=1 + 3 * 1 成功", () => {
  let randMock = new RandomMock("2/6", "2/6");
  dengine.setRand(randMock);
  const input = "2D6>=2 + 2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 4,
    mainMassage: "成功",
    status: Status.Success,
    process: ["2D6 >= 4", "4[2,2] >= 4", "4", "成功"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 2 }]
  });
});

test("K20", () => {
  let randMock = new RandomMock("2/6", "1/6");
  dengine.setRand(randMock);
  const input = "K20";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "1",
    status: Status.Unknown,
    process: ["KeyNo.20c[10]", "2D:[2,1]=3", "1"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 1 }]
  });
});

test("K20", () => {
  let randMock = new RandomMock("5/6", "5/6", "3/6", "6/6");
  dengine.setRand(randMock);
  const input = "K20";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 15,
    mainMassage: "15",
    status: Status.Unknown,
    process: ["KeyNo.20c[10]", "2D:[5,5 3,6]=10,9", "8,7", "1回転", "15"],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 }
    ]
  });
});

test("K10+5", () => {
  let randMock = new RandomMock("5/6", "3/6");
  dengine.setRand(randMock);
  const input = "K10+5";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage: "9",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]+5", "2D:[5,3]=8", "4+5", "9"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }, { faces: 6, value: 3 }]
  });
});

test("k30", () => {
  let randMock = new RandomMock("3/6", "6/6");
  dengine.setRand(randMock);
  const input = "k30";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage: "9",
    status: Status.Unknown,
    process: ["KeyNo.30c[10]", "2D:[3,6]=9", "9"],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }, { faces: 6, value: 6 }]
  });
});

test("k30", () => {
  let randMock = new RandomMock("1/6", "1/6");
  dengine.setRand(randMock);
  const input = "k30";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 0,
    mainMassage: "自動的失敗",
    status: Status.Unknown,
    process: ["KeyNo.30c[10]", "2D:[1,1]=2", "**", "自動的失敗"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 1 }]
  });
});

test("k30", () => {
  let randMock = new RandomMock("6/6", "6/6", "3/6", "6/6");
  dengine.setRand(randMock);
  const input = "k30";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 19,
    mainMassage: "19",
    status: Status.Unknown,
    process: ["KeyNo.30c[10]", "2D:[6,6 3,6]=12,9", "10,9", "1回転", "19"],
    isSecret: false,
    dice: [
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 }
    ]
  });
});

test("k10+10", () => {
  let randMock = new RandomMock("5/6", "3/6");
  dengine.setRand(randMock);
  const input = "k10+10";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 14,
    mainMassage: "14",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]+10", "2D:[5,3]=8", "4+10", "14"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }, { faces: 6, value: 3 }]
  });
});

test("k10+10", () => {
  let randMock = new RandomMock("5/6", "5/6", "1/6", "5/6");
  dengine.setRand(randMock);
  const input = "k10+10";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 18,
    mainMassage: "18",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]+10", "2D:[5,5 1,5]=10,6", "5,3+10", "1回転", "18"],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 }
    ]
  });
});

test("Sk10-1", () => {
  let randMock = new RandomMock("2/6", "6/6");
  dengine.setRand(randMock);
  const input = "Sk10-1";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "3",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]-1", "2D:[2,6]=8", "4-1", "3"],
    isSecret: true,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 6 }]
  });
});

test("Sk10-1", () => {
  let randMock = new RandomMock("4/6", "6/6", "5/6", "3/6");
  dengine.setRand(randMock);
  const input = "Sk10-1";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 8,
    mainMassage: "8",
    status: Status.Unknown,
    process: [
      "KeyNo.10c[10]-1",
      "2D:[4,6 5,3]=10,8",
      "5,4-1",
      "1回転",
      "8"
    ],
    isSecret: true,
    dice: [
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 }
    ]
  });
});

test("k10+5+2", () => {
  let randMock = new RandomMock("6/6", "3/6");
  dengine.setRand(randMock);
  const input = "k10+5+2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage: "12",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]+7", "2D:[6,3]=9", "5+7", "12"],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 3 }]
  });
});

test("k10+5+2", () => {
  let randMock = new RandomMock("1/6", "1/6");
  dengine.setRand(randMock);
  const input = "k10+5+2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 0,
    mainMassage: "自動的失敗",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]+7", "2D:[1,1]=2", "**", "自動的失敗"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 1 }]
  });
});

test("k10+5+2", () => {
  let randMock = new RandomMock("4/6", "6/6", "2/6", "4/6");
  dengine.setRand(randMock);
  const input = "k10+5+2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 15,
    mainMassage: "15",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]+7", "2D:[4,6 2,4]=10,6", "5,3+7", "1回転", "15"],
    isSecret: false,
    dice: [
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 2 },
      { faces: 6, value: 4 }
    ]
  });
});

test("K20[10]", () => {
  let randMock = new RandomMock("6/6", "4/6", "4/6", "4/6");
  dengine.setRand(randMock);
  const input = "K20[10]";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 14,
    mainMassage: "14",
    status: Status.Unknown,
    process: ["KeyNo.20c[10]", "2D:[6,4 4,4]=10,8", "8,6", "1回転", "14"],
    isSecret: false,
    dice: [
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 4 },
      { faces: 6, value: 4 }
    ]
  });
});

test("K20[10]", () => {
  let randMock = new RandomMock("4/6", "5/6");
  dengine.setRand(randMock);
  const input = "K20[10]";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 7,
    mainMassage: "7",
    status: Status.Unknown,
    process: ["KeyNo.20c[10]", "2D:[4,5]=9", "7"],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }, { faces: 6, value: 5 }]
  });
});

test("K20[10]", () => {
  let randMock = new RandomMock("1/6", "1/6");
  dengine.setRand(randMock);
  const input = "K20[10]";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 0,
    mainMassage: "自動的失敗",
    status: Status.Unknown,
    process: ["KeyNo.20c[10]", "2D:[1,1]=2", "**", "自動的失敗"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 1 }]
  });
});

test("K10+5[9]", () => {
  let randMock = new RandomMock("4/6", "4/6");
  dengine.setRand(randMock);
  const input = "K10+5[9]";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage: "9",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]+5", "2D:[4,4]=8", "4+5", "9"],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }, { faces: 6, value: 4 }]
  });
});

test("K10+5[9]", () => {
  let randMock = new RandomMock("3/6", "6/6", "3/6", "5/6");
  dengine.setRand(randMock);
  const input = "K10+5[9]";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 14,
    mainMassage: "14",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]+5", "2D:[3,6 3,5]=9,8", "5,4+5", "1回転", "14"],
    isSecret: false,
    dice: [
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 }
    ]
  });
});

test("k30[10]", () => {
  let randMock = new RandomMock("4/6", "2/6");
  dengine.setRand(randMock);
  const input = "k30[10]";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 6,
    mainMassage: "6",
    status: Status.Unknown,
    process: ["KeyNo.30c[10]", "2D:[4,2]=6", "6"],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }, { faces: 6, value: 2 }]
  });
});

test("k30[10]", () => {
  let randMock = new RandomMock("5/6", "6/6", "1/6", "5/6");
  dengine.setRand(randMock);
  const input = "k30[10]";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 16,
    mainMassage: "16",
    status: Status.Unknown,
    process: ["KeyNo.30c[10]", "2D:[5,6 1,5]=11,6", "10,6", "1回転", "16"],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 }
    ]
  });
});

test("k10[9]+10", () => {
  let randMock = new RandomMock("5/6", "3/6");
  dengine.setRand(randMock);
  const input = "k10[9]+10";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 14,
    mainMassage: "14",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]+10", "2D:[5,3]=8", "4+10", "14"],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }, { faces: 6, value: 3 }]
  });
});

test("k10[9]+10", () => {
  let randMock = new RandomMock("5/6", "4/6", "1/6", "4/6");
  dengine.setRand(randMock);
  const input = "k10[9]+10";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 17,
    mainMassage: "17",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]+10", "2D:[5,4 1,4]=9,5", "5,2+10", "1回転", "17"],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 4 },
      { faces: 6, value: 1 },
      { faces: 6, value: 4 }
    ]
  });
});

test("k10-5@9", () => {
  let randMock = new RandomMock("1/6", "6/6");
  dengine.setRand(randMock);
  const input = "k10-5@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: -2,
    mainMassage: "-2",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]-5", "2D:[1,6]=7", "3-5", "-2"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 6 }]
  });
});

test("k10-5@9", () => {
  let randMock = new RandomMock("6/6", "4/6", "5/6", "5/6", "3/6", "4/6");
  dengine.setRand(randMock);
  const input = "k10-5@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 8,
    mainMassage: "8",
    status: Status.Unknown,
    process: [
      "KeyNo.10c[9]-5",
      "2D:[6,4 5,5 3,4]=10,10,7",
      "5,5,3-5",
      "2回転",
      "8"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 4 }
    ]
  });
});

test("k10-5@9", () => {
  let randMock = new RandomMock("5/6", "6/6", "4/6", "1/6");
  dengine.setRand(randMock);
  const input = "k10-5@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "3",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]-5", "2D:[5,6 4,1]=11,5", "6,2-5", "1回転", "3"],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 1 }
    ]
  });
});

test("k10-5@9", () => {
  let randMock = new RandomMock("2/6", "6/6");
  dengine.setRand(randMock);
  const input = "k10-5@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: -1,
    mainMassage: "-1",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]-5", "2D:[2,6]=8", "4-5", "-1"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 6 }]
  });
});

test("K20$+1", () => {
  let randMock = new RandomMock("2/6", "6/6");
  dengine.setRand(randMock);
  const input = "K20$+1";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 7,
    mainMassage: "7",
    status: Status.Unknown,
    process: ["KeyNo.20c[10]m[+1]", "2D:[2,6]=9", "7"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 6 }]
  });
});

test("K20$+1", () => {
  let randMock = new RandomMock("2/6", "1/6");
  dengine.setRand(randMock);
  const input = "K20$+1";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "2",
    status: Status.Unknown,
    process: ["KeyNo.20c[10]m[+1]", "2D:[2,1]=4", "2"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 1 }]
  });
});

test("K10+5$9", () => {
  let randMock = new RandomMock("6/6", "2/6");
  dengine.setRand(randMock);
  const input = "K10+5$9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 10,
    mainMassage: "10",
    status: Status.Unknown,
    process: ["KeyNo.10c[10]m[9]+5", "2D:[6,2]=9", "5+5", "10"],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 2 }]
  });
});

test("k10-5@9$+2", () => {
  let randMock = new RandomMock("3/6", "3/6");
  dengine.setRand(randMock);
  const input = "k10-5@9$+2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: -1,
    mainMassage: "-1",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]m[+2]-5", "2D:[3,3]=8", "4-5", "-1"],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }, { faces: 6, value: 3 }]
  });
});

test("k10-5@9$+2", () => {
  let randMock = new RandomMock("1/6", "6/6", "2/6", "2/6");
  dengine.setRand(randMock);
  const input = "k10-5@9$+2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "1",
    status: Status.Unknown,
    process: ["KeyNo.10c[9]m[+2]-5", "2D:[1,6 2,2]=9,4", "5,1-5", "1回転", "1"],
    isSecret: false,
    dice: [
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 }
    ]
  });
});

test("k10-5@9$+2", () => {
  let randMock = new RandomMock(
    "6/6",
    "5/6",
    "3/6",
    "6/6",
    "6/6",
    "6/6",
    "1/6",
    "6/6"
  );
  dengine.setRand(randMock);
  const input = "k10-5@9$+2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 17,
    mainMassage: "17",
    status: Status.Unknown,
    process: [
      "KeyNo.10c[9]m[+2]-5",
      "2D:[6,5 3,6 6,6 1,6]=12,9,12,7",
      "7,5,7,3-5",
      "3回転",
      "17"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 }
    ]
  });
});

test("k10-5@9$+2", () => {
  let randMock = new RandomMock("3/6", "6/6", "5/6", "6/6", "5/6", "1/6");
  dengine.setRand(randMock);
  const input = "k10-5@9$+2";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 10,
    mainMassage: "10",
    status: Status.Unknown,
    process: [
      "KeyNo.10c[9]m[+2]-5",
      "2D:[3,6 5,6 5,1]=11,11,6",
      "6,6,3-5",
      "2回転",
      "10"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 }
    ]
  });
});

test("k10[9]+10$9", () => {
  let randMock = new RandomMock("5/6", "1/6", "3/6", "6/6", "5/6", "1/6");
  dengine.setRand(randMock);
  const input = "k10[9]+10$9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 23,
    mainMassage: "23",
    status: Status.Unknown,
    process: [
      "KeyNo.10c[9]m[9]+10",
      "2D:[5,1 3,6 5,1]=9,9,6",
      "5,5,3+10",
      "2回転",
      "23"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K25+6@3", () => {
  let randMock = new RandomMock(
    "5/6",
    "2/6",
    "1/6",
    "6/6",
    "4/6",
    "3/6",
    "6/6",
    "6/6",
    "6/6",
    "3/6",
    "2/6",
    "2/6",
    "3/6",
    "3/6",
    "2/6",
    "2/6",
    "2/6",
    "5/6",
    "1/6",
    "6/6",
    "4/6",
    "5/6",
    "3/6",
    "2/6",
    "3/6",
    "3/6",
    "3/6",
    "2/6",
    "5/6",
    "3/6",
    "1/6",
    "1/6"
  );
  dengine.setRand(randMock);
  const input = "K25+6@3";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 93,
    mainMassage: "93",
    status: Status.Unknown,
    process: [
      "KeyNo.25c[3]+6",
      "2D:[5,2 1,6 4,3 6,6 6,3 2,2 3,3 2,2 2,5 1,6 4,5 3,2 3,3 3,2 5,3 1,1]=7,7,7,12,9,4,6,4,7,7,9,5,6,5,8,2",
      "6,6,6,10,8,3,5,3,6,6,8,4,5,4,7,**+6",
      "15回転",
      "93"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 },
      { faces: 6, value: 2 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K25+6@3", () => {
  let randMock = new RandomMock("4/6", "6/6", "1/6", "1/6");
  dengine.setRand(randMock);
  const input = "K25+6@3";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 14,
    mainMassage: "14",
    status: Status.Unknown,
    process: ["KeyNo.25c[3]+6", "2D:[4,6 1,1]=10,2", "8,**+6", "1回転", "14"],
    isSecret: false,
    dice: [
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K25+6@3", () => {
  let randMock = new RandomMock(
    "2/6",
    "2/6",
    "1/6",
    "2/6",
    "1/6",
    "6/6",
    "4/6",
    "1/6",
    "6/6",
    "3/6",
    "1/6",
    "1/6"
  );
  dengine.setRand(randMock);
  const input = "K25+6@3";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 29,
    mainMassage: "29",
    status: Status.Unknown,
    process: [
      "KeyNo.25c[3]+6",
      "2D:[2,2 1,2 1,6 4,1 6,3 1,1]=4,3,7,5,9,2",
      "3,2,6,4,8,**+6",
      "5回転",
      "29"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K20+6@4", () => {
  let randMock = new RandomMock("1/6", "1/6");
  dengine.setRand(randMock);
  const input = "K20+6@4";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 0,
    mainMassage: "自動的失敗",
    status: Status.Unknown,
    process: ["KeyNo.20c[4]+6", "2D:[1,1]=2", "**", "自動的失敗"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 1 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("2/6", "2/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "2",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[2,2]=4", "2"],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 2 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("6/6", "4/6", "3/6", "5/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 10,
    mainMassage: "10",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[6,4 3,5]=10,8", "6,4", "1回転", "10"],
    isSecret: false,
    dice: [
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 }
    ]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("1/6", "6/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 4,
    mainMassage: "4",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[1,6]=7", "4"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 6 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("1/6", "4/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "3",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[1,4]=5", "3"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 4 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("4/6", "1/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "3",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[4,1]=5", "3"],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }, { faces: 6, value: 1 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("1/6", "2/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 1,
    mainMassage: "1",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[1,2]=3", "1"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 2 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("3/6", "2/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 3,
    mainMassage: "3",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[3,2]=5", "3"],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }, { faces: 6, value: 2 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("6/6", "2/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 4,
    mainMassage: "4",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[6,2]=8", "4"],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 2 }]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("3/6", "6/6", "3/6", "3/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage: "9",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[3,6 3,3]=9,6", "5,4", "1回転", "9"],
    isSecret: false,
    dice: [
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 }
    ]
  });
});

test("K14@9", () => {
  let randMock = new RandomMock("4/6", "4/6");
  dengine.setRand(randMock);
  const input = "K14@9";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 4,
    mainMassage: "4",
    status: Status.Unknown,
    process: ["KeyNo.14c[9]", "2D:[4,4]=8", "4"],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }, { faces: 6, value: 4 }]
  });
});

test("K9@3$12", () => {
  let randMock = new RandomMock(
    "4/6",
    "4/6",
    "4/6",
    "4/6",
    "2/6",
    "1/6",
    "6/6",
    "4/6",
    "5/6",
    "6/6",
    "6/6",
    "6/6",
    "6/6",
    "5/6",
    "2/6",
    "2/6",
    "1/6",
    "5/6",
    "5/6",
    "3/6",
    "2/6",
    "2/6",
    "3/6",
    "5/6",
    "6/6",
    "3/6",
    "5/6",
    "1/6",
    "1/6",
    "2/6",
    "2/6",
    "5/6",
    "6/6",
    "1/6",
    "5/6",
    "5/6",
    "4/6",
    "5/6",
    "6/6",
    "1/6",
    "5/6",
    "2/6",
    "6/6",
    "6/6",
    "3/6",
    "4/6",
    "1/6",
    "2/6",
    "1/6",
    "2/6",
    "2/6",
    "1/6",
    "1/6",
    "5/6",
    "2/6",
    "1/6",
    "4/6",
    "4/6",
    "6/6",
    "1/6",
    "1/6",
    "1/6"
  );
  dengine.setRand(randMock);
  const input = "K9@3$12";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 96,
    mainMassage: "96",
    status: Status.Unknown,
    process: [
      "KeyNo.9c[3]m[12]",
      "2D:[4,4 4,4 2,1 6,4 5,6 6,6 6,5 2,2 1,5 5,3 2,2 3,5 6,3 5,1 1,2 2,5 6,1 5,5 4,5 6,1 5,2 6,6 3,4 1,2 1,2 2,1 1,5 2,1 4,4 6,1 1,1]=12,8,3,10,11,12,11,4,6,8,4,8,9,6,3,7,7,10,9,7,7,12,7,3,3,3,6,3,8,7,2",
      "7,4,0,5,6,7,6,1,3,4,1,4,4,3,0,3,3,5,4,3,3,7,3,0,0,0,3,0,4,3,**",
      "30回転",
      "96"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 4 },
      { faces: 6, value: 4 },
      { faces: 6, value: 4 },
      { faces: 6, value: 4 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 4 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 4 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K9@3$12", () => {
  let randMock = new RandomMock("6/6", "2/6", "1/6", "1/6");
  dengine.setRand(randMock);
  const input = "K9@3$12";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 7,
    mainMassage: "7",
    status: Status.Unknown,
    process: ["KeyNo.9c[3]m[12]", "2D:[6,2 1,1]=12,2", "7,**", "1回転", "7"],
    isSecret: false,
    dice: [
      { faces: 6, value: 6 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K9@3+1$10", () => {
  let randMock = new RandomMock(
    "6/6",
    "1/6",
    "4/6",
    "5/6",
    "2/6",
    "5/6",
    "5/6",
    "4/6",
    "3/6",
    "5/6",
    "5/6",
    "3/6",
    "4/6",
    "6/6",
    "5/6",
    "3/6",
    "6/6",
    "5/6",
    "3/6",
    "6/6",
    "2/6",
    "1/6",
    "5/6",
    "3/6",
    "1/6",
    "3/6",
    "4/6",
    "2/6",
    "3/6",
    "3/6",
    "5/6",
    "2/6",
    "4/6",
    "2/6",
    "3/6",
    "1/6",
    "2/6",
    "5/6",
    "2/6",
    "1/6",
    "2/6",
    "4/6",
    "3/6",
    "3/6",
    "1/6",
    "4/6",
    "5/6",
    "5/6",
    "2/6",
    "2/6",
    "6/6",
    "6/6",
    "3/6",
    "3/6",
    "6/6",
    "2/6",
    "2/6",
    "5/6",
    "2/6",
    "3/6",
    "6/6",
    "5/6",
    "2/6",
    "1/6",
    "2/6",
    "6/6",
    "4/6",
    "5/6",
    "6/6",
    "6/6",
    "1/6",
    "6/6",
    "3/6",
    "6/6",
    "6/6",
    "1/6",
    "1/6",
    "1/6"
  );
  dengine.setRand(randMock);
  const input = "K9@3+1$10";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 129,
    mainMassage: "129",
    status: Status.Unknown,
    process: [
      "KeyNo.9c[3]m[10]+1",
      "2D:[6,1 4,5 2,5 5,4 3,5 5,3 4,6 5,3 6,5 3,6 2,1 5,3 1,3 4,2 3,3 5,2 4,2 3,1 2,5 2,1 2,4 3,3 1,4 5,5 2,2 6,6 3,3 6,2 2,5 2,3 6,5 2,1 2,6 4,5 6,6 1,6 3,6 6,1 1,1]=10,9,7,9,8,8,10,8,11,9,3,8,4,6,6,7,6,4,7,3,6,6,5,10,4,12,6,8,7,5,11,3,8,9,12,7,9,7,2",
      "5,4,3,4,4,4,5,4,6,4,0,4,1,3,3,3,3,1,3,0,3,3,2,5,1,7,3,4,3,2,6,0,4,4,7,3,4,3,**+1",
      "38回転",
      "129"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 4 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 },
      { faces: 6, value: 3 },
      { faces: 6, value: 1 },
      { faces: 6, value: 3 },
      { faces: 6, value: 4 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 },
      { faces: 6, value: 1 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 3 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K9@3+1$10", () => {
  let randMock = new RandomMock("3/6", "4/6", "6/6", "2/6", "1/6", "1/6");
  dengine.setRand(randMock);
  const input = "K9@3+1$10";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 10,
    mainMassage: "10",
    status: Status.Unknown,
    process: [
      "KeyNo.9c[3]m[10]+1",
      "2D:[3,4 6,2 1,1]=10,8,2",
      "5,4,**+1",
      "2回転",
      "10"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 3 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});

test("K9@3-1$12", () => {
  let randMock = new RandomMock(
    "5/6",
    "2/6",
    "3/6",
    "5/6",
    "4/6",
    "2/6",
    "1/6",
    "3/6",
    "5/6",
    "5/6",
    "2/6",
    "2/6",
    "2/6",
    "4/6",
    "3/6",
    "4/6",
    "3/6",
    "5/6",
    "6/6",
    "5/6",
    "2/6",
    "4/6",
    "6/6",
    "6/6",
    "2/6",
    "4/6",
    "5/6",
    "1/6",
    "3/6",
    "3/6",
    "1/6",
    "3/6",
    "4/6",
    "2/6",
    "1/6",
    "2/6",
    "4/6",
    "1/6",
    "6/6",
    "6/6",
    "4/6",
    "2/6",
    "3/6",
    "1/6",
    "3/6",
    "5/6",
    "6/6",
    "5/6",
    "5/6",
    "1/6",
    "3/6",
    "2/6",
    "5/6",
    "5/6",
    "1/6",
    "6/6",
    "5/6",
    "1/6",
    "5/6",
    "1/6",
    "5/6",
    "2/6",
    "3/6",
    "4/6",
    "6/6",
    "6/6",
    "6/6",
    "5/6",
    "2/6",
    "1/6",
    "4/6",
    "4/6",
    "6/6",
    "1/6",
    "1/6",
    "1/6"
  );
  dengine.setRand(randMock);
  const input = "K9@3-1$12";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 127,
    mainMassage: "127",
    status: Status.Unknown,
    process: [
      "KeyNo.9c[3]m[12]-1",
      "2D:[5,2 3,5 4,2 1,3 5,5 2,2 2,4 3,4 3,5 6,5 2,4 6,6 2,4 5,1 3,3 1,3 4,2 1,2 4,1 6,6 4,2 3,1 3,5 6,5 5,1 3,2 5,5 1,6 5,1 5,1 5,2 3,4 6,6 6,5 2,1 4,4 6,1 1,1]=12,8,6,4,10,4,6,7,8,11,6,12,6,6,6,4,6,3,5,12,6,4,8,11,6,5,10,7,6,6,7,7,12,11,3,8,7,2",
      "7,4,3,1,5,1,3,3,4,6,3,7,3,3,3,1,3,0,2,7,3,1,4,6,3,2,5,3,3,3,3,3,7,6,0,4,3,**-1",
      "37回転",
      "127"
    ],
    isSecret: false,
    dice: [
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 4 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 3 },
      { faces: 6, value: 4 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 3 },
      { faces: 6, value: 3 },
      { faces: 6, value: 1 },
      { faces: 6, value: 3 },
      { faces: 6, value: 4 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 2 },
      { faces: 6, value: 4 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 4 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 1 },
      { faces: 6, value: 3 },
      { faces: 6, value: 5 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 3 },
      { faces: 6, value: 2 },
      { faces: 6, value: 5 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 },
      { faces: 6, value: 1 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 3 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 6 },
      { faces: 6, value: 5 },
      { faces: 6, value: 2 },
      { faces: 6, value: 1 },
      { faces: 6, value: 4 },
      { faces: 6, value: 4 },
      { faces: 6, value: 6 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 },
      { faces: 6, value: 1 }
    ]
  });
});
