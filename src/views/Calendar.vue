<script setup>
import { ref, computed } from 'vue'

// Filters
const types = ['Lift', 'Stairs', 'VIP']
const durations = ['30 min', '45 min', '60 min']
const floors = ['All floors', '2nd', '5th', '7th', '9th', '12th']
const selectedType = ref('Lift')
const selectedDuration = ref('45 min')
const selectedFloor = ref('9th')
const colleagueSearch = ref('')

const allColleagues = [
  'Imran Husain', 'Kiruba Shankar', 'Shalini Jain', 'Joey Finnegan',
  'Macey Mitchell', 'Amber-Rose Talley', 'Darlene Weiss', 'Nikhil Baird',
  'Layla-Rose Wickers', 'Eman Quintero', 'Woodrow Farrington', 'Aedan Joyce',
]
const selectedColleagues = ref(['Imran Husain', 'Kiruba Shankar', 'Shalini Jain'])

const filteredSuggestions = computed(() => {
  if (!colleagueSearch.value) return []
  const q = colleagueSearch.value.toLowerCase()
  return allColleagues.filter(c =>
    c.toLowerCase().includes(q) && !selectedColleagues.value.includes(c)
  )
})

function addColleague(name) {
  selectedColleagues.value.push(name)
  colleagueSearch.value = ''
}

function removeColleague(name) {
  selectedColleagues.value = selectedColleagues.value.filter(c => c !== name)
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('')
}

const avatarColors = ['bg-indigo-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-cyan-500', 'bg-pink-500']
function getColor(name) {
  let hash = 0
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash)
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

// Status: 0=available (green), 1=filling (yellow/orange), 2=almost full (orange), 3=full (red)
function getStatus(booked, capacity) {
  const ratio = booked / capacity
  if (ratio === 0) return 0
  if (ratio < 0.5) return 1
  if (ratio < 1) return 2
  return 3
}

const statusBarColor = {
  0: 'bg-emerald-400',
  1: 'bg-blue-400',
  2: 'bg-amber-400',
  3: 'bg-red-400',
}

const statusBorderColor = {
  0: 'border-emerald-200 hover:border-emerald-400',
  1: 'border-blue-200 hover:border-blue-400',
  2: 'border-amber-200 hover:border-amber-400',
  3: 'border-red-200 hover:border-red-400',
}

// Time slots data
const timeBlocks = ref([
  {
    label: '12:00 PM',
    slots: [
      { time: '12:00 - 12:05', booked: 6, capacity: 16 },
      { time: '12:05 - 12:10', booked: 8, capacity: 16 },
      { time: '12:10 - 12:15', booked: 6, capacity: 16 },
      { time: '12:15 - 12:20', booked: 12, capacity: 16 },
      { time: '12:20 - 12:25', booked: 10, capacity: 16 },
      { time: '12:25 - 12:30', booked: 14, capacity: 16 },
    ],
  },
  {
    label: '12:30 PM',
    slots: [
      { time: '12:30 - 12:35', booked: 0, capacity: 16 },
      { time: '12:35 - 12:40', booked: 4, capacity: 16 },
      { time: '12:40 - 12:45', booked: 10, capacity: 16 },
      { time: '12:45 - 12:50', booked: 16, capacity: 16 },
      { time: '12:50 - 12:55', booked: 10, capacity: 16 },
      { time: '12:55 - 13:00', booked: 16, capacity: 16 },
    ],
  },
  {
    label: '1:00 PM',
    slots: [
      { time: '13:00 - 13:05', booked: 0, capacity: 16 },
      { time: '13:05 - 13:10', booked: 6, capacity: 16 },
      { time: '13:10 - 13:15', booked: 6, capacity: 16 },
      { time: '13:15 - 13:20', booked: 10, capacity: 16 },
      { time: '13:20 - 13:25', booked: 10, capacity: 16 },
      { time: '13:25 - 13:30', booked: 10, capacity: 16 },
    ],
  },
  {
    label: '1:30 PM',
    slots: [
      { time: '13:30 - 13:35', booked: 10, capacity: 16 },
      { time: '13:35 - 13:40', booked: 10, capacity: 16 },
      { time: '13:40 - 13:45', booked: 10, capacity: 16 },
      { time: '13:45 - 13:50', booked: 10, capacity: 16 },
      { time: '13:50 - 13:55', booked: 16, capacity: 16 },
      { time: '13:55 - 14:00', booked: 16, capacity: 16 },
    ],
  },
  {
    label: '2:00 PM',
    slots: [
      { time: '14:00 - 14:05', booked: 10, capacity: 16 },
      { time: '14:05 - 14:10', booked: 10, capacity: 16 },
      { time: '14:10 - 14:15', booked: 10, capacity: 16 },
      { time: '14:15 - 14:20', booked: 10, capacity: 16 },
      { time: '14:20 - 14:25', booked: 16, capacity: 16 },
      { time: '14:25 - 14:30', booked: 16, capacity: 16 },
    ],
  },
])

