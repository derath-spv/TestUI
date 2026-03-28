<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
})

const maxValue = Math.max(...props.items.map(i => i.value), 1)
</script>

<template>
  <div class="space-y-3">
    <div v-for="item in items" :key="item.label" class="flex items-center gap-3">
      <span class="text-xs text-gray-500 w-20 text-right shrink-0">{{ item.label }}</span>
      <div class="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
        <div
          class="h-full rounded-full transition-all duration-500"
          :style="{ width: (item.value / 50) * 100 + '%', backgroundColor: item.color }"
        ></div>
      </div>
      <span class="text-xs font-semibold text-gray-700 w-6">{{ item.value }}</span>
    </div>
  </div>
</template>
