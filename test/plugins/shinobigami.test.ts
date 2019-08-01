import ShinobiGami from "../../src/plugins/shinobigami";
import RandomMock from "../rand_mock";
import { getFullText } from "../../src/helper";
import { Plugin, Status } from "../../src/interface";
import Dengine from "../../src/dengine";

let plugin: Plugin = ShinobiGami;
let dengine = new Dengine(plugin);

test("2d6>=4", () => {
  let randMock = new RandomMock("1/6", "1/6");
  dengine.setRand(randMock);
  const input = "2D6>=4";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "ファンブル",
    status: Status.Failure,
    process: ["2D6 >= 4", "2[1,1] >= 4", "2", "ファンブル"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 1 }]
  });
});

test("2d6>=3 + 1", () => {
  let randMock = new RandomMock("1/6", "1/6");
  dengine.setRand(randMock);
  const input = "2D6>= 3 + 1";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 2,
    mainMassage: "ファンブル",
    status: Status.Failure,
    process: ["2D6 >= 4", "2[1,1] >= 4", "2", "ファンブル"],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 1 }]
  });
});

test("2d6>=4", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "2D6>=4";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage: "スペシャル(生命点1点か変調1つ回復)",
    status: Status.Success,
    process: [
      "2D6 >= 4",
      "12[6,6] >= 4",
      "12",
      "スペシャル(生命点1点か変調1つ回復)"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("2d6 + 1 >= 4", () => {
  let randMock = new RandomMock();
  dengine.setRand(randMock);
  const input = "2D6 + 1>=4";
  const res = dengine.roll(input);
  expect(res).toBeNull();
});

test("ST", () => {
  let randMock = new RandomMock("4/6", "6/6");
  dengine.setRand(randMock);
  const input = "ST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 10,
    mainMassage:
      "大きな風が吹き荒ぶ。髪の毛や衣服が大きく揺れる。何かが起こりそうな予感……",
    status: Status.Unknown,
    process: [
      "シーン表",
      "10[4,6]",
      "大きな風が吹き荒ぶ。髪の毛や衣服が大きく揺れる。何かが起こりそうな予感……"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }, { faces: 6, value: 6 }]
  });
});

test("CST", () => {
  let randMock = new RandomMock("3/6", "6/6");
  dengine.setRand(randMock);
  const input = "CST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage:
      "商店街を歩く。人ごみに混じって、不穏な気配もちらほら感じるが……。",
    status: Status.Unknown,
    process: [
      "都市シーン表",
      "9[3,6]",
      "商店街を歩く。人ごみに混じって、不穏な気配もちらほら感じるが……。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }, { faces: 6, value: 6 }]
  });
});

test("MST", () => {
  let randMock = new RandomMock("5/6", "4/6");
  dengine.setRand(randMock);
  const input = "MST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage:
      "長い廊下の途中。この屋敷は広すぎて、迷子になってしまいそうだ。",
    status: Status.Unknown,
    process: [
      "館シーン表",
      "9[5,4]",
      "長い廊下の途中。この屋敷は広すぎて、迷子になってしまいそうだ。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }, { faces: 6, value: 4 }]
  });
});

test("DST", () => {
  let randMock = new RandomMock("1/6", "4/6");
  dengine.setRand(randMock);
  const input = "DST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 5,
    mainMassage:
      "スラム。かろうじて生き延びている人たちが肩を寄せ合い生きているようだ。ここなら辛うじて安心できるかも……。",
    status: Status.Unknown,
    process: [
      "出島シーン表",
      "5[1,4]",
      "スラム。かろうじて生き延びている人たちが肩を寄せ合い生きているようだ。ここなら辛うじて安心できるかも……。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 4 }]
  });
});

test("TST", () => {
  let randMock = new RandomMock("5/6", "1/6");
  dengine.setRand(randMock);
  const input = "TST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 6,
    mainMassage:
      "危機一髪！　同行者を死神の魔手から救い出す。……ここも油断できないな。",
    status: Status.Unknown,
    process: [
      "トラブルシーン表",
      "6[5,1]",
      "危機一髪！　同行者を死神の魔手から救い出す。……ここも油断できないな。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }, { faces: 6, value: 1 }]
  });
});

