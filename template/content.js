// 复制此目录并修改这份内容。视觉支持 emoji、text、image；image 的 value 填图片路径。
window.QUIZ_CONTENT = {
  id: 'quizkit-starter',
  title: '脑洞热身站',
  eyebrow: 'QUIZKIT STARTER',
  tagline: '换个题库，就是新游戏。',
  description: '三道轻松小题，体验计时、提示、答题反馈和结果卡。',
  accent: '#c6b8ff',
  cover: '🧠 ⚡ 💬',
  settings: { seconds: 20, shuffle: false, baseScore: 100, timeBonus: 40, streakBonus: 10, hintPenalty: 25 },
  results: [
    { minAccuracy: 1, title: '热身完成', message: '三题全对！现在可以把它换成你自己的题库了。', emoji: '🎯' },
    { minAccuracy: 0, title: '灵感启动', message: '再挑战一次，看看能否解锁满分。', emoji: '💡' }
  ],
  questions: [
    { id: 'earth', category: '常识选择', visual: { kind: 'emoji', value: '🌍 ☀️' }, prompt: '地球绕太阳转一圈，大约多久？', options: ['一天', '一个月', '一年', '十年'], answer: 2, hint: '每过一次生日，就完成了新的一圈。', explanation: '地球公转一周约为一年。' },
    { id: 'number', category: '找规律', visual: { kind: 'text', value: '2 · 4 · 8 · ?' }, prompt: '按照每次乘以 2 的规律，下一项是？', options: ['10', '12', '14', '16'], answer: 3, hint: '用最后一个数再乘以 2。', explanation: '8 × 2 = 16。' },
    { id: 'plant', category: '表情猜词', visual: { kind: 'emoji', value: '🌱 💧 ☀️' }, prompt: '植物利用阳光制造养分的过程叫什么？', options: ['光合作用', '蒸发作用', '凝结作用', '燃烧反应'], answer: 0, hint: '答案的第一个字，正来自太阳。', explanation: '光合作用利用光能，将二氧化碳和水转化成有机物。' }
  ]
};
