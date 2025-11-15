<script setup lang="ts">
import AppDialog from '@/components/shared/Dialog.vue'
import Icons from '@/components/shared/Icons.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCalendar, type CalendarDay, type Gift } from '@/composables/useCalendar'
import CalendarDayCard from './ui/CalendarDayCard.vue'

const route = useRoute()
const calendarId = computed(() => String(route.params.id ?? 'free'))

const { days, openCalendarDay, isDayOpened, getDayInfo, updateCountdown, initialize } = useCalendar(
  calendarId.value,
)

const isDialogOpen = ref(false)
const currentGift = ref<Gift | null>(null)
const countdownTimer = ref<number | null>(null)

const openDay = async (day: CalendarDay) => {
  if (day.status !== 'available') {
    return
  }

  if (isDayOpened(day.id)) {
    return
  }

  const gift = await openCalendarDay(day.id)

  if (!gift) {
    return
  }

  currentGift.value = gift
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
}

onMounted(() => {
  initialize()

  countdownTimer.value = window.setInterval(() => {
    updateCountdown()
  }, 1000)
})

onUnmounted(() => {
  if (countdownTimer.value !== null) {
    clearInterval(countdownTimer.value)
  }
})
</script>

<template>
  <div class="p-6 md:p-8 md:px-10 text-white space-y-4">
    <header class="space-y-1 text-center text-white">
      <h1 class="text-[2.375rem] font-bold uppercase font-raleway">КАЛЕНДАРЬ</h1>
    </header>

    <section class="grid grid-cols-3 gap-3 md:gap-5">
      <CalendarDayCard
        v-for="day in days"
        :key="day.id"
        :day="day"
        :is-opened="isDayOpened(day.id)"
        :day-info="getDayInfo(day)"
        @click="openDay(day)"
      />
    </section>

    <AppDialog v-model:open="isDialogOpen" @close="closeDialog" class="px-2">
      <div
        v-if="currentGift"
        class="relative flex flex-col gap-2.5 text-[#484C52] items-center text-center pt-9 px-0 rounded-3xl"
      >
        <img
          :src="currentGift.image"
          :alt="currentGift.title"
          class="w-full aspect-[1/1] rounded-sm"
        />
        <h2 class="text-[1.75rem] font-bold leading-tight">{{ currentGift.title }}</h2>
        <p class="font-medium">{{ currentGift.description }}</p>
        <button
          class="w-full py-3 px-6 text-white rounded-full bg-primary font-bold text-base"
          type="button"
          @click="closeDialog"
        >
          Готово
        </button>
      </div>
    </AppDialog>
  </div>
</template>