test("NST", () => {
  let randMock = new RandomMock("1/6", "5/6");
  dengine.setRand(randMock);
  const input = "NST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 6,
    mainMassage:
      "買い物帰りの友人と出会う。方向が同じなので、しばらく一緒に歩いていると、思わず会話が盛り上がる。",
    status: Status.Unknown,
    process: [
      "日常シーン表",
      "6[1,5]",
      "買い物帰りの友人と出会う。方向が同じなので、しばらく一緒に歩いていると、思わず会話が盛り上がる。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 1 }, { faces: 6, value: 5 }]
  });
});

test("KST", () => {
  let randMock = new RandomMock("3/6", "6/6");
  dengine.setRand(randMock);
  const input = "KST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage:
      "恐るべき一撃！　もう少しで命を落とすところだった……。しかし、あの技はいまだ見切れていない。",
    status: Status.Unknown,
    process: [
      "回想シーン表",
      "9[3,6]",
      "恐るべき一撃！　もう少しで命を落とすところだった……。しかし、あの技はいまだ見切れていない。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }, { faces: 6, value: 6 }]
  });
});

test("TKST", () => {
  let randMock = new RandomMock("4/6", "5/6");
  dengine.setRand(randMock);
  const input = "TKST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 9,
    mainMassage:
      "新宿都庁。摩天楼が林立するビル街の下、背広姿の人々が行き交う。",
    status: Status.Unknown,
    process: [
      "東京シーン表",
      "9[4,5]",
      "新宿都庁。摩天楼が林立するビル街の下、背広姿の人々が行き交う。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 4 }, { faces: 6, value: 5 }]
  });
});

test("GST", () => {
  let randMock = new RandomMock("5/6", "3/6");
  dengine.setRand(randMock);
  const input = "GST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 8,
    mainMassage:
      "街道沿いの宿場町。戦から逃げてきたらしい町人や、商売の種を探す商人、目つきの鋭い武士などが行き交い、賑わっている。",
    status: Status.Unknown,
    process: [
      "戦国シーン表",
      "8[5,3]",
      "街道沿いの宿場町。戦から逃げてきたらしい町人や、商売の種を探す商人、目つきの鋭い武士などが行き交い、賑わっている。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 5 }, { faces: 6, value: 3 }]
  });
});

test("GAST", () => {
  let randMock = new RandomMock("3/6", "3/6");
  dengine.setRand(randMock);
  const input = "GAST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 6,
    mainMassage: "校庭。体操服姿の生徒たちが走っている。",
    status: Status.Unknown,
    process: [
      "学校シーン表",
      "6[3,3]",
      "校庭。体操服姿の生徒たちが走っている。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 3 }, { faces: 6, value: 3 }]
  });
});

test("KYST", () => {
  let randMock = new RandomMock("2/6", "4/6");
  dengine.setRand(randMock);
  const input = "KYST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 6,
    mainMassage:
      "京都はどこにでもおみやげ物屋があるなぁ。さて、あいつに何を買ってやるべきか……？",
    status: Status.Unknown,
    process: [
      "京都シーン表",
      "6[2,4]",
      "京都はどこにでもおみやげ物屋があるなぁ。さて、あいつに何を買ってやるべきか……？"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 2 }, { faces: 6, value: 4 }]
  });
});

test("JBST", () => {
  let randMock = new RandomMock("6/6", "2/6");
  dengine.setRand(randMock);
  const input = "JBST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 8,
    mainMassage:
      "清水寺。清水坂を越え、仁王門を抜けると、本堂――いわゆる清水の舞台にたどり着く。そこからは、音羽の滝や子安塔が見える。",
    status: Status.Unknown,
    process: [
      "神社仏閣シーン表",
      "8[6,2]",
      "清水寺。清水坂を越え、仁王門を抜けると、本堂――いわゆる清水の舞台にたどり着く。そこからは、音羽の滝や子安塔が見える。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 2 }]
  });
});

