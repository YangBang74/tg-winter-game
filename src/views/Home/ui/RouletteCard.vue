<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
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
</template>

<style scoped>
.roulette {
  background: url('@/assets/images/home/roulete-card.png') no-repeat center center;
  background-size: cover;
}
</style>

