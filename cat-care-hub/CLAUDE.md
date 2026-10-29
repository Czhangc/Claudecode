# CLAUDE.md — 猫咪健康管家（暂定名）

> 这是给 Claude Code 的项目指令。每次开始工作前先读本文件，再读 `docs/PRD.md`、`docs/TECH_SPEC.md`、`docs/DESIGN_SPEC.md`、`docs/KNOWLEDGE_SOURCES.md` 中与当前任务相关的章节。

## 项目一句话

一个面向养猫人的移动端 Web 应用：用**有出处的科学知识**帮主人管理猫咪的体型、饮食、人宠互动，并在出现异常时做**就医分诊**（判断"要不要去医院、多急"），而不是诊断疾病。

产品的核心价值是**可信度**。功能做得少没关系，但每一条健康建议都必须能追溯到权威来源。

## 技术栈

- Vite + React + TypeScript（`strict: true`）
- Tailwind CSS
- React Router
- Dexie.js（IndexedDB，本地存储所有用户数据）
- Recharts（体重趋势图）
- Vitest + React Testing Library
- 使用脚手架时各依赖的当前稳定版本；新增任何依赖前，先在 `docs/DECISIONS.md` 记录理由

## 常用命令

```bash
npm run dev        # 本地开发
npm run test       # 单元测试（必须全部通过）
npm run build      # 生产构建（必须通过，含内容校验）
npm run lint       # 代码检查
npm run validate:content   # 校验 content/ 下所有知识条目
```

## 硬性规则（不可违反）

### 1. 不凭记忆编写任何兽医知识
- 所有健康、营养、行为相关的文字只能放在 `content/` 目录下的知识条目里，计算常数只能放在 `src/lib/constants.ts`。
- 每个条目和每个常数都必须引用 `docs/KNOWLEDGE_SOURCES.md` 中的来源 ID（如 `S01`）。
- 如果实现某功能需要的知识在 `KNOWLEDGE_SOURCES.md` 里找不到：**不要自己编**。创建一个 `status: "draft"` 的条目，正文写 `TODO: 需人工核对`，并在 `docs/DECISIONS.md` 的"待核对内容"列表中登记。
- `draft` 条目在界面上必须显示"待核对"标记，绝不能伪装成已核对内容。
- 严禁编造来源、链接、页码或论文。
- `docs/KNOWLEDGE_SOURCES.md` 由人维护。你不能修改其中的来源登记表和已核对内容，只能在第 5 节"待核对清单"末尾追加新行。

### 2. 只做分诊，不做诊断
- 界面文案永远不说"你的猫得了 X 病"，只说"建议立即就医 / 24 小时内就医 / 记录并观察"。
- 不提供任何药物名称、剂量或用药建议。
- 有已知健康问题、幼猫（< 1 岁）、怀孕或哺乳的猫：热量计算器不给出数字，改为提示"请由兽医制定饮食方案"。

### 3. 红线症状优先
- 分诊逻辑先判断急症规则。命中任何一条 `EMERGENCY` 规则，立即全屏显示急诊提示，不再继续提问，也不与"观察"选项并列展示。
- 首页必须能一键进入"什么时候必须马上去医院"页面。

### 4. 版权
- 不得复制 WSAVA 体况评分图、Feline Grimace Scale 图片或任何来源的原文段落。用自己的话描述，并附官方链接。
- 插图只能是原创的简洁示意图（SVG），不得模仿官方图表的版式。

### 5. 隐私：本地优先
- Phase 1–3 中，用户数据不离开设备。不接入任何统计、广告或第三方追踪 SDK。
- 提供数据导出 / 导入（JSON），方便用户自己备份。

### 6. 计算逻辑必须可测试、可解释
- 所有计算是 `src/lib/` 下的纯函数，单元测试覆盖 `TECH_SPEC.md` 中的全部示例。
- 计算结果页面必须有"看看怎么算的"展开区，逐步显示公式、代入值和来源。
- 所有估算值都标注"估算，仅作起点，需根据体况调整并咨询兽医"。

### 7. 视觉与交互遵循 DESIGN_SPEC
- 颜色、圆角、阴影、字体只从 Tailwind 主题 token 取，不在组件里写死数值。
- 每个页面先判断属于"日常区"还是"安静区"（`DESIGN_SPEC.md` 第 5 节）。安静区不得出现咪宝插画、颗粒质感、回弹或循环动画。
- 所有动效遵守 `prefers-reduced-motion`。
- 插画是原创 SVG 组件；需要变形的插画用代码生成路径，不用位图。

## 工作流程

1. **只做当前阶段**：按 `PRD.md` 的阶段推进，不提前做后续阶段的功能，不添加 PRD 里没有的功能。好的想法写进 `docs/DECISIONS.md` 的"Parking lot"。
2. **先计划再动手**：每个阶段开始时，先输出实施计划（要建哪些文件、组件、测试），等人确认后再写代码。
3. **小步提交**：每完成一个用户故事就运行测试，通过后再进入下一个。
4. **阶段完成的标准**：
   - 该阶段所有 P0 验收标准都满足
   - `npm run test`、`npm run build`、`npm run validate:content` 全部通过
   - 在 375px 宽度下手动检查过所有新页面，并对照 `DESIGN_SPEC.md` 的组件和分区规则
   - 更新 `docs/STATUS.md`：完成了什么、已知问题、下一步
5. **遇到 PRD 没写清楚的地方**：选最保守（对猫最安全）的做法，并在 `docs/DECISIONS.md` 记录你的选择和理由，在阶段总结里提出来。

## 代码约定

- 界面文案：简体中文。代码、变量名、注释：英文。
- 单位：kg、g、kcal。日期用 ISO 格式存储，界面显示为本地格式。
- 显示时：热量取整数 kcal，克数取整数 g，体重保留 2 位小数。计算过程中不提前取整。
- 组件放 `src/components/`，页面放 `src/pages/`，计算放 `src/lib/`，数据库放 `src/db/`。
- 文案集中放在 `src/copy/zh.ts`，不要散落在组件里，方便日后审核措辞。

## 目录速览

```
CLAUDE.md
docs/
  PRD.md               产品需求（做什么、为什么、验收标准）
  TECH_SPEC.md         技术规格（数据模型、公式、规则引擎、测试）
  DESIGN_SPEC.md       视觉与交互规范（tokens、组件、插画、情绪分区、各流程交互）
  KNOWLEDGE_SOURCES.md 来源登记表 + 已核对的常数
  DECISIONS.md         决策日志 + 待核对内容 + Parking lot（Phase 0 创建）
  STATUS.md            进度记录（Phase 0 创建）
content/               知识条目（JSON / Markdown）
src/
  lib/                 纯函数计算 + 常数
  db/                  Dexie schema
  components/ pages/ copy/
scripts/
  validate-content.ts  内容校验脚本
```
