<script setup>
import { ref } from 'vue'
import GaugeChart from '../components/GaugeChart.vue'
import DonutChart from '../components/DonutChart.vue'
import ProductivityCircle from '../components/ProductivityCircle.vue'
import DistributionBars from '../components/DistributionBars.vue'
import WorldMap from '../components/WorldMap.vue'

const stats = ref({
  headcount: 84,
  hires: { value: 5, trend: 'up', change: 2 },
  terminations: { value: 8, trend: 'down', change: 1 },
  offerDeclines: { value: 19, trend: 'up', change: 2 },
  gender: { male: 63, female: 37 },
  averageAge: 27,
  occupancyRate: 92,
  productivityRate: 92,
})

const distribution = ref([
  { label: 'Operational', value: 36, color: '#4f46e5' },
  { label: 'Mid-Level', value: 28, color: '#6366f1' },
  { label: 'High-Level', value: 8, color: '#818cf8' },
  { label: 'remote', value: 36, color: '#a5b4fc' },
  { label: 'at office', value: 0, color: '#c7d2fe' },
])
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Statistics</h1>

    <div class="grid grid-cols-12 gap-6">
      <!-- Left column: Key metrics -->
      <div class="col-span-4 space-y-6">
        <!-- Headcount -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">Headcount</p>
              <p class="text-4xl font-bold text-gray-900">{{ stats.headcount }}</p>
            </div>
            <div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Gender -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-gray-500 mb-4">Gender</p>
          <div class="flex items-center gap-6">
            <DonutChart :male="stats.gender.male" :female="stats.gender.female" />
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span class="text-sm text-gray-600">{{ stats.gender.male }}% male</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-indigo-200"></span>
                <span class="text-sm text-gray-600">{{ stats.gender.female }}% female</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hires, Terminations, Offer Declines -->
        <div class="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Hires</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.hires.value }}</p>
            </div>
            <div class="flex items-center gap-1 text-green-500 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l5-5 5 5"/></svg>
              +{{ stats.hires.change }}
            </div>
          </div>
          <div class="border-t border-gray-100"></div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Terminations</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.terminations.value }}</p>
            </div>
            <div class="flex items-center gap-1 text-red-500 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-5 5-5-5"/></svg>
              -{{ stats.terminations.change }}
            </div>
          </div>
          <div class="border-t border-gray-100"></div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Offer declines</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.offerDeclines.value }}</p>
            </div>
            <div class="flex items-center gap-1 text-green-500 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l5-5 5 5"/></svg>
              +{{ stats.offerDeclines.change }}
            </div>
          </div>
        </div>
      </div>

      <!-- Center column -->
      <div class="col-span-4 space-y-6">
        <!-- Average Age + World Map -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm text-gray-500">Average age</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.averageAge }} <span class="text-sm font-normal text-gray-400">years</span></p>
          </div>
          <WorldMap />
        </div>

        <!-- Occupancy Rate Gauge -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-gray-500 mb-4">Occupancy rate</p>
          <GaugeChart :value="stats.occupancyRate" />
        </div>
      </div>

      <!-- Right column -->
      <div class="col-span-4 space-y-6">
        <!-- Employee Distribution -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-gray-500 mb-4">Employee distribution by organisation level</p>
          <DistributionBars :items="distribution" />
        </div>

        <!-- Productivity Rate -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-gray-500 mb-4">Productivity rate</p>
          <div class="flex items-center justify-center">
            <ProductivityCircle :value="stats.productivityRate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
