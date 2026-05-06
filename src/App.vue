<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen w-full bg-bg-dark text-white overflow-hidden">
    <Sidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto relative">
      <!-- Background Glows -->
      <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-white;
}
</style>
