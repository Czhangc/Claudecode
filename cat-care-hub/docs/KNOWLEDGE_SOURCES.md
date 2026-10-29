# KNOWLEDGE_SOURCES — 来源登记与已核对知识

> 这是整个产品可信度的根基。Claude Code **只能**使用本文件中登记的来源和已核对的内容。需要新知识时，由人工查找来源、核对后添加到这里，再写进 `content/`。
>
> 最后核对：2026-10-29（cccc + Claude 网页检索）

## 1. 来源分级

| 等级 | 含义 | 使用原则 |
|---|---|---|
| **A** | 专业兽医组织发布的指南、同行评审论文 | 首选；计算常数只能来自 A 级 |
| **B** | 兽医学院、兽医院、兽医协会面向主人的科普 | 可用于急症提示和通俗解释；尽量有 2 个来源互相印证 |
| C | 宠物品牌、商业网站、自媒体 | 不作为依据，最多作为"延伸阅读" |

## 2. 来源登记表

`validate-content.ts` 从下表第一列解析来源 ID，格式为 `S` + 两位数字。

| ID | 来源 | 等级 | 用于 |
|---|---|---|---|
| S01 | AAHA 2021 Nutrition and Weight Management Guidelines — Box 1: Energy Requirement Calculations | A | RER 公式；猫的 MER 系数区间 |
| S02 | Pet Nutrition Alliance — Calculating Calories Based on Pet Needs (MER/RER) | A | RER 公式；MER 系数；"个体差异可达 50%" |
| S03 | WSAVA Global Nutrition Guidelines & Toolkit（含简体中文版工具包、猫体况评分图、猫肌肉评分图） | A | 9 分制体况评分，4–5 为理想；官方图表链接 |
| S04 | Taylor & Francis 兽医营养学章节（引述 WSAVA 全球营养委员会建议）；参考 Ontario Veterinary College Pet Nutrition (Univ. of Guelph) — Scoring for Health | A | 4–5 分为理想；5 分以上每多 1 分约超出理想体重 10–15%（Guelph 的表述是"体脂多 10–15%"，口径略不同，卡片中按体重口径并注明是估算） |
| S05 | Tufts Cummings School, Petfoodology — 减重速度 | A | 猫安全减重速度：每周 0.5%–2%；过快有脂肪肝风险 |
| S06 | petMD — Are You Overfeeding Your Cat?（Dr. Jennifer Coates） | B | 计算示例核对：4.54 kg 绝育猫 ≈ 218 / 262 kcal |
| S07 | WSAVA — Guide to Treats: Cats（2025） | A | 零食应少于每日热量的 10% |
| S08 | AAFP & ISFM Feline Environmental Needs Guidelines（JFMS 2013; 15:219–230） | A | 环境需求五大支柱 |
| S09 | VCA Hospitals — Feline Environmental Needs Guidelines（面向主人的摘要） | B | 五大支柱的通俗说明；猫享受互动的信号 |
| S10 | Feline Grimace Scale, Université de Montréal（Evangelista et al., Sci Rep 2019; 9:19128）及官网 FAQ | A | 5 个面部特征、0–2 分、≥ 4/10 建议镇痛；仅限急性疼痛；主人也能可靠使用 |
| S11 | PDSA — Blocked Bladder in Cats | B | 排尿困难是急症，不要等待观察 |
| S12 | University of Illinois College of Veterinary Medicine — Blocked Cats: An Emergency for Male Cats | B | 尿路堵塞为急症，需立即就医 |
| S13 | Tufts Catnip — When to Get Help（呼吸问题） | B | 张嘴呼吸、腹部剧烈起伏等需立即联系兽医 |
| S14 | The Drake Center for Veterinary Care — Cat Emergency | B | 不吃不喝超过 1 天需紧急就医；外伤；误食毒物 |
| S15 | Anicira Veterinary Center — 10 Signs Your Cat Is Having a Veterinary Emergency | B | 1 小时内多次呕吐属于急症信号 |
| S16 | Association for Pet Obesity Prevention — Weight Loss for Cats | B | 开始减重前先让兽医检查；连续 2–3 天不进食可能引发脂肪肝，超重猫风险更高 |
| S17 | Tufts Catnip — No Time to Lose（尿血） | B | 尿中带血应带去看兽医 |
| S18 | VCA Hospitals — Cat Treats | B | 90% 热量来自主粮、10% 以内来自零食；零食预算的算法 |
| S19 | Virginia Tech Veterinary Teaching Hospital — Feline Body Condition Scoring | A | 5 分为理想的描述；部分猫（尤其老年猫）6 分可能可以接受 |

