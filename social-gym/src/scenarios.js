// 场景库。字符串 = 仅中文；{zh,en} = 双语。缺少 en 时自动回退中文。
// timeline: [谁, 内容, 补充线索(时机/语气/肢体)]
// signals: {id,type(见 TAX.signals),layer(见 TAX.layers),beat(timeline 序号),text}
// veteran: 老手回应 {say, mech[], why, limits, delivery}；pitfalls: 容易翻车的回应
window.SCENARIOS = [];
(function () {
  const S = (o) => window.SCENARIOS.push(o);

  /* ================= 化解尴尬 ================= */
  S({ id: 'a1', domain: 'work', topic: 'awkward', dims: { parties: 1, subtext: 1, power: 2, heat: 1 },
    title: { zh: '电梯里的冷场', en: 'Silence in the elevator' },
    setup: { zh: '早上电梯里只有你和不太熟的部门总监。电梯上行，空气安静。', en: 'Just you and a director you barely know in the elevator. It is silent.' },
    timeline: [
      ['总监', '（低头看手机，抬头与你对视一秒）', '微微点头，没说话'],
      ['总监', '（又低头）', '电梯已过了 3 层，没人开口'],
      ['总监', '“……今天挺冷的。”', '声音很轻，没看你']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'a1s1', type: 'body', layer: 'relation', beat: 0, text: '对视后点头 = 认可你的存在，是开放而非拒绝的信号，只是没有动力主动开启。' },
      { id: 'a1s2', type: 'timing', layer: 'subtext', beat: 1, text: '沉默过了好几层才开口：对方也在“要不要说话”里犹豫，尴尬是双向的。' },
      { id: 'a1s3', type: 'wording', layer: 'tone', beat: 2, text: '“今天挺冷的”是低风险的“搭桥句”——不需要深入回答，只需要一个回应来确认彼此。' },
      { id: 'a1s4', type: 'power', layer: 'power', beat: 2, text: '地位高的人先出了手，你给出的回应会被记住的往往不是内容，而是温度。' }
    ],
    veteran: [
      { say: { zh: '“是啊，早上一出门我就后悔没加外套。您是不是也是被天气骗了？”', en: '“Right? I regretted not bringing a coat. Did the weather fool you too?”' }, mech: ['partial', 'humor'], why: '接住搭桥句，加一点自我暴露和轻松感，并留一个很容易回答的小钩子。', limits: '对方很赶时间、明显不想聊时不要追问。', delivery: '语速自然，微笑，半句话收尾，不要拖长。' },
      { say: { zh: '“对，这两天降温特别明显。您周末有没有躲在家里？”', en: '“Yes, it dropped fast. Did you hide at home this weekend?”' }, mech: ['redirect'], why: '把天气转到轻松的个人话题，成本低，便于对方延续或礼貌结束。', limits: '对象明显偏私密或严肃时，换更中性话题。', delivery: '问完就停，接受对方“嗯”一声的结束。' },
      { say: { zh: '“嗯，是挺冷。”（微笑点头，不再追加）', en: '“Yeah, it is cold.” (smile, nod, stop)' }, mech: ['slow'], why: '不是每次都要“多说”。礼貌承接+舒服的沉默，同样体面。', limits: '如果你想建立关系，这个回应过于保守。', delivery: '眼神温和，不要低头看手机以免显得冷漠。' }
    ],
    pitfalls: [{ say: '“是啊是啊，真的好冷好冷！我昨天……（连讲一分钟）”', cost: '用力过猛：对方只想要一个轻量互动，被迫承受过多信息反而更尴尬。' }]
  });

  S({ id: 'a2', domain: 'public', topic: 'awkward', dims: { parties: 3, subtext: 2, power: 1, heat: 2 },
    title: { zh: '说错话的那一秒', en: 'The slip of the tongue' },
    setup: { zh: '饭局上你随口说：“你们公司不是最近在裁员吗？”桌上突然安静，对方是刚入职的新同事。', en: 'At dinner you blurt out, “Isn’t your company laying people off?” The table goes quiet; the person was just hired.' },
    timeline: [
      ['新同事', '“……啊，也不算吧。”', '笑容僵了一下，眼神移向杯子'],
      ['旁人', '（互相看了一眼）', '一个人开始低头夹菜'],
      ['新同事', '“反正我们组还好。”', '语速变快']
    ],
    prompt: '你怎么收场？',
    signals: [
      { id: 'a2s1', type: 'body', layer: 'tone', beat: 0, text: '笑容僵、眼神回避：话触到了敏感点，对方正努力保持体面。' },
      { id: 'a2s2', type: 'audience', layer: 'relation', beat: 1, text: '旁人互看+夹菜：全桌在等你如何处理，同时也在回避让当事人更难堪。' },
      { id: 'a2s3', type: 'timing', layer: 'subtext', beat: 2, text: '语速突然变快：在转移尴尬，也说明想快点结束这个话题。' },
      { id: 'a2s4', type: 'face', layer: 'relation', beat: 0, text: '“也不算吧”是在留面子。你若继续追问，会逼他在多人面前继续解释。' }
    ],
    veteran: [
      { say: { zh: '“哎，我这嘴快过脑子了，不该在饭桌上聊这个。来，我敬你一杯，欢迎加入！”', en: '“My mouth outran my brain — wrong topic for dinner. Here’s to you, welcome aboard!”' }, mech: ['humor', 'saveFace'], why: '一句话完成：承认失误（自嘲）+ 立即给对方台阶 + 切换到正向的欢迎。', limits: '如果对方真有裁员焦虑，之后私下可以补一句关心。', delivery: '诚恳但不沉重，语速稍快后立即举杯，结束话题。' },
      { say: { zh: '“抱歉，刚才说得太随便了。你们最近是不是项目挺多？” ', en: '“Sorry, that was careless. Busy projects lately?”' }, mech: ['nameFact', 'redirect'], why: '简短道歉不拖泥带水，随即把话题引到对方更舒服的方向。', limits: '不要在道歉后再加解释，会让事情更重。', delivery: '看着对方说抱歉，然后自然环视全桌，让话题流动。' },
      { say: { zh: '（饭后私下）“刚才我那句话有点冒失，希望没让你不舒服。”', en: '(afterwards, privately) “That was clumsy of me — hope I didn’t make it awkward.”' }, mech: ['saveFace'], why: '私下补救比当众反复道歉更有诚意，也不再次吸引注意力。', limits: '只说一次，不要变成反复要求对方安慰你。', delivery: '简短、不要求对方回应。' }
    ],
    pitfalls: [
      { say: '“不是不是，我就是听说的，你别介意啊，我真的不是那个意思……（连续解释）”', cost: '过度解释会把注意力钉在尴尬上，也把安抚对方的责任转给了对方。' },
      { say: '“哈哈开玩笑啦！”', cost: '用玩笑抹掉事实，对方会觉得自己的感受被无视。' }
    ]
  });

  S({ id: 'a3', domain: 'public', topic: 'awkward', dims: { parties: 4, subtext: 2, power: 1, heat: 1 },
    title: { zh: '插不进去的圈子', en: 'Outside the circle' },
    setup: { zh: '聚会上有四个人聊得热火朝天，你站在边上端着杯子，已经三分钟没人看你。', en: 'Four people are deep in a lively chat; you stand holding a drink and nobody has looked at you for three minutes.' },
    timeline: [
      ['圈内A', '“上次那家店你们记得吗，那个老板……”', '身体朝向圈内，背对你一侧'],
      ['圈内B', '“哈哈哈对对对！”', '圈子很紧凑，没有留缺口'],
      ['圈内C', '（瞥了你一眼，又转回去）', '短暂，未微笑']
    ],
    prompt: '你怎么做？',
    signals: [
      { id: 'a3s1', type: 'body', layer: 'relation', beat: 0, text: '站位封闭、背对：这是“内部话题模式”，不是排斥你，而是话题太专属。' },
      { id: 'a3s2', type: 'body', layer: 'relation', beat: 2, text: 'C 的一瞥是“开门”的最小信号——他意识到你的存在，是最容易接入的人。' },
      { id: 'a3s3', type: 'wording', layer: 'subtext', beat: 0, text: '话题依赖共同回忆（那家店）。直接插话很难，先从“好奇提问”进入更自然。' },
      { id: 'a3s4', type: 'unsaid', layer: 'subtext', beat: 1, text: '没人刻意不让你加入，也没人替你开口。需要你自己制造低成本入口。' }
    ],
    veteran: [
      { say: { zh: '（靠近 C，笑着）“我完全不在状况内，你们说的那家店，到底有什么传说？”', en: '(to C, smiling) “I’m totally out of the loop — what’s the legend of that place?”' }, mech: ['curious', 'humor'], why: '承认“不在状况”让别人愿意补背景，你从旁观者变成“被科普的对象”，自然进圈。', limits: '问完要真正听；不能每次都做新手角色。', delivery: '先对 C 点头微笑，稍等一个话尾再开口，不抢话。' },
      { say: { zh: '（等笑声间隙）“我之前也去过类似的店，老板是不是特别会推荐？”', en: '(during a laugh) “I’ve been to a similar place — was the owner a great recommender?”' }, mech: ['redirect'], why: '把自己的相关经验用问题的方式放入对话，不打断主线。', limits: '如果完全无相关经验，不要编造。', delivery: '趁笑声或换气时介入。' },
      { say: { zh: '（暂时离开，去拿点吃的，回来时找另一个落单的人聊天）', en: '(step away, then find another person on their own)' }, mech: ['slow'], why: '换一个更容易的入口，也是老手常用的策略——不要在最封闭的圈子里硬挤。', limits: '不要把“离开”变成躲避的习惯。', delivery: '自然，不显得受挫。' }
    ],
    pitfalls: [{ say: '（突然大声说）“你们在聊什么呀！我也想听！”', cost: '强行抢焦点，让整个圈子被迫停下来照顾你，反而加强了边缘感。' }]
  });

  S({ id: 'a4', domain: 'work', topic: 'awkward', dims: { parties: 5, subtext: 1, power: 2, heat: 2 },
    title: { zh: '自己当众出糗', en: 'Publicly fumbling' },
    setup: { zh: '你在 10 人会议上汇报，报错了一个关键数据，同事当场指出。会议室里有几秒的沉默。', en: 'In a 10-person meeting you quote a wrong key number and a colleague points it out. A few seconds of silence.' },
    timeline: [
      ['同事', '“你这个数字是不是对不上上周的？”', '语气平，没有恶意'],
      ['全场', '（几个人低头看资料）', '沉默约 3 秒'],
      ['上级', '（面无表情看着屏幕）', '没有说话']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'a4s1', type: 'tone', layer: 'tone', beat: 0, text: '语气平、没有嘲讽：对方是在核对，不是攻击。不要把事实纠错当成人身攻击。' },
      { id: 'a4s2', type: 'audience', layer: 'relation', beat: 1, text: '大家低头：是给你留空间，而不是在看你笑话。' },
      { id: 'a4s3', type: 'power', layer: 'power', beat: 2, text: '上级沉默=在观察你如何处理，而不是你错没错。恢复速度比错误本身更重要。' },
      { id: 'a4s4', type: 'heat', layer: 'subtext', beat: 1, text: '你的心跳加速/脸热是自己的情绪温度，会让你觉得全场都在评判你——其实多数人几秒后就翻篇。' }
    ],
    veteran: [
      { say: { zh: '“你说得对，这个数我需要核实。我现在查一下上周版本，两分钟内更正给大家。”', en: '“You’re right — let me verify. I’ll check last week’s version and correct it within two minutes.”' }, mech: ['nameFact', 'partial'], why: '直接承认+给出具体动作和时间，把“错误”转成“可靠的处理”。', limits: '只用一次，不要连续出现多个更正。', delivery: '平稳、稍微放慢，不道歉过度。' },
      { say: { zh: '“谢谢指出，这个数确实不对。正确的是X，其余结论不受影响。”', en: '“Thanks for catching that. The correct figure is X; the rest holds.”' }, mech: ['nameFact', 'redirect'], why: '感谢+更正+把焦点拉回结论，让会议继续流动。', limits: '必须确定“其余结论不受影响”才能说。', delivery: '说完就继续，不要停留。' }
    ],
    pitfalls: [
      { say: '“呃……可能是系统导出的问题，不是我……”', cost: '甩锅或找借口，会让别人更在意“你的态度”而不是数字。' },
      { say: '“不好意思不好意思，我太粗心了，对不起大家！”', cost: '过度道歉把小错放大，还让全场需要来安慰你。' }
    ]
  });

  S({ id: 'a5', domain: 'public', topic: 'awkward', dims: { parties: 4, subtext: 2, power: 2, heat: 2 },
    title: { zh: '饭桌上被追问隐私', en: 'Probed about private matters' },
    setup: { zh: '亲友聚餐，一位不太熟的长辈当着大家的面问：“你一个月到底赚多少？什么时候买房结婚？”', en: 'At a family dinner, a distant elder asks in front of everyone: “How much do you earn? When will you buy a home and marry?”' },
    timeline: [
      ['长辈', '“你现在一个月到手多少？”', '身体前倾，笑着'],
      ['长辈', '“我这是关心你，你们年轻人别藏着。”', '语气提高，周围有人附和'],
      ['旁人', '（看向你，等回答）', '气氛稍紧']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'a5s1', type: 'tone', layer: 'tone', beat: 0, text: '笑着问：问的人不一定恶意，但话题本身越界。' },
      { id: 'a5s2', type: 'wording', layer: 'subtext', beat: 1, text: '“我这是关心你”是把越界包装成善意，让你拒绝时显得不领情。' },
      { id: 'a5s3', type: 'audience', layer: 'relation', beat: 1, text: '周围附和：群体压力在增加，直接硬拒绝会被解读为“不给面子”。' },
      { id: 'a5s4', type: 'power', layer: 'power', beat: 0, text: '长辈辈分带来的隐性权力，你的拒绝需要更体面的形式。' }
    ],
    veteran: [
      { say: { zh: '“哈哈，工资这事我一向保密，怕被你们按着请客。倒是您最近身体怎么样？”', en: '“Ha, my salary is classified — I’d be forced to pay for dinner! How have you been lately?”' }, mech: ['humor', 'boundary', 'redirect'], why: '用笑话轻轻挡住，同时把话题转回对方，既保留边界又给了面子。', limits: '对方连续追问时需要更清晰一点（见下一条）。', delivery: '笑着、语速轻快，转移问题要真诚感兴趣。' },
      { say: { zh: '“谢谢您关心，这些我心里有数。我们聊点开心的，您上次提到的那个旅行怎么样了？”', en: '“Thanks for caring, I have it in hand. Let’s talk about something fun — how was that trip you mentioned?”' }, mech: ['partial', 'boundary', 'redirect'], why: '先接受“关心”的善意，但不接受话题，再给出替代话题。', limits: '语气不能冷，否则变成对立。', delivery: '平稳、微笑、不解释具体原因。' },
      { say: { zh: '“这个问题我更想等有结果了再跟大家分享。”', en: '“I’d rather share that when there’s something to share.”' }, mech: ['boundary', 'delay'], why: '清楚的边界，用“等有结果”给对方一个体面的下台阶。', limits: '对非常坚持的人可重复一次，之后换话题。', delivery: '轻缓，不要面带怒气。' }
    ],
    pitfalls: [{ say: '“这是我自己的事，您别管。”', cost: '正面硬刚会让周围觉得你“不懂事”，反而让对方占了道德上风。' }]
  });

  S({ id: 'a6', domain: 'work', topic: 'awkward', dims: { parties: 4, subtext: 2, power: 2, heat: 2 },
    title: { zh: '别人当众出糗，你要不要出手', en: 'Someone else fumbles — step in?' },
    setup: { zh: '同事小林在汇报，被客户追问一个细节，他明显答不上来，脸红，已经沉默了五秒。你正好知道答案。', en: 'Your colleague Lin is stuck on a client’s question, red-faced and silent for five seconds. You know the answer.' },
    timeline: [
      ['客户', '“这个数据口径是怎么定义的？”', '直接盯着小林'],
      ['小林', '“这个……我记得……”', '声音发抖，手在翻资料'],
      ['小林', '（沉默）', '眼神扫向你，很快移开']
    ],
    prompt: '你怎么做？',
    signals: [
      { id: 'a6s1', type: 'timing', layer: 'tone', beat: 2, text: '沉默超过 4–5 秒，说明他已经卡住，不是在思考。' },
      { id: 'a6s2', type: 'body', layer: 'relation', beat: 2, text: '扫向你又移开：想求助，但又怕显得无能——他需要一个“不丢脸的救场”。' },
      { id: 'a6s3', type: 'face', layer: 'subtext', beat: 1, text: '如果你直接替他回答，客户可能觉得他不专业；你也可能显得“抢功”。' },
      { id: 'a6s4', type: 'power', layer: 'power', beat: 0, text: '客户占上风，场面的“主导权”在客户手里，你的介入方式会影响整个团队形象。' }
    ],
    veteran: [
      { say: { zh: '“这个口径我们团队前期讨论过，小林可以补充一下，我先把背景简单讲两句。”', en: '“We discussed that definition earlier. Lin can add detail — let me give a bit of background first.”' }, mech: ['saveFace', 'redirect'], why: '把“救场”包装成“团队补充”，既给了信息，又保住小林的位置。', limits: '之后要让小林继续，不要全程接管。', delivery: '平稳、自然地接话，不显得拯救。' },
      { say: { zh: '“这个问题很关键，我们把口径文档共享一下，会后一并发给您，可以吗？”', en: '“Good question — we’ll share the definition document right after the call, if that works.”' }, mech: ['delay', 'saveFace'], why: '把即时回答转为“会后补充”，减轻压力，也体现专业。', limits: '客户必须愿意接受延迟回应。', delivery: '语气坚定，不显出拯救。' }
    ],
    pitfalls: [{ say: '（直接大声说）“口径是XXX，小林你没准备好吗？”', cost: '公开点出对方的不足，伤害信任，也影响客户对团队的评价。' }]
  });
})();

