import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/components/layout/MainLayout.vue'
import AboutView from '@/views/About/index.vue'
import BalanceView from '@/views/Balance/index.vue'
import FriendsView from '@/views/Friends/index.vue'
import HomeView from '@/views/Home/index.vue'
import RouletteDetailView from '@/views/Roulette/RouletteDetail/index.vue'
import RouletteView from '@/views/Roulette/index.vue'
import TasksView from '@/views/Tasks/index.vue'
import CalendarView from '@/views/Calendar/index.vue'
import CalendarDetailView from '@/views/Calendar/CalendarDetail/index.vue'
import LotteryView from '@/views/Lottery/index.vue'
import GameView from '@/views/Game/index.vue'
import GamePlayView from '@/views/Game/GamePlay/index.vue'

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
        },
        {
          path: 'game',
          name: 'game',
          component: GameView,
        },
      ],
    },
    {
      path: '/game/play',
      name: 'game-play',
      component: GamePlayView,
    },
  ],
})

export default router
