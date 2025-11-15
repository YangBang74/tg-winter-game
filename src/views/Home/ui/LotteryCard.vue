<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <RouterLink
    to="/lottery"
    class="lottery flex flex-col items-center gap-3 rounded-2xl py-6 pb-10 px-2.5"
  >
    <h3 class="text-[2.625rem] font-bold leading-none uppercase font-raleway">
      {{ t('home.cta.lottery.titleLine1') }} <br />
      {{ t('home.cta.lottery.titleLine2') }}
    </h3>
    <button class="bg-primary py-2.5 px-4 rounded-full flex items-center gap-2">
      <Icons name="play" />
      <span class="font-raleway font-bold">{{ t('home.cta.common.play') }}</span>
    </button>
  </RouterLink>
</template>

<style scoped>
.lottery {
  background: url('@/assets/images/home/lottery-card.png') no-repeat center center;
  background-size: cover;
}
</style>

