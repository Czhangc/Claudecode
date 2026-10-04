// 把 src/ 内联成单文件 index.html（无外部依赖，任何方式打开都能运行）。用法：node build.js
const fs = require('fs'), crypto = require('crypto'), r = (f) => fs.readFileSync(__dirname + '/src/' + f, 'utf8').replace(/<\/script/gi, '<\\/script');
const js = ['taxonomy.js', 'scenarios.js', 'micro-experiments.js', 'app.js', 'ai.js', 'flow.js'].map(r).join('\n;\n');
fs.writeFileSync(__dirname + '/index.html', `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#b5543a">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Social Gym">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link rel="icon" href="icons/icon-192.png">
<title>Social Gym · 社交觉察训练</title>
<style>
${r('styles.css')}
</style>
</head>
<body>
<header><a class="brand" href="#/home">Social Gym</a><nav id="nav"></nav></header>
<main id="app"></main>
<script>
${js}
SG.start();
// 仅在 https/localhost 下注册 Service Worker；file:// 或沙箱预览中静默跳过
try { if ('serviceWorker' in navigator && /^(https:|http:)$/.test(location.protocol) && (location.protocol === 'https:' || /^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname))) navigator.serviceWorker.register('sw.js').catch(function () {}); } catch (e) {}
</script>
</body>
</html>
`);
const ver = crypto.createHash('sha1').update(fs.readFileSync(__dirname + '/index.html')).digest('hex').slice(0, 10);
fs.writeFileSync(__dirname + '/sw.js', fs.readFileSync(__dirname + '/src/sw.template.js', 'utf8').replace('__VERSION__', ver));
console.log('built index.html', fs.statSync(__dirname + '/index.html').size, 'bytes');
