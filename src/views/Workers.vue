<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const workers = ref([
  { id: 1, name: 'Joey Finnegan', position: 'CEO', phone: '+1-202-555-0192', email: 'joey.f@company.com', avatar: null },
  { id: 2, name: 'Macey Mitchell', position: 'CPO', phone: '+1-202-555-0155', email: 'macey.m@company.com', avatar: null },
  { id: 3, name: 'Amber-Rose Talley', position: 'Marketing Director', phone: '+1-202-555-0134', email: 'amber.t@company.com', avatar: null },
  { id: 4, name: 'Darlene Weiss', position: 'Head of Sales', phone: '+1-202-555-0178', email: 'darlene.w@company.com', avatar: null },
  { id: 5, name: 'Nikhil Baird', position: 'Head HR Manager', phone: '+1-202-555-0112', email: 'nikhil.b@company.com', avatar: null },
  { id: 6, name: 'Layla-Rose Wickers', position: 'Lead Product Designer', phone: '+1-202-555-0198', email: 'layla.w@company.com', avatar: null },
  { id: 7, name: 'Jemimnah Collier', position: 'Senior Developer', phone: '+1-202-555-0145', email: 'jemimnah.c@company.com', avatar: null },
  { id: 8, name: 'Eman Quintero', position: 'UX Researcher', phone: '+1-202-555-0167', email: 'eman.q@company.com', avatar: null },
  { id: 9, name: 'Brandon Willis', position: 'Backend Developer', phone: '+1-202-555-0123', email: 'brandon.w@company.com', avatar: null },
  { id: 10, name: 'Woodrow Farrington', position: 'DevOps Engineer', phone: '+1-202-555-0189', email: 'woodrow.f@company.com', avatar: null },
  { id: 11, name: 'Aedan Joyce', position: 'QA Engineer', phone: '+1-202-555-0156', email: 'aedan.j@company.com', avatar: null },
  { id: 12, name: 'Dream Torres', position: 'Data Analyst', phone: '+1-202-555-0101', email: 'dream.t@company.com', avatar: null },
])

const departments = ['All departments', 'Engineering', 'Marketing', 'Sales', 'Design', 'HR']
const selectedDepartment = ref('All departments')

const filteredWorkers = computed(() => {
  if (!searchQuery.value) return workers.value
  const q = searchQuery.value.toLowerCase()
  return workers.value.filter(w =>
    w.name.toLowerCase().includes(q) || w.position.toLowerCase().includes(q)
  )
})

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2)
}

const colors = ['bg-indigo-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-cyan-500', 'bg-pink-500']

function getColor(id) {
  return colors[id % colors.length]
}
</script>

<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Workers <span class="text-gray-400 font-normal">(84)</span>
      </h1>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-4 mb-6">
      <div class="relative flex-1 max-w-md">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or position"
          class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <select
        v-model="selectedDepartment"
        class="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-100">
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name Surname</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile phone</th>
            <th class="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="worker in filteredWorkers" :key="worker.id"
            class="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div :class="['w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium', getColor(worker.id)]">
                  {{ getInitials(worker.name) }}
                </div>
                <span class="text-sm font-medium text-gray-900">{{ worker.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ worker.position }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ worker.phone }}</td>
            <td class="px-6 py-4 text-sm text-indigo-500">{{ worker.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
