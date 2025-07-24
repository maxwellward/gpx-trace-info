import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URI),
  routes: [
    {
      path: '/stats',
      name: 'stats',
      component: HomeView,
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()

        await authStore.loadSavedAuth()
        if (!authStore.isAuthenticated) {
          next({ name: 'landing' })
        } else {
          next()
        }
      },
    },
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('../views/AuthCallbackView.vue'),
    },
  ],
})

export default router
