<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { Coin } from '../model/types'

interface Props {
  coin: Coin
  bgColor: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="coin-block rounded-2xl p-2 flex items-center gap-3"
    :style="{ backgroundColor: bgColor }"
  >
    <div
      class="text-[#484C52] bg-white flex items-center justify-center gap-1.5 w-20 py-3 rounded-full"
    >
      <Icons :name="coin.icon" :size="16" />
      <p class="font-bold text-[0.8125rem] uppercase">{{ coin.name }}</p>
    </div>
    <div>
      <p class="text-lg font-bold">{{ coin.amount }}</p>
      <p class="text-xs text-white/70 font-medium">{{ coin.usd }}</p>
    </div>
  </div>
</template>

<style scoped>
.coin-block {
  background: url('@/assets/images/balance/coin-block.png') no-repeat right center;
  background-size: cover;
}
</style>
