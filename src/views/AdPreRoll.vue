<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Play, Activity, SkipForward,
  History, UserCircle
} from 'lucide-vue-next'
import { useAiService } from '../composables/useAiService'
import { availableInterests, availableHistory, adPool, scenarios } from '../data/adPoolData'
import AiBrainPanel from '../components/AiBrainPanel.vue'

const { isThinking, thinkingText, finalDecision, streamAnalysis } = useAiService()

const hasStarted = ref(false)
const showPreRoll = ref(false)
const preRollCountdown = ref(60)
const completed = ref(false)

// 多维用户画像模拟
const userProfile = ref({
  interests: ['sports', 'anime', 'tech'],
  history: {
    recentWatched: ['h1', 'h4']
  }
})


const selectedScenario = ref('sports')

const startPreRoll = () => {
  hasStarted.value = true
  showPreRoll.value = true
  preRollCountdown.value = 60
  completed.value = false
  const s = scenarios.find(item => item.id === selectedScenario.value)!
  
  const interestLabels = userProfile.value.interests.map(
    id => availableInterests.find(i => i.id === id)?.label || id
  )
  const historyLabels = userProfile.value.history.recentWatched.map(
    id => availableHistory.find(h => h.id === id)?.title || id
  )

  streamAnalysis({
    userInterests: interestLabels,
    history: { skipRate: '未知', recentWatched: historyLabels },
    progress: '0%',
    videoType: s.name,
    videoScene: s.scene,
    adPool: adPool,
    adScenario: 'pre-roll'
  })
}

const skipPreRoll = () => {
  showPreRoll.value = false
  completed.value = true
}

const resetDemo = () => {
  hasStarted.value = false
  showPreRoll.value = false
  completed.value = false
  preRollCountdown.value = 60
}

onMounted(() => {
  setInterval(() => {
    if (hasStarted.value && showPreRoll.value && preRollCountdown.value > 0) {
      preRollCountdown.value--
    } else if (preRollCountdown.value === 0 && showPreRoll.value) {
      skipPreRoll()
    }
  }, 1000)
})
</script>

