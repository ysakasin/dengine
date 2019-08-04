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
