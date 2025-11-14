import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/components/layout/MainLayout.vue'
import AboutView from '@/views/AboutView.vue'
import BalanceView from '@/views/BalanceView.vue'
import FriendsView from '@/views/FriendsView.vue'
import HomeView from '@/views/HomeView.vue'
import RouletteDetailView from '@/views/RouletteDetailView.vue'
import RouletteView from '@/views/RouletteView.vue'
import TasksView from '@/views/TasksView.vue'
import CalendarView from '@/views/Calendar/CalendarView.vue'
import CalendarDetailView from '@/views/Calendar/CalendarDetailView.vue'
import LotteryView from '@/views/LotteryView.vue'

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
        {
          path: 'roulette',
          name: 'roulette',
          component: RouletteView,
        },
        {
          path: 'roulette/:id',
          name: 'roulette-detail',
          component: RouletteDetailView,
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: CalendarView,
        },
        {
          path: 'calendar/:id',
          name: 'calendar-detail',
          component: CalendarDetailView,
        },
        {
          path: 'lottery',
          name: 'lottery',
          component: LotteryView,
        }
      ],
    },
  ],
})

export default router
