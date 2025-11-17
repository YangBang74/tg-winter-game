<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { DailyRewardDay } from '../model/types'

interface Props {
  day: DailyRewardDay
  isOpened: boolean
}

interface Emits {
  (e: 'click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  if (props.day.status === 'available' && !props.isOpened) {
    emit('click')
  }
}
</script>

<template>
  <div class="relative w-full flex flex-col items-center">
    <article
      class="relative overflow-hidden w-full p-1.5 rounded-2xl transition-all duration-200 ease-in-out"
      :class="{
        'bg-[#A4DD9E]': isOpened,
        'bg-[#F5F5F5]': !isOpened && day.status === 'available',
        'bg-[#E4E4E4] opacity-40 cursor-default': day.status === 'locked',
        'hover:-translate-y-1 cursor-pointer': day.status === 'available' && !isOpened,
        'cursor-pointer': isOpened,
      }"
      @click="handleClick"
    >
      <img
        :src="day.image"
        :alt="`Day ${day.day}`"
        class="relative inset-0 w-full aspect-square object-cover saturate-110"
      />

      <div
        class="absolute bottom-12 right-3 flex items-center gap-1 rounded-full bg-[#A79EFF] px-2 py-0.5"
      >
        <Icons name="snow-small" :size="12" class="text-white" />
        <span class="text-xs font-bold text-white">{{ day.reward }}</span>
      </div>
      <button
        class="inline-flex items-center justify-center bg-white/30 w-full py-[0.3125rem] rounded-full mt-2.5"
      >
        <Icons v-if="isOpened" name="check" :size="16" class="text-white" />
        <p v-if="!isOpened" class="mt-1 text-xs font-medium text-black">День {{ day.day }}</p>
      </button>
    </article>
  </div>
</template>
