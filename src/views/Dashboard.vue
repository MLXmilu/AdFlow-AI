<script setup lang="ts">
import { ref } from 'vue'
import { Lightbulb, Users, Building2, TrendingUp, Layers, Cpu, Eye, Shield, Zap } from 'lucide-vue-next'

// 三方利益平衡数据
const stakeholders = [
  {
    icon: Users,
    title: '用户',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    problems: ['强制观看、无法跳过', '广告内容与兴趣无关', '中断感强、体验割裂'],
    solutions: ['智能缩短、主动保护', '多维画像精准匹配', '无缝融入、氛围自适应']
  },
  {
    icon: Building2,
    title: '平台',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    problems: ['广告填充率与体验强冲突', '统一策略无法适配多场景', '用户流失影响长尾收益'],
    solutions: ['动态博弈找到最优解', '场景感知差异化调度', '体验正向 → 留存 → LTV']
  },
  {
    icon: TrendingUp,
    title: '广告主',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    problems: ['贴片时长固定、强制曝光', '上下文匹配度低、转化差', '品牌安全风险（高潮时段）'],
    solutions: ['AI 动态分配最优展示时机', '上下文 + 兴趣双匹配', '高潮保护区避免品牌事故']
  }
]

// 产品亮点
const highlights = [
  {
    icon: Layers,
    title: '三场景智能触发',
    desc: '进场广告 · 暂停广告 · 播放中广告，根据用户行为和视频内容动态决定展示策略',
    tag: '核心创新'
  },
  {
    icon: Eye,
    title: '高潮保护区',
    desc: '画面运动激烈或核心剧情点自动识别，进度条高亮提示，广告退让至低打扰形式',
    tag: '体验优先'
  },
  {
    icon: Shield,
    title: '氛围自适应',
    desc: '从当前视频画面实时抽取主色调，广告侧边渐显时光随色动，视觉融入而非突兀插入',
    tag: '视觉融合'
  },
  {
    icon: Zap,
    title: '多模态理解引擎',
    desc: 'mimo-v2-omni 模型实时分析画面语义、字幕文本、音频情绪，综合判断用户状态',
    tag: '底层支撑'
  }
]

// 架构层级
const archLayers = [
  { label: '接入层', items: ['视频播放器事件', '用户画像信号', '广告池数据'] },
  { label: '感知层', items: ['场景识别（进场/暂停/播放中）', '高潮检测（运动量+字幕）', '氛围取色（画面主色调）'] },
  { label: '决策层', items: ['mimo-v2-omni 多模态推理', '广告池智能排序', '展示形式选择（全屏/画中画/贴片）'] },
  { label: '渲染层', items: ['双流画中画 PiP', '氛围光渐显动画', '高潮进度条保护条'] }
]

const activeHighlight = ref(0)
</script>

<template>
  <div class="p-4 md:p-6 lg:p-10 h-full flex flex-col gap-8 overflow-y-auto">
    <header>
      <h2 class="text-2xl lg:text-3xl font-bold">AdFlow 设计解析</h2>
      <p class="text-white/50 mt-1 text-sm lg:text-base">AI 驱动的全场景广告智能调度系统</p>
    </header>

    <!-- 架构层级 -->
    <section>
      <h3 class="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Cpu :size="14" /> 系统架构
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          v-for="(layer, idx) in archLayers"
          :key="layer.label"
          class="glass-card py-4 px-4"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              L{{ idx + 1 }}
            </span>
            <span class="text-sm font-bold text-white/80">{{ layer.label }}</span>
          </div>
          <ul class="space-y-1.5">
            <li
              v-for="item in layer.items"
              :key="item"
              class="text-[11px] text-white/40 leading-relaxed"
            >
              · {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 三方利益平衡 -->
    <section>
      <h3 class="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Lightbulb :size="14" /> 三方利益平衡
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="s in stakeholders"
          :key="s.title"
          :class="['rounded-2xl border p-5', s.bg]"
        >
          <div class="flex items-center gap-3 mb-5">
            <div :class="['p-2 rounded-xl bg-white/5', s.color]">
              <component :is="s.icon" :size="18" />
            </div>
            <span class="text-lg font-bold text-white/90">{{ s.title }}</span>
          </div>

          <div class="space-y-4">
            <div>
              <p class="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">传统痛点</p>
              <ul class="space-y-1">
                <li
                  v-for="p in s.problems"
                  :key="p"
                  class="text-xs text-white/50 leading-relaxed"
                >
                  ❌ {{ p }}
                </li>
              </ul>
            </div>
            <div>
              <p class="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">AdFlow 方案</p>
              <ul class="space-y-1">
                <li
                  v-for="sol in s.solutions"
                  :key="sol"
                  class="text-xs leading-relaxed"
                  :class="s.color"
                >
                  ✅ {{ sol }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品亮点 -->
    <section>
      <h3 class="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
        <TrendingUp :size="14" /> 核心产品亮点
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(h, idx) in highlights"
          :key="h.title"
          :class="[
            'glass-card p-5 cursor-pointer transition-all duration-300',
            activeHighlight === idx ? 'ring-1 ring-primary/40 bg-primary/5' : 'hover:bg-white/5'
          ]"
          @click="activeHighlight = activeHighlight === idx ? -1 : idx"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-primary/10 text-primary">
                <component :is="h.icon" :size="16" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white/90">{{ h.title }}</h4>
                <span class="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded mt-0.5 inline-block">
                  {{ h.tag }}
                </span>
              </div>
            </div>
          </div>
          <p class="text-xs text-white/50 leading-relaxed pl-[44px]">
            {{ h.desc }}
          </p>
        </div>
      </div>
    </section>

    <!-- 设计理念 -->
    <section class="pb-4">
      <div class="glass-card p-6 text-center">
        <p class="text-sm text-white/60 leading-relaxed max-w-3xl mx-auto">
          <span class="text-primary font-bold">AdFlow</span> 的核心理念：
          广告不是用户体验的敌人，而是内容生态的有机部分。通过
          <span class="text-white/80">场景感知</span> +
          <span class="text-white/80">多模态理解</span> +
          <span class="text-white/80">动态博弈</span>，
          让用户在不知不觉中接受广告，让广告主在合适的场景触达用户，让平台在体验与收益间找到最优解。
        </p>
      </div>
    </section>
  </div>
</template>
