import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/lawyer/:id',
    name: 'LawyerProfile',
    component: () => import('@/views/LawyerProfile.vue'),
    props: true,
  },
  {
    path: '/how-it-works',
    name: 'HowItWorks',
    component: () => import('@/views/HowItWorks.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutLawdirect.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router