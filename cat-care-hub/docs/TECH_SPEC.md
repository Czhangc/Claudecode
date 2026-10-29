# TECH_SPEC — 猫咪健康管家

> 本文件描述"怎么做"。需求和验收标准见 `PRD.md`，来源和常数见 `KNOWLEDGE_SOURCES.md`。两者冲突时，以 `KNOWLEDGE_SOURCES.md` 中的常数为准，并在 `DECISIONS.md` 记录。

## 1. 架构概览

- 纯前端单页应用，所有数据存在浏览器 IndexedDB（Dexie.js），Phase 1–3 无后端
- 知识内容在构建时从 `content/` 打包进应用；构建前运行内容校验
- 计算和分诊逻辑全部是 `src/lib/` 下的纯函数，与 UI 解耦
- Phase 4 才引入后端（serverless 函数代理 LLM API），届时另写方案

```
UI (pages/components)
   │  调用
   ▼
src/lib/  ── 纯函数：nutrition.ts / bcs.ts / weightTrend.ts / triage.ts / grimace.ts
   │  读取                         │ 读取
   ▼                               ▼
src/lib/constants.ts          content/（知识条目、分诊规则、问卷题目）
   │                               │
   └──── 均引用 KNOWLEDGE_SOURCES.md 的来源 ID ────┘
   
src/db/  ── Dexie：cats / weights / bcs / feedingPlans / envChecks / logs
```

## 2. 目录结构

```
src/
  lib/
    constants.ts        # 所有数值常数，每个带 sourceIds
    nutrition.ts        # 理想体重、RER、每日热量、零食预算、克数
    bcs.ts              # 体况评分向导打分
    weightTrend.ts      # 体重变化率
    triage.ts           # 分诊规则引擎（Phase 3）
    grimace.ts          # 疼痛面部观察打分（Phase 3）
    __tests__/
  db/
    schema.ts
  content/
    loader.ts           # 读取打包后的知识条目
  copy/
    zh.ts               # 全部界面文案
  components/
  pages/
content/
  cards/*.md            # 知识卡片（frontmatter + 正文）
  bcs-wizard.json       # 体况评分向导题目
  env-pillars.json      # 环境自查题目（Phase 2）
  behavior-signals/*.md # 行为信号（Phase 2）
  triage-rules.json     # 分诊规则（Phase 3）
  emergency.json        # 急症红线（Phase 0）
scripts/
  validate-content.ts
docs/
```

## 3. 数据模型

```ts
type ISODate = string; // 'YYYY-MM-DD'

interface Cat {
  id: string;
  name: string;
  birthDate?: ISODate;
  estimatedAgeYears?: number;     // 不知道生日时使用
  sex: 'male' | 'female';
  neutered: boolean;
  activity: 'low' | 'normal';
  hasKnownHealthCondition: boolean;
  isPregnantOrLactating?: boolean; // 仅 female
  avatarBlobId?: string;
  createdAt: ISODate;
}

interface WeightEntry {
  id: string;
  catId: string;
  date: ISODate;
  weightKg: number;
  note?: string;
}

interface BcsAssessment {
  id: string;
  catId: string;
  date: ISODate;
  answers: Record<string, string>; // 向导题目 id → 选项 id
  estimatedScore: number;          // 1–9，向导算出
  finalScore: number;              // 1–9，用户对照官方图表后确认或调整
}

interface Food {
  id: string;
  name: string;
  type: 'dry' | 'wet' | 'other';
  kcalPerKg?: number;   // 二选一
  kcalPerUnit?: number; // 例如每罐
  unitLabel?: string;   // '罐' | '袋'
}

interface FeedingPlan {
  id: string;
  catId: string;
  startDate: ISODate;
  goal: 'maintain' | 'lose';
  inputs: { weightKg: number; bcs: number; };
  result: FeedingResult;            // 见第 4 节
  foods: { foodId: string; shareOfFoodKcal: number }[]; // 占比之和 = 1
  active: boolean;
}

// Phase 2
interface EnvCheck { id: string; catId: string; date: ISODate; answers: Record<string, boolean>; }
interface InteractionLog { id: string; catId: string; date: ISODate; playMinutes: number; sessions: number; note?: string; }

// Phase 3
interface SymptomCheck {
  id: string; catId: string; date: ISODate;
  answers: Record<string, string | boolean>;
  level: 'EMERGENCY' | 'URGENT_24H' | 'MONITOR';
  matchedRuleIds: string[];
}
```

