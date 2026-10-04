// 用 Chromium 把 SVG 标识渲染成 PNG 图标。用法：node tools/make-icons.js
const { chromium } = require(process.env.PW_PATH || '/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const svg = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#b5543a"/>
<g transform="translate(${pad} ${pad}) scale(${(512 - 2 * pad) / 512})"><path d="M120 150a52 52 0 0 1 52-52h168a52 52 0 0 1 52 52v110a52 52 0 0 1-52 52H236l-70 60v-60h-6a52 52 0 0 1-40-52z" fill="#faf7f2"/>
<circle cx="200" cy="205" r="16" fill="#b5543a"/><circle cx="256" cy="205" r="16" fill="#b5543a"/><circle cx="312" cy="205" r="16" fill="#b5543a"/></g></svg>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const out = path.join(__dirname, '..', 'icons');
  for (const [name, size, pad] of [['icon-192.png', 192, 0], ['icon-512.png', 512, 0], ['maskable-512.png', 512, 70], ['apple-touch-icon.png', 180, 0]]) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<body style="margin:0">${svg(pad).replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`);
    fs.writeFileSync(path.join(out, name), await p.screenshot());
    await p.close();
  }
  await b.close();
})();