(function () {
  const S = (o) => window.SCENARIOS.push(o);

  /* ================= 应对挑衅/贬低 ================= */
  S({ id: 'p1', domain: 'work', topic: 'provoke', dims: { parties: 4, subtext: 3, power: 1, heat: 2 },
    title: { zh: '伪装成玩笑的贬低', en: 'Put-down disguised as a joke' },
    setup: { zh: '周会上同事阿杰笑着说：“他嘛，PPT 做得多，真正干的活嘛……哈哈哈。”几个人跟着笑，说的是你。', en: 'At the weekly meeting Jay laughs: “Oh him — lots of slides, not so much actual work, hahaha.” A few people laugh along. He means you.' },
    timeline: [
      ['阿杰', '“他嘛，PPT 做得多，真正干的活嘛……哈哈哈。”', '笑着，看向周围人而不是你'],
      ['同事们', '（两三个人跟着笑）', '另一些人看向你，等反应'],
      ['上级', '（没说话，抬眼看你）', '观察']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'p1s1', type: 'body', layer: 'power', beat: 0, text: '他看向周围人而不是你：在“拉观众”，目的是借群体制造压力。' },
      { id: 'p1s2', type: 'wording', layer: 'subtext', beat: 0, text: '“……嘛”的拖音+“哈哈哈”：玩笑的壳，保留“我只是开玩笑”的退路。' },
      { id: 'p1s3', type: 'audience', layer: 'relation', beat: 1, text: '有人笑、有人看你：旁人在等你示弱还是反击，你的反应将定下“你是什么样的人”。' },
      { id: 'p1s4', type: 'power', layer: 'power', beat: 2, text: '上级的沉默观察：他在看你的情绪控制和处理方式。' }
    ],
    veteran: [
      { say: { zh: '（微笑、放慢）“PPT 多是因为想让大家看清楚。具体活儿，上周的两个交付都在这儿，阿杰要不要先看看？”', en: '(smiling, slow) “The slides are so everyone can see clearly. The two deliverables from last week are here — want to look, Jay?”' }, mech: ['slow', 'tossBack', 'partial'], why: '不否认玩笑，却把“证据”轻轻摆出来，并把球抛回对方，让他自己决定要不要继续。', limits: '前提是你确实有成果；语气不要带讽刺。', delivery: '微笑，语速放慢半拍，“阿杰”的称呼要自然。' },
      { say: { zh: '“哈哈，这个说法挺有意思。阿杰，你是想说哪个项目的具体情况？我们可以会后聊。”', en: '“Ha, interesting take. Which project do you mean, Jay? Let’s discuss after.”' }, mech: ['curious', 'delay'], why: '好奇追问+延迟处理，让对方需要“具体说明”才能继续，通常会自动收回。', limits: '如果对方继续纠缠，需要更明确的边界。', delivery: '平静、好奇的语气，不带防御。' },
      { say: { zh: '（会后私下）“刚才那句玩笑我有点在意，下次如果对我的工作有意见，直接跟我说更有效。”', en: '(after the meeting) “That joke bugged me a bit. If you have concerns about my work, tell me directly.”' }, mech: ['nameFact', 'boundary'], why: '私下表达不引发观众效应，成熟而清晰。', limits: '只说一次，不要变成追究。', delivery: '平稳、直视、简短。' }
    ],
    pitfalls: [
      { say: '“你一个整天摸鱼的人好意思说我？”', cost: '反击把局面变成互相攻击，旁观者会记住“冲突”而不是“谁对”。' },
      { say: '（勉强笑笑，什么都不说）', cost: '沉默默认了框架，之后他可能会继续测试边界。' }
    ]
  });

  S({ id: 'p2', domain: 'work', topic: 'provoke', dims: { parties: 6, subtext: 3, power: 2, heat: 3 },
    title: { zh: '跨部门会议上的公开质疑', en: 'Public challenge from another department' },
    setup: { zh: '你在跨部门会上展示方案，对方负责人说：“这个方案是不是没想清楚就拿出来了？”', en: 'Presenting a plan across departments, the other lead says: “Did you even think this through before bringing it here?”' },
    timeline: [
      ['对方负责人', '“这个方案是不是没想清楚就拿出来了？”', '双手抱胸，身体后靠'],
      ['全场', '（突然安静）', '有人看你，有人看他'],
      ['对方负责人', '“我只是觉得这样很浪费大家时间。”', '语速加快']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'p2s1', type: 'body', layer: 'tone', beat: 0, text: '抱胸后靠：防御与对抗姿态，更像“我在审你”而不是“我想理解”。' },
      { id: 'p2s2', type: 'wording', layer: 'subtext', beat: 0, text: '封闭式问句+“是不是”：不是真问题，是结论。' },
      { id: 'p2s3', type: 'alliance', layer: 'relation', beat: 1, text: '全场沉默：每个人都在判断“该站谁”。你的稳定度会影响站队。' },
      { id: 'p2s4', type: 'unsaid', layer: 'subtext', beat: 2, text: '“浪费大家时间”提示：对方可能在担心资源/优先级被占用，而不只是方案质量。' }
    ],
    veteran: [
      { say: { zh: '“你提出的顾虑很重要。能具体说说，是哪几个环节你觉得没想清楚？我现在先把这几处记下来。”', en: '“That’s an important concern. Which parts do you feel are not thought through? I’ll note them now.”' }, mech: ['curious', 'partial'], why: '把笼统攻击变成具体问题，并把“记下来”变成建设性动作，让对方难以继续空泛指责。', limits: '如果对方给不出具体点，不要追打，直接推进。', delivery: '沉稳、不急着辩解，拿笔真的记下来。' },
      { say: { zh: '“我们这个方案花了两周验证，核心数据在第三页。您的担心如果是资源占用，我们可以先看这块影响多大。”', en: '“We validated this for two weeks; core data is on page 3. If your worry is resource use, let’s look at that impact first.”' }, mech: ['reframe', 'redirect'], why: '把攻击重述为“可能的资源担忧”，既给了台阶又把话题拉到可讨论的问题。', limits: '需要你真的有数据和备选方案。', delivery: '语气平稳，不抢话，数据具体。' },
      { say: { zh: '“我们先听完你的所有意见，然后一起列一个需要补充的清单，会后一周内给你回复，可以吗？”', en: '“Let’s hear all your concerns, list what needs more detail, and I’ll get back within a week — okay?”' }, mech: ['delay', 'saveFace'], why: '把对抗转为“流程”，保住双方面子，同时避免当场争吵。', limits: '会后必须兑现回复，否则会被反向利用。', delivery: '平静、带一点合作感。' }
    ],
    pitfalls: [{ say: '“你根本没看懂我们的方案就乱说。”', cost: '攻击对方理解力会激化对抗，让全场看到“冲突”而非“方案”。' }]
  });

  S({ id: 'p3', domain: 'public', topic: 'provoke', dims: { parties: 5, subtext: 2, power: 1, heat: 2 },
    title: { zh: '激将：“你不敢吧？”', en: 'Goaded: “You wouldn’t dare”' },
    setup: { zh: '朋友聚会，有人起哄让你喝第三杯，说：“你该不会连这点酒都不敢喝吧？”', en: 'At a party someone pushes a third drink: “Don’t tell me you can’t even handle this?”' },
    timeline: [
      ['起哄者', '“来啊，你是不是不给面子？”', '举杯，笑着'],
      ['旁人', '（跟着起哄）', '两三个人附和'],
      ['你', '（心里想拒绝，但不想扫兴）', '']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'p3s1', type: 'wording', layer: 'subtext', beat: 0, text: '“不给面子”把你的拒绝重新定义成“对关系的不尊重”——这是典型的激将框架。' },
      { id: 'p3s2', type: 'audience', layer: 'power', beat: 1, text: '附和者增加：群体压力的升温。' },
      { id: 'p3s3', type: 'unsaid', layer: 'subtext', beat: 2, text: '你的内心冲突（想拒绝却怕扫兴）正是对方利用的缺口。' }
    ],
    veteran: [
      { say: { zh: '“我今天的量已经到了，再喝就变成大家的麻烦了。我用茶陪你喝这杯，你随意！”', en: '“I’m at my limit — more would make me everyone’s problem. I’ll toast with tea, you do as you like!”' }, mech: ['boundary', 'humor'], why: '清楚的边界+用行动（茶）保持参与感，不扫兴。', limits: '需要诚实表达自己的底线，不要用谎言。', delivery: '笑着、举杯、语气平稳。' },
      { say: { zh: '“给不给面子，不看一杯酒，看我以后帮你多少忙！这杯我跳过。”', en: '“Respect isn’t measured in drinks — look at how much I help you. I’ll skip this one.”' }, mech: ['reframe', 'boundary'], why: '把“面子”重新定义成长期关系，拒绝得有力又带温度。', limits: '需与对方关系足够熟；对陌生人用更轻的说法。', delivery: '笑着，语气轻快。' }
    ],
    pitfalls: [{ say: '（勉强喝下去，然后后悔）', cost: '用身体付出换面子，习惯一旦形成会被反复测试。' }]
  });

  S({ id: 'p4', domain: 'work', topic: 'provoke', dims: { parties: 6, subtext: 3, power: 1, heat: 2 },
    title: { zh: '群里的阴阳怪气', en: 'Passive-aggressive group chat' },
    setup: { zh: '你忙了一天，晚上在工作群里看到同事@你：“哟，某些人今天终于有空回消息了啊。”', en: 'After a busy day, a colleague tags you in the work chat: “Oh, someone finally has time to reply today.”' },
    timeline: [
      ['同事', '“哟，某些人今天终于有空回消息了啊。”', '晚上 8:42，@了你'],
      ['同事', '😊', '末尾加了一个微笑表情'],
      ['群', '（没人回应）', '已读 12 人']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'p4s1', type: 'wording', layer: 'subtext', beat: 0, text: '“某些人”“终于”：用泛指加讽刺，保持“我没点名”的退路，但@了你。' },
      { id: 'p4s2', type: 'wording', layer: 'tone', beat: 1, text: '微笑表情让攻击带了“我很友好”的外衣——这是被动攻击的典型。' },
      { id: 'p4s3', type: 'audience', layer: 'relation', beat: 2, text: '已读 12 人无人回应：围观者在等你，也在避免站队。' },
      { id: 'p4s4', type: 'timing', layer: 'power', beat: 0, text: '晚上发这个：可能同事自己被工作压着，把焦虑转移到你身上。' }
    ],
    veteran: [
      { say: { zh: '“抱歉让你等了，白天一直在外面。你要的资料我现在发你，看看合不合用。”', en: '“Sorry to keep you waiting — I was out all day. Sending the files now; see if they work.”' }, mech: ['partial', 'redirect'], why: '承认等待（事实）不认同指责（情绪），直接给解决方案，让攻击失去着力点。', limits: '不必为“没立刻回复”过度道歉。', delivery: '文字平稳，不加表情包讨好。' },
      { say: { zh: '“收到。你这边是急着要哪一项？我先优先处理。”', en: '“Got it. Which item is urgent? I’ll prioritize it.”' }, mech: ['curious', 'redirect'], why: '把情绪化的表达转为具体需求，也让对方看见“真正的优先级”。', limits: '如果对方惯性这样，之后需要私下沟通模式。', delivery: '简短，不辩解。' },
      { say: { zh: '（私聊）“看到你群里那句，感觉你有点着急？有什么我可以帮你分担的吗？”', en: '(DM) “Saw your message — feeling pressed? Anything I can take off your plate?”' }, mech: ['curious', 'nameFact'], why: '把公开的暗讽转为私下的关心，常能直接了解真实原因。', limits: '只在你愿意关心时使用，不要变成讽刺反击。', delivery: '真诚、避免“你是不是”的指责口吻。' }
    ],
    pitfalls: [{ say: '“有些人整天只会在群里阴阳怪气，不如自己多做点事。”', cost: '同样的暗讽反击，会让整个群看到“两个人在吵”，双方都受损。' }]
  });

  S({ id: 'p5', domain: 'work', topic: 'provoke', dims: { parties: 6, subtext: 3, power: 3, heat: 2 },
    title: { zh: '抄送所有人的甩锅', en: 'Blame, cc’d to everyone' },
    setup: { zh: '一个项目出了问题，另一部门经理发邮件抄送了 20 人：“这个问题是上周由你们组负责的吧？”', en: 'A project hits trouble; a manager from another team emails 20 people: “This was your team’s responsibility last week, right?”' },
    timeline: [
      ['经理', '“这个问题是上周由你们组负责的吧？请尽快处理。”', '抄送全部门+上级'],
      ['邮件', '（附带了一张截图，只截了对你不利的部分）', '时间：周五下班前'],
      ['群', '（没人回复）', '']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'p5s1', type: 'wording', layer: 'subtext', beat: 0, text: '“……吧？”是求确认陷阱：答“是”=承担责任；答“不是”=显得推卸。' },
      { id: 'p5s2', type: 'power', layer: 'power', beat: 0, text: '抄送上级和全部门：他在把问题公开化，提前塑造责任归属的叙事。' },
      { id: 'p5s3', type: 'unsaid', layer: 'subtext', beat: 1, text: '截图只截一部分：信息不完整，是引导而不是中立。' },
      { id: 'p5s4', type: 'timing', layer: 'power', beat: 1, text: '周五下班前：希望你来不及准备，也可能想先下手为强。' }
    ],
    veteran: [
      { say: { zh: '“收到。我这边先梳理一下上周的时间线，周一上午十点前把完整过程和处理方案回复给大家。”', en: '“Received. I’ll compile last week’s timeline and send the full account and fix plan by Monday 10am.”' }, mech: ['delay', 'nameFact'], why: '不接受“责任框架”也不反驳，用“完整时间线”收回叙事主动权，且显得专业。', limits: '要真的准备好，不能只拖延。', delivery: '语气中立，不带情绪。' },
      { say: { zh: '“我们会处理。为了避免误会，我整理一份包含截图完整上下文的时间线，周一发给大家。”', en: '“We’ll handle it. To avoid confusion, I’ll send a timeline with the full screenshot context on Monday.”' }, mech: ['nameFact', 'delay'], why: '轻声指出信息不完整，却没有指责对方。', limits: '语气过硬会变成对抗。', delivery: '“为了避免误会”是关键措辞。' },
      { say: { zh: '（私下联系经理）“邮件看到了，想先和你对一下信息，避免我们两边口径不一致。你方便什么时候通话？”', en: '(privately) “Saw your email. Let’s align details so our accounts match — when can we talk?”' }, mech: ['curious', 'saveFace'], why: '先私下对齐，很多“甩锅”其实是焦虑和信息缺口。', limits: '前提是对方可沟通；若不行再公开澄清。', delivery: '合作式的口吻。' }
    ],
    pitfalls: [{ say: '“这个明显是你们部门没提前沟通导致的，截图也不完整，请不要误导大家。”', cost: '当众反击+指责，把局面升级为互相攻击，上级需要“裁判”，你并不一定赢。' }]
  });

  S({ id: 'p6', domain: 'work', topic: 'provoke', dims: { parties: 5, subtext: 2, power: 2, heat: 2 },
    title: { zh: '被反复打断', en: 'Repeatedly interrupted' },
    setup: { zh: '会上你每次说到一半，同一位同事就插话补充或纠正，这已是第三次。', en: 'In a meeting the same colleague cuts in mid-sentence for the third time.' },
    timeline: [
      ['你', '“这个方案的第一步是——”', ''],
      ['同事', '“对对，我补充一下，其实……”', '抢在你句子结束前'],
      ['同事', '“其实你应该这样讲。”', '第三次，眼睛看着上级']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'p6s1', type: 'timing', layer: 'power', beat: 1, text: '在句子未结束前插入：抢话是在争夺“话语主导权”。' },
      { id: 'p6s2', type: 'body', layer: 'power', beat: 2, text: '眼睛看着上级：他在表演给上级看，而不是在跟你沟通。' },
      { id: 'p6s3', type: 'wording', layer: 'subtext', beat: 2, text: '“你应该这样讲”：把你放在被指导的位置。' }
    ],
    veteran: [
      { say: { zh: '（稍抬手，微笑）“稍等，我把这一段说完，然后你补充，这样大家更清晰。”', en: '(raising a hand, smiling) “One moment — let me finish this part, then you add, so it’s clearer for everyone.”' }, mech: ['boundary', 'saveFace'], why: '清楚设边界+给对方“稍后补充”的位置，不攻击，也不示弱。', limits: '需配合稳定的节奏，不要提高音量。', delivery: '手势轻、微笑、语气稳。' },
      { say: { zh: '“我注意到这是第三次我们的话撞在一起了，我先说完这一块，然后你补充，好吗？”', en: '“I notice this is the third time our points overlapped — let me finish this part, then you add?”' }, mech: ['nameFact', 'boundary'], why: '命名模式而不指责动机，直接而冷静。', limits: '避免用“你总是”之类的概括。', delivery: '语气平静。' },
      { say: { zh: '（继续说话，不停顿，也不提高音量）', en: '(keep speaking at the same volume, without pausing)' }, mech: ['slow'], why: '有时最有效的是不让出话语权——稳定节奏本身就是信号。', limits: '需要对方不是故意挑衅；对强势对手可能升级。', delivery: '语速稳，视线保持在听众上。' }
    ],
    pitfalls: [{ say: '“你能不能让我说完？！”', cost: '音量和情绪升高，容易被解读成“失控”，让对方显得更冷静。' }]
  });

  /* ================= 权力与面子 ================= */
  S({ id: 'w1', domain: 'work', topic: 'power', dims: { parties: 6, subtext: 3, power: 3, heat: 3 },
    title: { zh: '上级当众批评', en: 'Criticized by your boss in public' },
    setup: { zh: '周会上，你的上级说：“这个报告质量太差了，我都不好意思给客户看。”全场安静。', en: 'At the weekly meeting your boss says: “This report is so poor I’m embarrassed to show it to the client.” The room goes silent.' },
    timeline: [
      ['上级', '“这个报告质量太差了，我都不好意思给客户看。”', '语气重，目光直视你'],
      ['全场', '（没人动）', '有人转笔，有人低头'],
      ['上级', '“你自己说说怎么回事。”', '等你回答']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'w1s1', type: 'tone', layer: 'tone', beat: 0, text: '语气重+直视：不是在讨论，是在表达强烈不满，可能含有压力情绪而非单纯针对你。' },
      { id: 'w1s2', type: 'audience', layer: 'relation', beat: 1, text: '大家的回避是在给你留空间，也在避免被波及。' },
      { id: 'w1s3', type: 'face', layer: 'subtext', beat: 2, text: '“你自己说说”：给你一个机会，也可能是在测试你的反应——是辩解、认错，还是给出方案。' },
      { id: 'w1s4', type: 'power', layer: 'power', beat: 0, text: '公开批评的目的可能是“立规矩”，你的回应质量会被全场看到。' }
    ],
    veteran: [
      { say: { zh: '“您说的标准我理解。我现在能说的是：这份报告的问题在第二部分的数据口径，我今天下班前给您修订版，并说明改动。”', en: '“I understand the standard. The issue is the data basis in part two; I’ll send you a revision with change notes by end of day.”' }, mech: ['partial', 'nameFact'], why: '不辩解、不过度道歉，直接把问题具体化并给出时间点，展示可控与可靠。', limits: '你必须真的有准备；不要承诺做不到的时限。', delivery: '稳定、略慢、直视，不抖。' },
      { say: { zh: '“收到，我确实没有做到您要的标准。能告诉我您最关注的是哪两点吗？我按这个重做。”', en: '“Received — I didn’t meet your standard. Which two points matter most to you? I’ll redo it accordingly.”' }, mech: ['partial', 'curious'], why: '认下事实、不自我贬低，同时把模糊的“差”转为具体的期待。', limits: '不要把“请指教”变成过度示弱。', delivery: '诚恳、不卑微。' },
      { say: { zh: '（会后私下）“刚才您对报告的评价我记下了，我想再确认几个细节，避免下次再出问题。”', en: '(after the meeting) “I noted your feedback and want to confirm a few details so it doesn’t repeat.”' }, mech: ['delay', 'saveFace'], why: '会后私下沟通，既给上级留面子，也展示你的成长心态。', limits: '会上要有最低限度的回应，不能只沉默。', delivery: '简短、以未来为导向。' }
    ],
    pitfalls: [
      { say: '“其实不是我的问题，是数据组给的数据有问题……”', cost: '当众甩锅会立刻损害信任，即使事实有一部分是真的。' },
      { say: '“对不起对不起，是我太差了，真的很抱歉！”', cost: '过度自我贬低让上级失去对你的预期，也让气氛更重。' }
    ]
  });

  S({ id: 'w2', domain: 'work', topic: 'power', dims: { parties: 5, subtext: 3, power: 3, heat: 2 },
    title: { zh: '会上被抢功', en: 'Credit taken in a meeting' },
    setup: { zh: '你熬了两周做出的方案，在会上被另一位同事用“我们做了一个思路”的口吻讲出来，上级点头称赞。', en: 'The plan you built over two weeks is presented by a colleague as “an approach we came up with,” and your boss nods approvingly.' },
    timeline: [
      ['同事', '“我们团队做了这样一个思路，核心是……”', '用“我们”，没有提你的名字'],
      ['上级', '“不错，这个方向很好。”', '点头'],
      ['同事', '（瞥了你一眼，又移开）', '笑得有点快']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'w2s1', type: 'wording', layer: 'subtext', beat: 0, text: '“我们”的模糊用法：既规避“抢功”的指控，又把成果纳入自己名下。' },
      { id: 'w2s2', type: 'body', layer: 'subtext', beat: 2, text: '瞥一眼又移开：他知道你知道，有心虚也有试探。' },
      { id: 'w2s3', type: 'power', layer: 'power', beat: 1, text: '上级正在形成“谁做出了这个方案”的印象——这是此刻最关键的资源。' },
      { id: 'w2s4', type: 'heat', layer: 'tone', beat: 0, text: '你的愤怒是真实的，但此刻情绪化会削弱你的说服力。' }
    ],
    veteran: [
      { say: { zh: '“补充一下，这个方案的数据部分是我这两周做的，其中第三页的对比模型是关键。XX 的补充部分也很有价值。”', en: '“To add: I built the data section over the past two weeks — the comparison model on page 3 is key. X’s addition is valuable too.”' }, mech: ['nameFact', 'saveFace'], why: '用具体事实自然补回署名，同时肯定对方，避免显得争功。', limits: '语气要平，不要带“你抢了我的”的味道。', delivery: '平稳、微笑、顺着话题加一句。' },
      { say: { zh: '“很高兴方向被认可。我这边有更详细的数据和备选方案，会后我整理一页发给您。”', en: '“Glad the direction resonates. I have more data and alternatives — I’ll send you a one-pager after the meeting.”' }, mech: ['redirect', 'delay'], why: '不当场争功，但自然在上级心里建立“我是细节掌握者”。', limits: '必须真的发，并在邮件里写明作者。', delivery: '轻松，不带敌意。' },
      { say: { zh: '（会后私下对同事）“刚才的汇报里没提到我做的部分，下次提到分工吧，这样上级更清楚我们各自的贡献。”', en: '(privately) “My part wasn’t mentioned — next time let’s credit each part so leadership sees who did what.”' }, mech: ['nameFact', 'boundary'], why: '私下直接说明事实和期望，给对方改进的机会。', limits: '重复发生时需要升级处理。', delivery: '平静、清楚，不带指责。' }
    ],
    pitfalls: [{ say: '“这是我做的，不是你们团队。”', cost: '当场拆台会被视为情绪化，即使事实在你这边。' }]
  });

  /* ================= 亲密关系 ================= */
  S({ id: 'i1', domain: 'close', topic: 'intimacy', dims: { parties: 2, subtext: 3, power: 1, heat: 3 },
    title: { zh: '“没事，随便你。”', en: '“It’s fine. Whatever you want.”' },
    setup: { zh: '你们商量周末安排，你说想跟朋友聚会。伴侣回了一句“没事，随便你。”然后沉默地继续看手机。', en: 'You say you want to meet friends this weekend. Your partner says “It’s fine, whatever you want,” and goes silent on their phone.' },
    timeline: [
      ['你', '“周六我想跟朋友吃个饭，可以吗？”', ''],
      ['伴侣', '“没事，随便你。”', '语气平，没有看你'],
      ['伴侣', '（继续看手机，指尖停了一下）', '比平时安静']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'i1s1', type: 'wording', layer: 'subtext', beat: 1, text: '“没事”“随便”：这类词在亲密关系里常常是“其实有事”的信号。' },
      { id: 'i1s2', type: 'tone', layer: 'tone', beat: 1, text: '语气平、不看你：情绪被压住，不是没感觉。' },
      { id: 'i1s3', type: 'timing', layer: 'subtext', beat: 2, text: '指尖停了一下：话题没有结束，TA 在消化。' },
      { id: 'i1s4', type: 'unsaid', layer: 'subtext', beat: 1, text: '没说出口的可能是：想一起过周末、感到被排在后面，或者最近压力大。' }
    ],
    veteran: [
      { say: { zh: '“我听着你的‘随便’有点像‘有点失落’，是我猜错了吗？我想知道你的真实感受。”', en: '“Your ‘whatever’ sounds a bit like disappointment — am I off? I want to know how you really feel.”' }, mech: ['nameFact', 'curious'], why: '轻轻命名可能的情绪，并开放地邀请对方说真话，不替对方下结论。', limits: '不要用审问语气；对方不想说时给空间。', delivery: '放慢、柔和，靠近一点坐。' },
      { say: { zh: '“好，那我先不定。你这周有没有想一起做的事？我们安排一个只属于我们的时间。”', en: '“Okay, I won’t lock it in. Anything you’d like to do together this week? Let’s plan something just for us.”' }, mech: ['redirect', 'curious'], why: '不把“随便”当字面同意，同时给出对方真正想要的“被重视”。', limits: '如果对方只是疲惫，也要尊重。', delivery: '温和主动，不带负担。' },
      { say: { zh: '“我先去洗个澡，晚点我们再聊一下周末好吗？我想好好听你说。”', en: '“I’ll shower first — can we talk about the weekend later? I want to really listen.”' }, mech: ['delay', 'slow'], why: '给情绪降温的时间，同时让对方知道“你会回来”。', limits: '一定要在承诺时间回来聊。', delivery: '轻柔，不带逃避感。' }
    ],
    pitfalls: [
      { say: '“你每次都这样，有话直说不行吗？”', cost: '指责会让对方更封闭，“每次”把当下事件升级成人格评价。' },
      { say: '“那我就去了。”（拿起手机继续约）', cost: '把字面意思当真实意思，错过了关系中的情绪信号。' }
    ]
  });

  S({ id: 'i2', domain: 'close', topic: 'intimacy', dims: { parties: 2, subtext: 2, power: 1, heat: 3 },
    title: { zh: '好友深夜的“我又搞砸了”', en: 'A friend’s late-night “I messed up again”' },
    setup: { zh: '深夜 11 点，好友发来消息：“我又搞砸了，这次真的完蛋了。”', en: 'At 11pm a close friend texts: “I messed up again. This time I’m really done.”' },
    timeline: [
      ['好友', '“我又搞砸了，这次真的完蛋了。”', '深夜 11:03'],
      ['好友', '“算了，不说了。”', '1 分钟后追加'],
      ['好友', '（正在输入……停止）', '重复了两次']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'i2s1', type: 'timing', layer: 'subtext', beat: 2, text: '“正在输入”反复停止：想说又怕说，在测试你是否安全。' },
      { id: 'i2s2', type: 'wording', layer: 'subtext', beat: 1, text: '“算了，不说了”：这是邀请你追问，而不是真的想结束。' },
      { id: 'i2s3', type: 'heat', layer: 'tone', beat: 0, text: '“完蛋了”“又”：情绪温度高，带有自我否定。此时他不需要方案，而需要被接住。' },
      { id: 'i2s4', type: 'unsaid', layer: 'subtext', beat: 0, text: '“又”暗示这不是第一次——他可能担心让你失望。' }
    ],
    veteran: [
      { say: { zh: '“我在。你想说多少都可以，先不用急着整理，慢慢说。”', en: '“I’m here. Say as much as you like — no need to organize it, take your time.”' }, mech: ['slow', 'curious'], why: '先给“安全感”，不给建议、不评价，让他能把话说出口。', limits: '之后需要真的倾听，而不是等着给建议。', delivery: '简短、温暖，不要立刻发长文。' },
      { say: { zh: '“听起来你现在特别难受。要不要我打给你，还是你想先写下来？”', en: '“Sounds really rough right now. Want me to call, or would you rather write it out?”' }, mech: ['nameFact', 'curious'], why: '命名情绪+让他选择沟通方式，给控制感。', limits: '深夜时需确认自己有余力。', delivery: '轻柔。' },
      { say: { zh: '“不管发生了什么，我们还是朋友。你先告诉我你现在安全吗？”', en: '“Whatever happened, we’re still friends. First: are you safe right now?”' }, mech: ['nameFact'], why: '如果出现强烈绝望信号，优先确认安全，再谈事情。', limits: '若有伤害自己的迹象，应鼓励寻求专业或紧急帮助。', delivery: '直接、平静。' }
    ],
    pitfalls: [
      { say: '“别想太多，明天就好了！下次注意就行。”', cost: '过快安慰/给方案会让他觉得被打发，难以继续敞开。' },
      { say: '“你上次也说这样，你到底有没有吸取教训？”', cost: '翻旧账让朋友羞耻感加深，对话关闭。' }
    ]
  });

  /* ================= 大场合 ================= */
  S({ id: 'e1', domain: 'public', topic: 'event', dims: { parties: 5, subtext: 2, power: 1, heat: 1 },
    title: { zh: '行业活动上的破冰', en: 'Breaking the ice at an industry event' },
    setup: { zh: '行业活动的茶歇区，你一个人也不认识。一位也独自拿着咖啡的人站在你旁边，看起来在看手机。', en: 'At the coffee break of an industry event, you know nobody. Someone alone with a coffee stands next to you, glancing at their phone.' },
    timeline: [
      ['陌生人', '（看手机，偶尔抬头环视）', '没有看你'],
      ['陌生人', '（看到你，微微点头）', '嘴角有一点点笑意'],
      ['陌生人', '（又低头）', '但脚尖朝向你这边']
    ],
    prompt: '你怎么开启对话？',
    signals: [
      { id: 'e1s1', type: 'body', layer: 'relation', beat: 1, text: '点头+微笑：开放信号。' },
      { id: 'e1s2', type: 'body', layer: 'relation', beat: 2, text: '脚尖朝向你：身体语言仍在“可接触”状态。' },
      { id: 'e1s3', type: 'unsaid', layer: 'subtext', beat: 0, text: '独自看手机常是“缓解不知所措”，而不是“不想聊”。' }
    ],
    veteran: [
      { say: { zh: '“你是哪个环节过来的？刚才那场分享你觉得怎么样？”', en: '“Which session did you come from? What did you think of the last talk?”' }, mech: ['curious', 'redirect'], why: '以“共同处境”为话题（同一场活动），低压、好回答、能延伸。', limits: '避免第一句就问职位/收入。', delivery: '微笑、停一秒，等对方回应。' },
      { say: { zh: '“我今天一个人都不认识，您看起来比我熟，有什么推荐的场次吗？”', en: '“I don’t know anyone here — you look more familiar. Any sessions you’d recommend?”' }, mech: ['humor', 'curious'], why: '自我暴露一点点“不熟”，邀请对方扮演向导，降低对方的社交压力。', limits: '不要过度示弱。', delivery: '轻松、半开玩笑。' }
    ],
    pitfalls: [{ say: '“你好！我是XX公司的，我们在做一个很棒的产品，想和你聊聊合作！”', cost: '一开口就是推销，会让对方立刻警惕、想逃。' }]
  });

  S({ id: 'e2', domain: 'public', topic: 'event', dims: { parties: 2, subtext: 2, power: 1, heat: 1 },
    title: { zh: '体面地结束一场对话', en: 'Leaving a conversation gracefully' },
    setup: { zh: '一位热情的人拉着你讲了 15 分钟，你想去找另一位朋友，但他还在滔滔不绝。', en: 'An enthusiastic person has talked to you for 15 minutes; you want to join someone else, but they keep going.' },
    timeline: [
      ['对方', '“……所以我就跟他们说，我们必须这么做。”', '语速快，不给停顿'],
      ['你', '（眼神开始四处看）', ''],
      ['对方', '“对了，还有一件事……”', '又起新话题']
    ],
    prompt: '你怎么结束？',
    signals: [
      { id: 'e2s1', type: 'timing', layer: 'relation', beat: 0, text: '语速快、无停顿：对方没给你插入空间，需要你主动制造退场点。' },
      { id: 'e2s2', type: 'unsaid', layer: 'subtext', beat: 2, text: '“还有一件事”：对方在延长对话，可能需要被关注，而不是被打断。' },
      { id: 'e2s3', type: 'face', layer: 'relation', beat: 0, text: '退场要让对方感到“被重视”，否则会感到被丢下。' }
    ],
    veteran: [
      { say: { zh: '“跟你聊特别有收获，我答应了要去跟 XX 打个招呼。待会儿我们再找机会继续聊？”', en: '“This was really valuable — I promised to say hi to X. Let’s catch up again later?”' }, mech: ['saveFace', 'boundary'], why: '先给价值肯定，再说明离开原因，并留一个“之后继续”的出口。', limits: '承诺“待会儿”就要真的兑现一次。', delivery: '微笑、握手或点头，语速放慢。' },
      { say: { zh: '“我得去补充点水，也想多认识几位。你一定要把你刚才说的那个项目的资料发我，我加你联系方式。”', en: '“I need a refill and want to meet a few more people. Send me that project material — let me add your contact.”' }, mech: ['redirect', 'saveFace'], why: '用具体的“后续动作”结束对话，让对方感到被重视。', limits: '不要说了不做。', delivery: '边说边拿出手机，自然。' }
    ],
    pitfalls: [{ say: '（一直看手机/左右张望，不说话）', cost: '暗示不耐烦却不明说，会让对方更难堪，也让你显得不真诚。' }]
  });
})();

