import { createRouter, createWebHistory } from 'vue-router'
import Statistics from '../views/Statistics.vue'
import Workers from '../views/Workers.vue'
import Messages from '../views/Messages.vue'

const routes = [
  { path: '/', redirect: '/statistics' },
  { path: '/statistics', name: 'Statistics', component: Statistics },
  { path: '/workers', name: 'Workers', component: Workers },
  { path: '/messages', name: 'Messages', component: Messages },
  { path: '/documents', name: 'Documents', component: () => import('../views/Placeholder.vue') },
  { path: '/requests', name: 'Requests', component: () => import('../views/Placeholder.vue') },
  { path: '/calendar', name: 'Calendar', component: () => import('../views/Placeholder.vue') },
  { path: '/training', name: 'Training', component: () => import('../views/Placeholder.vue') },
  { path: '/research', name: 'Research', component: () => import('../views/Placeholder.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../views/Placeholder.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