test("FT", () => {
  let randMock = new RandomMock("4/6");
  dengine.setRand(randMock);
  const input = "FT";
  const expected =
    "ファンブル表 ＞ 4[4] ＞ 油断した！　術の制御に失敗し、好きな【生命力】を１点失う。";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("ET", () => {
  let randMock = new RandomMock("1/6");
  dengine.setRand(randMock);
  const input = "ET";
  const expected = "感情表 ＞ 1[1] ＞ 共感（プラス）／不信（マイナス）";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("WT", () => {
  let randMock = new RandomMock("2/6");
  dengine.setRand(randMock);
  const input = "WT";
  const expected =
    "変調表 ＞ 2[2] ＞ マヒ:修得済み特技がランダムに１つ使用不能になる。１サイクルの終了時に、《身体操術》で成功するとこの効果は無効化される。";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("GWT", () => {
  let randMock = new RandomMock("1/6");
  dengine.setRand(randMock);
  const input = "GWT";
  const expected =
    "戦国変調表 ＞ 1[1] ＞ 催眠:戦闘に参加した時、戦闘開始時、もしくはこの変調を受けた時に【生命力】を1点減少しないと、戦闘から脱落する。サイクル終了時に〈意気〉判定し成功すると無効化。";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("BT", () => {
  let randMock = new RandomMock("6/6");
  dengine.setRand(randMock);
  const input = "BT";
  const expected =
    "戦場表 ＞ 6[6] ＞ 極地:宇宙や深海、溶岩、魔界など。ラウンドの終わりにＧＭが1D6を振り、経過ラウンド以下なら全員1点ダメージ。ここから脱落したものは変調表を適用する。";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("RTT", () => {
  let randMock = new RandomMock("2/6", "4/6", "3/6");
  dengine.setRand(randMock);
  const input = "RTT";
  const expected = "ランダム指定特技表 ＞ 2, 7[4,3] ＞ 『体術』歩法";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("MT", () => {
  let randMock = new RandomMock("2/6", "4/6");
  dengine.setRand(randMock);
  const input = "MT";
  const expected =
    "異形表 ＞ 2 ＞ 1D6を振り、「妖魔忍法表B」で、ランダムに忍法の種類を決定する。妖魔化している間、その妖魔忍法を修得しているものとして扱う。この異形は、違う種類の妖魔忍法である限り、違う異形として扱う。 ＞ 妖魔忍法表B ＞ 4 ＞ 【木魂】(怪p.253)";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("PLST", () => {
  let randMock = new RandomMock("2/6");
  dengine.setRand(randMock);
  const input = "PLST";
  const expected =
    "培養プラントシーン表 ＞ 2[2] ＞ 巨大なガラス管の中に冒涜的な生物が蠢く実験室。《意気》で判定を行い、失敗すると《マヒ》の変調を受ける。";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("HC", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HC";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "脱落した別のグループの忍者の死体を発見する。こいつらには、もう不要だろう。好きな忍具1つを獲得する。（何を獲得するか宣言すること）。",
    status: Status.Unknown,
    process: [
      "中忍試験シーン表",
      "12[6,6]",
      "脱落した別のグループの忍者の死体を発見する。こいつらには、もう不要だろう。好きな忍具1つを獲得する。（何を獲得するか宣言すること）。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("HK", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HK";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "太陽の微笑みがあなたを包み込む。影の世界の住人には、あまりにまぶしすぎる。",
    status: Status.Unknown,
    process: [
      "影の街でシーン表",
      "12[6,6]",
      "太陽の微笑みがあなたを包み込む。影の世界の住人には、あまりにまぶしすぎる。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("HM", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HM";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "壁のシミをぼんやりとながめていたら、それがゆっくりと人の顔の形になり、にやりと笑いかけてきた。……幻覚か。",
    status: Status.Unknown,
    process: [
      "密室シーン表",
      "12[6,6]",
      "壁のシミをぼんやりとながめていたら、それがゆっくりと人の顔の形になり、にやりと笑いかけてきた。……幻覚か。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("HO", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HO";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "霊安室。その扉が並ぶ長い廊下には、地下特有の淀んだ空気が漂っている。なぜだか気分が悪い。",
    status: Status.Unknown,
    process: [
      "病院シーン表",
      "12[6,6]",
      "霊安室。その扉が並ぶ長い廊下には、地下特有の淀んだ空気が漂っている。なぜだか気分が悪い。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("HR", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HR";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "無残で冒涜的な死体。犠牲者の表情は苦悶に満ちあふれ、四肢には何者かに貪り食われた痕がある。",
    status: Status.Unknown,
    process: [
      "龍動シーン表",
      "12[6,6]",
      "無残で冒涜的な死体。犠牲者の表情は苦悶に満ちあふれ、四肢には何者かに貪り食われた痕がある。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("HS", () => {
  let randMock = new RandomMock("6/6");
  dengine.setRand(randMock);
  const input = "HS";
  const expected =
    "催眠シーン表 ＞ 6[6] ＞ あなたは膨大な数の書架が林立する無人の図書館を歩いている。何気なく一冊の本を棚から抜き出すと、その本の向こう側にナビキャラクターの顔がのぞいている。「お前の求めるものは、その本の14ページに書かれている。」その言葉に従い、恐る恐る14ページを開いてみると……。";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("HT", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HT";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "太陽の微笑みがあなたを包み込む。影の世界の住人には、あまりにまぶしすぎる。",
    status: Status.Unknown,
    process: [
      "滅びの塔シーン表",
      "12[6,6]",
      "太陽の微笑みがあなたを包み込む。影の世界の住人には、あまりにまぶしすぎる。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("HY", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HY";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "車輌の果てを確かめるため、延々扉をくぐっているが、いつまでたっても最前列（最後尾？）にたどりつかない。今、いったい何輌目だろうか？",
    status: Status.Unknown,
    process: [
      "夜行列車シーン表",
      "12[6,6]",
      "車輌の果てを確かめるため、延々扉をくぐっているが、いつまでたっても最前列（最後尾？）にたどりつかない。今、いったい何輌目だろうか？"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("AKST", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "AKST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "カツーン、カツーン、誰かが丑の刻参りをしている音が聞こえる。シーンに登場したキャラクターは《呪術》で判定し、成功すると誰かに《呪い》の変調を与えることができる。失敗すると《呪い》の変調を受ける。",
    status: Status.Unknown,
    process: [
      "秋空に雪舞えばシーン表",
      "12[6,6]",
      "カツーン、カツーン、誰かが丑の刻参りをしている音が聞こえる。シーンに登場したキャラクターは《呪術》で判定し、成功すると誰かに《呪い》の変調を与えることができる。失敗すると《呪い》の変調を受ける。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("CLST", () => {
  let randMock = new RandomMock("6/6");
  dengine.setRand(randMock);
  const input = "CLST";
  const expected =
    "災厄シーン表 ＞ 6[6] ＞ 力なき者が生き残ることは出来ない。ボスが新たな力を手に入れようとしている。シーンプレイヤーが《怪力》の判定に失敗した場合、ボスに対してエニグマ：『八面六臂』が公開状態で追加される。";
  const res = dengine.roll(input);
  expect(getFullText(res)).toBe(expected);
  expect(res!.isSecret).toBe(false);
});

test("DXST", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "DXST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "目の前に渡来人が現れる。渡来人はあなたに興味を持ち、襲い掛かってくる。このシーンの登場人物は《刀術》で判定を行わなければならない。成功すると、渡来人を倒し、好きな忍具を一つ獲得する。失敗すると、３点の接近戦ダメージを受ける。",
    status: Status.Unknown,
    process: [
      "出島EXシーン表",
      "12[6,6]",
      "目の前に渡来人が現れる。渡来人はあなたに興味を持ち、襲い掛かってくる。このシーンの登場人物は《刀術》で判定を行わなければならない。成功すると、渡来人を倒し、好きな忍具を一つ獲得する。失敗すると、３点の接近戦ダメージを受ける。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("HLST", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "HLST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "部屋に置かれた実験装置によりマインドコントロールを受けてしまう。このシーンのあなたはGMの指定した行動をとらねばならない。",
    status: Status.Unknown,
    process: [
      "斜歯ラボシーン表",
      "12[6,6]",
      "部屋に置かれた実験装置によりマインドコントロールを受けてしまう。このシーンのあなたはGMの指定した行動をとらねばならない。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});

test("NTST", () => {
  let randMock = new RandomMock("6/6", "6/6");
  dengine.setRand(randMock);
  const input = "NTST";
  const res = dengine.roll(input);
  expect(res).toStrictEqual({
    total: 12,
    mainMassage:
      "カツーン、カツーン、誰かが丑の刻参りをしている音が聞こえる。シーンに登場したキャラクターは《呪術》で判定し、成功すると誰かに《呪い》の変調を与えることができる。失敗すると《呪い》の変調を受ける。",
    status: Status.Unknown,
    process: [
      "夏の終わりシーン表",
      "12[6,6]",
      "カツーン、カツーン、誰かが丑の刻参りをしている音が聞こえる。シーンに登場したキャラクターは《呪術》で判定し、成功すると誰かに《呪い》の変調を与えることができる。失敗すると《呪い》の変調を受ける。"
    ],
    isSecret: false,
    dice: [{ faces: 6, value: 6 }, { faces: 6, value: 6 }]
  });
});
