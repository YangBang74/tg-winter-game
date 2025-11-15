<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

interface Props {
  id: string
  title: string
  price: string | null
  className: string
}

const props = defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <RouterLink :to="`/calendar/${id}`" :class="[props.className, 'block rounded-2xl py-6 px-2.5']">
    <h3 class="text-[1.75rem] font-bold leading-none uppercase font-raleway whitespace-pre-line">
      {{ title }}
    </h3>
    <p class="pt-1 pb-2 font-medium">{{ t('home.cta.advent.subtitle') }}</p>
    <button
      class="bg-primary py-2.5 px-4 rounded-full flex items-center gap-2"
      :class="price ? 'mt-3' : ''"
    >
      <span v-if="price" class="font-bold">{{ `Купить за ${price}` }}</span>
      <span v-else class="font-raleway font-bold">{{ t('home.cta.common.open') }}</span>
    </button>
  </RouterLink>
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

