<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { ReferralTab } from '../model/types'

interface Props {
  tabs: ReferralTab[]
}

interface Emits {
  (e: 'switch', level: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = (level: number) => {
  emit('switch', level)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2.5">
    <div
      v-for="tab in tabs"
      :key="tab.level"
      class="relative rounded-full py-2.5 cursor-pointer transition-all border"
      :class="tab.isActive ? 'bg-[#023A35] border-[#023A35]' : 'border-white'"
      @click="handleClick(tab.level)"
    >
      <div
        class="absolute -top-3 right-1 bg-[#4A90E2] rounded-full px-2 py-0.5 flex items-center gap-1"
      >
        <Icons name="ton" :size="12" class="text-white" />
        <span class="text-xs font-bold text-white">+{{ tab.amount }}</span>
      </div>
      <h3 class="text-sm font-medium text-center">{{ tab.level }} уровень</h3>
    </div>
  </div>
</template>

