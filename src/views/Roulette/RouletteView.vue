<script setup lang="ts">
import Badge from '@/components/shared/Badge.vue'
import { rouletteCards } from '@/data/rouletteCards'
</script>

<template>
  <div class="space-y-6 p-4 text-white">
    <h1 class="text-center font-raleway text-2xl font-bold uppercase">Доступные кейсы</h1>

    <div class="grid grid-cols-2 gap-3">
      <article
        v-for="card in rouletteCards"
        :key="card.id"
        class="flex min-h-[180px] flex-col justify-between rounded-2xl p-2 pb-4"
        :style="{ backgroundColor: card.background ?? '#FFFFFFB3' }"
      >
        <div class="relative flex flex-1 items-center justify-center rounded-2xl">
          <img :src="card.image" :alt="card.title" class="max-h-28 w-full object-contain" />
          <Badge
            class="absolute right-2 top-2"
            :hot="card.type === 'hot'"
            :free="card.type === 'free'"
          />
        </div>

        <div class="mt-2 flex flex-1 flex-col justify-between items-center gap-1">
          <div class="space-y-1">
            <h2 class="font-raleway text-base font-bold text-[#484C52]">{{ card.title }}</h2>
          </div>

          <RouterLink
            class="inline-block rounded-full bg-[#2F9FF8] py-2 px-3 text-center text-sm font-bold text-white transition hover:bg-[#1f8cdd]"
            :to="{ name: 'roulette-detail', params: { id: card.id } }"
          >
            <template v-if="card.price > 0">Купить {{ card.price }} TON</template>
            <template v-else>Перейти в кейс</template>
          </RouterLink>
        </div>
      </article>
    </div>
  </div>
</template>