### 链接

- S01: https://www.aaha.org/globalassets/02-guidelines/2021-nutrition-and-weight-management/resourcepdfs/nutritiongl_box1.pdf
- S02: https://petnutritionalliance.org/wp-content/uploads/2023/03/MER.RER_.PNA_.pdf
- S03: https://wsava.org/global-guidelines/global-nutrition-guidelines/
  - 简体中文工具包：https://wsava.org/wp-content/uploads/2020/01/WSAVA-Global-Nutrition-Toolkit-Chinese-Simplified.pdf
  - 猫体况评分图：https://wsava.org/WSAVA/media/Documents/Committee%20Resources/Global%20Nutrition%20Committee/English/Body-Condition-Score-cat.pdf
  - 猫肌肉评分图：https://wsava.org/WSAVA/media/Documents/Committee%20Resources/Global%20Nutrition%20Committee/English/Muscle-Condition-Score-Chart-for-Cats.pdf
- S04: https://ovcpetnutrition.uoguelph.ca/2021/10/25/scoring-for-health ；https://www.taylorfrancis.com/books/9781315381732/chapters/10.1201/b19610-38
- S05: https://vetnutrition.tufts.edu/?p=9419
- S06: https://www.petmd.com/cat/centers/nutrition/slideshows/are-you-overfeeding-your-cat
- S07: https://wsava.org/wp-content/uploads/2025/11/WSAVA_GuidetoTreats_Cats_251107.pdf
- S08: https://catvets.com/wp-content/uploads/2024/01/EnvironmentalNeedsGLS.pdf ；主人版手册入口：https://catvets.com/environmental-needs
- S09: https://vcahospitals.com/pediatric/kitten/health-wellness/feline-environmental-needs-guidelines
- S10: https://www.felinegrimacescale.com/about ；FAQ：https://felinegrimacescale.com/copy-of-frequently-asked-questions ；论文：https://pmc.ncbi.nlm.nih.gov/articles/PMC6911058
- S11: https://www.pdsa.org.uk/media/6937/phh_cat_c_blocked-bladder-cat.pdf
- S12: https://vetmed.illinois.edu/pet-health-columns/blocked-cats-an-emergency-for-male-cats/
- S13: https://tuftscatnip.com/?p=5218
- S14: https://www.thedrakecenter.com/services/cats/cat-emergency
- S15: https://anicira.org/resources/10-signs-your-cat-is-having-a-veterinary-emergency/
- S16: https://www.petobesityprevention.org/weight-loss-cats
- S17: https://tuftscatnip.com/?p=38097
- S18: https://vcahospitals.com/know-your-pet/cat-treats
- S19: https://vth.vetmed.vt.edu/content/dam/vth_vetmed_vt_edu/documents/nutrition/feline-body-condition-scoring.pdf

## 3. 已核对的常数与规则

### 3.1 营养计算

| 常数 | 值 | 来源 | 说明 |
|---|---|---|---|
| RER 公式 | 70 × 体重(kg)^0.75 | S01, S02 | 静息能量需求，kcal/天 |
| 绝育成年猫系数 | 1.2 | S01（1.2–1.4）, S02（1.2）, S06 | 取下限 |
| 未绝育成年猫系数 | 1.4 | S01（1.4–1.6）, S02（1.4） | 取下限 |
| 活动偏少 / 易胖系数 | 1.0 | S01, S02 | |
| 减重系数 | 0.8 × 理想体重的 RER | S01, S02（0.8–1.0） | 取 0.8；用理想体重而非当前体重计算 |
| 个体差异 | 可达 ±50% | S02 | 结果只是起点 |
| 零食上限 | 每日热量的 10% | S07, S18 | 主粮提供其余 90% |

### 3.2 体型

| 项目 | 值 | 来源 |
|---|---|---|
| 评分体系 | 1–9 分，1 = 极瘦，9 = 严重肥胖 | S03 |
| 理想区间 | 4–5 分 | S03, S04 |
| 5 分以上每多 1 分 | 约超出理想体重 10–15%（计算取 10%） | S04 |
| 老年猫 | 部分猫 6 分可能可以接受 | S19（如何呈现待兽医意见，见第 5 节） |
| 安全减重速度 | 每周 0.5%–2% 体重 | S05 |
| 过快减重风险 | 脂肪肝（hepatic lipidosis） | S05, S16 |
| 减重前 | 建议先让兽医检查 | S16 |

