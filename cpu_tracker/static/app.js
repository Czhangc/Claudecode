/* ── CPU Industry Tracker ── */

const sparkCharts = {};

/* ── Helpers ── */
function pct(v) {
  if (v == null) return '<span class="nt">—</span>';
  const cls = v > 0 ? 'up' : v < 0 ? 'dn' : 'nt';
  const sign = v > 0 ? '+' : '';
  return `<span class="${cls}">${sign}${v.toFixed(2)}%</span>`;
}

function fmt(v, prefix = '', suffix = '', decimals = 2) {
  if (v == null) return '—';
  return `${prefix}${parseFloat(v).toFixed(decimals)}${suffix}`;
}

function signalBadge(css, label) {
  const cls = css === 'buy' ? 'badge-buy' : css === 'sell' ? 'badge-sell' : css === 'hold' ? 'badge-hold' : 'badge-neutral';
  return `<span class="${cls}">${label}</span>`;
}

function setColorVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (val == null) { el.textContent = '—'; el.className = 'summary-value nt'; return; }
  const sign = val > 0 ? '+' : '';
  el.textContent = `${sign}${val.toFixed(2)}%`;
  el.className = `summary-value ${val > 0 ? 'up' : val < 0 ? 'dn' : 'nt'}`;
}

/* ── Sparkline chart ── */
function drawSparkline(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  if (sparkCharts[canvasId]) sparkCharts[canvasId].destroy();

  const isUp = data.length >= 2 && data[data.length - 1] >= data[0];
  const color = isUp ? '#3fb950' : '#f85149';

  sparkCharts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data,
        borderColor: color,
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
        fill: true,
        backgroundColor: isUp ? 'rgba(63,185,80,0.08)' : 'rgba(248,81,73,0.08)',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
    }
  });
}

/* ── Render functions ── */
function renderStocks(stocks) {
  const container = document.getElementById('stock-cards');
  if (!stocks || stocks.length === 0) {
    container.innerHTML = '<div class="col-12 text-center text-muted">No data available.</div>';
    return;
  }

  container.innerHTML = stocks.map(s => {
    const changeHtml = pct(s.day_change_pct);
    const price = s.price != null ? `$${s.price.toFixed(2)}` : '—';
    const mcap = s.market_cap_b != null ? `$${s.market_cap_b}B` : '—';
    const pe = s.pe_ratio != null ? s.pe_ratio.toFixed(1) : '—';
    const fpe = s.forward_pe != null ? s.forward_pe.toFixed(1) : '—';
    const rec = s.recommendation || 'n/a';
    const recCss = rec.includes('buy') ? 'up' : rec === 'sell' || rec === 'underperform' ? 'dn' : 'nt';
    return `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="stock-card">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="stock-symbol">${s.symbol}</div>
              <div class="stock-name">${s.name}</div>
            </div>
            <div class="text-end">
              <div class="stock-price">${price}</div>
              <div>${changeHtml}</div>
            </div>
          </div>
          <div class="sparkline-wrap">
            <canvas id="spark-${s.symbol}"></canvas>
          </div>
          <div class="d-flex justify-content-between stock-meta mt-2">
            <span>MCap: ${mcap}</span>
            <span>P/E: ${pe}</span>
          </div>
          <div class="d-flex justify-content-between stock-meta">
            <span>Fwd P/E: ${fpe}</span>
            <span class="${recCss}">${rec.replace('_', ' ')}</span>
          </div>
        </div>
      </div>`;
  }).join('');

  // Draw sparklines after DOM update
  requestAnimationFrame(() => {
    stocks.forEach(s => {
      if (s.sparkline && s.sparkline.length > 1) {
        drawSparkline(`spark-${s.symbol}`, s.sparkline);
      }
    });
  });
}

