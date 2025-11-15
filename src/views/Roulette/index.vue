<script setup lang="ts">
import Badge from '@/components/shared/Badge.vue'
import { rouletteCards } from '@/data/rouletteCards'
import RouletteCard from './ui/RouletteCard.vue'
</script>

<template>
  <div class="space-y-6 p-4 text-white">
    <h1 class="text-center font-raleway text-2xl font-bold uppercase">Доступные кейсы</h1>

    <div class="grid grid-cols-2 gap-3">
      <RouletteCard
        v-for="card in rouletteCards"
        :key="card.id"
        :card="card"
      />
    </div>
  </div>
</template>

