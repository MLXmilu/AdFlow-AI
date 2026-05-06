<script setup lang="ts">
import { BrainCircuit, ShieldCheck } from 'lucide-vue-next'
import type { AiDecision } from '../composables/useAiService'

defineProps<{
  isThinking: boolean
  thinkingText: string
  finalDecision: AiDecision | null
}>()
</script>

<template>
  <div class="flex-1 glass flex flex-col overflow-hidden min-h-[400px] lg:min-h-0">
    <div class="p-4 lg:p-6 border-b border-white/10 bg-white/[0.02]">
      <div class="flex items-center gap-3 text-primary">
          <BrainCircuit :size="20" />
          <h3 class="font-bold text-sm lg:text-base">AI BRAIN 分析面板</h3>
        </div>
    </div>

    <div class="flex-1 p-4 lg:p-6 font-mono text-[11px] overflow-y-auto space-y-4 bg-black/40">
      <div v-if="thinkingText" class="whitespace-pre-wrap text-white/60 leading-relaxed animate-fade-in text-[10px] lg:text-[11px]">
        {{ thinkingText }}<span v-if="isThinking" class="cursor-blink"></span>
      </div>

      <div v-if="isThinking && !thinkingText" class="flex items-center gap-3 text-white/30">
        <div class="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,82,217,0.5)]"></div>
        <span class="text-xs">AI 正在分析场景...</span>
      </div>

      <transition name="fade">
        <div v-if="finalDecision" class="glass p-4 lg:p-5 border-primary/20 bg-primary/5 space-y-4">
          <div class="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px]">
            <ShieldCheck :size="14" /> AI 决策输出
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-[8px] opacity-40 uppercase font-bold">推荐品牌 & 内容</p>
              <p class="text-xs font-bold">{{ finalDecision.brand || '未匹配' }} - {{ finalDecision.content || finalDecision.type || '无内容' }}</p>
            </div>
            <div>
              <p class="text-[8px] opacity-40 uppercase font-bold">展现形式</p>
              <p class="text-xs font-bold">{{ finalDecision.adStyle || 'popup' }}</p>
            </div>
          </div>
          <div class="pt-2 border-t border-white/5">
            <p class="text-[8px] opacity-40 uppercase font-bold mb-1">决策理由</p>
            <p class="text-xs text-white/70">{{ finalDecision.reason }}</p>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>
