<script setup lang="ts">
import { onMounted, watch } from 'vue'
import Sheet from '@/components/shared/Sheet.vue'
import { useDailyReward } from '../model/useDailyReward'
import DailyRewardDayCard from './DailyRewardDayCard.vue'

interface Props {
  open?: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
})
const emit = defineEmits<Emits>()

const { days, initialize, openDay, isDayOpened, getAvailableDay } = useDailyReward()

const handleDayClick = async (dayId: number) => {
  await openDay(dayId)
}

const handleClaim = () => {
  if (getAvailableDay.value) {
    handleDayClick(getAvailableDay.value.id)
  }
}

onMounted(() => {
  if (props.open) {
    initialize()
  }
})

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      initialize()
    }
  },
)
</script>

<template>
  <Sheet :open="props.open" @update:open="emit('update:open', $event)">
    <template #trigger>
      <slot name="trigger" />
    </template>

    <template #default>
      <div class="space-y-4 text-[#484C52]">
        <div class="relative mt-5">
          <h2 class="text-center text-xl font-bold uppercase">ЕЖЕДНЕВНАЯ НАГРАДА ЗА ВХОД</h2>
          <p class="mt-2 text-center text-sm text-[#484C52]/70">
            Не забывайте забирать награду каждый день, иначе прогресс будет сброшен.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
          <DailyRewardDayCard
            v-for="day in days"
            :key="day.id"
            :day="day"
            :is-opened="isDayOpened(day.id)"
            @click="handleDayClick(day.id)"
          />
        </div>

        <button
          class="w-full rounded-full bg-[#0095EF] py-3 text-sm font-bold text-white transition hover:bg-[#0085DF] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!getAvailableDay"
          @click="handleClaim"
        >
          Забрать
        </button>
      </div>
    </template>
  </Sheet>
</template>
