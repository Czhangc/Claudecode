# 猫咪健康管家 — 开发文档包

## 运行

```bash
npm install
npm run dev               # 本地开发，打开终端里显示的地址
npm run test              # 单元测试
npm run build             # 内容校验 + 类型检查 + 生产构建（输出到 dist/）
npm run validate:content  # 只跑内容校验
```

`dist/` 是纯静态文件，可以放到任意静态托管。当前进度见 `docs/STATUS.md`，实现中做的选择见 `docs/DECISIONS.md`。

这套文档按"需求 → 技术方案 → 视觉交互 → 知识来源 → 执行规则"组织，交给 Claude Code 写代码，你负责确认计划、验收和核对内容。

## 文件说明

| 文件 | 给谁看 | 作用 |
|---|---|---|
| `CLAUDE.md` | Claude Code（自动读取） | 项目规则：技术栈、硬性规则、工作流程 |
| `docs/PRD.md` | 你 + Claude Code | 做什么、为什么、每个功能的验收标准 |
| `docs/TECH_SPEC.md` | Claude Code | 数据模型、公式、分诊规则引擎、测试用例 |
| `docs/DESIGN_SPEC.md` | 你 + Claude Code | 视觉风格、设计 tokens、插画规范、情绪分区、每个流程的交互形式 |
| `docs/KNOWLEDGE_SOURCES.md` | 你（维护者） | 来源登记表、已核对的常数和知识、待核对清单 |

## 怎么用

1. 新建一个空文件夹，把这些文件按原目录结构放进去（`CLAUDE.md` 和 `README.md` 在根目录，其余在 `docs/`）
2. 在这个文件夹里启动 Claude Code
3. 按下面的顺序发提示词，每个阶段都是"先计划 → 你确认 → 再实现 → 你验收"

### Phase 0（地基）

```
请完整阅读 CLAUDE.md 和 docs/ 下的所有文档。然后只针对 Phase 0 给我一份实施计划：
要创建哪些文件、装哪些依赖、知识条目 schema、内容校验脚本的测试用例、急症速查页用到哪些已核对内容，
以及如何把 DESIGN_SPEC 的 tokens 配进 Tailwind 主题。
先不要写代码，等我确认。
```

确认后：

```
计划确认，开始实现 Phase 0。完成后运行 test、build、validate:content，更新 docs/STATUS.md，并告诉我你在 DECISIONS.md 里记录了哪些决定。
```

### Phase 1（MVP：体型 + 饮食）

```
开始 Phase 1。先给出计划：F1.1–F1.5 每个用户故事对应的页面、组件、函数和测试，
特别列出 TECH_SPEC 第 4.5 节 8 个示例分别在哪个测试里覆盖。确认后再实现。
```

### Phase 2、3

同样的格式，把阶段号和功能编号换掉即可。Phase 4（AI 问答）开始前，先让 Claude Code 单独写一份技术方案给你评审。

## 每个阶段你要验收的事

- [ ] 手机宽度下把每个新页面走一遍，用咪宝的真实数据测试
- [ ] 打开"看看怎么算的"，自己按公式算一遍，确认数字对得上
- [ ] 带"待核对"标记的内容有哪些，记下来去查来源
- [ ] 读一遍 `DECISIONS.md`，看 Claude Code 自己做了哪些选择，有没有你不同意的
- [ ] 所有健康相关的文案，读一遍有没有"诊断"口吻

## 你需要亲自做的事（Claude Code 做不了）

- **核对内容**：`KNOWLEDGE_SOURCES.md` 第 5 节的待核对清单，查到可靠来源后由你更新文件
- **找兽医审核**：哪怕只有一位执业兽医愿意看一遍已核对内容，可信度都会大幅提升
- **决定部署平台**：上线前在国内网络下实测访问速度
