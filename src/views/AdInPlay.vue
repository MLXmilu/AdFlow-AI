<script setup lang="ts">
import { ref, onUnmounted, computed, watch, nextTick } from 'vue'
import {
  Play, Pause, Activity, ShieldCheck,
  MonitorPlay, Volume2, Maximize2, UserCircle, Radio, Eye, Target
} from 'lucide-vue-next'
import { useAiService } from '../composables/useAiService'
import AiBrainPanel from '../components/AiBrainPanel.vue'
import { availableInterests, availableHistory, adPool, scenarios } from '../data/adPoolData'

const { isThinking, thinkingText, finalDecision, streamAnalysis, cancelAnalysis } = useAiService()

const isPlaying = ref(false)
const hasStarted = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const isPausedAdVisible = ref(false)
const pauseAnalyzed = ref(false) // 标记当前暂停周期是否已经调用过 AI
const selectedScenario = ref('sports')
const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ambientColor = ref('rgba(0, 82, 217, 0.5)') // Default primary color

// 用户画像配置
const userProfile = ref({
  interests: ['sports', 'tech'],
  history: {
    recentWatched: ['h1', 'h3']
  }
})

const currentScenario = computed(() => scenarios.find(s => s.id === selectedScenario.value) || scenarios[0])

// 进度感知逻辑：判断当前是否在高潮区 (High-Intensity Protection)
const isAtClimax = computed(() => {
  const peaks = currentScenario.value.peaks || []
  return peaks.some(p => progress.value >= p.start && progress.value <= p.end)
})

// 格式化时间
const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// 氛围自适应：Canvas 提色 (Ambient Lighting)
const updateAmbientColor = async () => {
  if (!videoRef.value || !canvasRef.value) return
  await nextTick()
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return

  try {
    ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let r = 0, g = 0, b = 0
    const step = 4 * 10 // 采样步长降低计算量
    let count = 0
    for (let i = 0; i < data.length; i += step) {
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      count++
    }
    r = Math.floor(r / count)
    g = Math.floor(g / count)
    b = Math.floor(b / count)
    // 提升亮度和饱和度，确保发光效果明显
    ambientColor.value = `rgba(${r}, ${g}, ${b}, 0.7)`
  } catch (e) {
    // 跨域或未加载时保持默认
    console.warn('Canvas color extraction failed:', e)
  }
}

// 原生 video 进度同步
const onTimeUpdate = () => {
  if (!videoRef.value) return
  currentTime.value = videoRef.value.currentTime
  duration.value = videoRef.value.duration || 0
  progress.value = duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
}

const onLoadedMetadata = () => {
  if (!videoRef.value) return
  duration.value = videoRef.value.duration
}

const startAnalysis = (adScenario: 'pause' | 'mid-roll' = 'mid-roll') => {
  // 同一个暂停周期内，只调用一次 AI（用户恢复播放再暂停时，pauseAnalyzed 会被重置）
  if (pauseAnalyzed.value) return
  pauseAnalyzed.value = true

  const s = currentScenario.value
  const interestLabels = userProfile.value.interests.map(
    id => availableInterests.find(i => i.id === id)?.label || id
  )
  const historyLabels = userProfile.value.history.recentWatched.map(
    id => availableHistory.find(h => h.id === id)?.title || id
  )

  const sceneContext = isAtClimax.value 
    ? `【高潮保护区】当前进度 ${Math.round(progress.value)}%，处于画面运动激烈或核心剧情点。特征：${s.scene}` 
    : `【低谷转化区】当前进度 ${Math.round(progress.value)}%，处于剧情平缓或转场空镜。特征：${s.scene}`

  streamAnalysis({
    userInterests: interestLabels,
    history: { skipRate: '12%', recentWatched: historyLabels },
    progress: Math.round(progress.value) + '%',
    videoType: s.name,
    videoScene: sceneContext,
    adPool: adPool,
    adScenario
  })
}

const togglePlay = () => {
  if (!videoRef.value) return
  
  if (isPlaying.value) {
    // 触发暂停逻辑 → 此时才调用 AI 分析
    videoRef.value.pause()
    isPlaying.value = false
    isPausedAdVisible.value = true
    updateAmbientColor() // 氛围取色
    startAnalysis('pause')
  } else {
    // 恢复播放 → 重置暂停分析标记，取消正在进行的 AI 分析
    pauseAnalyzed.value = false
    if (isThinking.value) cancelAnalysis()
    videoRef.value.play().catch(() => {})
    isPlaying.value = true
    isPausedAdVisible.value = false
  }
}

