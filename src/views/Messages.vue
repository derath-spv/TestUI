<script setup>
import { ref, nextTick } from 'vue'

const conversations = ref([
  { id: 1, name: 'Amber-Rose Talley', lastMessage: 'Good morning! Can we postpon...', time: '15 min', unread: false, online: true },
  { id: 2, name: 'Darlene Weiss', lastMessage: 'Hello, send me a last month\'s sta...', time: '19 min', unread: true, online: false },
  { id: 3, name: 'Woodrow Farrington', lastMessage: 'Welcome to our team!', time: '1h', unread: false, online: true },
  { id: 4, name: 'Aedan Joyce', lastMessage: 'Welcome to our...', time: '2h', unread: false, online: false },
  { id: 5, name: 'Dream Torres', lastMessage: 'Any updates on the project?', time: '3h', unread: false, online: true },
  { id: 6, name: 'Joey Finnegan', lastMessage: 'Please review the document.', time: '5h', unread: false, online: false },
  { id: 7, name: 'Macey Mitchell', lastMessage: 'Meeting at 3pm tomorrow.', time: '1d', unread: false, online: false },
])

const selectedConversation = ref(conversations.value[0])

const messages = ref([
  { id: 1, sender: 'them', text: 'Good morning! Can we postpone our meeting to 3pm?', time: '9:15 AM' },
  { id: 2, sender: 'me', text: 'Good morning! Sure, 3pm works for me.', time: '9:18 AM' },
  { id: 3, sender: 'them', text: 'Great, I\'ll update the calendar invite. Also, have you reviewed the Q4 report?', time: '9:20 AM' },
  { id: 4, sender: 'me', text: 'Yes, I went through it yesterday. I have some feedback on the marketing section.', time: '9:22 AM' },
  { id: 5, sender: 'them', text: 'Perfect, let\'s discuss that during our call. See you at 3!', time: '9:25 AM' },
])

const newMessage = ref('')

const colors = ['bg-indigo-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-cyan-500']

function getColor(id) {
  return colors[id % colors.length]
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2)
}

function selectConversation(conv) {
  selectedConversation.value = conv
}

function sendMessage() {
  if (!newMessage.value.trim()) return
  messages.value.push({
    id: messages.value.length + 1,
    sender: 'me',
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  })
  newMessage.value = ''
}
</script>

<template>
  <div class="flex h-full">
    <!-- Conversation List -->
    <div class="w-80 border-r border-gray-200 bg-white flex flex-col">
      <div class="p-4 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-900 mb-3">Messages</h2>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Search" class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div
          v-for="conv in conversations"
          :key="conv.id"
          @click="selectConversation(conv)"
          class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
          :class="selectedConversation.id === conv.id ? 'bg-indigo-50' : 'hover:bg-gray-50'"
        >
          <div class="relative">
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-medium', getColor(conv.id)]">
              {{ getInitials(conv.name) }}
            </div>
            <span v-if="conv.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900 truncate">{{ conv.name }}</span>
              <span class="text-xs text-gray-400 shrink-0">{{ conv.time }}</span>
            </div>
            <p class="text-xs text-gray-500 truncate">{{ conv.lastMessage }}</p>
          </div>
          <span v-if="conv.unread" class="w-2 h-2 bg-indigo-500 rounded-full shrink-0"></span>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col bg-gray-50">
      <!-- Chat header -->
      <div class="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-200">
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-medium', getColor(selectedConversation.id)]">
          {{ getInitials(selectedConversation.name) }}
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-900">{{ selectedConversation.name }}</h3>
          <p class="text-xs text-green-500" v-if="selectedConversation.online">Online</p>
          <p class="text-xs text-gray-400" v-else>Offline</p>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <div v-for="msg in messages" :key="msg.id"
          class="flex"
          :class="msg.sender === 'me' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-md px-4 py-2.5 rounded-2xl text-sm"
            :class="msg.sender === 'me'
              ? 'bg-indigo-500 text-white rounded-br-md'
              : 'bg-white text-gray-800 shadow-sm rounded-bl-md'"
          >
            <p>{{ msg.text }}</p>
            <p class="text-xs mt-1" :class="msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'">{{ msg.time }}</p>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="px-6 py-4 bg-white border-t border-gray-200">
        <div class="flex items-center gap-3">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type a message..."
            class="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            @click="sendMessage"
            class="px-4 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
