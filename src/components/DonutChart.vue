<script setup>
import { computed } from 'vue'

const props = defineProps({
  male: { type: Number, default: 63 },
  female: { type: Number, default: 37 },
})

const maleArc = computed(() => {
  const angle = (props.male / 100) * 360
  return describeArc(60, 60, 45, 0, angle)
})

const femaleArc = computed(() => {
  const startAngle = (props.male / 100) * 360
  return describeArc(60, 60, 45, startAngle, 360)
})

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}
</script>

<template>
  <svg width="120" height="120" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="45" fill="none" stroke="#e0e7ff" stroke-width="14" />
    <path :d="maleArc" fill="none" stroke="#4f46e5" stroke-width="14" stroke-linecap="round" />
  </svg>
</template>