Dexie 版本从 1 开始；任何 schema 变更都要写迁移，并在 `DECISIONS.md` 记录。

## 4. 营养与体型计算（Phase 1）

所有常数来自 `KNOWLEDGE_SOURCES.md` 第 2 节，在 `constants.ts` 中定义，并附注 sourceIds。

### 4.1 常数

```ts
export const RER_COEFFICIENT = 70;           // S01, S02
export const RER_EXPONENT = 0.75;            // S01, S02
export const MER_FACTOR = {
  neuteredAdult: 1.2,     // S01（区间 1.2–1.4，取下限）, S02
  intactAdult: 1.4,       // S01（区间 1.4–1.6，取下限）, S02
  inactiveOrObeseProne: 1.0, // S01, S02
  weightLoss: 0.8,        // S01, S02（乘以"理想体重"的 RER）
} as const;
export const BCS_IDEAL_MAX = 5;              // S03, S04（4–5 为理想）
export const BCS_EXCESS_PER_POINT = 0.10;    // S04（每分约 10–15%，取 10%：理想体重估得偏高，减重更保守）
export const TREAT_MAX_SHARE = 0.10;         // S07, S18
export const SAFE_LOSS_PER_WEEK = { min: 0.005, max: 0.02 }; // S05（0.5%–2%）
```

### 4.2 函数

```ts
// 理想体重估算
estimateIdealWeightKg(currentKg: number, bcs: number): number
//   bcs <= 5 → currentKg
//   bcs > 5  → currentKg / (1 + BCS_EXCESS_PER_POINT * (bcs - 5))

rer(weightKg: number): number
//   RER_COEFFICIENT * weightKg ** RER_EXPONENT

dailyKcal(cat: Cat, weightKg: number, bcs: number, goal: 'maintain' | 'lose'): FeedingResult
```

`dailyKcal` 的判断顺序（先命中先返回）：

1. 年龄 < 1 岁 / 有已知健康问题 / 怀孕或哺乳 → `{ status: 'REFER_VET', reason }`，不给数字
2. `bcs <= 3` → `{ status: 'REFER_VET', reason: 'underweight' }`
3. `goal === 'lose'` → 热量 = `MER_FACTOR.weightLoss × rer(estimateIdealWeightKg(weightKg, bcs))`，附 `vetCheckAdvised: true`
4. `goal === 'maintain'`：
   - `activity === 'low'` → 系数 `inactiveOrObeseProne`
   - 否则按 `neutered` 选 `neuteredAdult` 或 `intactAdult`
   - 热量 = 系数 × `rer(weightKg)`

`bcs >= 6` 时 UI 默认 `goal = 'lose'`，用户可改，但改为"维持"时显示提醒。

```ts
interface FeedingResult {
  status: 'OK' | 'REFER_VET';
  reason?: string;
  idealWeightKg?: number;
  rerKcal?: number;
  factor?: number;
  dailyKcal?: number;
  treatBudgetKcal?: number;   // dailyKcal * TREAT_MAX_SHARE
  foodKcal?: number;          // dailyKcal - treatBudgetKcal
  vetCheckAdvised?: boolean;
  steps: CalcStep[];          // 供"看看怎么算的"展示
}
interface CalcStep { label: string; formula: string; value: number; unit: string; sourceIds: string[]; }
```

### 4.3 克数换算

```ts
gramsPerDay(foodKcal: number, share: number, food: Food): number | { units: number }
//   有 kcalPerKg → (foodKcal * share) / (food.kcalPerKg / 1000)
//   有 kcalPerUnit → { units: (foodKcal * share) / food.kcalPerUnit }
```

