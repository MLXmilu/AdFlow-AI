import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/pre-roll'
    },
    {
      path: '/pre-roll',
      name: 'pre-roll',
      component: () => import('../views/AdPreRoll.vue')
    },
    {
      path: '/in-play',
      name: 'in-play',
      component: () => import('../views/AdInPlay.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('../views/Compare.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    }
  ]
})

export default router
