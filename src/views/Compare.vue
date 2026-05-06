<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import {
  AlertCircle, CheckCircle2, X, Clock, Play,
  Tv, MonitorPlay, ChevronDown, Sparkles, Eye
} from 'lucide-vue-next'

// Tab switching
const activeTab = ref<'pre-roll' | 'pause'>('pre-roll')

// Pre-roll: Traditional countdown
const preRollCountdown = ref(5)
let preRollTimer: ReturnType<typeof setInterval> | null = null

const startPreRollCountdown = () => {
  preRollCountdown.value = 5
  if (preRollTimer) clearInterval(preRollTimer)
  preRollTimer = setInterval(() => {
    if (preRollCountdown.value > 0) preRollCountdown.value--
    else {
      if (preRollTimer) clearInterval(preRollTimer)
      preRollTimer = null
    }
  }, 1000)
}

startPreRollCountdown()

// Pause: Ad overlay toggle
const showPauseAd = ref(true)

onUnmounted(() => {
  if (preRollTimer) clearInterval(preRollTimer)
})
</script>

<template>
  <div class="p-4 md:p-6 lg:p-10 h-full flex flex-col gap-6 lg:gap-8 overflow-y-auto">
    <!-- Header -->
    <header>
      <h2 class="text-2xl lg:text-3xl font-bold tracking-tight">价值对比</h2>
      <p class="text-white/50 mt-1 text-sm lg:text-base">传统模式 vs AdFlow AI 动态调度</p>
    </header>

    <!-- Tabs -->
    <div class="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/5 w-fit">
      <button @click="activeTab = 'pre-roll'; startPreRollCountdown()"
              :class="['px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
                       activeTab === 'pre-roll' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white/70']">
        <Play :size="14" /> 进场广告对比
      </button>
      <button @click="activeTab = 'pause'"
              :class="['px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
                       activeTab === 'pause' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white/70']">
        <MonitorPlay :size="14" /> 暂停广告对比
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 flex-1">
      <!-- ============ LEFT: Traditional Mode ============ -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2 text-red-400 font-bold px-2">
          <AlertCircle :size="18" />
          <span>传统 60s 强制广告模式</span>
        </div>

        <!-- Traditional Pre-Roll -->
        <div v-if="activeTab === 'pre-roll'" class="flex-1 glass border-red-500/20 relative overflow-hidden group rounded-[1rem]">
          <!-- Background: blurred video -->
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070')] bg-cover bg-center blur-[2px] brightness-50 scale-110"></div>

          <!-- Traditional Pre-Roll Ad Fullscreen Overlay -->
          <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
            <!-- Top bar: countdown + VIP skip -->
            <div class="absolute top-4 left-4 flex items-center gap-2">
              <span class="px-2.5 py-1 bg-white/10 backdrop-blur rounded-lg text-[9px] font-bold border border-white/10 flex items-center gap-1.5">
                <Clock :size="10" /> 广告剩余 {{ preRollCountdown }}s
              </span>
            </div>
            <div class="absolute top-4 right-4">
              <button class="px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-[10px] font-bold text-white/80 hover:bg-white/20 transition-all flex items-center gap-1.5">
                <Tv :size="12" /> VIP会员可关闭
              </button>
            </div>

            <!-- Ad Content -->
            <div class="max-w-xs space-y-5">
              <div class="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center border border-white/10">
                <AlertCircle :size="28" class="text-white/30" />
              </div>
              <div>
                <h1 class="text-2xl font-black tracking-tight">某品牌洗发水</h1>
                <p class="text-xs text-white/40 mt-1 tracking-wider">全场低至5折起</p>
              </div>
              <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-white/30 rounded-full w-1/12"></div>
              </div>
              <button disabled class="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white/20 cursor-not-allowed">
                广告结束自动播放
              </button>

              <!-- Multiple banner ads around -->
              <div class="absolute bottom-4 left-4 right-4 flex gap-2">
                <div class="flex-1 h-12 bg-yellow-500/60 backdrop-blur rounded-lg flex items-center justify-center text-[9px] font-bold text-black animate-pulse">
                  弹窗广告
                </div>
                <div class="flex-1 h-12 bg-blue-500/60 backdrop-blur rounded-lg flex items-center justify-center text-[9px] font-bold text-white animate-bounce">
                  下载游戏
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Traditional Pause Ad -->
        <div v-else class="flex-1 glass border-red-500/20 relative overflow-hidden group rounded-[1rem]">
          <!-- Background: video scene blurred -->
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598897349489-3d230f3c93a2?q=80&w=2070')] bg-cover bg-center blur-sm brightness-50 scale-110"></div>

          <!-- Video paused overlay -->
          <div class="absolute inset-0 bg-black/40 flex flex-col">
            <!-- Top bar: video controls dimmed -->
            <div class="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <Play :size="14" class="text-white/50 ml-0.5" />
                </div>
                <span class="text-[10px] text-white/30 font-mono">00:42 / 45:00</span>
              </div>
            </div>

            <!-- Center: Large Ad Card (Tencent Video style) -->
            <div class="flex-1 flex items-center justify-center px-6">
              <div class="w-full max-w-xs bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <!-- Poster Image (placeholder) -->
                <div class="relative h-28 bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <span class="text-[40px] font-black italic text-white/30">AD</span>
                  <div class="absolute top-2 left-2 px-2 py-0.5 bg-red-500 rounded text-[8px] font-black text-white uppercase tracking-wider">
                    <span class="flex items-center gap-1"><Sparkles :size="8" /> 正在热映</span>
                  </div>
                  <button class="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:bg-black/70">
                    <X :size="10" />
                  </button>
                </div>

                <!-- Card Info -->
                <div class="p-3 space-y-2">
                  <h4 class="text-xs font-bold text-black truncate">某传统洗发水广告</h4>
                  <p class="text-[9px] text-black/50 line-clamp-2 leading-relaxed">
                    广告内容与当前观影进度无关，极易引发用户反感。暂停时强制展示。
                  </p>
                  <div class="flex gap-2 pt-1">
                    <button class="flex-1 py-2 bg-gray-200 rounded-lg text-[9px] font-bold text-black/80 hover:bg-gray-300 transition-all">
                      查看详情
                    </button>
                    <button class="px-3 py-2 bg-gray-200 rounded-lg text-[9px] font-bold text-black/60">
                      下载
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom: progress bar -->
            <div class="h-1 w-full bg-white/10">
              <div class="h-full w-[42%] bg-white/30"></div>
            </div>
          </div>
        </div>

        <!-- Side panel: Traditional pain points -->
        <div class="glass p-4 bg-red-500/5 border-red-500/10 rounded-[1rem]">
          <ul class="text-xs space-y-2 text-white/60">
            <li class="flex items-center gap-2"><X :size="12" class="text-red-500 shrink-0" /> 强制中断观影，用户耐受度骤降</li>
            <li class="flex items-center gap-2"><X :size="12" class="text-red-500 shrink-0" /> 转化率低，品牌口碑受损</li>
            <li class="flex items-center gap-2"><X :size="12" class="text-red-500 shrink-0" /> 无法精准匹配当前画面情感</li>
          </ul>
        </div>
      </div>

      <!-- ============ RIGHT: AdFlow AI Mode ============ -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2 text-primary font-bold px-2">
          <CheckCircle2 :size="18" />
          <span>AdFlow AI 动态调度模式</span>
        </div>

        <!-- AI Pre-Roll -->
        <div v-if="activeTab === 'pre-roll'" class="flex-1 glass border-primary/30 relative overflow-hidden group rounded-[1rem]">
          <!-- Background: same video base -->
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070')] bg-cover bg-center blur-[2px] brightness-[0.3] scale-110"></div>

          <!-- AI Pre-Roll Ad -->
          <div class="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 flex flex-col items-center justify-center p-6">
            <!-- Top: AI badge + skip -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-[9px] text-primary font-bold flex items-center gap-1.5 backdrop-blur">
                <Sparkles :size="10" /> AI 智能匹配
              </span>
            </div>
            <div class="absolute top-4 right-4 flex items-center gap-2">
              <span class="px-2.5 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-[10px] font-mono text-white/70">
                3s | VIP可关闭
              </span>
              <button class="px-3 py-1.5 bg-white text-black rounded-lg text-[10px] font-bold hover:bg-primary hover:text-white transition-all">
                跳过
              </button>
            </div>

            <!-- AI Matched Ad Content: Brand hero -->
            <div class="text-center space-y-4 max-w-xs">
              <div class="relative">
                <h1 class="text-3xl font-black italic tracking-tighter text-white">NIKE MERCURIAL</h1>
                <div class="absolute -top-3 -right-6">
                  <span class="px-1.5 py-0.5 bg-green-500/20 border border-green-500/40 rounded text-[7px] text-green-400 font-black">MATCHED</span>
                </div>
              </div>
              <p class="text-xs text-white/40 tracking-[0.3em] font-light">速度由 AI 定义 · 全新刺客系列</p>

              <!-- Smart match hint -->
              <div class="mt-4 p-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl">
                <div class="flex items-center gap-2 text-[9px] text-primary mb-1">
                  <Eye :size="10" /> 匹配依据
                </div>
                <p class="text-[8px] text-white/40 leading-relaxed">
                  视频类型: 体育赛事 · 用户兴趣: 运动/户外<br/>
                  进度: 00:15 · 场景: 比赛开局阶段
                </p>
              </div>
            </div>

            <!-- Progress bar: shorter -->
            <div class="absolute bottom-0 inset-x-0">
              <div class="h-1 bg-white/10">
                <div class="h-full w-1/5 bg-primary shadow-[0_0_10px_rgba(0,82,217,0.8)]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Pause Ad -->
        <div v-else class="flex-1 glass border-primary/30 relative overflow-hidden group rounded-[1rem]">
          <!-- Background: same video scene -->
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598897349489-3d230f3c93a2?q=80&w=2070')] bg-cover bg-center blur-sm brightness-[0.3] scale-110"></div>

          <!-- Video paused - AI PiP mode -->
          <div class="absolute inset-0 bg-black/20 flex flex-col">
            <!-- Ambient glow -->
            <div class="absolute inset-0 pointer-events-none"
                 :style="{ boxShadow: 'inset 0 0 120px rgba(168, 85, 247, 0.3)' }"></div>

            <!-- Top bar with AI indicator -->
            <div class="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full border-2 border-primary/60 flex items-center justify-center">
                  <Play :size="14" class="text-primary ml-0.5" />
                </div>
                <span class="text-[10px] text-white/50 font-mono">00:42 / 45:00</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                <span class="text-[9px] text-green-400 font-mono">PiP 主动画</span>
              </div>
            </div>

            <!-- PiP Display: main video shrinks + ad shows in side -->
            <div class="flex-1 flex items-center justify-center px-6 md:px-10">
              <transition name="fade">
                <div v-if="showPauseAd" class="w-full flex items-end md:items-center justify-center gap-4 md:gap-6">
                  <!-- Shrunk main video (PiP effect) -->
                  <div class="w-[55%] md:w-[50%] aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 transform scale-90 origin-center transition-all">
                    <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span class="text-[8px] text-white/20 font-mono">主视频 (PiP 缩放)</span>
                    </div>
                  </div>

                  <!-- AI Ad Card (appears in side) -->
                  <div class="w-[40%] md:w-[35%] glass-card border-2 overflow-hidden animate-slide-in"
                       :style="{ borderColor: 'rgba(168, 85, 247, 0.5)' }">
                    <!-- Ad Video placeholder -->
                    <div class="aspect-video bg-gradient-to-br from-purple-900/60 to-pink-900/60 relative flex items-center justify-center">
                      <span class="text-[20px] font-black italic text-white/20">NIKE</span>
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                      <!-- Ad overlay info -->
                      <div class="absolute bottom-0 inset-x-0 p-2">
                        <div class="flex items-center justify-between">
                          <div>
                            <span class="px-1 py-0.5 bg-primary/30 rounded text-[6px] text-primary font-black uppercase border border-primary/30">AI 匹配</span>
                            <p class="text-[9px] font-bold text-white mt-0.5">Nike Mercurial</p>
                            <p class="text-[7px] text-white/50 truncate">全新刺客足球鞋预售</p>
                          </div>
                          <button class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <ChevronDown :size="10" class="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>

              <!-- Reset button -->
              <div v-if="!showPauseAd" class="flex flex-col items-center gap-3">
                <button @click="showPauseAd = true" class="px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-[0_0_30px_rgba(0,82,217,0.4)] hover:scale-105 transition-all">
                  重新演示 AI 暂停广告
                </button>
              </div>
            </div>

            <!-- Bottom: smart progress bar -->
            <div class="relative px-4 pb-3 pt-2">
              <div class="h-1 w-full bg-white/10 rounded-full mb-2 relative overflow-hidden">
                <!-- Climax protection zone indicator -->
                <div class="absolute top-0 left-[35%] w-[20%] h-full bg-amber-500/30 border-x border-amber-500/40 rounded"></div>
                <!-- Current progress -->
                <div class="h-full w-[42%] bg-primary rounded-full shadow-[0_0_10px_rgba(0,82,217,0.6)]"></div>
              </div>
              <div class="flex justify-between text-[7px] text-white/30 font-mono">
                <span>AI 高潮保护区</span>
                <span>低谷转化区 →</span>
              </div>
            </div>

            <!-- Ambient color tag -->
            <div v-if="showPauseAd" class="absolute bottom-2 right-2">
              <span class="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[7px] text-white/30 font-mono flex items-center gap-1">
                <Sparkles :size="8" /> 氛围自适应: #A855F7
              </span>
            </div>
          </div>
        </div>

        <!-- Side panel: AI advantages -->
        <div class="glass p-4 bg-primary/5 border-primary/10 rounded-[1rem]">
          <ul class="text-xs space-y-2 text-white/60">
            <li class="flex items-center gap-2"><CheckCircle2 :size="12" class="text-green-500 shrink-0" /> 非侵入式插入，保护观影链路</li>
            <li class="flex items-center gap-2"><CheckCircle2 :size="12" class="text-green-500 shrink-0" /> 情感一致性匹配，点击率提升 35%</li>
            <li class="flex items-center gap-2"><CheckCircle2 :size="12" class="text-green-500 shrink-0" /> 用户可控交互，建立品牌好感度</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.animate-slide-in {
  animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
