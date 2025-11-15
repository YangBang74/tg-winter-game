<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { CalendarDay } from '@/composables/useCalendar'

interface Props {
  day: CalendarDay
  isOpened: boolean
  dayInfo: string
}

defineProps<Props>()
</script>

<template>
  <article
    class="relative overflow-hidden p-1.5 rounded-2xl transition-all duration-200 ease-in-out"
    :class="{
      'bg-[#A4DD9E]': isOpened,
      'bg-[#FFFFFF]/70': !isOpened,
      'hover:-translate-y-1 cursor-pointer': day.status === 'available' && !isOpened,
      'opacity-40 cursor-default': day.status === 'locked',
      'cursor-pointer': day.status === 'scheduled' || isOpened,
    }"
  >
    <img
      :src="day.image"
      :alt="`Day ${day.title}`"
      class="relative inset-0 w-full aspect-square object-cover saturate-110"
    />

    <div class="relative flex flex-col justify-between h-full py-2 backdrop-blur-sm">
      <div class="flex justify-start items-center">
        <button
          class="w-full py-2 rounded-full font-bold text-xs flex items-center justify-center gap-1.5"
          :class="{
            'bg-[#FFFFFF]/30 text-white': isOpened,
            'bg-primary text-white': !isOpened,
          }"
          type="button"
        >
          <Icons v-if="isOpened" name="check" :size="14" class="text-white" />
          <span v-if="!isOpened">{{ dayInfo }}</span>
        </button>
      </div>
    </div>
  </article>
</template>

