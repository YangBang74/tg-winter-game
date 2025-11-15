<script setup lang="ts">
import type { BalanceTab } from '../model/types'

interface Props {
  tabs: BalanceTab[]
}

interface Emits {
  (e: 'switch', tabId: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = (tabId: string) => {
  emit('switch', tabId)
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2.5">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="relative rounded-full py-2.5 cursor-pointer transition-all border"
      :class="tab.isActive ? 'bg-[#023A35] border-[#023A35]' : 'border-white'"
      @click="handleClick(tab.id)"
    >
      <h3 class="text-sm font-bold text-center">{{ tab.label }}</h3>
    </div>
  </div>
</template>