### 4.4 体重变化率

```ts
weeklyLossRate(entries: WeightEntry[], planStart: ISODate): { ratePerWeek: number; level: 'TOO_FAST' | 'SAFE' | 'SLOW' | 'INSUFFICIENT_DATA' }
//   取计划开始后最早和最新两条记录，间隔 < 7 天 → INSUFFICIENT_DATA
//   ratePerWeek = (w_first - w_last) / w_first / weeksBetween
//   > 0.02 → TOO_FAST
//   0.005–0.02 → SAFE
//   < 0.005 且间隔 ≥ 28 天 → SLOW
```

### 4.5 必测示例（单元测试必须覆盖）

| # | 输入 | 期望（未取整） |
|---|---|---|
| E1 | 4.54 kg，已绝育，正常活动，BCS 5，维持 | RER ≈ 217.7；每日 ≈ 261.3 kcal（与 S06 示例 218 / 262 一致） |
| E2 | 5.0 kg，已绝育，BCS 7，减重；干粮 3800 kcal/kg，占比 100% | 理想体重 ≈ 4.167 kg；RER ≈ 204.1；每日 ≈ 163.3；零食 ≈ 16.3；主粮 ≈ 147.0 kcal ≈ 38.7 g |
| E3 | 4.0 kg，未绝育，正常活动，BCS 5，维持 | 每日 ≈ 277.2 kcal |
| E4 | 4.0 kg，已绝育，活动偏少，BCS 5，维持 | 每日 ≈ 198.0 kcal |
| E5 | 任意体重，BCS 3 | `REFER_VET`，无数字 |
| E6 | 8 个月大 | `REFER_VET`，无数字 |
| E7 | 体重从 5.00 → 4.80 kg，间隔 7 天 | 4.0%/周 → `TOO_FAST` |
| E8 | 体重从 5.00 → 4.95 kg，间隔 7 天 | 1.0%/周 → `SAFE` |

浮点比较用 `toBeCloseTo(x, 1)`。

## 5. 知识条目 schema

### 5.1 卡片（`content/cards/*.md`）

```yaml
---
id: card-rer-explained
module: nutrition          # nutrition | body | environment | behavior | triage | general
title: 猫每天需要多少热量？
summary: 一句话摘要（用自己的话）
sources:
  - id: S01
    locator: "Box 1"       # 页码 / 章节 / 表格编号
  - id: S02
status: verified           # draft | verified
verifiedBy: cccc
verifiedAt: 2026-10-29
tags: [热量, 喂食]
---
正文（Markdown，用自己的话；引用原文不超过一句短语）
```

### 5.2 校验规则（`scripts/validate-content.ts`）

构建失败的情况：
- 缺少 `id`、`title`、`summary`、`sources`、`status` 任一字段
- `sources` 为空，或引用了 `KNOWLEDGE_SOURCES.md` 中不存在的来源 ID
- `status: verified` 但缺 `verifiedBy` 或 `verifiedAt`
- `id` 重复
- `triage-rules.json` 中任何规则没有 `sourceIds`

只警告不失败：
- `draft` 条目数量（在构建输出中列出，方便人工核对）
- `verifiedAt` 早于 12 个月

`KNOWLEDGE_SOURCES.md` 中的来源 ID 由脚本解析表格得到，不要另外维护一份。

## 6. 分诊规则引擎（Phase 3）

### 6.1 规则格式（`content/triage-rules.json`）

```json
{
  "id": "R-URINE-STRAIN",
  "stage": "redflag",
  "question": "猫是否反复进出猫砂盆、用力蹲着，但尿很少或尿不出来？",
  "trigger": { "answer": true },
  "level": "EMERGENCY",
  "message": "这可能是尿路堵塞，属于急症，请立即联系兽医或去急诊。不要在家等待观察。",
  "sourceIds": ["S11", "S12"],
  "status": "verified"
}
```

