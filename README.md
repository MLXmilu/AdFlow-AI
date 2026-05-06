# AdFlow · AI 全场景广告智能调度系统

> 腾讯 PCG 校园 AI 产品创意大赛参赛作品

---

## 产品概述

**AdFlow** 是一个基于多模态 AI 的全场景广告智能调度系统，旨在视频播放全流程中（进场 → 播放中 → 暂停）实现广告的动态适配，在用户、平台、广告主三方利益间找到最优平衡点。

### 核心能力

| 能力 | 说明 |
|---|---|
| **进场广告（Pre-Roll）** | 视频开始前全屏展示，AI 根据用户兴趣画像动态匹配广告，支持 3s 智能缩短倒计时 |
| **暂停广告（Pause）** | 用户暂停时主视频缩小为画中画（PiP），右侧渐显匹配广告，氛围色随画面自适应 |
| **高潮保护区（Climax Guard）** | 实时检测画面运动量和字幕语义，在剧情高潮时段自动退让广告打扰形式 |
| **氛围自适应（Ambient）** | Canvas 截帧提取视频主色调，广告侧边发光随视频色彩动态变化 |
| **AI 决策引擎** | 接入 mimo-v2-omni 多模态模型，综合用户画像、视频内容、场景上下文输出推荐理由 |

---

## 技术架构

```
接入层  →  感知层  →  决策层  →  渲染层
视频播放器事件 / 用户画像 / 广告池数据
        场景识别 / 高潮检测 / 氛围取色
        mimo-v2-omni 多模态推理 / 广告池排序
        双流 PiP / 氛围光渐显 / 高潮进度条保护
```

---

## 技术栈

| 类别 | 技术 |
|---|---|
| 前端框架 | Vue 3 + Composition API + TypeScript |
| 构建工具 | Vite 6 |
| 样式方案 | Tailwind CSS 3 + 自定义 glass-card 组件 |
| 路由 | Vue Router 4 |
| 图表 | ECharts 6 + vue-echarts |
| 图标 | Lucide Vue Next |
| AI 模型 | mimo-v2-omni（需在 `.env` 配置 API Key） |

---

## 页面说明

| 路由 | 页面 | 说明 |
|---|---|---|
| `/pre-roll` | 进场广告 | 对比传统 60s 强制广告 vs AI 智能进场广告 |
| `/in-play` | 播放中广告 | 双流画中画 + 高潮保护区 + AI 决策过程 |
| `/compare` | 全场景对比 | Tab 切换展示两种广告位的传统方案 vs AdFlow 方案 |
| `/dashboard` | 设计解析 | 系统架构 / 三方利益平衡 / 核心产品亮点 |

---

## 快速启动

### 环境要求

- Node.js >= 18

### 安装依赖

```bash
npm install
```

### 配置 AI（可选）

如需使用 AI 决策功能，在项目根目录创建 `.env` 文件：

```env
VITE_MIMO_API_KEY=your_api_key_here
VITE_MIMO_BASE_URL=https://api Minimax.chat
VITE_MIMO_MODEL=mimo-v2-omni
```

> 若不配置，AI 面板会显示"未配置 API Key"提示，但不影响页面其他交互演示。

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`，默认跳转至进场广告页面。

### 构建生产版本

```bash
npm run build
```

---

## 广告池数据

`src/data/adPoolData.ts` 包含 **24 条广告**，覆盖 10 个内容分类：

| 分类 | 示例品牌 |
|---|---|
| 体育赛事 | Nike、Adidas |
| 古装剧 | 重回汉唐、梦幻西游 |
| 电影大片 | IMAX、淘票票 |
| 综艺 | 元气森林、Keep |
| 动画 | 万代、哔哩哔哩 |
| 音乐现场 | 网易云音乐、摩登天空 |
| 游戏直播 | 罗技G、雷蛇 |
| 纪录片 | 国家地理、知乎盐选 |
| 美食探店 | 美团外卖、海底捞 |
| 新闻资讯 | 腾讯新闻、得到 |

---

## 核心交互逻辑

### AI 触发规则（AdInPlay.vue）

- **暂停时触发**：用户暂停视频 → 调用 AI 分析 → 同一暂停周期内不重复调用
- **恢复播放时取消**：用户在 AI 思考期间恢复播放，自动取消请求
- **中断取消**：切换视频分类、修改兴趣/历史、拖动进度条均会取消正在进行的 AI 分析
- **离开页面清理**：`onUnmounted` 钩子确保页面切换时终止所有pending请求

---

## 项目结构

```
src/
├── components/
│   ├── AiBrainPanel.vue    # AI 推理过程展示面板
│   └── Sidebar.vue         # 侧边导航栏
├── composables/
│   ├── useAiService.ts     # AI 服务（含 AbortController 取消机制）
│   └── config.ts           # AI API 配置
├── data/
│   └── adPoolData.ts       # 广告池 + 视频场景 + 兴趣/历史选项
├── views/
│   ├── AdPreRoll.vue       # 进场广告
│   ├── AdInPlay.vue        # 暂停/播放中广告
│   ├── Compare.vue         # 全场景对比
│   └── Dashboard.vue       # 设计解析
├── router/
│   └── index.ts
└── App.vue
```

---

## License

MIT
