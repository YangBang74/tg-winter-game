<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Badge from '@/components/shared/Badge.vue'
import { getRouletteCardById } from '@/data/rouletteCards'

const route = useRoute()
const router = useRouter()

const card = computed(() => getRouletteCardById(route.params.id as string))

const formattedPrice = computed(() => {
  if (!card.value) {
    return ''
  }

  if (card.value.price === 0) {
    return 'Free'
  }

  return `${card.value.price} TON`
})
</script>

<template>
  <div class="space-y-4 p-4 text-white">
    <h2 class="text-center text-2xl font-bold uppercase">
      <template v-if="card && card.price === 0">Бесплатный кейс</template>
      <template v-else-if="card">Кейс за {{ formattedPrice }}</template>
      <template v-else>Кейс</template>
    </h2>
  </div>
</template>