(function () {
  const S = (o) => window.SCENARIOS.push(o);

  /* ================= 读懂他人 / 复杂局面 ================= */
  S({ id: 'r1', domain: 'read', topic: 'read', dims: { parties: 5, subtext: 3, power: 3, heat: 2 },
    title: { zh: '会议室里的“挺好的”', en: 'Everyone says “looks good”' },
    setup: { zh: '你在评审会上提出一个新方案。同事们纷纷说“挺好的”“可以的”，只有老板一直没说话，低头翻着材料。会议在一片和气中结束。', en: 'You present a new proposal. Colleagues say “looks good” one after another; only your boss stays silent, flipping through papers. The meeting ends pleasantly.' },
    timeline: [
      ['同事A', '“挺好的，思路很清晰。”', '语速很快，没有追问细节'],
      ['同事B', '“可以的，我没意见。”', '看了老板一眼才说'],
      ['老板', '（翻到第三页停了一下，没有抬头）', '全程没有提问'],
      ['老板', '“行，今天先到这里。”', '合上材料，没有看你']
    ],
    prompt: '你觉得这个方案现在的真实处境是什么？你接下来做什么？',
    signals: [
      { id: 'r1s1', type: 'wording', layer: 'subtext', beat: 0, text: '“挺好的”没有任何具体点：泛泛的肯定常常是“不想表态”，而不是真认可。真感兴趣的人会问问题。' },
      { id: 'r1s2', type: 'alliance', layer: 'power', beat: 1, text: '看了老板一眼才说：B 的表态在等老板的风向，他的“没意见”不代表他自己的判断。' },
      { id: 'r1s3', type: 'timing', layer: 'subtext', beat: 2, text: '老板在第三页停住：那里很可能有他在意的点。停顿是此刻最有信息量的信号。' },
      { id: 'r1s4', type: 'unsaid', layer: 'power', beat: 3, text: '“先到这里”+不看你：决定被推迟到会议之外，真正的反馈会在私下发生。' },
      { id: 'r1s5', type: 'power', layer: 'relation', beat: 2, text: '全场的和气，部分来自“老板没说话时没人敢先挑毛病”，不是方案没有问题。' }
    ],
    veteran: [
      { say: { zh: '（会后单独找老板）“今天会上您翻到第三页停了一下，那部分我担心是不是有哪里没说清楚？想听听您最直接的意见。”', en: '(afterwards, privately) “You paused on page three — is something unclear there? I’d love your most direct view.”' }, mech: ['probe', 'curious'], why: '把一个具体的观察（停在第三页）变成邀请，让老板更容易说出顾虑；你验证的是假设，而不是追问态度。', limits: '不要暗示“你一直没说话”，那会让对方觉得被点名。', delivery: '私下、简短、时间选在老板比较空的时候，语气好奇而不是焦虑。' },
      { say: { zh: '（私下问同事 B）“你觉得老板对这个方向的顾虑可能在哪？我想提前补上。”', en: '(to colleague B) “Where do you think the boss has reservations? I’d like to fill that in early.”' }, mech: ['probe', 'askBack'], why: '用一个不需要对方“站队”的问题收集信息，把“谁支持我”变成“风险在哪”。', limits: '不要追问同事“你到底是不是真的同意”，那会让人防御。', delivery: '随口、合作的语气，避免像在查岗。' },
      { say: { zh: '（会后发给老板一页纸）“补充了三点可能的风险和备选方案，您看哪块需要我细化？”', en: '(a one-pager) “I added three possible risks and fallbacks — which part should I flesh out?”' }, mech: ['delay', 'redirect'], why: '不等对方表态，主动把顾虑摆到桌面上，既显示成熟，也给了老板一个低成本回应的入口。', limits: '内容要有真实的风险分析，不能是形式。', delivery: '简洁、不卑微。' }
    ],
    pitfalls: [
      { say: '（当天追着老板问）“您觉得怎么样？是不是有问题？”', cost: '在没有准备的时候逼对方表态，容易换来一句“再看看”，也暴露了你的不安。' },
      { say: '（相信大家的“挺好的”，直接开始执行）', cost: '把礼貌性的肯定当作授权，之后可能在更高的成本处被否决。' }
    ]
  });

  S({ id: 'r2', domain: 'read', topic: 'read', dims: { parties: 5, subtext: 3, power: 2, heat: 2 },
    title: { zh: '项目群里谁和谁一伙', en: 'Who is aligned with whom in the project chat' },
    setup: { zh: '你在项目群里提了一个分工调整建议。接下来的十分钟里，发生了一些事——你想弄清楚群里的真实格局。', en: 'You propose a task reallocation in the project chat. Over the next ten minutes things happen — you want to understand the real alignment in the group.' },
    timeline: [
      ['你', '“我建议把接口联调提前到周三，大家看看？”', '17:02'],
      ['小周', '“收到。”', '17:03，两秒内回复，没有表情'],
      ['小李', '（给小周下一条消息点了赞，没有回应你）', '17:05'],
      ['小周', '“@小李 周四那个你能先看下吗？”', '17:06，绕开了你的提议'],
      ['小李', '“可以，我周四先弄。”', '17:06，和小周很快对上了节奏']
    ],
    prompt: '这个群里谁在影响谁？你下一步怎么做？',
    signals: [
      { id: 'r2s1', type: 'timing', layer: 'relation', beat: 1, text: '两秒回“收到”：很快，但没有内容。“收到”是确认看见，不是同意。' },
      { id: 'r2s2', type: 'alliance', layer: 'relation', beat: 2, text: '小李给小周点赞、不回你：他在回应对他有意义的人，你的提议被无声地搁置。' },
      { id: 'r2s3', type: 'alliance', layer: 'power', beat: 3, text: '小周直接 @小李 另安排周四：他们在绕开你的提议，形成了自己的节奏。' },
      { id: 'r2s4', type: 'timing', layer: 'subtext', beat: 4, text: '两人几乎同时对上：很可能他们在群外已经沟通过，群里只是确认。' },
      { id: 'r2s5', type: 'unsaid', layer: 'subtext', beat: 3, text: '没有人反对你，也没有人支持你。沉默的反对往往比公开的反对更难应对。' }
    ],
    veteran: [
      { say: { zh: '（私聊小周）“刚看到你和小李在排周四，我的提议可能和你们的节奏冲突了。你们这边实际卡在哪？我想把联调时间放在对你们合适的位置。”', en: '(DM to Zhou) “Looks like my suggestion clashed with your plan for Thursday. What’s the real constraint? I’d like to place the integration where it works for you.”' }, mech: ['probe', 'saveFace'], why: '不指责“绕开我”，而是承认可能的冲突，直接去拿真实约束，把格局问题变成排期问题。', limits: '对方如果真的在刻意孤立你，这样的私聊可能得不到真话——需要更多观察。', delivery: '私聊、语气平稳，不带情绪词。' },
      { say: { zh: '（群里）“我整理了周三/周四两种联调方案的优缺点，大家选一个更不影响各自进度的就行。”', en: '(in the chat) “Here are pros and cons of integrating Wed vs Thu — pick whatever least disrupts your work.”' }, mech: ['redirect', 'partial'], why: '用结构化的选项代替“我的提议”，降低被个人否决的可能，也让沉默的人更容易表态。', limits: '选项要真实，不能是假选择。', delivery: '简洁、客观，不要夹带情绪。' },
      { say: { zh: '（先观察一两天，留意谁的消息总被先回复、谁常被@）', en: '(watch for a day or two: whose messages get answered first, who gets @-ed)' }, mech: ['slow', 'probe'], why: '一次互动不足以判断格局。多看几次，再区分“个人习惯”和“稳定的联盟”。', limits: '观察期不要变成消极回避，该推进的事仍要推进。', delivery: '保持日常的友好互动，不要突然改变态度。' }
    ],
    pitfalls: [{ say: '（在群里）“看来你们已经商量好了？那我的建议是不是没必要提了。”', cost: '公开说出你的猜测，会让对方防御，也把一个排期问题变成了站队冲突。' }]
  });

  S({ id: 'r3', domain: 'read', topic: 'read', dims: { parties: 2, subtext: 3, power: 1, heat: 1 },
    title: { zh: '“改天约”是客套还是真邀请', en: '“Let’s meet sometime” — polite or real?' },
    setup: { zh: '你刚认识的一位行业前辈在活动结束时说：“今天聊得很开心，改天约！”你想知道这到底是客套，还是值得跟进的真邀请。', en: 'An industry senior you just met says at the end of the event: “Great chat — let’s meet sometime!” Is it politeness or a real invitation?' },
    timeline: [
      ['前辈', '“今天聊得很开心，改天约！”', '边说边看了看时间'],
      ['前辈', '“我们加个微信吧。”', '主动拿出了手机'],
      ['你', '（加完微信，他点了个“好友请求已通过”）', ''],
      ['前辈', '（三天后你发了一条消息，他回了一个“👍”）', '没有后续问题']
    ],
    prompt: '这是真邀请吗？你怎么判断，怎么跟进？',
    signals: [
      { id: 'r3s1', type: 'wording', layer: 'subtext', beat: 0, text: '“改天”没有具体时间或事项：真邀请会带一个具体的钩子（时间、话题、地点）。' },
      { id: 'r3s2', type: 'body', layer: 'tone', beat: 0, text: '边说边看时间：他在收尾，这句话更像礼貌的告别语，而不是计划。' },
      { id: 'r3s3', type: 'body', layer: 'relation', beat: 1, text: '主动掏手机加微信：这是真实的行动，比“改天约”更有分量——他愿意保持连接，只是不一定愿意投入时间。' },
      { id: 'r3s4', type: 'wording', layer: 'subtext', beat: 3, text: '只回“👍”、没有问题：对方愿意维持礼貌，但没有打开对话的意愿。' }
    ],
    veteran: [
      { say: { zh: '“今天聊到的那个供应链话题我还想请教，下周您方便的话，我请您喝杯咖啡聊 20 分钟？时间地点您定。”', en: '“I’d love to continue on the supply-chain topic. Could I buy you a coffee for 20 minutes next week? You choose time and place.”' }, mech: ['probe', 'saveFace'], why: '用具体的、低成本的、容易拒绝的邀请来验证对方的意愿：他答应，是真的；他婉拒，也有体面的退路。', limits: '被婉拒后不要追问，换成偶尔分享有价值的信息来保持连接。', delivery: '简短、不卑微，把选择权给对方。' },
      { say: { zh: '（先发一条有价值的信息）“看到一篇跟您聊的方向很相关的文章，分享给您，不用回复。”', en: '(first send something of value) “Saw an article related to what you mentioned — no need to reply.”' }, mech: ['probe', 'slow'], why: '先给一点价值、不要求回应，既保持连接，也从对方的反应里读到他的兴趣。', limits: '不要高频发送，避免变成打扰。', delivery: '很短，不带期待。' }
    ],
    pitfalls: [
      { say: '“那您这周哪天有空？周二周三周五我都可以！”', cost: '把一句客套当作承诺逼对方给时间，给对方造成压力，也容易被礼貌地拒绝。' },
      { say: '（相信了“改天约”，一直等他来联系）', cost: '把主动权完全交出去，通常没有下文，也无从验证对方的真实意图。' }
    ]
  });

  S({ id: 'r4', domain: 'read', topic: 'read', dims: { parties: 6, subtext: 3, power: 3, heat: 2 },
    title: { zh: '谈判桌上的三个声音', en: 'Three voices at the negotiating table' },
    setup: { zh: '你在向客户方做报价沟通。对方来了三个人：采购经理、业务负责人和一位很少说话的资深顾问。会议末尾对方说：“我们内部再讨论一下。”', en: 'You present a quote to a client team: a procurement manager, a business lead and a quiet senior advisor. At the end they say: “We’ll discuss internally.”' },
    timeline: [
      ['采购经理', '“你们的价格比另一家高了不少。”', '语速快，一直在看报价表'],
      ['业务负责人', '“功能方面我们是挺满意的。”', '微笑，看向顾问'],
      ['顾问', '（全程没有开口，在笔记本上写了几行字，听到“交付周期”时抬了头）', ''],
      ['业务负责人', '“交付周期这块，我们还是要再确认一下。”', '看了顾问一眼'],
      ['采购经理', '“我们内部再讨论一下，回头给你们答复。”', '合上本子']
    ],
    prompt: '这三个人各自的立场是什么？谁真正决定？你怎么推进？',
    signals: [
      { id: 'r4s1', type: 'wording', layer: 'power', beat: 0, text: '价格是采购的指标：采购压价是职责所在，不一定代表项目不通过。' },
      { id: 'r4s2', type: 'alliance', layer: 'relation', beat: 1, text: '业务负责人满意功能，并看向顾问：他是你的潜在盟友，但他在等顾问的判断。' },
      { id: 'r4s3', type: 'power', layer: 'power', beat: 2, text: '顾问全程沉默却在记录，只对“交付周期”有反应：他很可能是关键的评估者，他的顾虑在交付风险上。' },
      { id: 'r4s4', type: 'timing', layer: 'subtext', beat: 3, text: '业务负责人再次提到交付周期，同时看向顾问：这是在替顾问发声。' },
      { id: 'r4s5', type: 'unsaid', layer: 'subtext', beat: 4, text: '“内部再讨论”：可能是礼貌的拒绝，也可能是真要内部协调。要靠后续的行动来区分。' }
    ],
    veteran: [
      { say: { zh: '（会后向业务负责人）“刚才交付周期看起来是大家比较关心的点。方便的话，能不能约顾问老师单独聊 15 分钟，我把我们的交付保障方案讲清楚？”', en: '(to the business lead) “Delivery timing seems to matter. Could we have 15 minutes with the advisor to walk through our delivery assurance plan?”' }, mech: ['probe', 'redirect'], why: '把“内部再讨论”转化为一个具体的小请求，直接接触真正的评估者，针对他的顾虑给方案。', limits: '不要绕过采购经理做事，应征得业务负责人同意并同步给采购。', delivery: '尊重、清楚，强调这是为了让他们的讨论更有信息。' },
      { say: { zh: '（给采购经理）“价格上我们理解您的压力。我整理了一版按交付阶段付款的方案，可以降低您一次性投入的风险，供内部讨论参考。”', en: '(to procurement) “We understand the price pressure. Here is a milestone-based payment plan to lower upfront risk for your internal discussion.”' }, mech: ['partial', 'redirect'], why: '承认压价的合理性，同时给采购一个能向内部交代的“可用材料”，而不是继续在价格上拉扯。', limits: '方案要真实可执行，不要为了成交承诺做不到的事。', delivery: '专业、合作，不带防御。' },
      { say: { zh: '（三天后发一条）“想确认一下内部讨论的节点：如果有需要补充的材料，我们可以在周五前准备好。”', en: '(three days later) “Just checking on the internal timeline — if you need more material, we can prepare it by Friday.”' }, mech: ['delay', 'probe'], why: '用“补充材料”这个小口子保持推进，同时从回复速度和具体程度读到对方的真实意愿。', limits: '不要连续追问；一次跟进后根据反应调整。', delivery: '简短，不施压。' }
    ],
    pitfalls: [{ say: '“价格上我们可以再让一点，您看能不能今天就定下来？”', cost: '没有搞清真实的顾虑就让价，会削弱自己的立场，也解决不了顾问的交付疑虑。' }]
  });

  S({ id: 'r5', domain: 'read', topic: 'read', dims: { parties: 2, subtext: 3, power: 1, heat: 3 },
    title: { zh: '同事突然变冷淡', en: 'A colleague suddenly turns cold' },
    setup: { zh: '一周前你和同事小陈还会一起吃午饭、互相吐槽。这周起，他的回复变得很短，开会时也很少看你。你感到一点不安。', en: 'A week ago you and Chen had lunch together and joked around. This week his replies are short and he rarely looks at you in meetings. You feel uneasy.' },
    timeline: [
      ['小陈', '“好。”', '以前会回一大段加表情'],
      ['小陈', '（午饭时说“我带了饭，在工位吃”）', '这是本周第三次'],
      ['小陈', '（会上你发言时，他在看手机）', ''],
      ['小陈', '（走廊遇见，点点头就走了）', '但他和别的同事还在说笑']
    ],
    prompt: '这意味着什么？你在做任何反应前，会先怎么确认？',
    signals: [
      { id: 'r5s1', type: 'wording', layer: 'tone', beat: 0, text: '回复变短：和他“以前”的基线相比的变化，比单次内容更重要。' },
      { id: 'r5s2', type: 'timing', layer: 'relation', beat: 1, text: '连续三次避开共同午饭：不是偶然，但原因未知——可能是对你，也可能是他自己的状态。' },
      { id: 'r5s3', type: 'body', layer: 'tone', beat: 2, text: '会上看手机：可能是回避、也可能是他在处理自己的压力。单个行为不足以判断。' },
      { id: 'r5s4', type: 'audience', layer: 'relation', beat: 3, text: '和别的同事还在说笑：说明他不是整体情绪低落，变化更像是针对你或与你相关的事。' },
      { id: 'r5s5', type: 'heat', layer: 'subtext', beat: 0, text: '你自己的不安会放大“被针对”的解释。先把几种可能列出来，不要只接受最痛的那一种。' }
    ],
    veteran: [
      { say: { zh: '“最近感觉你有点忙，也可能是我哪里做得不对？如果有的话直接告诉我，我想把事情弄清楚。”', en: '“You seem busy lately — or did I do something off? If so, tell me directly; I’d like to clear it up.”' }, mech: ['probe', 'curious'], why: '同时承认“你忙”和“我可能有问题”两种假设，让对方可以选择更安全的那个来回答，而不是被逼问。', limits: '不要在公开场合问；对方说“没事”时不要追问第二次。', delivery: '私下、轻松、不带情绪压力，给对方留退路。' },
      { say: { zh: '（先写下三种可能：他自己有压力 / 我的某件事让他不舒服 / 他和别人有事影响了关系；然后观察一周）', en: '(write down three hypotheses first; observe for a week)' }, mech: ['slow', 'probe'], why: '把一个情绪反应变成几个可验证的假设，降低你被“最坏的那一种”带走的概率。', limits: '观察不等于回避；若影响到工作协作，需要主动沟通。', delivery: '继续保持正常、友好的互动，不要突然变冷淡。' },
      { say: { zh: '（小事上轻轻试探）“周五我想去楼下新开的那家，你有空一起吗？没空也没关系。”', en: '(a small probe) “I’m trying the new place downstairs on Friday — want to join? No worries if not.”' }, mech: ['probe', 'saveFace'], why: '用一个低成本、容易拒绝的邀请，从他的反应（语气、是否给理由）里校准判断。', limits: '被拒绝一次不代表什么；不要连续邀请。', delivery: '随意、轻松。' }
    ],
    pitfalls: [
      { say: '（也变冷淡，对他同样简短回复）', cost: '用冷淡回应冷淡，会把一个可能的误会变成稳定的对立，而你甚至还不知道原因。' },
      { say: '（在群里或当众）“小陈你最近是不是对我有意见？”', cost: '当众质问让对方被迫表态，通常得到的是防御而不是真话。' }
    ]
  });

  S({ id: 'r6', domain: 'read', topic: 'read', dims: { parties: 6, subtext: 3, power: 3, heat: 3 },
    title: { zh: '家庭聚餐上的暗线', en: 'The undercurrents at a family dinner' },
    setup: { zh: '春节家庭聚餐，七八个亲戚围坐一桌。几位长辈聊起你堂哥刚买的房子，话题一点点拐向你——桌下，你妈轻轻碰了你的脚。', en: 'At a family dinner with a table of relatives, elders praise your cousin’s new flat and the topic slowly turns toward you — under the table your mother taps your foot.' },
    timeline: [
      ['三姑', '“你堂哥这次买的那套，地段真不错啊。”', '看了你一眼'],
      ['二叔', '“年轻人还是要早点安顿下来，对吧？”', '声音不大，但全桌都听得见'],
      ['妈妈', '（在桌下碰了碰你的脚）', '脸上还带着笑，没有看你'],
      ['堂哥', '“我也就是运气好，其实压力也大。”', '看向你，微微耸肩'],
      ['三姑', '“你呢？有什么打算？”', '全桌静了一下']
    ],
    prompt: '这场对话里各方在做什么？你怎么回应才对自己、对妈妈、对大家都比较体面？',
    signals: [
      { id: 'r6s1', type: 'face', layer: 'relation', beat: 0, text: '称赞堂哥的同时看你一眼：赞美里含有比较，话题正在铺垫。' },
      { id: 'r6s2', type: 'audience', layer: 'power', beat: 1, text: '二叔的“对吧？”：把个人问题变成大家的共识，让你不好反驳。' },
      { id: 'r6s3', type: 'body', layer: 'relation', beat: 2, text: '妈妈桌下碰脚：她在提醒你“小心/别硬碰”，也是在紧张——她担心你被评价，也担心场面。' },
      { id: 'r6s4', type: 'alliance', layer: 'relation', beat: 3, text: '堂哥的耸肩：他在向你示好、撇清“比较”，可能是潜在的盟友。' },
      { id: 'r6s5', type: 'timing', layer: 'subtext', beat: 4, text: '全桌静下来：这是一个被设计的“该你说了”的时刻，你的回应会被各方解读。' }
    ],
    veteran: [
      { say: { zh: '“我现在先把手头的事做扎实，等有了结果第一个跟三姑汇报。倒是堂哥，你得传授点买房的经验，我们都想听。”', en: '“I’m focusing on getting things right now and will report to you first when there’s news. Cousin, you should share your home-buying tips — we all want to hear.”' }, mech: ['boundary', 'saveFace', 'redirect'], why: '给长辈一个体面的交代，同时承接堂哥的示好，把焦点引回对方，不对抗也不透露细节。', limits: '语气不要敷衍；如果长辈继续追问，需要重复一次边界，再换话题。', delivery: '微笑、语速放缓，说完看向堂哥，自然地把话题交出去。' },
      { say: { zh: '（用玩笑承接）“三姑这是要给我下任务啊！我记下了，今年的 KPI 就这么定了。”', en: '(with humor) “Auntie is assigning me a target! Noted — that’s this year’s KPI.”' }, mech: ['humor', 'partial'], why: '用玩笑接住期待，不接受压力的框架，也让桌上的气氛放松。', limits: '对非常较真的长辈需要配合一句更认真的话。', delivery: '轻松、带笑。' },
      { say: { zh: '（私下对妈妈）“刚才你碰我，我懂你的意思。下次我们可以先说好，被问到这类问题，你希望我怎么回答？”', en: '(privately to Mom) “I got what you meant by the tap. Next time, how would you like me to handle those questions?”' }, mech: ['probe', 'nameFact'], why: '把无声的暗号变成可沟通的约定，减少下一次的猜测与紧张。', limits: '时间选在饭后、不被打扰的时候，不要当场争论。', delivery: '温和、合作，不带“你为什么总这样”的指责。' }
    ],
    pitfalls: [{ say: '“你们能不能别总拿我跟堂哥比？我怎么过是我自己的事！”', cost: '直接顶回去会让一桌人下不来台，妈妈也被置于尴尬的位置，你的态度反而成了话题。' }]
  });

  /* ================= 日常 / 亲密（补充） ================= */
  S({ id: 'c1', domain: 'close', topic: 'intimacy', dims: { parties: 2, subtext: 2, power: 1, heat: 2 },
    title: { zh: '爽约之后又来借钱的朋友', en: 'A friend who flaked, then asks to borrow money' },
    setup: { zh: '好友小林这两个月爽约了你们三次约好的聚会，今天突然发消息：“最近手头有点紧，能借我 3000 吗？下个月还。”', en: 'Your friend Lin has flaked on three plans in two months. Today they text: “Money’s a bit tight, could I borrow 3000? I’ll repay next month.”' },
    timeline: [
      ['小林', '“最近手头有点紧，能借我 3000 吗？”', '晚上 10:20'],
      ['小林', '“下个月一发工资就还你。”', '1 分钟后追加'],
      ['小林', '“不方便也没事，我再想想别的办法。”', '语气变轻']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'c1s1', type: 'timing', layer: 'subtext', beat: 0, text: '深夜发来、先说借钱：对方在犹豫很久后才开口，说明这件事对他不轻松。' },
      { id: 'c1s2', type: 'wording', layer: 'subtext', beat: 1, text: '很快补上“下个月还”：他在预判你的顾虑，也说明他知道自己之前的行为不太让人放心。' },
      { id: 'c1s3', type: 'wording', layer: 'relation', beat: 2, text: '“不方便也没事”：给你留了退路，但也可能含着“我其实很需要”。' },
      { id: 'c1s4', type: 'unsaid', layer: 'subtext', beat: 0, text: '没有提到爽约、也没有说原因：你看不到他最近发生了什么，借钱背后的情况不明。' }
    ],
    veteran: [
      { say: { zh: '“谢谢你信任我开口。我先问一下：是遇到什么急事了吗？我想知道你现在的情况，再看我能怎么帮。”', en: '“Thanks for trusting me. What’s going on? I want to understand before I see how I can help.”' }, mech: ['curious', 'probe'], why: '先接住他的信任，再用关心的问题获取真实情况，而不是直接审问或直接答应。', limits: '如果对方不愿说，可以尊重，但这也会影响你的决定。', delivery: '温和、真诚，不带审判。' },
      { say: { zh: '“3000 我这边不太方便，但我可以借你 1000，不用着急还。我们先把你最紧的这块解决，好吗？”', en: '“3000 is too much for me, but I can lend 1000, no rush to repay. Let’s cover the tightest part first.”' }, mech: ['boundary', 'saveFace'], why: '用自己能承受的额度设边界，同时表达支持。清楚的数字比含糊的“再说吧”更尊重对方。', limits: '只借你真的能承受“收不回来”的数额。', delivery: '平静、直接，不要附加说教。' },
      { say: { zh: '“这次借不了，是我自己最近也紧。但上次几次约好没来我有点在意，等你缓过来我们好好聊聊，可以吗？”', en: '“I can’t this time — I’m tight too. I also felt a bit hurt about the missed plans; let’s talk when you’re okay.”' }, mech: ['boundary', 'nameFact'], why: '拒绝时诚实地提出一直没说的在意，但选在对方“缓过来”之后，避免在他求助时说教。', limits: '要真的约时间聊，否则会变成含糊的抱怨。', delivery: '真诚、不带指责。' }
    ],
    pitfalls: [
      { say: '“你之前放了我三次鸽子，现在好意思找我借钱？”', cost: '把旧账和借钱绑在一起，会让对方羞耻、关系受损，而你也没有解决真正的问题。' },
      { say: '（因为不好意思拒绝，直接转账 3000）', cost: '违背自己意愿的答应会在之后变成怨气，也可能让对方不再认真对待承诺。' }
    ]
  });

  S({ id: 'c2', domain: 'close', topic: 'intimacy', dims: { parties: 2, subtext: 2, power: 1, heat: 2 },
    title: { zh: '加班后的伴侣', en: 'Your partner after a long overtime night' },
    setup: { zh: '伴侣连续加班一周，今晚十一点回到家。你特意做了夜宵，他看了一眼说：“我吃过了，你别弄了。”然后径直去了卧室。', en: 'Your partner has worked overtime all week and gets home at 11pm. You made a late meal; they glance at it: “I ate already, don’t bother.” Then head to the bedroom.' },
    timeline: [
      ['伴侣', '“我吃过了，你别弄了。”', '语气很平，没有看你'],
      ['伴侣', '（换衣服时把手机扔在床上）', '动作有点重'],
      ['伴侣', '“我有点累，先睡了。”', '背对着你躺下']
    ],
    prompt: '你怎么回应？',
    signals: [
      { id: 'c2s1', type: 'tone', layer: 'tone', beat: 0, text: '语气平、不看你：不是针对你，更像是电量耗尽。' },
      { id: 'c2s2', type: 'body', layer: 'tone', beat: 1, text: '动作重：身体里还有没处理完的压力或烦躁。' },
      { id: 'c2s3', type: 'wording', layer: 'subtext', beat: 0, text: '“你别弄了”：既是不想麻烦你，也可能带着愧疚——他没法回应你的好意。' },
      { id: 'c2s4', type: 'unsaid', layer: 'subtext', beat: 2, text: '背对躺下：此刻他需要的可能是安静，而不是被安慰或被追问。' }
    ],
    veteran: [
      { say: { zh: '“好，那夜宵我放冰箱，你明天想吃再热。你先好好睡，辛苦了。”', en: '“Okay, I’ll put it in the fridge for tomorrow. Sleep well — you’ve earned it.”' }, mech: ['slow', 'saveFace'], why: '不追问、不撤回善意，只给他一个轻松的出口，同时确认“我看到你辛苦了”。', limits: '如果他连续多天这样，需要在他状态好时再聊。', delivery: '轻柔、简短，不带情绪。' },
      { say: { zh: '（在他躺下后）“周末想不想什么都不安排？我来搞定，你只管睡到自然醒。”', en: '(after he lies down) “This weekend, want nothing planned? I’ll handle it — you just sleep in.”' }, mech: ['redirect', 'saveFace'], why: '把当下无法解决的疲惫，转成可期待的恢复计划，让他感到被照顾而不是被要求。', limits: '要真的兑现，否则会变成空头承诺。', delivery: '小声，不需要他回答。' }
    ],
    pitfalls: [
      { say: '“我特意给你做的，你就这样？我也很累啊。”', cost: '在他最没力气的时候讨要认可，会把疲惫变成愧疚和对立。' },
      { say: '“你怎么了？是不是我做错了什么？你说话呀。”', cost: '追问会逼他在没有力气时解释，也把他的疲惫个人化为“跟你有关”。' }
    ]
  });

  S({ id: 'c3', domain: 'close', topic: 'intimacy', dims: { parties: 2, subtext: 3, power: 1, heat: 2 },
    title: { zh: '好友忽然疏远', en: 'A close friend drifts away' },
    setup: { zh: '你和好友阿雯以前几乎每天聊天。最近她很少回你消息，朋友圈里却常和另一个圈子的人出去玩。你发了一条消息，她三天后才回。', en: 'You and Wen used to chat daily. Lately she rarely replies, yet she posts outings with another group. She answers your message three days later.' },
    timeline: [
      ['你', '“周末要不要一起去那家新开的咖啡店？”', '周一晚上'],
      ['阿雯', '“哎呀最近好忙！下次吧～”', '周四中午，带了一个笑脸'],
      ['阿雯', '（周六发了和别人聚会的照片）', '配文：好开心'],
      ['阿雯', '（你的生日，她发了一条“生日快乐”和一个红包）', '没有多说什么']
    ],
    prompt: '怎么看待这件事？你会怎么做？',
    signals: [
      { id: 'c3s1', type: 'timing', layer: 'relation', beat: 1, text: '三天后才回：优先级的变化是真实的，但原因未知。' },
      { id: 'c3s2', type: 'wording', layer: 'subtext', beat: 1, text: '“下次吧～”没有给出新的时间：礼貌的推迟，不是约定。' },
      { id: 'c3s3', type: 'unsaid', layer: 'subtext', beat: 2, text: '她有精力见别人：忙是真的，但“忙”不等于“没有精力给你”，需要另外理解。' },
      { id: 'c3s4', type: 'wording', layer: 'relation', beat: 3, text: '生日仍记得并有表示：关系没有断，只是在变化。很多友情会因生活阶段不同而改变距离。' },
      { id: 'c3s5', type: 'heat', layer: 'subtext', beat: 2, text: '看到她和别人聚会的刺痛是真的；先承认这份感受，再决定要不要把它当作“被抛弃”的证据。' }
    ],
    veteran: [
      { say: { zh: '“最近感觉我们联系少了，我有点想你。你是不是最近状态有点特别？没事，我只是想让你知道我还在。”', en: '“We’ve been in touch less and I miss you. Is something going on? No pressure — I just want you to know I’m here.”' }, mech: ['nameFact', 'probe'], why: '说出自己的感受和观察（联系少了），不指责，同时留出对方说真话的空间。', limits: '不要同时问“你是不是不想理我了”，那是逼对方证明。', delivery: '私下、温暖、不带委屈的语气。' },
      { say: { zh: '（给一个小而具体的邀请）“下周三晚上我要去散步，你想一起走半小时吗？不想也没关系。”', en: '(a small invitation) “I’m taking a walk Wednesday evening — join me for half an hour? No pressure.”' }, mech: ['probe', 'saveFace'], why: '用低成本的约定替代“大聚会”，更容易被接受，也能从她的回应里读到她的状态。', limits: '被婉拒后保持耐心，不要立刻理解为拒绝。', delivery: '轻松。' },
      { say: { zh: '（先暂时放一放，把一部分注意力放回自己的其他关系和生活）', en: '(let it rest for a while and invest in your other relationships)' }, mech: ['slow'], why: '友情的距离会有周期。你不必每次都靠追问来确认它，保持开放比紧抓更有利于关系的恢复。', limits: '放一放不是冷战，遇到她的重要时刻仍要出现。', delivery: '平和。' }
    ],
    pitfalls: [
      { say: '“我看你朋友圈天天出去玩，原来你不是忙，只是不想见我。”', cost: '用朋友圈当证据指控，会让对方防御、羞耻，往往把一次疏远变成真正的决裂。' }
    ]
  });
})();
