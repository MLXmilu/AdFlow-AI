<script setup lang="ts">
import { ref } from 'vue'
import {
  LayoutDashboard, Home, ArrowLeftRight,
  LogIn, PlayCircle, ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-vue-next'
import AdFlowLogo from '../assets/Logo/AdFlow.png'

const collapsed = ref(false)
const decisionExpanded = ref(true)
</script>

<template>
  <aside
    class="border-r border-border flex flex-col bg-black/20 backdrop-blur-xl z-50 shrink-0 transition-all duration-300 overflow-hidden"
    :class="collapsed ? 'w-20 items-center' : 'w-20 lg:w-56 xl:w-64 items-center lg:items-start'"
  >
    <!-- Logo -->
    <div
      class="flex items-center justify-center shrink-0"
      :class="collapsed ? 'py-5' : 'p-4 lg:p-6 gap-3'"
    >
      <img
        :src="AdFlowLogo"
        alt="AdFlow"
        :class="collapsed ? 'w-8 h-8' : 'w-9 h-9'"
        class="shrink-0"
      />
      <h1 v-show="!collapsed" class="text-xl font-bold tracking-tight hidden lg:block whitespace-nowrap">
        AdFlow <span class="text-primary italic">AI</span>
      </h1>
    </div>

    <!-- Nav -->
    <nav class="flex-1 w-full px-2 flex flex-col items-center gap-1">
      <!-- 决策中心（可折叠） -->
      <template v-if="!collapsed">
        <button
          @click="decisionExpanded = !decisionExpanded"
          class="flex items-center justify-center lg:justify-start gap-4 w-full px-4 py-2 rounded-2xl opacity-40 text-xs uppercase tracking-widest font-bold hover:opacity-60 transition-all"
        >
          <Home :size="16" class="shrink-0" />
          <span class="hidden lg:block">决策中心</span>
          <ChevronDown
            :size="14"
            class="ml-auto hidden lg:block transition-transform duration-200"
            :class="decisionExpanded ? 'rotate-0' : '-rotate-90'"
          />
        </button>
      </template>

      <!-- 决策中心子项 -->
      <template v-if="decisionExpanded || collapsed">
        <router-link
          to="/pre-roll"
          class="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:bg-white/10 group"
          :class="collapsed ? '' : 'lg:w-full lg:justify-start lg:pl-8 lg:pr-4 lg:h-9 lg:rounded-2xl gap-3'"
          active-class="!bg-white/10 text-primary shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
        >
          <LogIn :size="collapsed ? 20 : 16" class="group-hover:scale-110 transition-transform shrink-0" />
          <span v-show="!collapsed" class="font-medium hidden lg:block text-sm">进场广告</span>
        </router-link>

        <router-link
          to="/in-play"
          class="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:bg-white/10 group"
          :class="collapsed ? '' : 'lg:w-full lg:justify-start lg:pl-8 lg:pr-4 lg:h-9 lg:rounded-2xl gap-3'"
          active-class="!bg-white/10 text-primary shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
        >
          <PlayCircle :size="collapsed ? 20 : 16" class="group-hover:scale-110 transition-transform shrink-0" />
          <span v-show="!collapsed" class="font-medium hidden lg:block text-sm">暂停广告</span>
        </router-link>
      </template>

      <router-link
        to="/compare"
        class="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:bg-white/10 group"
        :class="collapsed ? '' : 'lg:w-full lg:justify-start lg:px-4 lg:h-9 lg:rounded-2xl gap-4'"
        active-class="!bg-white/10 text-primary shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
      >
        <ArrowLeftRight :size="collapsed ? 20 : 18" class="group-hover:scale-110 transition-transform shrink-0" />
        <span v-show="!collapsed" class="font-medium hidden lg:block text-sm">价值对比</span>
      </router-link>

      <router-link
        to="/dashboard"
        class="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:bg-white/10 group"
        :class="collapsed ? '' : 'lg:w-full lg:justify-start lg:px-4 lg:h-9 lg:rounded-2xl gap-4'"
        active-class="!bg-white/10 text-primary shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
      >
        <LayoutDashboard :size="collapsed ? 20 : 18" class="group-hover:scale-110 transition-transform shrink-0" />
        <span v-show="!collapsed" class="font-medium hidden lg:block text-sm">商业看板</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="flex flex-col items-start gap-3 pb-4 w-full">
      <button
        @click="collapsed = !collapsed"
        class="flex items-center justify-center w-8 h-8 rounded-lg glass border border-white/10 hover:bg-white/10 transition-all ml-2"
        :title="collapsed ? '展开侧栏' : '收起侧栏'"
      >
        <ChevronLeft :size="16" v-if="!collapsed" class="text-white/60" />
        <ChevronRight :size="16" v-else class="text-white/60" />
      </button>

      <div v-show="!collapsed" class="px-4 w-full hidden lg:block">
        <div class="glass p-4 text-xs space-y-2 opacity-60 text-center">
          <p>Powered by mimo-v2-omni</p>
          <p>© 2026 Tencent PCG</p>
        </div>
      </div>
    </div>
  </aside>
</template>