function renderTrends(stocks) {
  const tbody = document.getElementById('trends-body');
  if (!stocks || stocks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No data.</td></tr>';
    return;
  }

  tbody.innerHTML = stocks.map(s => {
    const pos52 = (s.week52_high && s.week52_low && s.price)
      ? Math.round((s.price - s.week52_low) / (s.week52_high - s.week52_low) * 100)
      : null;
    const barHtml = pos52 != null
      ? `<div class="d-flex align-items-center gap-2">
           <div class="pos-bar-wrap"><div class="pos-bar-fill" style="width:${pos52}%"></div></div>
           <span class="text-muted" style="font-size:0.72rem">${pos52}%</span>
         </div>`
      : '—';

    return `<tr>
      <td><strong class="text-primary">${s.symbol}</strong></td>
      <td>${s.name}</td>
      <td>${pct(s.day_change_pct)}</td>
      <td>${pct(s.perf_1m)}</td>
      <td>${pct(s.perf_3m)}</td>
      <td>${pct(s.perf_1y)}</td>
      <td>${barHtml}</td>
    </tr>`;
  }).join('');
}

function renderSignals(signals) {
  const tbody = document.getElementById('signals-body');
  if (!signals || signals.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No data.</td></tr>';
    return;
  }

  tbody.innerHTML = signals.map(s => {
    const upside = s.upside != null
      ? `<span class="${s.upside >= 0 ? 'up' : 'dn'}">${s.upside >= 0 ? '+' : ''}${s.upside}%</span>`
      : '—';
    return `<tr>
      <td><strong class="text-primary">${s.symbol}</strong></td>
      <td>${s.name}</td>
      <td>${signalBadge(s.signal_css, s.signal)}</td>
      <td>${upside}</td>
      <td>${pct(s.perf_1m)}</td>
      <td>${pct(s.perf_3m)}</td>
    </tr>`;
  }).join('');
}

function renderNews(items) {
  const feed = document.getElementById('news-feed');
  if (!items || items.length === 0) {
    feed.innerHTML = '<div class="text-center text-muted py-4">No news available.</div>';
    return;
  }

  feed.innerHTML = items.map(n => {
    const tickers = (n.related || []).slice(0, 4)
      .map(t => `<span class="news-ticker">${t}</span>`).join('');
    return `<div class="news-item">
      <div class="news-title">
        <a href="${n.link}" target="_blank" rel="noopener">${n.title}</a>
      </div>
      <div class="news-meta">
        ${tickers}
        <span>${n.publisher}</span>
        <span class="ms-2">${n.published_str}</span>
      </div>
    </div>`;
  }).join('');
}

/* ── Data fetching ── */
async function loadStocks() {
  const res = await fetch('/api/stocks');
  return res.json();
}

async function loadNews() {
  const res = await fetch('/api/news');
  return res.json();
}

async function loadTrends() {
  const res = await fetch('/api/trends');
  return res.json();
}

function setRefreshing(on) {
  const icon = document.getElementById('refresh-icon');
  if (on) icon.classList.add('spinning');
  else icon.classList.remove('spinning');
}

async function refreshAll() {
  setRefreshing(true);
  try {
    const [stocks, news, trends] = await Promise.all([loadStocks(), loadNews(), loadTrends()]);

    renderStocks(stocks);
    renderTrends(stocks);
    renderNews(news);
    renderSignals(trends.signals || []);

    // Sector summary
    setColorVal('smh-1m', trends.benchmark?.['1m']);
    setColorVal('smh-3m', trends.benchmark?.['3m']);
    setColorVal('ai-indicator', trends.ai_indicator);

    const maEl = document.getElementById('pct-above-ma');
    const maVal = trends.pct_above_ma50;
    if (maEl) {
      maEl.textContent = maVal != null ? `${maVal}%` : '—';
      maEl.className = `summary-value ${maVal >= 60 ? 'up' : maVal <= 40 ? 'dn' : 'nt'}`;
    }

    document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
  } catch (err) {
    console.error('Refresh error:', err);
  } finally {
    setRefreshing(false);
  }
}

/* ── Init + auto-refresh every 5 min ── */
refreshAll();
setInterval(refreshAll, 5 * 60 * 1000);
