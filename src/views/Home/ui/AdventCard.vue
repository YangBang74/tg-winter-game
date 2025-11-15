<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
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
</template>

<style scoped>
.advent {
  background: url('@/assets/images/home/advent-card.png') no-repeat center center;
  background-size: cover;
}
</style>
