import { Result, Dice, Status } from "../interface";
import Random from "../random";
import { sceanTable, Table } from "./shinobigami_tables";
import { newResult } from "../helper";
import { check2D6 } from "../cores/specific_dice";

const helpMessage: string = `
・ (無印)
  ・ST: シーン表
  ・FT: ファンブル表
  ・ET: 感情表
  ・WT: 変調表　WT／戦場表　BT／異形表　MT／ランダム特技決定表　RTT
　・(弐)都市シーン表　CST／館シーン表　　MST／出島シーン表　DST
　・(参)トラブルシーン表　TST／日常シーン表　NST／回想シーン表　KST
　・(死)東京シーン表　TKST／戦国シーン表　GST
　・(乱)戦国変調表　GWT
　・(リプレイ戦1〜2巻)学校シーン表　GAST／京都シーン表　KYST
　　　／神社仏閣シーン表　JBST
　・(怪)怪ファンブル表　KFT／怪変調表　KWT
　・（その他）秋空に雪舞えばシーン表　AKST／災厄シーン表　CLST
　　／出島EXシーン表　DXST／斜歯ラボシーン表　HLST
　　／夏の終わりシーン表　NTST／培養プラントシーン表　　PLST
　　・忍秘伝　　中忍試験シーン表　HC/滅びの塔シーン表　HT/影の街でシーン表　HK
　　/夜行列車シーン表　HY/病院シーン表　HO/龍動シーン表　HR/密室シーン表　HM/催眠シーン表　HS
`.trim();

export default {
  id: "SinobiGami",
  name: "シノビガミ",
  helpMessage,
  prefixes: Object.keys(sceanTable).concat("RTT", "MT"),

  roll(rand: Random, command: string, tokens: string[]): Result | null {
    const skillCheckResult = skillCheck(rand, tokens);
    if (skillCheckResult) {
      return skillCheckResult;
    }

    const cmd = tokens[0];
    let table = sceanTable[cmd];
    if (table) {
      if (table.type == "1D6") {
        return rollTable(rand, table, 1, 6);
      } else if (table.type == "2D6") {
        return rollTable(rand, table, 2, 6);
      }
    }

    if (cmd == "RTT") {
      return randomSkillTable(rand);
    }
    if (cmd == "MT") {
      return metamorphoseTable(rand);
    }
    return null;
  }
};

function rollTable(
  rand: Random,
  table: Table,
  times: number,
  faces: number
): Result {
  let result = newResult();
  result.total = rand.nDk(times, faces);
  result.dice = rand.dice;
  result.mainMassage = table.table[result.total - times];
  result.process.push(
    table.name,
    getDiceMessage(result.total, result.dice),
    result.mainMassage
  );
  return result;
}

function getDiceMessage(total: number, dice: Dice[]): string {
  const vals = dice.map(x => x.value);
  return `${total}[${vals.join(",")}]`;
}

function randomSkillTable(rand: Random) {
  const kindTable = [
    [
      "器術",
      [
        "絡繰術",
        "火術",
        "水術",
        "針術",
        "仕込み",
        "衣装術",
        "縄術",
        "登術",
        "拷問術",
        "壊器術",
        "掘削術"
      ]
    ],
    [
      "体術",
      [
        "騎乗術",
        "砲術",
        "手裏剣術",
        "手練",
        "身体操術",
        "歩法",
        "走法",
        "飛術",
        "骨法術",
        "刀術",
        "怪力"
      ]
    ],
    [
      "忍術",
      [
        "生存術",
        "潜伏術",
        "遁走術",
        "盗聴術",
        "腹話術",
        "隠形術",
        "変装術",
        "香術",
        "分身の術",
        "隠蔽術",
        "第六感"
      ]
    ],
    [
      "謀術",
      [
        "医術",
        "毒術",
        "罠術",
        "調査術",
        "詐術",
        "対人術",
        "遊芸",
        "九ノ一の術",
        "傀儡の術",
        "流言の術",
        "経済力"
      ]
    ],
    [
      "戦術",
      [
        "兵糧術",
        "鳥獣術",
        "野戦術",
        "地の利",
        "意気",
        "用兵術",
        "記憶術",
        "見敵術",
        "暗号術",
        "伝達術",
        "人脈"
      ]
    ],
    [
      "妖術",
      [
        "異形化",
        "召喚術",
        "死霊術",
        "結界術",
        "封術",
        "言霊術",
        "幻術",
        "瞳術",
        "千里眼の術",
        "憑依術",
        "呪術"
      ]
    ]
  ];
  const kindDice = rand.D6();
  const [kind, skillTable] = kindTable[kindDice - 1];
  const skillDice = rand.nDk(2, 6);
  const skill = skillTable[skillDice - 2];

  let result = newResult();
  result.process.push("ランダム指定特技表");
  result.dice = rand.dice;
  result.mainMassage = `『${kind}』${skill}`;
  result.process.push(
    `${kindDice}, ${skillDice}[${rand.dice[1].value},${rand.dice[2].value}]`
  );
  result.process.push(result.mainMassage);
  return result;
}

