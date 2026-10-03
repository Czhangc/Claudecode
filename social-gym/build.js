// 把 src/ 内联成单文件 index.html（无外部依赖，任何方式打开都能运行）。用法：node build.js
const fs = require('fs'), r = (f) => fs.readFileSync(__dirname + '/src/' + f, 'utf8').replace(/<\/script/gi, '<\\/script');
const js = ['taxonomy.js', 'scenarios.js', 'micro-experiments.js', 'app.js', 'flow.js'].map(r).join('\n;\n');
fs.writeFileSync(__dirname + '/index.html', `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
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
</script>
</body>
</html>
`);
console.log('built index.html', fs.statSync(__dirname + '/index.html').size, 'bytes');