const selectedSlot = ref(null)

function selectSlot(blockIdx, slotIdx) {
  const slot = timeBlocks.value[blockIdx].slots[slotIdx]
  if (slot.booked >= slot.capacity) return
  selectedSlot.value = { blockIdx, slotIdx, ...slot }
}

function isSelected(blockIdx, slotIdx) {
  return selectedSlot.value?.blockIdx === blockIdx && selectedSlot.value?.slotIdx === slotIdx
}

function formatSlotTime(time) {
  const [start] = time.split(' - ')
  const h = parseInt(start.split(':')[0])
  const m = start.split(':')[1]
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h
  return `${h12}:${m} ${period}`
}

const bookingDuration = computed(() => selectedDuration.value)
</script>

<template>
  <div class="p-8 h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Book Lunch Slot</h1>
        <p class="text-sm text-gray-500 mt-1">Reserve your lunch break with colleagues</p>
      </div>
      <button class="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <div class="grid grid-cols-4 gap-4 mb-4">
        <!-- Type -->
        <div>
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">Type <span class="text-red-500">*</span></label>
          <select v-model="selectedType" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option v-for="t in types" :key="t">{{ t }}</option>
          </select>
        </div>
        <!-- Duration -->
        <div>
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">Lunch duration <span class="text-red-500">*</span></label>
          <select v-model="selectedDuration" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option v-for="d in durations" :key="d">{{ d }}</option>
          </select>
        </div>
        <!-- Floor -->
        <div>
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">Floor <span class="text-red-500">*</span></label>
          <select v-model="selectedFloor" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option v-for="f in floors" :key="f">{{ f }}</option>
          </select>
        </div>
        <!-- Colleagues -->
        <div>
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">Colleagues <span class="text-red-500">*</span></label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="colleagueSearch"
              type="text"
              placeholder="Find people with @"
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <!-- Suggestions dropdown -->
            <div v-if="filteredSuggestions.length" class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-10 max-h-40 overflow-y-auto">
              <div v-for="s in filteredSuggestions" :key="s" @click="addColleague(s)"
                class="px-4 py-2 text-sm hover:bg-indigo-50 cursor-pointer flex items-center gap-2">
                <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-white text-xs', getColor(s)]">
                  {{ getInitials(s) }}
                </div>
                {{ s }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Selected colleagues chips -->
      <div class="flex flex-wrap gap-2" v-if="selectedColleagues.length">
        <span v-for="c in selectedColleagues" :key="c"
          class="inline-flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
          <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-white text-xs', getColor(c)]">
            {{ getInitials(c) }}
          </div>
          {{ c }}
          <button @click="removeColleague(c)" class="ml-1 text-gray-400 hover:text-gray-600">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </span>
      </div>
    </div>

    <!-- Content area -->
    <div class="flex gap-6 flex-1 min-h-0">
      <!-- Time slots grid -->
      <div class="flex-1 overflow-y-auto pr-2">
        <div v-for="(block, bIdx) in timeBlocks" :key="block.label" class="mb-6">
          <h3 class="text-lg font-bold text-gray-900 mb-3">{{ block.label }}</h3>
          <div class="grid grid-cols-6 gap-3">
            <div
              v-for="(slot, sIdx) in block.slots"
              :key="slot.time"
              @click="selectSlot(bIdx, sIdx)"
              class="relative rounded-xl border-2 p-3 transition-all"
              :class="[
                slot.booked >= slot.capacity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                isSelected(bIdx, sIdx) ? 'border-indigo-500 ring-2 ring-indigo-100 bg-indigo-50/30' : statusBorderColor[getStatus(slot.booked, slot.capacity)],
                'bg-white hover:shadow-sm'
              ]"
            >
              <!-- Selected checkmark -->
              <div v-if="isSelected(bIdx, sIdx)" class="absolute top-2 right-2">
                <div class="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>

              <p class="text-sm font-semibold text-gray-800">{{ slot.time }}</p>
              <div class="flex items-center gap-1 mt-1.5">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-xs text-gray-500">{{ slot.booked }}/{{ slot.capacity }}</span>
              </div>
              <!-- Status bar -->
              <div class="mt-2.5 h-1 rounded-full bg-gray-100 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :class="statusBarColor[getStatus(slot.booked, slot.capacity)]"
                  :style="{ width: (slot.booked / slot.capacity * 100) + '%' }"
                ></div>
              </div>
              <!-- Avatars for partially filled -->
              <div v-if="slot.booked > 0 && slot.booked < slot.capacity && slot.booked <= 4" class="flex -space-x-1.5 mt-2">
                <div v-for="i in Math.min(slot.booked, 3)" :key="i"
                  :class="['w-5 h-5 rounded-full border-2 border-white text-white text-[8px] flex items-center justify-center', avatarColors[i]]">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar -->
      <div class="w-64 shrink-0 space-y-4">
        <!-- Avoid peak time tip -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <div class="flex gap-2 mb-3">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
          </div>
          <h4 class="font-bold text-gray-900 mb-1">Avoid peak time!</h4>
          <p class="text-xs text-gray-500 mb-3">Receive a complimentary sweet item by avoiding the busy lunch hour.</p>
          <button class="w-full py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors">
            Know More
          </button>
        </div>

        <!-- Use stairs tip -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <div class="flex gap-2 mb-3">
            <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </div>
          </div>
          <h4 class="font-bold text-gray-900 mb-0.5">Use Stairs.</h4>
          <h4 class="font-bold text-gray-900 mb-1">Win Rewards.</h4>
          <p class="text-xs text-gray-500 mb-3">Use stairs. Stay Fit. Win Rewards. Link your fitness app to participate</p>
          <button class="w-full py-2 text-sm font-medium text-amber-600 border border-amber-200 rounded-xl hover:bg-amber-50 transition-colors">
            Link your Fitness App!
          </button>
        </div>

        <!-- Legend -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Availability</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-1 rounded-full bg-emerald-400"></div>
              <span class="text-xs text-gray-600">Available</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-1 rounded-full bg-blue-400"></div>
              <span class="text-xs text-gray-600">Filling up</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-1 rounded-full bg-amber-400"></div>
              <span class="text-xs text-gray-600">Almost full</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-1 rounded-full bg-red-400"></div>
              <span class="text-xs text-gray-600">Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom booking bar -->
    <div class="mt-4 bg-white rounded-2xl shadow-sm px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <div v-if="selectedSlot">
          <p class="text-xs text-gray-500">Booked</p>
          <p class="text-sm font-bold text-gray-900">{{ formatSlotTime(selectedSlot.time) }}</p>
        </div>
        <div v-if="selectedSlot">
          <p class="text-xs text-gray-500">For</p>
          <p class="text-sm font-bold text-gray-900">{{ bookingDuration }}</p>
        </div>
        <div v-if="selectedSlot && selectedColleagues.length">
          <p class="text-xs text-gray-500">With</p>
          <div class="flex -space-x-2 mt-0.5">
            <div v-for="c in selectedColleagues.slice(0, 4)" :key="c"
              :class="['w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-medium', getColor(c)]"
              :title="c">
              {{ getInitials(c) }}
            </div>
            <div v-if="selectedColleagues.length > 4"
              class="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[9px] font-medium text-gray-600">
              +{{ selectedColleagues.length - 4 }}
            </div>
          </div>
        </div>
        <p v-if="!selectedSlot" class="text-sm text-gray-400">Select a time slot to book</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-6 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          class="px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-colors"
          :class="selectedSlot ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'"
          :disabled="!selectedSlot"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
</template>
