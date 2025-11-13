import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/components/layout/MainLayout.vue'
import AboutView from '@/views/AboutView.vue'
import BalanceView from '@/views/BalanceView.vue'
import FriendsView from '@/views/FriendsView.vue'
import HomeView from '@/views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'friends',
          name: 'friends',
          component: FriendsView,
        },
        {
          path: 'balance',
          name: 'balance',
          component: BalanceView,
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: TasksView,
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
        },
      ],
    },
  ],
})

export default router