- `stage: "redflag"`：第一步全部展示，任意一条命中即返回 `EMERGENCY`
- `stage: "system"`：按身体系统的追问，`trigger` 可组合条件（`all` / `any`），结果等级取所有命中规则中最高的
- `MONITOR` 结果必须附 `recheckAfterHours` 和 `escalateIf`（列出会升级的情况）

### 6.2 引擎

```ts
evaluateTriage(rules: TriageRule[], answers: Record<string, unknown>): {
  level: 'EMERGENCY' | 'URGENT_24H' | 'MONITOR';
  matchedRuleIds: string[];
  messages: string[];
}
```

- 等级优先级：`EMERGENCY` > `URGENT_24H` > `MONITOR`
- 未命中任何规则 → `MONITOR`，并给出通用升级条件
- `draft` 规则可以触发更高等级，但**不能**把结果降为 `MONITOR`（未核对内容只能让结果更保守）

### 6.3 初始红线规则（已核对，见 `KNOWLEDGE_SOURCES.md` 第 3 节）

| 规则 ID | 内容 | 等级 | 来源 |
|---|---|---|---|
| R-URINE-STRAIN | 反复用力排尿但尿很少或没有（公猫风险更高，但母猫同样适用） | EMERGENCY | S11, S12 |
| R-BREATHING | 张嘴呼吸、呼吸困难、腹部剧烈起伏 | EMERGENCY | S13 |
| R-TOXIN | 已知或怀疑误食有毒物质（即使暂无症状） | EMERGENCY | S14 |
| R-TRAUMA | 高处坠落、车祸、被狗咬等严重外伤 | EMERGENCY | S14 |
| R-NOT-EATING | 完全不吃不喝超过 1 天（超重猫风险更高） | EMERGENCY（文案："今天就要让兽医看，约不到门诊就去急诊"） | S14, S16 |
| R-VOMIT-REPEAT | 1 小时内多次呕吐 | EMERGENCY | S15 |
| R-BLOOD-URINE | 尿中带血 | URGENT_24H | S17 |

其他常见情况（喝水也吐、呕吐物带血、腹泻、精神萎靡、躲藏等）在 Phase 3 开始时作为 `draft` 规则补充，核对来源后再改为 `verified`。按 6.2 的规则，未核对的规则只能把结果变得更保守。

必测：每条 EMERGENCY 规则单独命中时，无论其他答案如何，结果都是 `EMERGENCY`。

## 7. 疼痛面部观察（Phase 3）

```ts
type FgsScore = 0 | 1 | 2 | null; // null = 看不清，跳过
scoreGrimace(items: Record<'ears'|'orbital'|'muzzle'|'whiskers'|'head', FgsScore>): {
  total: number; maxPossible: number; ratio: number; suggestVet: boolean;
}
//   maxPossible = 2 × 已评分项数
//   ratio = total / maxPossible
//   suggestVet = ratio >= 0.4   // S10：≥ 4/10 或 0.4
//   已评分项 < 3 → 不给结论，提示"能看清的特征太少，请换个时间或角度再观察"
```

## 8. 非功能要求

- 移动端优先，375px 宽度下无横向滚动；点击区域 ≥ 44px
- 首屏可交互 < 3 秒（普通 4G）
- 支持系统深色模式
- 基础无障碍：图片有 alt，颜色不作为唯一信息载体（等级同时用图标 + 文字）
- 所有用户数据只存本地；导出为 JSON

## 9. 测试要求

- `src/lib/` 覆盖率 ≥ 90%
- 第 4.5 节示例、第 6.3 节红线规则、第 7 节打分全部有测试
- 内容校验脚本本身有测试（构造缺来源的条目，确认会失败）
- 每个阶段结束时，在 `STATUS.md` 写一份手动走查清单的结果

## 10. Phase 4 预留（现在不做）

- 知识条目的 `id` 和 `sources` 结构就是日后检索增强问答的数据源，保持稳定
- 文案和规则不写死在组件里，日后问答结果可以复用同一套展示组件
- 急症关键词列表放在 `content/emergency.json`，日后问答前置检查直接复用