### 3.3 急症红线

| 情况 | 建议 | 来源 |
|---|---|---|
| 反复用力排尿，尿很少或没有 | 立即就医，不要等待 | S11, S12 |
| 张嘴呼吸、呼吸困难、腹部剧烈起伏 | 立即联系兽医 | S13 |
| 已知或怀疑误食有毒物质 | 立即就医，即使还没出现症状 | S14 |
| 严重外伤（坠落、车祸、被咬） | 立即就医 | S14 |
| 完全不吃不喝超过 1 天 | 当天就医，约不到就去急诊；超重猫更危险 | S14, S16 |
| 1 小时内多次呕吐 | 立即联系兽医 | S15 |
| 尿中带血 | 尽快看兽医 | S17 |

### 3.4 环境五大支柱（S08, S09）

1. **安全的藏身处**：私密、常在高处；多猫家庭至少和猫一样多，最好有多个出入口
2. **多处且分开摆放的关键资源**：食物、水、猫砂盆、抓挠、玩耍、休息各自分开（例如食盆不靠近猫砂盆），每种资源最好至少两处
3. **玩耍与模拟狩猎的机会**：玩具、与人互动的游戏、需要"捕获"才能吃到食物的喂食器；带绳子的玩具玩完要收起来
4. **积极、稳定、可预期的人猫互动**：猫通常喜欢频繁但低强度的互动；不要强迫，让猫主动发起
5. **尊重猫的嗅觉**：注意清洁剂等强烈气味；提供可以蹭脸、抓挠留下气味的地方

### 3.5 猫享受互动的信号（S09）

慢眨眼；呼噜或短促的"咕咕"声；用脸蹭你或用头顶你；爬到你腿上；侧躺露出肚子。

### 3.6 疼痛面部观察（S10）

- 5 个特征：耳朵位置、眼睛眯合、口鼻部紧张度、胡须位置、头部位置
- 每项 0 = 没有、1 = 中度或不确定、2 = 明显；看不清的项不评分
- 总分 ≥ 4/10（或按已评分项折算 ≥ 0.4）提示可能需要镇痛，应联系兽医
- 只适用于急性疼痛，不适用于关节炎等慢性疼痛
- 研究显示主人也能较可靠地使用；官网有简体中文版

## 4. 内容写作规则

- 用自己的话写，不复制原文；必要时引用一个不超过一句的短语，并标注来源
- 不复制、不描摹 WSAVA 图表或 Feline Grimace Scale 的图片；只放链接，示意图原创
- 一条建议有两个 B 级来源，或一个 A 级来源，才能标为 `verified`
- 来源之间有分歧时，采用对猫更保守的说法，并在卡片里说明存在区间
- 每 12 个月复查一次链接和内容

## 5. 待核对清单

以下内容在实现时先建 `draft` 条目，核对后更新本文件再改为 `verified`：

| # | 内容 | 用于 | 建议去哪找 |
|---|---|---|---|
| P1 | 非减重期体重下降多少需要提醒就医 | F1.2 | AAHA 2021 营养指南正文；兽医意见 |
| P2 | 老年猫 6 分体况如何向主人呈现 | F1.3 | S19；兽医意见 |
| P3 | 体况评分向导 3 道题的选项措辞与分数映射 | F1.3 | 对照 S03 官方图表逐条核对 |
| P4 | 肌肉评分（MCS）的主人自查描述 | F1.3 P1 | S03 猫肌肉评分图 |
| P5 | 耳朵、尾巴、姿势等行为信号的含义 | F2.2 | iCatCare、AAFP 主人资料、兽医行为学教材 |
| P6 | 更多分诊规则（呕吐带血、腹泻、精神萎靡、躲藏、突然后腿无力等） | F3.1 | Cornell Feline Health Center、Merck Veterinary Manual 主人版 |
| P7 | 对猫有毒的常见食物和植物 | F0.2 / F3.1 | S07 参考文献；ASPCA 动物毒物控制中心 |

**强烈建议**：找一位执业兽医审核 `verified` 内容，在卡片上显示"经 XX 兽医审核"。这会成为产品和账号最大的可信度来源。
