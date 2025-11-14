<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>
<template>
  <div class="p-4 text-white space-y-4">
    <h1 class="text-2xl text-center uppercase font-semibold">Календари</h1>
    <div class="space-y-2.5">
      <RouterLink to="/calendar/free" class="block free rounded-2xl py-6 px-2.5">
        <h3 class="text-[1.75rem] font-bold leading-none uppercase font-raleway">
          Календарь <br />
          Бесплатный
        </h3>
        <p class="pt-1 pb-2 font-medium">{{ t('home.cta.advent.subtitle') }}</p>
        <button class="bg-primary py-2.5 px-4 rounded-full flex items-center gap-2">
          <span class="font-raleway font-bold">{{ t('home.cta.common.open') }}</span>
        </button>
      </RouterLink>
      <RouterLink to="/calendar/premium" class="block premium rounded-2xl py-6 px-2.5">
        <h3 class="text-[1.75rem] font-bold leading-none uppercase font-raleway">
          Календарь <br />
          Премиум
        </h3>
        <p class="pt-1 font-medium">{{ t('home.cta.advent.subtitle') }}</p>
        <button class="bg-primary mt-3 py-2.5 px-4 rounded-full flex items-center gap-2">
          <span class="font-bold">Купить за 5 TON</span>
        </button>
      </RouterLink>
      <RouterLink
        to="/calendar/legendary"
        class="legendary flex flex-col items-start gap-3 rounded-2xl py-6 px-2.5"
      >
        <h3 class="text-[1.75rem] font-bold leading-none uppercase font-raleway">
          Календарь <br />
          Легендарный
        </h3>
        <p class="pt-1 font-medium">{{ t('home.cta.advent.subtitle') }}</p>
        <button class="bg-primary font-bold py-2.5 px-4 rounded-full flex items-center gap-2">
          Купить за 20 TON
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
.free {
  background: url('@/assets/images/calendar/free-card.png') no-repeat center center;
  background-size: cover;
}
.premium {
  background: url('@/assets/images/calendar/premium-card.png') no-repeat center center;
  background-size: cover;
}
.legendary {
  background: url('@/assets/images/calendar/legend-card.png') no-repeat center center;
  background-size: cover;
}
</style>
