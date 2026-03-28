<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar />
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>
