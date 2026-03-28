<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 92 },
})

const circumference = 2 * Math.PI * 70
const dashOffset = computed(() => circumference - (props.value / 100) * circumference)
</script>

<template>
  <div class="relative w-48 h-48">
    <svg class="w-full h-full -rotate-90" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="70" fill="none" stroke="#e8eaf0" stroke-width="6" />
      <circle cx="80" cy="80" r="70" fill="none" stroke="#6366f1" stroke-width="6"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset" />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-3xl font-bold text-indigo-600">{{ value }}%</span>
    </div>
  </div>
</template>