<template>
  <div class="p-4 md:p-6 lg:p-10 h-full flex flex-col gap-6 lg:gap-8 overflow-y-auto">
    <!-- Header -->
    <header class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl lg:text-3xl font-bold tracking-tight">进场广告</h2>
        <p class="text-white/40 mt-1 flex items-center gap-2">
          <Activity :size="14" class="text-primary shrink-0" />
          <span class="text-xs lg:text-sm">AI 预加载 · Pre-Roll 智能调度</span>
        </p>
      </div>
      <div class="glass px-3 lg:px-4 py-1.5 lg:py-2 flex items-center gap-2 border-primary/20">
        <div class="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e] shrink-0"></div>
        <span class="text-[10px] lg:text-xs font-mono font-medium">mimo-v2-omni<span class="hidden xs:inline"> 在线</span></span>
      </div>
    </header>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-8 flex-1">
      <!-- Left: Pre-Roll Ad Area + Below Info -->
      <div class="xl:col-span-8 flex flex-col gap-6">
        <!-- Video Player -->
        <div class="relative group rounded-[1rem] overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl">

          <!-- Center: Start Analysis Overlay (initial state) -->
          <transition name="fade">
            <div v-if="!hasStarted && !showPreRoll && !completed" class="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              <div class="text-center max-w-md px-6">
                <div class="text-white/30 text-xs mb-6 tracking-wide leading-relaxed">
                  请先在下方面板选择您的<strong class="text-primary/80">兴趣偏好</strong>和<strong class="text-secondary/80">观看历史记录</strong><br/>然后点击下方按钮，AI 将为您智能匹配入场广告
                </div>
                <button @click="startPreRoll" 
                        class="bg-primary hover:bg-primary/90 text-white rounded-xl py-3.5 px-8 text-sm font-bold shadow-[0_0_30px_rgba(0,82,217,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto hover:shadow-[0_0_50px_rgba(0,82,217,0.7)]">
                  <Play :size="18" fill="currentColor" /> 开始分析
                </button>
              </div>
            </div>
          </transition>

          <!-- Loading when thinking -->
          <transition name="fade">
            <div v-if="isThinking && showPreRoll" class="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div class="flex flex-col items-center gap-4">
                <div class="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <div class="text-primary font-bold tracking-widest text-sm">AI 实时分析与匹配中...</div>
              </div>
            </div>
          </transition>

          <!-- Pre-Roll Ad Full Screen -->
          <transition name="fade">
            <div v-if="showPreRoll && !isThinking" class="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
              <div class="absolute top-4 lg:top-8 left-4 lg:left-8 z-[60]">
                <div class="inline-block px-3 lg:px-4 py-1 bg-primary/20 border border-primary/40 rounded-full text-[9px] lg:text-[10px] text-primary font-bold tracking-widest uppercase">
                  AI 进场优化中...
                </div>
              </div>
              <div class="text-center px-4 space-y-4 lg:space-y-6">
                <h1 class="text-3xl lg:text-5xl font-black italic tracking-tighter">{{ finalDecision?.brand }}</h1>
                <p class="text-white/40 tracking-[0.5em] text-xs lg:text-sm font-light">{{ finalDecision?.content || finalDecision?.type }}</p>
              </div>
              <div class="absolute top-4 lg:top-8 right-4 lg:right-8 flex items-center gap-2 lg:gap-4">
                <div class="px-2 lg:px-3 py-1 lg:py-1.5 glass rounded-lg text-[9px] lg:text-xs font-mono">
                  {{ preRollCountdown }}s<span class="hidden sm:inline"> | VIP可关闭该广告</span>
                </div>
                <button @click="skipPreRoll" class="px-3 lg:px-4 py-1 lg:py-1.5 bg-white text-black rounded-lg text-[9px] lg:text-xs font-bold hover:bg-primary hover:text-white transition-all">
                  跳过
                </button>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="completed" class="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
              <div class="text-center space-y-4">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 mx-auto">
                  <SkipForward :size="28" class="text-green-400" />
                </div>
                <h3 class="text-xl font-bold">Pre-Roll 已完成</h3>
                <button @click="resetDemo" class="mt-4 px-6 py-2.5 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                  重新体验
                </button>
              </div>
            </div>
          </transition>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-6">
          <div class="glass rounded-[1rem] p-4 lg:p-5 border border-white/5 flex flex-col h-full">
            <div class="flex items-center gap-2 text-primary font-bold mb-5">
              <UserCircle :size="16" />
              <span class="text-sm">受众画像与场景配置</span>
            </div>
            
            <div class="space-y-6 flex-1 flex flex-col">
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <label class="text-xs text-white/50 w-20 shrink-0 font-medium">当前视频：</label>
                <select v-model="selectedScenario" class="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs appearance-none cursor-pointer focus:border-primary transition-all outline-none flex-1">
                  <option v-for="s in scenarios" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
              </div>
              
              <div class="flex flex-col gap-2 flex-1">
                <label class="text-xs text-white/50 font-medium">兴趣多选：</label>
                <div class="flex flex-wrap gap-2">
                  <label v-for="interest in availableInterests" :key="interest.id" 
                         class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] cursor-pointer transition-all"
                         :class="userProfile.interests.includes(interest.id) ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'">
                    <input type="checkbox" :value="interest.id" v-model="userProfile.interests" class="hidden" />
                    {{ interest.label }}
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div class="glass rounded-[1rem] p-4 lg:p-5 border border-white/5 flex flex-col h-full">
            <div class="flex items-center gap-2 mb-4">
              <History :size="16" class="text-secondary shrink-0" />
              <span class="text-sm font-bold">个人历史观看记录配置 (多选)</span>
            </div>

            <div class="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <label v-for="item in availableHistory" :key="item.id" 
                     class="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all border border-transparent"
                     :class="userProfile.history.recentWatched.includes(item.id) ? 'bg-secondary/10 border-secondary/30' : 'hover:bg-white/5 border-white/5 bg-white/[0.02]'">
                <input type="checkbox" :value="item.id" v-model="userProfile.history.recentWatched" class="hidden" />
                <div class="w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0"
                     :class="userProfile.history.recentWatched.includes(item.id) ? 'bg-secondary border-secondary' : 'border-white/20'">
                  <svg v-if="userProfile.history.recentWatched.includes(item.id)" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[11px] font-medium truncate text-white" :class="{'text-secondary': userProfile.history.recentWatched.includes(item.id)}">{{ item.title }}</p>
                  <p class="text-[9px] text-white/30">{{ item.time }} · {{ item.type }}</p>
                </div>
              </label>
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
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

select option {
  background-color: #1a1a2e;
  color: white;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
