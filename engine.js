(() => {
  const content = window.QUIZ_CONTENT;
  const config = content.settings;
  const app = document.querySelector('#app');
  document.documentElement.style.setProperty('--accent', content.accent);
  document.title = `${content.title} · QuizKit`;
  let timer;
  let questions = [];
  let history = [];
  let index = 0;
  let score = 0;
  let streak = 0;
  let hinted = false;
  let answered = false;
  let remaining = config.seconds;
  let best = Number(localStorage.getItem(`${content.id}:best`) || 0);

  function shell(body, mode = '') {
    app.innerHTML = `
      <header class="site-header"><a class="brand" href="#" aria-label="返回首页"><span class="brand-mark">Q<span>↗</span></span><span>QUIZKIT <small>小题大作</small></span></a><span class="edition"><i></i> ISSUE 001 / 随时开局</span></header>
      <main class="workspace">
        <aside class="studio"><div class="kicker">${content.eyebrow}</div><h1>${content.tagline.replace('，', '，<br>')}</h1><p>${content.description}</p><div class="studio-art" aria-hidden="true"><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span><span class="art-star">✳</span><span class="art-label">FOLLOW YOUR<br>FIRST INSTINCT.</span><span class="art-arrow">↗</span></div><div class="studio-footer"><span>一点脑洞 · 一点快乐</span><span>NO DOWNLOAD NEEDED</span></div></aside>
        <section class="game-panel ${mode}" aria-label="${content.title}">${body}</section>
      </main><footer class="site-footer"><span>MADE FOR CURIOUS MINDS</span><span>轻轻一点，脑洞上线。</span></footer>`;
    app.querySelector('.brand').onclick = event => { event.preventDefault(); home(); };
  }

  function home() {
    clearInterval(timer);
    shell(`
      <div class="panel-top"><span class="tiny-label">今日脑力营业中</span><span class="status-dot">ONLINE</span></div>
      <div class="cover-scene"><div class="cover-tag">一眼看懂？没那么简单。</div><div class="cover-icons">${content.cover}</div><span class="scene-spark spark-one">✦</span><span class="scene-spark spark-two">✦</span><div class="case-label">CONFIDENTIAL / 趣味密令</div></div>
      <div class="intro-body"><div class="kicker">${content.eyebrow}</div><h2>${content.title}<span>↗</span></h2><p>${content.description}</p><div class="meta-grid"><div><strong>${content.questions.length}<small> 道</small></strong><span>脑洞关卡</span></div><div><strong>${config.seconds}<small> 秒</small></strong><span>每题限时</span></div><div><strong>${best || '—'}</strong><span>个人最高</span></div></div><button class="primary" id="start">开始破译 <span>→</span></button><p class="footnote">选中即作答 · 连对加分 · 卡住可看提示</p><a class="template-link" href="${location.pathname.includes('/template/') ? '../' : './template/'}">${location.pathname.includes('/template/') ? '← 返回完整示例游戏' : '看看可复用模板'} <span>↗</span></a></div>
    `, 'intro');
    document.querySelector('#start').onclick = start;
  }

  function start() {
    questions = [...content.questions];
    if (config.shuffle) {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
    }
    index = 0;
    score = 0;
    streak = 0;
    history = [];
    showQuestion();
  }

  function visual(question) {
    return question.visual.kind === 'image'
      ? `<img class="question-image" src="${question.visual.value}" alt="${question.visual.alt || question.prompt}">`
      : `<div class="question-visual ${question.visual.kind === 'text' ? 'text-visual' : ''}">${question.visual.value}</div>`;
  }

  function showQuestion() {
    clearInterval(timer);
    const question = questions[index];
    answered = false;
    hinted = false;
    remaining = config.seconds;
    shell(`
      <div class="panel-top"><button class="text-button" id="exit">← 首页</button><span class="score-pill">✦ <b id="score">${score}</b></span></div>
      <div class="quiz-body"><div class="question-header"><span class="tiny-label">密令 <b>${String(index + 1).padStart(2, '0')}</b> / ${String(questions.length).padStart(2, '0')}</span><span class="timer" id="timer">◷ ${remaining}s</span></div><div class="progress-track"><div style="width:${index / questions.length * 100}%"></div></div><div class="puzzle-card"><span class="category">${question.category}</span>${visual(question)}<span class="puzzle-number">FILE / ${String(index + 1).padStart(3, '0')}</span></div><h2 class="question-title">${question.prompt}</h2><div class="options">${question.options.map((option, i) => `<button class="option" data-answer="${i}"><span class="option-letter">${'ABCD'[i]}</span><span>${option}</span><span class="answer-icon"></span></button>`).join('')}</div><div class="hint-area" id="hint-area"><button class="hint-button" id="hint">💡 给点线索 <span>本题 −${config.hintPenalty} 分</span></button><span class="streak-label">${streak > 1 ? `🔥 ${streak} 连对` : '跟着第一直觉走'}</span></div><div id="feedback" aria-live="polite"></div></div>
    `, 'playing');
    document.querySelector('#exit').onclick = home;
    document.querySelectorAll('[data-answer]').forEach(button => { button.onclick = () => answer(Number(button.dataset.answer)); });
    document.querySelector('#hint').onclick = () => {
      hinted = true;
      document.querySelector('#hint-area').innerHTML = `<p class="hint-copy">💡 ${question.hint}</p>`;
    };
    const deadline = Date.now() + config.seconds * 1000;
    timer = setInterval(() => {
      remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      const display = document.querySelector('#timer');
      display.textContent = `◷ ${remaining}s`;
      display.classList.toggle('urgent', remaining <= 5);
      if (!remaining) answer(-1);
    }, 100);
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    const question = questions[index];
    const correct = choice === question.answer;
    streak = correct ? streak + 1 : 0;
    const points = correct ? config.baseScore + Math.round(config.timeBonus * remaining / config.seconds) + Math.min(streak - 1, 5) * config.streakBonus - (hinted ? config.hintPenalty : 0) : 0;
    score += points;
    history.push({ question, choice, correct, points, hinted });
    document.querySelector('#score').textContent = score;
    document.querySelectorAll('[data-answer]').forEach(button => {
      const value = Number(button.dataset.answer);
      button.disabled = true;
      if (value === question.answer) { button.classList.add('correct'); button.querySelector('.answer-icon').textContent = '✓'; }
      else if (value === choice) { button.classList.add('incorrect'); button.querySelector('.answer-icon').textContent = '×'; }
    });
    document.querySelector('#hint-area').hidden = true;
    document.querySelector('#feedback').innerHTML = `<div class="feedback ${correct ? 'good' : 'miss'}"><strong>${correct ? `漂亮！破译成功 <span>+${points}</span>` : choice === -1 ? '时间到！密令揭晓' : '差一点！换个角度看'}</strong><p>${question.explanation}</p></div><button class="primary compact" id="next">${index + 1 === questions.length ? '查看侦探报告' : '下一条密令'} <span>→</span></button>`;
    document.querySelector('#next').onclick = () => { index++; index < questions.length ? showQuestion() : results(); };
  }

  function resultInfo() {
    const correct = history.filter(item => item.correct).length;
    return { correct, result: content.results.find(result => correct / questions.length >= result.minAccuracy) };
  }

  function results() {
    clearInterval(timer);
    const { correct, result } = resultInfo();
    const newBest = score > best;
    best = Math.max(best, score);
    localStorage.setItem(`${content.id}:best`, best);
    shell(`<div class="panel-top"><span class="tiny-label">CASE CLOSED / 侦探报告</span><span class="status-dot">COMPLETE</span></div><div class="result-body"><div class="result-stamp">${result.emoji}</div><div class="kicker">${content.title} · 本次鉴定</div><h2 class="result-title">${result.title}</h2><p class="result-message">${result.message}</p><div class="result-score"><span>本次积分</span><strong>${score}<small>pts</small></strong>${newBest ? '<b class="new-best">NEW BEST ↗</b>' : `<b class="best-label">个人最高 ${best}</b>`}</div><div class="result-stats"><div><strong>${correct}<small> / ${questions.length}</small></strong><span>破译成功</span></div><div><strong>${Math.round(correct / questions.length * 100)}<small>%</small></strong><span>正确率</span></div></div><button class="primary" id="again">再来一局 <span>↻</span></button><div class="secondary-actions"><button class="secondary" id="review">查看解析</button><button class="secondary" id="save">保存成绩卡 ↗</button></div><p class="footnote">多一个脑洞，下次就多一分。</p><span id="save-status" role="status"></span></div>`, 'results');
    document.querySelector('#again').onclick = start;
    document.querySelector('#review').onclick = review;
    document.querySelector('#save').onclick = saveCard;
  }

  function review() {
    shell(`<div class="panel-top"><button class="text-button" id="back">← 返回报告</button><span class="tiny-label">案件复盘</span></div><div class="review-body"><h2>每个脑洞，都有答案。</h2>${history.map((item, i) => `<article class="review-item"><div class="review-top"><span>FILE ${String(i + 1).padStart(2, '0')} · ${item.question.category}</span><b class="${item.correct ? 'review-correct' : 'review-incorrect'}">${item.correct ? `+${item.points}` : '未破译'}</b></div>${visual(item.question)}<h3>${item.question.options[item.question.answer]}</h3><p>${item.question.explanation}</p><small>你的选择：${item.choice < 0 ? '超时未选' : item.question.options[item.choice]}${item.hinted ? ' · 使用了提示' : ''}</small></article>`).join('')}<button class="primary" id="again">再挑战一次 <span>↻</span></button></div>`, 'review');
    document.querySelector('#back').onclick = results;
    document.querySelector('#again').onclick = start;
  }

  function saveCard() {
    const { correct, result } = resultInfo();
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 960;
    const context = canvas.getContext('2d');
    context.fillStyle = '#f8f8f2'; context.fillRect(0, 0, 720, 960);
    context.fillStyle = content.accent; context.fillRect(32, 32, 656, 240);
    context.fillStyle = '#20221d'; context.font = 'bold 22px sans-serif'; context.fillText('QUIZKIT / 侦探报告', 64, 86);
    context.font = 'bold 58px sans-serif'; context.fillText(content.title, 64, 178);
    context.font = '24px sans-serif'; context.fillText('跟着第一直觉，打开一点脑洞。', 64, 232);
    context.font = 'bold 48px sans-serif'; context.fillText(result.title, 64, 380);
    context.font = 'bold 132px sans-serif'; context.fillText(String(score), 56, 560);
    context.font = '24px sans-serif'; context.fillText('本次积分 / POINTS', 64, 608);
    context.fillStyle = '#e9ebdf'; context.fillRect(64, 666, 592, 118);
    context.fillStyle = '#20221d'; context.font = 'bold 32px sans-serif'; context.fillText(`${correct} / ${questions.length} 题破解`, 86, 718);
    context.font = '24px sans-serif'; context.fillText(`正确率 ${Math.round(correct / questions.length * 100)}%`, 86, 757);
    context.fillStyle = '#666a5c'; context.font = '20px sans-serif'; context.fillText('一点脑洞 · 一点快乐', 64, 868);
    context.fillText('MADE FOR CURIOUS MINDS', 64, 904);
    const link = document.createElement('a');
    link.download = `${content.title}-${score}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    document.querySelector('#save-status').textContent = '成绩卡已生成';
  }

  document.addEventListener('keydown', event => {
    if (/^[1-4]$/.test(event.key)) document.querySelector(`[data-answer="${Number(event.key) - 1}"]:not(:disabled)`)?.click();
    if (event.key === 'Enter') document.querySelector('#next, #start, #again')?.click();
  });
  home();
})();
