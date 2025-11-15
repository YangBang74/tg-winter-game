import { ref, computed } from 'vue'
import task1Image from '@/assets/images/tasks/task-1.png'
import type { DailyRewardDay } from './types'

export function useDailyReward() {
  const days = ref<DailyRewardDay[]>([])
  const openedDayIds = ref<Set<number>>(new Set())
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const initialize = async () => {
    isLoading.value = true
    error.value = null

    try {
      const mockDays: DailyRewardDay[] = [
        {
          id: 1,
          day: 1,
          reward: '+1',
          status: 'opened',
          image: task1Image,
        },
        {
          id: 2,
          day: 2,
          reward: '+2',
          status: 'available',
          image: task1Image,
        },
        {
          id: 3,
          day: 3,
          reward: '+10',
          status: 'locked',
          image: task1Image,
        },
        {
          id: 4,
          day: 4,
          reward: '+50',
          status: 'locked',
          image: task1Image,
        },
        {
          id: 5,
          day: 5,
          reward: '+80',
          status: 'locked',
          image: task1Image,
        },
        {
          id: 6,
          day: 6,
          reward: '+90',
          status: 'locked',
          image: task1Image,
        },
        {
          id: 7,
          day: 7,
          reward: '+100',
          status: 'locked',
          image: task1Image,
        },
        {
          id: 8,
          day: 8,
          reward: '+200',
          status: 'locked',
          image: task1Image,
        },
        {
          id: 9,
          day: 9,
          reward: '+1000',
          status: 'locked',
          image: task1Image,
        },
        {
          id: 10,
          day: 19,
          reward: '+1000',
          status: 'locked',
          image: task1Image,
        },
      ]

      days.value = mockDays

      // Помечаем день 1 как открытый
      openedDayIds.value.add(1)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch daily reward days'
      console.error('Error fetching daily reward days:', err)
    } finally {
      isLoading.value = false
    }
  }

  const openDay = async (dayId: number): Promise<void> => {
    const day = days.value.find((d) => d.id === dayId)
    if (!day) {
      return
    }

    if (day.status !== 'available') {
      return
    }

    if (openedDayIds.value.has(dayId)) {
      return
    }

    try {
      openedDayIds.value.add(dayId)
      day.status = 'opened'

      // Разблокируем следующий день, если он существует
      const nextDay = days.value.find((d) => d.id === dayId + 1)
      if (nextDay && nextDay.status === 'locked') {
        nextDay.status = 'available'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to open daily reward day'
      console.error('Error opening daily reward day:', err)
    }
  }

  const isDayOpened = (dayId: number): boolean => {
    return openedDayIds.value.has(dayId)
  }

  const getAvailableDay = computed(() => {
    return days.value.find((day) => day.status === 'available' && !openedDayIds.value.has(day.id))
  })

  return {
    days,
    openedDayIds: computed(() => openedDayIds.value),
    isLoading,
    error,
    initialize,
    openDay,
    isDayOpened,
    getAvailableDay,
  }
}
