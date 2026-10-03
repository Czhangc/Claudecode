// Social Gym — 核心：状态、存档、路由、除练习流程以外的页面。全部离线，无网络请求。
(function () {
  const KEY = 'socialgym.v1';
  const DEFAULTS = { lang: 'zh', timer: 8, sessions: [], toolbox: [], intents: [], expDone: {} };
  let memory = null; // localStorage 不可用时的降级存储

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) { /* 隐私模式/被禁用 */ }
    return memory ? Object.assign({}, DEFAULTS, memory) : Object.assign({}, DEFAULTS);
  }
  const state = load();
  function save() {
    memory = JSON.parse(JSON.stringify(state));
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 忽略 */ }
  }

  const L = (zh, en) => (state.lang === 'en' && en ? en : zh);
  const t = (x) => (x == null ? '' : typeof x === 'string' ? x : (state.lang === 'en' && x.en) || x.zh);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nl = (s) => esc(s).replace(/\n/g, '<br>');
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const byId = (id) => window.SCENARIOS.find((s) => s.id === id);
  const fmtDate = (ts) => new Date(ts).toLocaleDateString(state.lang === 'en' ? 'en-US' : 'zh-CN', { month: 'short', day: 'numeric' });
  const complexity = (s) => { const n = s.dims.parties + s.dims.subtext + s.dims.power + s.dims.heat; return n <= 6 ? 1 : n <= 9 ? 2 : 3; };
  const cxLabel = (n) => ['', L('入门', 'Easy'), L('中等', 'Medium'), L('复杂', 'Complex')][n];
  const practiceCount = (id) => state.sessions.filter((x) => x.sid === id).length;

  const SG = (window.SG = { state, save, L, t, esc, nl, $, $$, byId, fmtDate, complexity, cxLabel, practiceCount });

  /* ---------- 路由 ---------- */
  const routes = {};
  // 路由不依赖 location.hash（沙箱 iframe/预览里锚点跳转可能失效），点击由代理接管
  let path = (location.hash || '').replace(/^#\/?/, '');
  SG.path = () => path;
  SG.route = (name, fn) => { routes[name] = fn; };
  function nav() {
    const items = [['home', L('今日', 'Today')], ['library', L('场景库', 'Library')], ['mirror', L('模式镜', 'Mirror')], ['toolbox', L('工具箱', 'Toolbox')], ['journal', L('日志', 'Journal')], ['settings', L('设置', 'Settings')]];
    const cur = path.split('/')[0] || 'home';
    return items.map(([k, v]) => `<a href="#/${k}" class="${cur === k || (cur === 'practice' && k === 'library') ? 'on' : ''}">${v}</a>`).join('');
  }
  SG.render = function () {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
    const parts = path.split('/');
    const name = parts[0] || 'home';
    const fn = routes[name] || routes.home;
    $('#nav').innerHTML = nav();
    $('#app').innerHTML = fn(parts.slice(1)) || '';
    const bind = routes[name + ':bind'] || routes['home:bind'];
    if (bind) bind(parts.slice(1));
    window.scrollTo(0, 0);
  };
  SG.go = (h) => {
    path = String(h).replace(/^#\/?/, '');
    try { history.replaceState(null, '', '#/' + path); } catch (e) { /* 沙箱中忽略 */ }
    (SG.onRoute || []).forEach((f) => f(path));
    SG.render();
  };
  SG.rerender = function () { // 保持滚动位置的就地重绘
    const y = window.scrollY; SG.render(); window.scrollTo(0, y);
  };
  SG.onRoute = [];
  document.addEventListener('click', (e) => {
    const el = e.target.closest && e.target.closest('a[href^="#/"]');
    if (!el) return;
    e.preventDefault();
    SG.go(el.getAttribute('href'));
  });
  window.addEventListener('hashchange', () => { path = location.hash.replace(/^#\/?/, ''); SG.render(); });

  /* ---------- 小组件 ---------- */
  const dimTag = (s) => `<span class="tag">${esc(t(TAX.domains[s.domain]))}</span><span class="tag alt">${esc(t(TAX.topics[s.topic]))}</span><span class="tag cx${complexity(s)}">${cxLabel(complexity(s))}</span>`;
  SG.dimTag = dimTag;
  const card = (s) => `<a class="card" href="#/practice/${s.id}"><h3>${esc(t(s.title))}</h3><p>${esc(t(s.setup))}</p><div class="tags">${dimTag(s)}${practiceCount(s.id) ? `<span class="tag done">${L('已练 ', 'done ')}${practiceCount(s.id)}</span>` : ''}</div></a>`;
  const bar = (label, n, max, extra) => `<div class="bar"><span class="bl">${label}</span><span class="bt"><i style="width:${max ? Math.round((n / max) * 100) : 0}%"></i></span><span class="bn">${extra != null ? extra : n}</span></div>`;

  /* ---------- 今日 ---------- */
  routes.home = function () {
    const all = window.SCENARIOS;
    const day = Math.floor(Date.now() / 864e5);
    // 少练过的优先，同等练习次数按“今日偏移”轮换，保证每天不同
    const picks = all.map((s, i) => ({ s, k: practiceCount(s.id) * 1000 + ((i + day * 7) % all.length) }))
      .sort((a, b) => a.k - b.k).slice(0, 3).map((x) => x.s);
    const exp = window.EXPERIMENTS[day % window.EXPERIMENTS.length];
    const done = !!state.expDone[day];
    const n = state.sessions.length;
    return `<section><h1>${L('随时练一练', 'A quick rep')}</h1>
      <p class="lead">${L('这里不打分。目的是：看见被忽略的信号 → 抓住自己的自动反应 → 有意识地设计回应。', 'No scores here. Notice missed signals → catch your autopilot → design your response on purpose.')}</p>
      <h2>${L('今日推荐', 'Suggested today')}</h2><div class="grid">${picks.map(card).join('')}</div>
      <h2>${L('今日微实验', 'Micro-experiment')}</h2>
      <div class="panel"><p>${esc(t(exp))}</p><label class="chk"><input type="checkbox" id="expDone" ${done ? 'checked' : ''}> ${L('今天做了', 'Did it today')}</label></div>
      <p class="muted">${L(`已完成 ${n} 次练习。`, `${n} practice sessions so far.`)} ${n >= 3 ? `<a href="#/mirror">${L('看看你的模式 →', 'See your patterns →')}</a>` : ''}</p></section>`;
  };
  routes['home:bind'] = function () {
    const c = $('#expDone');
    if (c) c.onchange = () => { const day = Math.floor(Date.now() / 864e5); if (c.checked) state.expDone[day] = true; else delete state.expDone[day]; save(); };
  };

  /* ---------- 场景库 ---------- */
  const filt = { domain: '', topic: '', cx: '' };
  routes.library = function () {
    const list = window.SCENARIOS.filter((s) => (!filt.domain || s.domain === filt.domain) && (!filt.topic || s.topic === filt.topic) && (!filt.cx || String(complexity(s)) === filt.cx));
    const sel = (id, opts, cur) => `<select id="f-${id}"><option value="">${L('全部', 'All')}</option>${opts.map(([v, n]) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>`;
    return `<section><h1>${L('场景库', 'Scenario library')}</h1>
      <p class="lead">${L('难度完全自选，没有解锁门槛。复杂度 = 人数 + 潜台词 + 权力差 + 情绪温度。', 'Pick any difficulty — nothing is locked. Complexity = parties + subtext + power gap + emotional heat.')}</p>
      <div class="filters">${sel('domain', Object.keys(TAX.domains).map((k) => [k, t(TAX.domains[k])]), filt.domain)}${sel('topic', Object.keys(TAX.topics).map((k) => [k, t(TAX.topics[k])]), filt.topic)}${sel('cx', [['1', cxLabel(1)], ['2', cxLabel(2)], ['3', cxLabel(3)]], filt.cx)}</div>
      <div class="grid">${list.map(card).join('') || `<p class="muted">${L('没有符合的场景', 'No matching scenarios')}</p>`}</div></section>`;
  };
  routes['library:bind'] = function () {
    ['domain', 'topic', 'cx'].forEach((k) => { const el = $('#f-' + k); if (el) el.onchange = () => { filt[k] = el.value; SG.rerender(); }; });
  };

  /* ---------- 模式镜 ---------- */
  routes.mirror = function () {
    const ss = state.sessions;
    if (!ss.length) return `<section><h1>${L('模式镜', 'Pattern mirror')}</h1><p class="lead">${L('完成几次练习后，这里会汇总你常漏掉的信号和自动反应模式。仅用于自我观察，不评分。', 'After a few sessions this page summarizes the signals you miss and your autopilot patterns. For self-observation only.')}</p><a class="btn" href="#/library">${L('去练习', 'Practice now')}</a></section>`;
    // 常漏信号
    const st = {};
    ss.forEach((x) => { const s = byId(x.sid); if (!s) return; s.signals.forEach((g) => { if (x.noticed && g.id in x.noticed) { const o = st[g.type] || (st[g.type] = { seen: 0, hit: 0 }); o.seen++; if (x.noticed[g.id]) o.hit++; } }); });
    const miss = Object.keys(st).map((k) => ({ k, seen: st[k].seen, miss: st[k].seen - st[k].hit })).sort((a, b) => b.miss / b.seen - a.miss / a.seen || b.seen - a.seen);
    // autopilot 分布与触发场景
    const ap = {}, apTopic = {};
    ss.forEach((x) => (x.auto && x.auto.labels || []).forEach((l) => { ap[l] = (ap[l] || 0) + 1; const s = byId(x.sid); if (s) { const o = apTopic[s.topic] || (apTopic[s.topic] = {}); o[l] = (o[l] || 0) + 1; } }));
    const apList = Object.keys(ap).sort((a, b) => ap[b] - ap[a]);
    const apMax = apList.length ? ap[apList[0]] : 0;
    const lat = ss.filter((x) => x.auto && x.auto.latency != null).slice(-10);
    const latMax = Math.max.apply(null, lat.map((x) => x.auto.latency).concat([1]));
    const redesigned = ss.filter((x) => x.redesign && (x.redesign.r1 || x.redesign.r2)).length;
    return `<section><h1>${L('模式镜', 'Pattern mirror')}</h1>
      <p class="lead">${L('这是镜子，不是成绩单。看看哪里有惯性，下一次试着停半拍。', 'A mirror, not a report card. See where habits live and try pausing half a beat next time.')}</p>
      <h2>${L('常被漏掉的信号', 'Signals you tend to miss')}</h2>
      <div class="panel">${miss.map((m) => bar(esc(t(TAX.signals[m.k])), m.miss, m.seen, `${m.miss}/${m.seen}`)).join('') || '—'}<p class="muted">${L('数字 = 自评“漏掉”次数 / 出现次数。', 'Missed / shown, as self-reported.')}</p></div>
      <h2>${L('你的自动反应', 'Your autopilot reactions')}</h2>
      <div class="panel">${apList.map((l) => bar(esc(t(TAX.autopilot[l])), ap[l], apMax)).join('') || '—'}</div>
      ${Object.keys(apTopic).length ? `<h3>${L('在哪类情境里最常出现', 'Where they show up')}</h3><div class="panel">${Object.keys(apTopic).map((tp) => { const o = apTopic[tp]; const top = Object.keys(o).sort((a, b) => o[b] - o[a]).slice(0, 2).map((l) => esc(t(TAX.autopilot[l]))).join(' / '); return `<p><b>${esc(t(TAX.topics[tp]))}</b> → ${top}</p>`; }).join('')}</div>` : ''}
      <h2>${L('第一反应的速度', 'How fast your first reaction came')}</h2>
      <div class="panel">${lat.map((x) => bar(fmtDate(x.ts), x.auto.latency, latMax, (x.auto.latency / 1000).toFixed(1) + 's')).join('') || '—'}<p class="muted">${L('从看到场景到开始打字的时间。很快 ≠ 不好，只是帮你认出“自动模式”。', 'Time from seeing the scenario to typing. Fast isn’t bad — it just reveals autopilot.')}</p></div>
      <h2>${L('设计回应', 'Designed responses')}</h2>
      <div class="panel"><p>${L(`${ss.length} 次练习中，有 ${redesigned} 次写下了刻意设计的回应。`, `In ${ss.length} sessions you wrote a deliberate redesign in ${redesigned}.`)}</p></div>
      <h2>${L('最近练习', 'Recent sessions')}</h2>
      <div class="panel">${ss.slice(-8).reverse().map((x) => { const s = byId(x.sid); return `<p><a href="#/practice/${x.sid}">${esc(s ? t(s.title) : x.sid)}</a> <span class="muted">${fmtDate(x.ts)}</span><br><span class="muted">${L('第一反应：', 'First reaction: ')}${esc((x.auto && x.auto.text) || '—')}</span></p>`; }).join('')}</div></section>`;
  };

  /* ---------- 工具箱 ---------- */
  function examplesFor(k) { const out = []; window.SCENARIOS.forEach((s) => s.veteran.forEach((v) => { if (v.mech.indexOf(k) >= 0 && out.length < 3) out.push({ s, v }); })); return out; }
  SG.toggleTool = (k) => { const i = state.toolbox.indexOf(k); if (i >= 0) state.toolbox.splice(i, 1); else state.toolbox.push(k); save(); };
  routes.toolbox = function () {
    const keys = Object.keys(TAX.mechanisms);
    const mine = keys.filter((k) => state.toolbox.indexOf(k) >= 0), rest = keys.filter((k) => state.toolbox.indexOf(k) < 0);
    const item = (k) => { const m = TAX.mechanisms[k]; return `<div class="panel mech"><div class="row"><h3>${esc(t(m))}</h3><button class="btn small ${state.toolbox.indexOf(k) >= 0 ? 'on' : ''}" data-tool="${k}">${state.toolbox.indexOf(k) >= 0 ? L('★ 已收藏', '★ Saved') : L('☆ 收藏', '☆ Save')}</button></div><p>${esc(m.def)}</p>${examplesFor(k).map((e) => `<blockquote>${esc(t(e.v.say))}<cite><a href="#/practice/${e.s.id}">${esc(t(e.s.title))}</a></cite></blockquote>`).join('')}</div>`; };
    return `<section><h1>${L('工具箱', 'Toolbox')}</h1><p class="lead">${L('老手回应背后的“机制”。比起背话术，更重要的是理解机制，再用你自己的话说出来。', 'The mechanisms behind veteran replies. Understand the mechanism, then say it in your own words.')}</p>
      ${mine.length ? `<h2>${L('我的收藏', 'Saved')}</h2>${mine.map(item).join('')}` : ''}<h2>${L('全部机制', 'All mechanisms')}</h2>${rest.map(item).join('')}</section>`;
  };
  routes['toolbox:bind'] = function () { $$('[data-tool]').forEach((b) => { b.onclick = () => { SG.toggleTool(b.dataset.tool); SG.rerender(); }; }); };

  /* ---------- 日志与意图卡 ---------- */
  routes.journal = function () {
    const cards = state.intents.slice().reverse().map((c) => `<div class="panel"><div class="row"><b>${esc(c.event)}</b><span class="muted">${fmtDate(c.ts)}</span></div>
      <p>${L('留意：', 'Watch for: ')}${nl(c.watch)}</p><p>${L('默认反应：', 'Default reaction: ')}${nl(c.def)}</p><p>${L('备选：', 'Alternative: ')}${nl(c.alt)}</p>
      <label>${L('事后 2 分钟复盘', '2-minute debrief')}<textarea data-after="${c.id}" rows="3" placeholder="${L('发生了什么？我注意到了什么？我实际怎么做的？', 'What happened? What did I notice? What did I actually do?')}">${esc(c.after || '')}</textarea></label>
      <button class="btn small ghost" data-del="${c.id}">${L('删除', 'Delete')}</button></div>`).join('');
    return `<section><h1>${L('日志 · 意图卡', 'Journal · Intent cards')}</h1><p class="lead">${L('把觉察带进真实生活：事前写意图，事后做复盘。', 'Take awareness into real life: set intent before, debrief after.')}</p>
      <form id="intent" class="panel"><label>${L('场合/对象', 'Occasion / person')}<input name="event" required></label>
        <label>${L('这次我要留意…', 'This time I’ll watch for…')}<textarea name="watch" rows="2"></textarea></label>
        <label>${L('我的默认反应可能是…', 'My default reaction may be…')}<textarea name="def" rows="2"></textarea></label>
        <label>${L('我的备选做法', 'My alternative')}<textarea name="alt" rows="2"></textarea></label>
        <button class="btn" type="submit">${L('保存意图卡', 'Save card')}</button></form>${cards}</section>`;
  };
  routes['journal:bind'] = function () {
    const f = $('#intent');
    if (f) f.onsubmit = (e) => { e.preventDefault(); const d = new FormData(f); state.intents.push({ id: String(Date.now()), ts: Date.now(), event: d.get('event'), watch: d.get('watch'), def: d.get('def'), alt: d.get('alt'), after: '' }); save(); SG.rerender(); };
    $$('[data-after]').forEach((el) => { el.oninput = () => { const c = state.intents.find((x) => x.id === el.dataset.after); if (c) { c.after = el.value; save(); } }; });
    $$('[data-del]').forEach((b) => { b.onclick = () => { if (confirm(L('删除这张卡？', 'Delete this card?'))) { state.intents = state.intents.filter((x) => x.id !== b.dataset.del); save(); SG.rerender(); } }; });
  };

  /* ---------- 设置 ---------- */
  routes.settings = function () {
    return `<section><h1>${L('设置', 'Settings')}</h1>
      <div class="panel"><label>${L('语言', 'Language')}<select id="lang"><option value="zh" ${state.lang === 'zh' ? 'selected' : ''}>中文（场景分析为中文，标题与话术附英文）</option><option value="en" ${state.lang === 'en' ? 'selected' : ''}>English (scenario analysis stays in Chinese)</option></select></label>
      <label>${L('第一反应倒计时（秒）', 'First-reaction timer (seconds)')}<input id="timer" type="number" min="3" max="30" value="${state.timer}"></label></div>
      <div class="panel"><p>${L('数据只存在这台设备的浏览器里，不会上传。换设备请导出/导入。', 'Data lives only in this browser and is never uploaded. Export/import to move devices.')}</p>
      <button class="btn" id="exp">${L('导出 JSON', 'Export JSON')}</button> <label class="btn ghost">${L('导入 JSON', 'Import JSON')}<input id="imp" type="file" accept="application/json" hidden></label>
      <button class="btn ghost danger" id="reset">${L('清空所有数据', 'Erase all data')}</button></div></section>`;
  };
  routes['settings:bind'] = function () {
    $('#lang').onchange = (e) => { state.lang = e.target.value; save(); SG.render(); };
    $('#timer').onchange = (e) => { state.timer = Math.max(3, Math.min(30, parseInt(e.target.value, 10) || 8)); save(); };
    $('#exp').onclick = () => {
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })); a.download = 'social-gym-' + new Date().toISOString().slice(0, 10) + '.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    $('#imp').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { const d = JSON.parse(r.result); if (!d || !Array.isArray(d.sessions)) throw 0; Object.assign(state, DEFAULTS, d); save(); alert(L('导入成功', 'Imported')); SG.render(); } catch (x) { alert(L('文件格式不正确', 'Invalid file')); } };
      r.readAsText(f);
    };
    $('#reset').onclick = () => { if (confirm(L('确定清空所有练习与日志？无法恢复。', 'Erase all practice and journal data? This cannot be undone.'))) { Object.assign(state, JSON.parse(JSON.stringify(DEFAULTS))); save(); SG.render(); } };
  };

  SG.start = () => SG.render();
})();
