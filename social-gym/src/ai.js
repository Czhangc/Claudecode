// 可选的 Claude 点评层。默认不启用；仅在设置了 API key 且用户点击按钮时才联网。
(function () {
  const { state, L } = window.SG;
  const URL = 'https://api.anthropic.com/v1/messages';

  const SYSTEM = `你是一位社交觉察教练，帮助用户通过情境演练提升对社交信号的敏感度、觉察自己的自动反应（autopilot），并学会刻意设计回应而不是 react。
原则：
- 你是"镜子"和教练，不是评委：不打分、不给"对/错"结论，不给用户贴人格标签。
- 先具体肯定（引用用户的原话），再指出盲区；每条判断都基于场景里的具体线索或用户写下的内容。
- 承认语境不确定：用"可能""如果……"，不要把推断说成事实。
- 对用户的第一反应，要解读它可能体现的自动模式与背后的需求，并与用户自己选的标签对照（一致或不同都可以，说明理由）。
- 点评设计版回应时，说明它对"对方"和"关系"的可能影响，并给出一个更自然、口语化的改写。
- 不推荐操控、羞辱或贬低对方的话术；若用户的回应有这类倾向，温和指出其代价。
- 语气温暖、具体、简洁。用与用户界面相同的语言回答（用户语言：{LANG}）。`;

  const REVIEW_SCHEMA = {
    type: 'object', additionalProperties: false,
    required: ['noticed_well', 'missed', 'autopilot_read', 'designs', 'experiment'],
    properties: {
      noticed_well: { type: 'array', items: { type: 'string' } },
      missed: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['signal', 'why_it_matters'], properties: { signal: { type: 'string' }, why_it_matters: { type: 'string' } } } },
      autopilot_read: { type: 'string' },
      designs: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['which', 'strengths', 'risks', 'rewrite'], properties: { which: { type: 'string' }, strengths: { type: 'string' }, risks: { type: 'string' }, rewrite: { type: 'string' } } } },
      experiment: { type: 'string' }
    }
  };
  const COUNTER_SCHEMA = {
    type: 'object', additionalProperties: false, required: ['reactions', 'takeaway'],
    properties: {
      reactions: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['which', 'reply', 'inner'], properties: { which: { type: 'string' }, reply: { type: 'string' }, inner: { type: 'string' } } } },
      takeaway: { type: 'string' }
    }
  };

  // 把场景 + 用户所写的一切整理成给模型的文本
  function context(s, F) {
    const T = window.TAX, t = window.SG.t;
    const tl = s.timeline.map((b, i) => `${i + 1}. ${b[0]}：${b[1]}${b[2] ? `（${b[2]}）` : ''}`).join('\n');
    const sigs = s.signals.map((g) => `- [${t(T.signals[g.type])}/${t(T.layers[g.layer])}] ${g.text}（用户自评：${F.marks[g.id] ? '注意到了' : '漏掉了'}）`).join('\n');
    const labels = F.labels.map((k) => t(T.autopilot[k])).join('、') || '（未选）';
    return `【场景】${t(s.setup)}\n【对话/线索】\n${tl}\n【用户需要回应的问题】${t(s.prompt) || '你怎么回应？'}\n
【标注信号及用户自评】\n${sigs}\n【用户自己写的“我注意到了什么”】${F.notice || '（空）'}\n
【用户的第一反应（限时原样）】${F.auto}\n【用户给它起的自动模式标签】${labels}\n【当时的身体/情绪】${F.feel || '（空）'}\n【被触发的需求/假设】${F.need || '（空）'}\n
【暂停四问】想要的结果：${F.pause[0] || '—'}；对方需要：${F.pause[1] || '—'}；长期关系：${F.pause[2] || '—'}；面子/权力：${F.pause[3] || '—'}\n【设计版 A】${F.r1 || '（未写）'}\n【设计版 B】${F.r2 || '（未写）'}`;
  }
  const sys = () => SYSTEM.replace('{LANG}', state.lang === 'en' ? 'English' : '中文');
  const TASKS = {
    review: '请对用户的这次练习给出镜子式点评（JSON）：noticed_well（用户捕捉得好的，引用其原话）；missed（用户漏掉的信号及它为什么重要）；autopilot_read（对第一反应的解读，并与用户自选标签对照）；designs（对设计版 A、B 各一项，which 填 "A"/"B"，未写的版本不要列；说明优点、风险与更自然的改写 rewrite）；experiment（一个下次可做的小实验）。',
    counter: '请扮演场景中的“对方”，分别对用户的第一反应（which 填 "first"）、设计版 A（"A"）、设计版 B（"B"）做出真实的口语化反应（reply，1–3 句），并写出对方此刻内心的真实想法（inner）；未写的版本不要列。最后给一句 takeaway：这几种回应带来的差异。'
  };

  const PLAIN = {
    review: '请对用户的这次练习给出镜子式点评，分成：1) 你捕捉得好的（引用原话）；2) 你可能漏掉的信号及原因；3) 对你第一反应的解读（并与用户自选标签对照）；4) 对设计版 A、B 各自的优点、风险和更自然的改写；5) 一个下次可做的小实验。',
    counter: '请扮演场景中的“对方”，分别对用户的第一反应、设计版 A、设计版 B 做出真实的口语化反应（1–3 句），并写出对方此刻内心的真实想法；最后一句总结这几种回应带来的差异。'
  };
  function errMsg(e) {
    if (e && e.kind) return e.msg;
    return L('网络请求失败（可能是断网，或当前预览环境不允许访问外网）。', 'Network request failed (offline, or this preview blocks outside requests).');
  }
  async function call(kind, s, F) {
    if (!state.aiKey) throw { kind: 'nokey', msg: L('请先在设置里填写 API key。', 'Add your API key in Settings first.') };
    const body = {
      model: state.aiModel || 'claude-opus-5-5', max_tokens: 4000, system: sys(),
      messages: [{ role: 'user', content: context(s, F) + '\n\n' + TASKS[kind] }],
      output_config: { effort: 'low', format: { type: 'json_schema', schema: kind === 'review' ? REVIEW_SCHEMA : COUNTER_SCHEMA } }
    };
    const res = await fetch(URL, { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': state.aiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify(body) });
    if (!res.ok) {
      const m = { 401: L('API key 无效或没有权限。', 'Invalid API key.'), 403: L('没有权限访问该模型。', 'No access to this model.'), 404: L('找不到该模型，请在设置里换一个。', 'Model not found — pick another in Settings.'), 429: L('请求太频繁或额度受限，请稍后再试。', 'Rate limited — try again shortly.') }[res.status]
        || (res.status >= 500 ? L('服务暂时不可用，请稍后重试。', 'Service temporarily unavailable.') : L('请求出错（' + res.status + '）。', 'Request failed (' + res.status + ').'));
      throw { kind: 'http', status: res.status, msg: m };
    }
    const data = await res.json();
    if (data.stop_reason === 'refusal') throw { kind: 'refusal', msg: L('模型拒绝了这次请求，请换种写法再试。', 'The model declined this request.') };
    if (data.stop_reason === 'max_tokens') throw { kind: 'trunc', msg: L('回复被截断了，请重试。', 'Reply was truncated — retry.') };
    const txt = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
    try { return JSON.parse(txt); } catch (e) { throw { kind: 'parse', msg: L('没能解析点评结果，请重试。', 'Could not parse the reply — retry.') }; }
  }

  // 无 key 时的兜底：把同一份提示词复制出去，贴到任意 Claude 对话
  function promptText(kind, s, F) {
    return sys() + '\n\n' + context(s, F) + '\n\n' + PLAIN[kind];
  }

  window.SG.ai = { call, errMsg, promptText };
})();