const seekProgress = (e: MouseEvent) => {
  if (!videoRef.value || duration.value <= 0) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  videoRef.value.currentTime = (percentage / 100) * duration.value
  progress.value = percentage
  // 拖动进度条时，如果 AI 正在分析则取消（用户改变进度，上下文已变化）
  if (isThinking.value) cancelAnalysis()
}

const handleStartPlaying = () => {
  isPlaying.value = true
  hasStarted.value = true
  pauseAnalyzed.value = false // 新播放周期，重置分析标记
  if (videoRef.value) {
    videoRef.value.load()
    videoRef.value.play().catch(() => {})
  }
  // 用户点击开始播放，不触发 AI 分析（等到暂停时才触发）
  // 但如果有上一次遗留的 AI 思考，取消它
  if (isThinking.value) cancelAnalysis()
}

// 监听分类切换 → 取消 AI 思考，重置视频
watch(selectedScenario, () => {
  // 切换分类时，如果 AI 正在分析则取消
  if (isThinking.value) cancelAnalysis()
  pauseAnalyzed.value = false
  progress.value = 0
  currentTime.value = 0
  hasStarted.value = false
  isPlaying.value = false
  isPausedAdVisible.value = false
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
    videoRef.value.load() // 重新加载新 src
  }
})

// 监听兴趣变化 → 如果 AI 正在分析则取消（上下文已变化）
watch(() => userProfile.value.interests, () => {
  if (isThinking.value) cancelAnalysis()
}, { deep: true })

// 监听观看历史变化 → 取消 AI
watch(() => userProfile.value.history.recentWatched, () => {
  if (isThinking.value) cancelAnalysis()
}, { deep: true })

// 离开页面时取消 AI（防止内存泄漏/后台请求）
onUnmounted(() => {
  cancelAnalysis()
})

const decisionRefs = [
  { icon: Eye, label: '环境感知', value: computed(() => isAtClimax.value ? '检测到剧情高潮' : '剧情平缓期'), status: computed(() => isAtClimax.value ? '低打扰模式' : '全量转化'), statusColor: computed(() => isAtClimax.value ? 'text-amber-400' : 'text-green-400') },
  { icon: Target, label: '推荐策略', value: computed(() => isAtClimax.value ? '极窄文字条 (High-Intensity Protection)' : '画中画 (Dual-Stream PiP)'), status: 'Active', statusColor: 'text-primary' },
  { icon: Radio, label: '氛围自适应', value: 'Canvas 实时截帧取色', status: 'Running', statusColor: 'text-primary' }
]
</script>

