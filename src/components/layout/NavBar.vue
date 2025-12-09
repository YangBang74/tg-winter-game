<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import Icons from '@/components/shared/Icons.vue'

const route = useRoute()

const navItems = [
  { label: 'Главная', icon: 'calendar', name: 'home' },
  { label: 'Друзья', icon: 'users', name: 'friends' },
  { label: 'Баланс', icon: 'wallet', name: 'balance' },
  { label: 'Задачи', icon: 'tasks', name: 'tasks' },
]

const isActive = (name: string) => route.name === name
</script>

<template>
  <nav
    class="fixed bottom-0 z-100 left-0 right-0 flex items-end justify-between rounded-t-[1.125rem] bg-[#023A35] px-4 pb-6 pt-2"
  >
    <template v-for="(item, index) in navItems" :key="item.name">
      <RouterLink
        :to="{ name: item.name }"
        class="flex flex-col items-center justify-end gap-px transition-colors duration-150"
        :class="[isActive(item.name) ? 'text-[#8CE9FF]' : 'text-white/80']"
      >
        <Icons :name="item.icon" />
        <p class="text-xs">{{ item.label }}</p>
      </RouterLink>
      <div v-if="index === 1" class="h-full w-[4.2rem]"></div>
    </template>

    <RouterLink
      to="/game"
      class="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full"
      style="
        width: 4.3125rem;
        height: 4.4375rem;
        background: linear-gradient(343.06deg, #0095ef 8.29%, #9ff5f7 97.21%);
      "
    >
      <Icons name="logo" />
    </RouterLink>
  </nav>
</template>
