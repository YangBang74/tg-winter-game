<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
  <section class="text-white p-4 space-y-4">
    <RouterLink to="/calendar" class="block advent rounded-2xl py-6 px-2.5">
      <h3 class="text-[1.75rem] font-bold leading-none uppercase font-raleway">
        {{ t('home.cta.advent.titleLine1') }} <br />
        {{ t('home.cta.advent.titleLine2') }}
      </h3>
      <p class="pt-1 pb-2 font-medium">{{ t('home.cta.advent.subtitle') }}</p>
      <button class="bg-primary py-2.5 px-4 rounded-full flex items-center gap-2">
        <Icons name="calendar" />
        <span class="font-raleway font-bold">{{ t('home.cta.common.open') }}</span>
      </button>
    </RouterLink>
    <RouterLink to="/roulette" class="block roulette rounded-2xl py-6 px-2.5">
      <h3 class="text-[2.625rem] font-bold leading-none uppercase font-raleway">
        {{ t('home.cta.roulette.titleLine1') }} <br />
        {{ t('home.cta.roulette.titleLine2') }}
      </h3>
      <button class="bg-[#9E509D] mt-3 py-2.5 px-4 rounded-full flex items-center gap-2">
        <Icons name="tron" />
        <span class="font-bold">{{ t('home.cta.roulette.prize') }}</span>
      </button>
    </RouterLink>
    <RouterLink
      to="/lottery"
      class="lottery flex flex-col items-center gap-3 rounded-2xl py-6 pb-10 px-2.5"
    >
      <h3 class="text-[2.625rem] font-bold leading-none uppercase font-raleway">
        {{ t('home.cta.lottery.titleLine1') }} <br />
        {{ t('home.cta.lottery.titleLine2') }}
      </h3>
      <button class="bg-primary py-2.5 px-4 rounded-full flex items-center gap-2">
        <Icons name="calendar" />
        <span class="font-raleway font-bold">{{ t('home.cta.common.open') }}</span>
      </button>
    </RouterLink>
  </section>
</template>
<style scoped>
.advent {
  background: url('@/assets/images/home/advent-card.png') no-repeat center center;
  background-size: cover;
}
.roulette {
  background: url('@/assets/images/home/roulete-card.png') no-repeat center center;
  background-size: cover;
}
.lottery {
  background: url('@/assets/images/home/lottery-card.png') no-repeat center center;
  background-size: cover;
}
</style>
