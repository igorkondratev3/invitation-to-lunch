import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
      name: 'invitationToLunch',
      component: () => import('@/pages/invitation-to-lunch/InvitationToLunch.vue')
    },

    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
