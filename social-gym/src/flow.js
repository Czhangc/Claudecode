// 练习流程：Notice → Catch → Redesign → Study
(function () {
  const { state, save, L, t, esc, nl, $, $$, byId, dimTag } = window.SG;
  let F = null; // 当前练习状态

  function fresh(id) {
    return { id, step: 0, shown: 1, notice: '', revealed: false, marks: {}, tStart: 0, firstKey: null, auto: '', autoDone: false, labels: [], feel: '', need: '', pause: ['', '', '', ''], r1: '', r2: '', saved: false, sessId: null, ai: { review: null, counter: null, loading: {}, err: {}, manual: '' }, timerId: null };
  }
  function stop() { if (F && F.timerId) { clearInterval(F.timerId); F.timerId = null; } }

  const stepper = (n) => `<ol class="steps">${[L('① 捕捉信号', '① Notice'), L('② 抓住自动反应', '② Catch'), L('③ 刻意设计', '③ Redesign'), L('④ 老手拆解', '④ Study')].map((x, i) => `<li class="${i === n ? 'on' : i < n ? 'done' : ''}">${x}</li>`).join('')}</ol>`;


  const WHICH = () => ({ first: L('第一反应', 'First reaction'), A: L('设计 A', 'Design A'), B: L('设计 B', 'Design B') });
  function aiResult(kind) {
    const r = F.ai[kind]; if (!r) return '';
    if (kind === 'review') {
      return `<div class="panel ai">${r.noticed_well.length ? `<p><b>${L('你捕捉得不错的', 'What you caught well')}</b></p><ul>${r.noticed_well.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${r.missed.length ? `<p><b>${L('可能漏掉的信号', 'Signals you may have missed')}</b></p><ul>${r.missed.map((m) => `<li><b>${esc(m.signal)}</b> — ${esc(m.why_it_matters)}</li>`).join('')}</ul>` : ''}
        <p><b>${L('对你第一反应的解读', 'Reading of your first reaction')}</b></p><p>${nl(r.autopilot_read)}</p>
        ${r.designs.map((d) => `<div class="panel"><b>${L('设计 ', 'Design ')}${esc(d.which)}</b><p>${L('优点：', 'Strengths: ')}${esc(d.strengths)}</p><p>${L('风险：', 'Risks: ')}${esc(d.risks)}</p><blockquote class="say">${esc(d.rewrite)}</blockquote></div>`).join('')}
        <p><b>${L('下次的小实验', 'Next experiment')}</b></p><p>${nl(r.experiment)}</p></div>`;
    }
    return `<div class="panel ai">${r.reactions.map((x) => `<div class="panel"><b>${esc(WHICH()[x.which] || x.which)}</b><blockquote class="say">${esc(x.reply)}</blockquote><p class="muted">${L('对方心里：', 'Inside their head: ')}${esc(x.inner)}</p></div>`).join('')}<p><b>${L('差异', 'The difference')}</b></p><p>${nl(r.takeaway)}</p></div>`;
  }
  function aiPanel() {
    const key = !!state.aiKey, ld = F.ai.loading, er = F.ai.err;
    const btn = (id, label, kind) => `<button class="btn small" id="${id}" ${ld[kind] ? 'disabled' : ''}>${ld[kind] ? L('思考中…', 'Thinking…') : label}</button>`;
    return `<h2>${L('AI 点评', 'AI feedback')}</h2>
      <p class="muted">${key ? L('点击后会把你写的内容发送给 Claude。结果是镜子式的观察，不打分。', 'Clicking sends what you wrote to Claude. The result is a mirror, not a grade.') : L('还没设置 API key。你可以去设置页填写，或先“复制点评提示词”粘贴到任意 Claude 对话。', 'No API key set. Add one in Settings, or copy the prompt into any Claude chat.')}</p>
      <div class="row" style="justify-content:flex-start">${key ? btn('aiReview', L('AI 点评我的回应', 'AI review'), 'review') + btn('aiCounter', L('对方可能怎么回', 'How might they reply'), 'counter') : ''}
        <button class="btn small ghost" id="cpReview">${L('复制点评提示词', 'Copy review prompt')}</button><button class="btn small ghost" id="cpCounter">${L('复制“对方反应”提示词', 'Copy reply prompt')}</button></div>
      ${er.review ? `<p class="err">${esc(er.review)}</p>` : ''}${er.counter ? `<p class="err">${esc(er.counter)}</p>` : ''}
      ${F.ai.manual ? `<label>${L('浏览器不允许自动复制，请手动全选复制：', 'Auto-copy is blocked — select all and copy:')}<textarea rows="6" readonly onclick="this.select()">${esc(F.ai.manual)}</textarea></label>` : ''}
      ${aiResult('review')}${aiResult('counter')}`;
  }

  window.SG.route('practice', (args) => {
    const s = byId(args[0]);
    if (!s) return `<p>${L('找不到场景', 'Scenario not found')} <a href="#/library">←</a></p>`;
    if (!F || F.id !== s.id) { stop(); F = fresh(s.id); }
    const head = `<a class="back" href="#/library">← ${L('场景库', 'Library')}</a><h1>${esc(t(s.title))}</h1><div class="tags">${dimTag(s)}</div>${stepper(F.step)}`;
    const timeline = (upto) => `<div class="tl">${s.timeline.slice(0, upto).map((b, i) => `<div class="beat"><b>${esc(b[0])}</b> ${esc(b[1])}${b[2] ? `<em>${esc(b[2])}</em>` : ''}</div>`).join('')}</div>`;
    const setup = `<div class="panel setup">${esc(t(s.setup))}</div>`;

    if (F.step === 0) {
      const all = F.shown >= s.timeline.length;
      let h = head + setup + timeline(F.shown);
      if (!all) return h + `<button class="btn" id="more">${L('下一幕 →', 'Next beat →')}</button>`;
      h += `<div class="panel"><label>${L('你注意到了哪些信号？先写，再看标注。（语气、停顿、措辞、肢体、旁人、没说出口的……）', 'Which signals did you notice? Write first, then reveal.')}<textarea id="notice" rows="3">${esc(F.notice)}</textarea></label>`;
      if (!F.revealed) return h + `<button class="btn" id="reveal">${L('揭示信号标注', 'Reveal annotations')}</button></div>`;
      const marked = s.signals.every((g) => g.id in F.marks);
      h += `</div><h2>${L('信号标注', 'Annotated signals')}</h2><p class="muted">${L('逐条诚实标记：这条我注意到了，还是漏掉了？（只用于盲区地图）', 'Mark each honestly: noticed or missed? (Feeds your blind-spot map.)')}</p>`;
      h += s.signals.map((g) => `<div class="panel sig"><div class="tags"><span class="tag">${esc(t(TAX.signals[g.type]))}</span><span class="tag alt">${esc(t(TAX.layers[g.layer]))}</span><span class="muted">${L('第 ', 'Beat ')}${g.beat + 1}${L(' 幕', '')}</span></div><p>${esc(g.text)}</p>
        <div class="row"><button class="btn small ${F.marks[g.id] === true ? 'on' : ''}" data-m="${g.id}:1">${L('✓ 我注意到了', '✓ Noticed')}</button><button class="btn small ${F.marks[g.id] === false ? 'on miss' : ''}" data-m="${g.id}:0">${L('✗ 我漏掉了', '✗ Missed')}</button></div></div>`).join('');
      return h + `<button class="btn" id="toCatch" ${marked ? '' : 'disabled'}>${L('下一步：抓住你的第一反应 →', 'Next: catch your first reaction →')}</button>`;
    }

    if (F.step === 1) {
      let h = head + timeline(s.timeline.length) + `<div class="panel setup"><b>${esc(t(s.prompt) || L('你怎么回应？', 'How do you respond?'))}</b></div>`;
      if (!F.autoDone) {
        h += `<div class="timer"><i id="tbar"></i></div><p class="muted" id="tmsg">${L(`限时 ${state.timer} 秒：写下你真实的第一反应，不要修改，不要美化。`, `${state.timer}s: type your genuine first reaction. Don’t edit or polish.`)}</p>
          <textarea id="auto" rows="3" autofocus>${esc(F.auto)}</textarea><button class="btn" id="submitAuto">${L('提交第一反应', 'Submit first reaction')}</button>`;
      } else {
        h += `<div class="panel"><p class="muted">${L('你的第一反应', 'Your first reaction')}</p><p><b>${esc(F.auto)}</b></p></div>
          <h3>${L('这更像哪种自动模式？（可多选）', 'Which autopilot pattern was it? (multi-select)')}</h3><div class="chips">${Object.keys(TAX.autopilot).map((k) => `<button class="chip ${F.labels.indexOf(k) >= 0 ? 'on' : ''}" data-l="${k}">${esc(t(TAX.autopilot[k]))}</button>`).join('')}</div>
          <div class="panel"><label>${L('当时身体/情绪的感受', 'Body / emotion in that moment')}<textarea id="feel" rows="2">${esc(F.feel)}</textarea></label>
          <label>${L('被触发的需求或假设（如：怕被否定、想被认可、想掌控…）', 'The need or assumption triggered (fear of rejection, wanting approval or control…)')}<textarea id="need" rows="2">${esc(F.need)}</textarea></label></div>
          <button class="btn" id="toRedesign">${L('下一步：刻意设计 →', 'Next: redesign →')}</button>`;
      }
      return h;
    }

    if (F.step === 2) {
      const q = [L('我真正想要的结果是什么？', 'What outcome do I actually want?'), L('对方此刻最需要什么？', 'What does the other person need right now?'), L('这段关系的长期考虑？', 'What matters for the long-term relationship?'), L('面子/权力上，谁需要被照顾？', 'Whose face or power needs care here?')];
      return head + `<div class="panel"><p class="muted">${L('你的第一反应', 'Your first reaction')}</p><p><b>${esc(F.auto)}</b></p></div>
        <h2>${L('暂停键', 'The pause button')}</h2>${q.map((x, i) => `<label>${x}<input data-p="${i}" value="${esc(F.pause[i])}"></label>`).join('')}
        <h2>${L('设计两个不同意图的回应', 'Design two responses with different intents')}</h2>
        <label>${L('设计版 A', 'Design A')}<textarea id="r1" rows="3">${esc(F.r1)}</textarea></label><label>${L('设计版 B', 'Design B')}<textarea id="r2" rows="3">${esc(F.r2)}</textarea></label>
        <button class="btn" id="toStudy">${L('下一步：看老手怎么做 →', 'Next: see how veterans do it →')}</button>`;
    }

    // step 3 Study
    return head + `<div class="panel cmp"><div><p class="muted">${L('第一反应', 'First reaction')}</p><p>${nl(F.auto)}</p></div>${F.r1 ? `<div><p class="muted">${L('设计 A', 'Design A')}</p><p>${nl(F.r1)}</p></div>` : ''}${F.r2 ? `<div><p class="muted">${L('设计 B', 'Design B')}</p><p>${nl(F.r2)}</p></div>` : ''}</div>
      ${aiPanel()}
      <h2>${L('老手的回应', 'How a veteran might respond')}</h2><p class="muted">${L('这些是示范思路，不是万能模板。重点看“机制”，然后用你自己的口吻说。', 'These are examples, not templates. Focus on the mechanism, then say it your way.')}</p>
      ${s.veteran.map((v) => `<div class="panel vet"><blockquote class="say">${esc(t(v.say))}</blockquote><div class="chips">${v.mech.map((k) => `<button class="chip ${state.toolbox.indexOf(k) >= 0 ? 'on' : ''}" data-tool="${k}" title="${L('点击收藏到工具箱', 'Click to save to toolbox')}">${state.toolbox.indexOf(k) >= 0 ? '★ ' : '☆ '}${esc(t(TAX.mechanisms[k]))}</button>`).join('')}</div>
        <p><b>${L('为什么有效：', 'Why it works: ')}</b>${esc(v.why)}</p><p><b>${L('边界/风险：', 'Limits: ')}</b>${esc(v.limits)}</p><p><b>${L('语气与时机：', 'Delivery: ')}</b>${esc(v.delivery)}</p></div>`).join('')}
      ${s.pitfalls.length ? `<h2>${L('看似聪明、容易翻车', 'Looks smart, often backfires')}</h2>${s.pitfalls.map((p) => `<div class="panel pit"><blockquote class="say">${esc(p.say)}</blockquote><p>${esc(p.cost)}</p></div>`).join('')}` : ''}
      <div class="panel"><b>${L('带走一件事', 'Take one thing away')}</b><p class="muted">${L('下次遇到类似情境，你会在哪一刻停半拍？', 'Next time something similar happens, where will you pause half a beat?')}</p></div>
      <a class="btn" href="#/library">${L('完成，回场景库', 'Done — back to library')}</a> <button class="btn ghost" id="again">${L('再练一次这个场景', 'Practice again')}</button>`;
  });

  window.SG.route('practice:bind', (args) => {
    const s = byId(args[0]); if (!s || !F) return;
    const rr = () => window.SG.rerender();
    const bindText = (sel, key) => { const el = $(sel); if (el) el.oninput = () => { F[key] = el.value; }; };
    if (F.step === 0) {
      bindText('#notice', 'notice');
      const b = (id, fn) => { const el = $(id); if (el) el.onclick = fn; };
      b('#more', () => { F.shown++; rr(); });
      b('#reveal', () => { F.notice = ($('#notice') || {}).value || F.notice; F.revealed = true; rr(); });
      $$('[data-m]').forEach((el) => { el.onclick = () => { const [id, v] = el.dataset.m.split(':'); F.marks[id] = v === '1'; rr(); }; });
      b('#toCatch', () => { F.step = 1; F.tStart = Date.now(); F.firstKey = null; rr(); });
    } else if (F.step === 1) {
      if (!F.autoDone) {
        const ta = $('#auto'), bar = $('#tbar'), total = state.timer * 1000;
        if (ta) { ta.focus(); ta.oninput = () => { F.auto = ta.value; if (F.firstKey == null) F.firstKey = Date.now() - F.tStart; }; }
        stop();
        F.timerId = setInterval(() => {
          const left = Math.max(0, total - (Date.now() - F.tStart));
          if (bar) bar.style.width = (left / total * 100) + '%';
          if (left === 0) { stop(); const m = $('#tmsg'); if (m) m.textContent = L('时间到——原样提交，别修改。', 'Time’s up — submit as is, no edits.'); }
        }, 100);
        $('#submitAuto').onclick = () => { const v = ta.value.trim(); if (!v) { ta.focus(); return; } F.auto = v; F.duration = Date.now() - F.tStart; F.autoDone = true; stop(); rr(); };
      } else {
        $$('[data-l]').forEach((el) => { el.onclick = () => { const k = el.dataset.l, i = F.labels.indexOf(k); if (i >= 0) F.labels.splice(i, 1); else F.labels.push(k); rr(); }; });
        bindText('#feel', 'feel'); bindText('#need', 'need');
        $('#toRedesign').onclick = () => { F.step = 2; rr(); };
      }
    } else if (F.step === 2) {
      $$('[data-p]').forEach((el) => { el.oninput = () => { F.pause[+el.dataset.p] = el.value; }; });
      bindText('#r1', 'r1'); bindText('#r2', 'r2');
      $('#toStudy').onclick = () => {
        if (!F.saved) {
          F.saved = true;
          F.sessId = String(Date.now());
          state.sessions.push({ id: F.sessId, sid: s.id, ts: Date.now(), noticed: Object.assign({}, F.marks), notice: F.notice,
            auto: { text: F.auto, labels: F.labels.slice(), feel: F.feel, need: F.need, latency: F.firstKey, duration: F.duration },
            redesign: { pause: F.pause.slice(), r1: F.r1, r2: F.r2 } });
          save();
        }
        F.step = 3; rr();
      };
    } else {
      $$('[data-tool]').forEach((el) => { el.onclick = () => { window.SG.toggleTool(el.dataset.tool); rr(); }; });

      const run = async (kind) => {
        const mine = F;
        mine.ai.loading[kind] = true; mine.ai.err[kind] = '';
        rr();
        try {
          mine.ai[kind] = await window.SG.ai.call(kind, s, mine);
          const sess = state.sessions.find((x) => x.id === mine.sessId);
          if (sess) { sess.ai = sess.ai || {}; sess.ai[kind] = mine.ai[kind]; save(); }
        } catch (e) { mine.ai.err[kind] = window.SG.ai.errMsg(e); }
        mine.ai.loading[kind] = false;
        if (F === mine && /^practice\//.test(window.SG.path())) rr();
      };
      const copy = async (kind) => {
        const txt = window.SG.ai.promptText(kind, s, F);
        try { await navigator.clipboard.writeText(txt); F.ai.manual = ''; alert(L('已复制，去 Claude 对话里粘贴即可。', 'Copied — paste it into a Claude chat.')); }
        catch (e) { F.ai.manual = txt; rr(); }
      };
      const bb = (id, fn) => { const el = $(id); if (el) el.onclick = fn; };
      bb('#aiReview', () => run('review')); bb('#aiCounter', () => run('counter'));
      bb('#cpReview', () => copy('review')); bb('#cpCounter', () => copy('counter'));
      $('#again').onclick = () => { F = fresh(s.id); rr(); };
    }
  });

  window.SG.onRoute.push((p) => { if (p.indexOf('practice/') !== 0) stop(); });
})();
