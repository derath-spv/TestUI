<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 92 },
})

const rotation = computed(() => {
  return -90 + (props.value / 100) * 180
})

const needleRotation = computed(() => {
  return rotation.value
})
</script>

<template>
  <div class="flex flex-col items-center">
    <svg width="200" height="120" viewBox="0 0 200 120">
      <!-- Background arc -->
      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e0e7ff" stroke-width="8" stroke-linecap="round" />
      <!-- Value arc -->
      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#4f46e5" stroke-width="8" stroke-linecap="round"
        :stroke-dasharray="`${(value / 100) * 251.3} 251.3`" />
      <!-- Dots around gauge -->
      <circle v-for="i in 24" :key="i"
        :cx="100 + 88 * Math.cos(Math.PI + (i - 1) * (Math.PI / 23))"
        :cy="100 + 88 * Math.sin(Math.PI + (i - 1) * (Math.PI / 23))"
        r="1.5" fill="#cbd5e1" />
      <!-- Needle -->
      <line x1="100" y1="100"
        :x2="100 + 60 * Math.cos((needleRotation * Math.PI) / 180)"
        :y2="100 + 60 * Math.sin((needleRotation * Math.PI) / 180)"
        stroke="#1e293b" stroke-width="2" stroke-linecap="round" />
      <circle cx="100" cy="100" r="4" fill="#1e293b" />
      <!-- Labels -->
      <text x="15" y="115" class="text-xs fill-gray-400" font-size="11">0%</text>
      <text x="170" y="115" class="text-xs fill-gray-400" font-size="11">100%</text>
    </svg>
    <!-- Badge -->
    <div class="relative -mt-6 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
      {{ value }}%
    </div>
  </div>
</template>