<template>
  <div class="p-4 md:p-6 lg:p-10 h-full flex flex-col gap-6 lg:gap-8 overflow-y-auto">
    <!-- Header -->
    <header class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl lg:text-3xl font-bold tracking-tight">暂停广告</h2>
        <p class="text-white/40 mt-1 flex items-center gap-2">
          <Activity :size="14" class="text-primary shrink-0" />
          <span class="text-xs lg:text-sm">双流画中画 PiP · 氛围自适应 · 高潮保护调度</span>
        </p>
      </div>
      <div class="glass px-3 lg:px-4 py-1.5 lg:py-2 flex items-center gap-2 border-primary/20">
        <div class="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e] shrink-0"></div>
        <span class="text-[10px] lg:text-xs font-mono font-medium">mimo-v2-omni<span class="hidden xs:inline"> 在线</span></span>
      </div>
    </header>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-8 flex-1">
      <!-- Left: Player Area -->
      <div class="xl:col-span-8 flex flex-col gap-6">
        <!-- Player Container -->
        <div class="relative group rounded-[1rem] overflow-hidden border border-white/10 bg-[#0a0a0a] aspect-video shadow-2xl transition-all"
             :style="{ '--ambient-glow': ambientColor }">
          
          <!-- Hidden Canvas for Color Extraction -->
          <canvas ref="canvasRef" width="32" height="32" class="hidden"></canvas>

          <!-- Main Video Stream -->
          <video
            ref="videoRef"
            class="absolute inset-0 w-full h-full object-cover player-transition cursor-pointer"
            :class="[
              { 'opacity-0': !hasStarted && !isPlaying },
              isPausedAdVisible && !isAtClimax ? 'pip-active shadow-2xl' : ''
            ]"
            :src="currentScenario.videoUrl"
            @click="togglePlay"
            @timeupdate="onTimeUpdate"
            @loadedmetadata="onLoadedMetadata"
            loop
            muted
            crossorigin="anonymous"
            playsinline
          ></video>

          <!-- Start Overlay -->
          <transition name="fade">
            <div v-if="!hasStarted" class="absolute inset-0 z-[60] flex items-center justify-center cursor-pointer"
                 @click="handleStartPlaying">
              <div class="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors backdrop-blur-sm"></div>
              <div class="relative flex flex-col items-center gap-4">
                <div class="w-16 h-16 lg:w-20 lg:h-20 bg-primary/90 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,82,217,0.6)] hover:scale-110 hover:shadow-[0_0_60px_rgba(0,82,217,0.8)] transition-all duration-300">
                  <Play :size="32" class="ml-1" fill="currentColor" />
                </div>
                <span class="text-white/80 text-sm tracking-widest font-bold drop-shadow-md">点击载入视频源</span>
              </div>
            </div>
          </transition>

          <!-- Ambient Glow Background (when PiP is active) -->
          <div v-if="isPausedAdVisible && !isAtClimax" class="absolute inset-0 pointer-events-none player-transition"
               :style="{ boxShadow: 'inset 0 0 150px var(--ambient-glow)' }"></div>

          <!-- Dual-Stream PiP Ad Layer (Low-Intensity Conversion) -->
          <transition name="pip-slide">
            <div v-if="isPausedAdVisible && !isAtClimax" 
                 class="absolute right-4 bottom-24 lg:right-8 lg:bottom-8 w-[40%] aspect-video z-50 glass-card p-0 overflow-hidden border-[3px] player-transition shadow-[0_20px_50px_var(--ambient-glow)] cursor-pointer group/ad"
                 :style="{ borderColor: ambientColor }">
              
              <!-- Ad Video/Image Source -->
              <video v-if="finalDecision?.adId"
                     :src="adPool.find(a => a.id === finalDecision?.adId)?.media" 
                     class="absolute inset-0 w-full h-full object-cover"
                     autoplay muted loop playsinline></video>
              <div v-else class="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center">
                 <MonitorPlay :size="30" class="text-white/20 animate-pulse" />
              </div>

              <!-- Ad Content Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 p-3 lg:p-4 flex flex-col justify-end">
                <div class="flex justify-between items-end">
                  <div class="flex-1 min-w-0">
                    <span class="inline-block px-1.5 py-0.5 bg-primary/20 text-primary text-[8px] font-black uppercase rounded mb-1 border border-primary/30">
                      {{ currentScenario.matchLogic }}
                    </span>
                    <h4 class="text-sm lg:text-base font-bold text-white truncate drop-shadow-md">{{ finalDecision?.brand || 'AI 智能计算中...' }}</h4>
                    <p class="text-[10px] lg:text-xs text-white/70 line-clamp-1 mt-0.5 drop-shadow-md">{{ finalDecision?.content || '匹配最适合当前氛围的推广内容' }}</p>
                  </div>
                  <button class="shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-primary transition-colors text-white">
                    <Volume2 :size="14" />
                  </button>
                </div>
              </div>
            </div>
          </transition>

          <!-- High-Intensity Protection Ad Layer (Bottom Bar) -->
          <transition name="slide-up">
            <div v-if="isPausedAdVisible && isAtClimax" 
                 class="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-black to-black/60 z-50 flex items-center px-6 gap-4 border-t border-white/10 backdrop-blur-md">
              <div class="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-amber-500 text-[9px] font-black uppercase flex items-center gap-1">
                <ShieldCheck :size="12" /> 高潮保护
              </div>
              <div class="flex-1 min-w-0 flex items-center gap-3">
                <span class="text-sm font-bold text-white shrink-0">{{ finalDecision?.brand || 'AI 智能推荐' }}</span>
                <span class="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
                <span class="text-xs text-white/50 truncate">{{ finalDecision?.reason || '检测到画面剧烈运动，已降级为无感文字条。' }}</span>
              </div>
              <button class="px-4 py-1.5 bg-white text-black hover:bg-primary hover:text-white transition-colors rounded-lg text-[10px] font-bold whitespace-nowrap">
                点击了解
              </button>
            </div>
          </transition>

          <!-- Player Controls & Progress Bar -->
          <div class="absolute inset-x-0 bottom-0 p-4 lg:p-6 bg-gradient-to-t from-black/90 to-transparent pt-16 z-40 transition-opacity"
               :class="{'opacity-0 pointer-events-none': isPausedAdVisible && isAtClimax}">
            <!-- Progress Bar -->
            <div @click="seekProgress" class="relative h-1.5 w-full bg-white/10 rounded-full mb-4 cursor-pointer group/progress">
              <!-- Climax Peaks (High-Intensity Areas) -->
              <div v-for="p in currentScenario.peaks" :key="p.start" 
                   class="absolute top-0 h-full bg-amber-500/40 border-x border-amber-500/60 transition-colors group-hover/progress:bg-amber-500/60" 
                   :style="{ left: p.start + '%', width: (p.end - p.start) + '%' }">
              </div>
              <!-- Current Progress -->
              <div class="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_10px_#0052D9]" :style="{ width: progress + '%' }">
                <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff] scale-0 group-hover/progress:scale-100 transition-transform"></div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-5">
                <button @click="togglePlay" class="text-white hover:text-primary transition-colors">
                  <Play v-if="!isPlaying" :size="20" fill="currentColor" />
                  <Pause v-else :size="20" fill="currentColor" />
                </button>
                <span class="text-[11px] font-mono text-white/60">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
              </div>
              <div class="flex items-center gap-5 text-white/60">
                <span class="text-[10px] border border-white/20 px-1.5 rounded">4K</span>
                <Volume2 :size="18" class="hover:text-white cursor-pointer" />
                <Maximize2 :size="18" class="hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <!-- Configuration Panel -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div class="glass rounded-[1rem] p-5 border border-white/5">
            <div class="flex items-center gap-2 text-primary font-bold mb-5">
              <UserCircle :size="16" />
              <span class="text-sm">分类选择与兴趣配置</span>
            </div>
            <div class="space-y-5">
              <div class="flex items-center gap-3">
                <label class="text-xs text-white/50 w-16 font-medium">视频分类</label>
                <select v-model="selectedScenario" class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-primary transition-colors outline-none cursor-pointer" style="color-scheme: dark;">
                  <option v-for="s in scenarios" :key="s.id" :value="s.id" class="bg-[#1a1a1a] text-white">{{ s.name }}</option>
                </select>
              </div>
              <div class="flex items-start gap-3">
                 <label class="text-xs text-white/50 w-16 font-medium mt-1">多维兴趣</label>
                 <div class="flex flex-wrap gap-2 flex-1">
                   <label v-for="interest in availableInterests" :key="interest.id" 
                          class="px-2.5 py-1 rounded-md border text-[10px] cursor-pointer transition-all"
                          :class="userProfile.interests.includes(interest.id) ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'">
                     <input type="checkbox" :value="interest.id" v-model="userProfile.interests" class="hidden" />
                     {{ interest.label }}
                   </label>
                 </div>
              </div>
            </div>
          </div>

          <div class="glass rounded-[1rem] p-5 border border-white/5">
             <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2 text-primary font-bold">
                  <Radio :size="16" />
                  <span class="text-sm">AI 调度策略状态</span>
                </div>
                <span class="text-[9px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">REAL-TIME</span>
             </div>
             <div class="flex flex-col justify-center space-y-3">
                <div v-for="item in decisionRefs" :key="item.label" class="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                   <component :is="item.icon" :size="14" class="text-white/30 shrink-0" />
                   <div class="flex-1 min-w-0">
                      <div class="text-[10px] text-white/40">{{ item.label }}</div>
                      <div class="text-xs font-bold truncate mt-0.5 text-white/90">{{ item.value }}</div>
                   </div>
                   <div class="text-[9px] font-black uppercase shrink-0" :class="item.statusColor">{{ item.status }}</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Right: AI Brain Panel -->
      <div class="xl:col-span-4 flex flex-col gap-6">
        <AiBrainPanel
          :isThinking="isThinking"
          :thinkingText="thinkingText"
          :finalDecision="finalDecision"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

/* 核心：CSS3 Transform 结合三次贝塞尔曲线确保缩放平滑不掉帧 */
.player-transition {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, box-shadow, border-color;
}

/* 画中画的主视频缩小状态 */
.pip-active {
  transform: scale(0.65) translate(-18%, -15%);
  border-radius: 1.5rem;
}

.pip-slide-enter-active, .pip-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pip-slide-enter-from { transform: translateX(20px) scale(0.9); opacity: 0; }
.pip-slide-leave-to { transform: translateX(20px) scale(0.9); opacity: 0; }

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
