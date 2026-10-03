// 词表：信号类型、autopilot 模式、老手回应机制、领域与专题（zh/en）
window.TAX = {
  domains: {
    work:   { zh: '职场', en: 'Work' },
    close:  { zh: '日常/亲密', en: 'Close relationships' },
    public: { zh: '陌生人/大场合', en: 'Strangers & events' },
    read:   { zh: '读懂他人/复杂局面', en: 'Reading complex situations' }
  },
  topics: {
    awkward: { zh: '化解尴尬', en: 'Defusing awkwardness' },
    provoke: { zh: '应对挑衅/贬低', en: 'Handling provocation' },
    power:   { zh: '权力与面子', en: 'Power & face' },
    intimacy:{ zh: '亲密关系', en: 'Intimacy' },
    event:   { zh: '大场合', en: 'Social events' }
  },
  layers: {
    tone:     { zh: '语气层', en: 'Tone' },
    relation: { zh: '关系层', en: 'Relationship' },
    power:    { zh: '权力层', en: 'Power' },
    subtext:  { zh: '潜台词层', en: 'Subtext' }
  },
  signals: {
    timing:   { zh: '时机/停顿/延迟', en: 'Timing & pauses' },
    wording:  { zh: '措辞/标点变化', en: 'Wording & punctuation' },
    tone:     { zh: '语气/音量', en: 'Tone of voice' },
    body:     { zh: '肢体/表情', en: 'Body & face' },
    audience: { zh: '旁人反应', en: 'Audience reaction' },
    power:    { zh: '地位/权力', en: 'Status & power' },
    face:     { zh: '面子', en: 'Face / dignity' },
    unsaid:   { zh: '没说出口的', en: 'What is unsaid' },
    alliance: { zh: '结盟/站队', en: 'Alliances' },
    heat:     { zh: '情绪温度', en: 'Emotional heat' }
  },
  autopilot: {
    please:    { zh: '讨好', en: 'Pleasing' },
    defend:    { zh: '防御/辩解', en: 'Defending' },
    overexplain:{ zh: '过度解释', en: 'Over-explaining' },
    withdraw:  { zh: '沉默/回避', en: 'Withdrawing' },
    fix:       { zh: '急于解决', en: 'Rushing to fix' },
    counter:   { zh: '反击', en: 'Counter-attacking' },
    lecture:   { zh: '说教', en: 'Lecturing' },
    jokecover: { zh: '玩笑掩饰', en: 'Joking it off' },
    freeze:    { zh: '僵住/大脑空白', en: 'Freezing' }
  },
  mechanisms: {
    humor:    { zh: '幽默/自嘲降温', en: 'Humor & self-deprecation',
                def: '用轻松的方式承认或放大尴尬，让紧张释放，同时显示你不被它控制。例：“我这波属于现场翻车教学。”' },
    nameFact: { zh: '命名事实，不加指控', en: 'Name the fact, no accusation',
                def: '平静地描述发生了什么，不判断对方动机。例：“我注意到这是第三次被打断。”' },
    reframe:  { zh: '善意重述', en: 'Generous reframe',
                def: '把对方的话按最善意（或最中性）的版本复述，既给台阶又把对话拉回正轨。' },
    tossBack: { zh: '轻轻抛回', en: 'Toss it back',
                def: '把话题/责任以不带火药味的方式还给对方，例：“这个问题挺好，你怎么看？”' },
    curious:  { zh: '好奇追问', en: 'Curious question',
                def: '用真诚的好奇去问“这话怎么说？”，让对方自己面对话里的分量。' },
    slow:     { zh: '慢速与沉默', en: 'Slow down & silence',
                def: '放慢语速、停顿半拍。节奏不被对方带走，本身就是信号。' },
    redirect: { zh: '转移焦点', en: 'Redirect',
                def: '自然地把话题引向更有建设性或更安全的方向。' },
    boundary: { zh: '设边界，不开战', en: 'Boundary without war',
                def: '清楚表达“这个我不聊/不接受”，语气平稳，不附带反击。' },
    saveFace: { zh: '给台阶', en: 'Save face',
                def: '帮对方（或自己）体面地下台——不让任何人当众丢脸，通常能换来长期好感。' },
    delay:    { zh: '延迟回应', en: 'Delay',
                def: '“我想一下，稍后回你。”把即时反应变成设计后的回应。' },
    askBack:  { zh: '以问代答', en: 'Answer with a question',
                def: '用问题化解陷阱问题，同时获取信息，例：“你为什么这么问？”' },
    partial:  { zh: '有限同意', en: 'Acknowledge, not concede',
                def: '承认对方话里站得住的部分，但不接受整体框架：“这点你说得对，不过……”' }
  }
};
