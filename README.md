# QuizKit · 表情侦探社

一个无需构建、无需依赖的竖屏问答模板，以及完整示例游戏《表情侦探社》。八条原创编排的表情成语密令，支持倒计时、提示、连对奖励、答案复盘和 PNG 成绩卡。

## 在线试玩

示例游戏已公开发布：

- [BilibiliToy](https://www.bilibili.com/toy/emoji-detective-club/index.html)
- [VibeHub](https://gamesvibe.app/play/SyoEHDJ9ze95WYqNG0V2H)


## 直接玩

用浏览器打开 `index.html` 即可；也可启动本地静态服务：

```sh
python3 -m http.server 8133
```

- 游戏：`http://localhost:8133/`
- 模板：`http://localhost:8133/template/`
- 电脑按 `1–4` 选择答案，`Enter` 开始或继续；手机直接点选。

## 用模板做下一个作品

复制整个仓库，修改根目录 `game.js` 即可使用完整示例的页面结构。也可以先打开 `template/index.html`，修改更短的 `template/content.js`。

内容入口是 `window.QUIZ_CONTENT`：

| 字段 | 作用 |
| --- | --- |
| `id` | 作品唯一名，用于本地最高分存档；新作品请修改 |
| `title` / `eyebrow` / `tagline` / `description` | 标题、中英文说明和首页文案 |
| `accent` / `cover` | 主题强调色、首页表情 |
| `settings.seconds` | 单题时限 |
| `settings.shuffle` | 是否打乱题目顺序 |
| `settings.baseScore` / `timeBonus` / `streakBonus` / `hintPenalty` | 基础分、速度奖励、连对奖励、提示扣分 |
| `questions` | 题库，格式见下面 |
| `results` | 按正确率从高到低填写结果，最后一项 `minAccuracy` 设为 `0` |

```js
{
  id: 'question-1',
  category: '猜图',
  visual: { kind: 'emoji', value: '🐂 🎹' },
  prompt: '这组表情代表哪个成语？',
  options: ['对牛弹琴', '高山流水', '余音绕梁', '闻鸡起舞'],
  answer: 0, // 从 0 开始的选项序号；每题四个选项
  hint: '先看听众是谁。',
  explanation: '给牛弹琴，比喻对不理解的人白费口舌。'
}
```

`visual.kind` 支持 `emoji`、`text`、`image`。图片题把 `value` 写为本地资源路径，另加 `alt` 描述即可。根入口和模板入口的相对图片路径分别以其 HTML 为基准。

## 计分

答对获得基础分 + 剩余时间比例奖励 + 连对奖励；连对奖励最高按五次额外连对计。使用提示从本题正确奖励中扣除提示分；自定义配置若使本题奖励为负，也会降低累计积分。答错或超时得 0 分并重置连对。最高分只存当前浏览器，不含服务器排行榜。

## 文件

```text
index.html          完整示例入口
game.js             示例游戏内容包
engine.js           共用问答运行时
styles.css          共用样式
template/
  index.html        模板入口
  content.js        三题起步内容包
```

本项目没有第三方字体、网络接口或素材依赖，离线可玩。PNG 成绩卡使用浏览器下载功能，实际保存位置由浏览器决定。示例游戏已上线 BilibiliToy 与 VibeHub。

MIT License.

## 制作指南

详细的起步步骤、配置约束、换皮范围、浏览器限制与排错见 [制作指南](AUTHORING.md)。
