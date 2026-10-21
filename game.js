window.QUIZ_CONTENT = {
  id: 'emoji-detective-v1',
  title: '表情侦探社',
  eyebrow: 'EMOJI DETECTIVE CLUB',
  tagline: '看懂表情，破解密令。',
  description: '一组表情，一个成语。跟上脑回路，看看你能破译多少条密令。',
  accent: '#d9ff69',
  cover: '🐔 ✈️ 🥚 💥',
  settings: { seconds: 20, shuffle: true, baseScore: 100, timeBonus: 40, streakBonus: 10, hintPenalty: 25 },
  results: [
    { minAccuracy: 1, title: '首席破译官', message: '所有密令均已破解。这个侦探社，没你真不行。', emoji: '🕵️' },
    { minAccuracy: 0.75, title: '金牌侦探', message: '你的脑回路已经接通，多数谜题都逃不过你的眼睛。', emoji: '🏅' },
    { minAccuracy: 0.5, title: '灵感调查员', message: '有时一秒看穿，有时陷入沉思。灵感正在路上。', emoji: '💡' },
    { minAccuracy: 0, title: '新晋实习生', message: '别急，表情有自己的方言。再来一轮就熟了。', emoji: '🔎' }
  ],
  questions: [
    { id: 'frog', category: '动物来电', visual: { kind: 'emoji', value: '🕳️ 🐸 👀 ☁️' }, prompt: '这位朋友的视野，有点局限。', options: ['坐井观天', '井底捞月', '一叶障目', '鼠目寸光'], answer: 0, hint: '把自己放进第一格的场景里。', explanation: '青蛙坐在井里看天空：坐井观天，比喻眼界狭小。' },
    { id: 'boat', category: '古人密令', visual: { kind: 'emoji', value: '🚣 🔪 📍 ⚔️' }, prompt: '东西丢了，记号却打错了地方。', options: ['破釜沉舟', '刻舟求剑', '借刀杀人', '顺水推舟'], answer: 1, hint: '船会走，水下的剑可不会跟着走。', explanation: '在船上刻下记号寻找落水的剑，就是刻舟求剑。' },
    { id: 'snake', category: '多余操作', visual: { kind: 'emoji', value: '🖌️ 🐍 ➕ 🦶' }, prompt: '作品已经完成，他还想再加一点。', options: ['龙飞凤舞', '画龙点睛', '画蛇添足', '笔走龙蛇'], answer: 2, hint: '最后那个部位，主角真的需要吗？', explanation: '蛇本来没有脚，画完再添上脚，反而弄巧成拙。' },
    { id: 'rabbit', category: '动物来电', visual: { kind: 'emoji', value: '🧑 🪵 ⏳ 🐇' }, prompt: '今天不上班，等一份自己送上门的好运。', options: ['兔死狐悲', '守株待兔', '狡兔三窟', '动如脱兔'], answer: 1, hint: '关键不在兔子，而在这个人一直守着什么。', explanation: '守着树桩等待兔子撞来：守株待兔，比喻不主动努力，只盼侥幸。' },
    { id: 'music', category: '声音档案', visual: { kind: 'emoji', value: '🐂 🎵 🎹 🎶' }, prompt: '演奏很投入，听众却没听懂。', options: ['高山流水', '余音绕梁', '对牛弹琴', '牛刀小试'], answer: 2, hint: '看看这场音乐会的唯一观众是谁。', explanation: '给牛弹琴：对牛弹琴，比喻对不理解的人白费口舌。' },
    { id: 'ear', category: '离谱现场', visual: { kind: 'emoji', value: '🙉 🤏 🔔 🏃' }, prompt: '只要我听不见，就没有人听得见。', options: ['掩耳盗铃', '闻鸡起舞', '耳濡目染', '震耳欲聋'], answer: 0, hint: '他遮住了自己的耳朵，却还要偷什么？', explanation: '偷铃时捂住自己的耳朵：掩耳盗铃，比喻自欺欺人。' },
    { id: 'tiger', category: '动物来电', visual: { kind: 'emoji', value: '🦊 😎 🐯 👑' }, prompt: '排场挺大，威风却是借来的。', options: ['如虎添翼', '虎头蛇尾', '狼狈为奸', '狐假虎威'], answer: 3, hint: '前面的动物，借了后面那位的势。', explanation: '狐狸借老虎的威风吓唬别的动物，这就是狐假虎威。' },
    { id: 'moon', category: '夜间观察', visual: { kind: 'emoji', value: '🌊 🫴 🌕 🫧' }, prompt: '看起来近在眼前，伸手却是一场空。', options: ['海底捞月', '花好月圆', '众星捧月', '披星戴月'], answer: 0, hint: '你看到的月亮，只是水里的倒影。', explanation: '到水里捞月亮当然徒劳：海底捞月，比喻白费力气。' }
  ]
};