function metamorphoseTable(rand: Random): Result {
  const table = [
    "1D6を振り、「妖魔忍法表A」で、ランダムに忍法の種類を決定する。妖魔化している間、その妖魔忍法を修得しているものとして扱う。この異形は、違う種類の妖魔忍法である限り、違う異形として扱う。",
    "1D6を振り、「妖魔忍法表B」で、ランダムに忍法の種類を決定する。妖魔化している間、その妖魔忍法を修得しているものとして扱う。この異形は、違う種類の妖魔忍法である限り、違う異形として扱う。",
    "1D6を振り、「妖魔忍法表C」で、ランダムに忍法の種類を決定する。妖魔化している間、その妖魔忍法を修得しているものとして扱う。この異形は、違う種類の妖魔忍法である限り、違う異形として扱う。",
    "妖魔化している間、戦闘中、1ラウンドに使用できる忍法のコストが、自分のプロット値+3点になり、装備忍法の【揺音】を修得する。",
    "妖魔化している間、【接近戦攻撃】によって与える接近戦ダメージが2点になる。",
    "妖魔化している間、このキャラクターの攻撃に対する回避判定と、このキャラクターの奥義に対する奥義破り判定にマイナス1の修正がつく。"
  ];

  const firstDice = rand.D6();
  let result = newResult();
  result.process.push("異形表");

  result.mainMassage = table[firstDice - 1];
  result.process.push(firstDice.toString());
  result.process.push(result.mainMassage);

  if (firstDice <= 3) {
    const powerTables = [
      {
        name: "妖魔忍法表A",
        page: "(怪p.252)",
        table: [
          "【震々】",
          "【神隠】",
          "【夜雀】",
          "【猟犬】",
          "【逢魔時】",
          "【狂骨】"
        ]
      },
      {
        name: "妖魔忍法表B",
        page: "(怪p.253)",
        table: [
          "【野衾】",
          "【付喪神】",
          "【見越】",
          "【木魂】",
          "【鵺】",
          "【生剥】"
        ]
      },
      {
        name: "妖魔忍法表C",
        page: "(怪p.254)",
        table: [
          "【百眼】",
          "【呑口】",
          "【荒吐】",
          "【怨霊】",
          "【鬼火】",
          "【蛭子】"
        ]
      }
    ];

    const powerTable = powerTables[firstDice - 1];
    const secondDice = rand.D6();
    const text = powerTable.table[secondDice - 1] + powerTable.page;
    result.process.push(powerTable.name);
    result.process.push(secondDice.toString());
    result.process.push(text);
    result.mainMassage += " ＞ " + text;
  }

  result.dice = rand.dice;
  return result;
}

function skillCheck(rand: Random, tokens: string[]) {
  const ret = check2D6(">=", rand, tokens, (value, cond) => {
    if (value <= 2) {
      return ["ファンブル", Status.Failure];
    } else if (value >= 12) {
      return ["スペシャル(生命点1点か変調1つ回復)", Status.Success];
    } else if (value >= cond) {
      return ["成功", Status.Success];
    } else {
      return ["失敗", Status.Failure];
    }
  });
  return ret;
}
