import { ref, computed } from 'vue'

export type CalendarDayStatus = 'available' | 'scheduled' | 'locked'

export interface CalendarDay {
  id: number
  title: string
  status: CalendarDayStatus
  image: string
  unlockDate?: string
}

export interface Gift {
  id: number
  title: string
  description: string
  image: string
}

export interface CalendarApiResponse {
  days: CalendarDay[]
  openedDayIds: number[]
}

export interface OpenDayApiResponse {
  gift: Gift
  success: boolean
}

export function useCalendar(calendarId: string) {
  void calendarId
  const days = ref<CalendarDay[]>([])
  const openedDayIds = ref<Set<number>>(new Set())
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentTime = ref(Date.now())

  const fetchCalendarDays = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const mockDays: CalendarDay[] = [
        {
          id: 1,
          title: '1',
          status: 'available',
          image: new URL('@/assets/images/calendar/1.png', import.meta.url).href,
        },
        {
          id: 2,
          title: '2',
          status: 'locked',
          image: new URL('@/assets/images/calendar/2.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          title: '3',
          status: 'locked',
          image: new URL('@/assets/images/calendar/3.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 4,
          title: '4',
          status: 'locked',
          image: new URL('@/assets/images/calendar/4.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 5,
          title: '5',
          status: 'locked',
          image: new URL('@/assets/images/calendar/5.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 6,
          title: '6',
          status: 'locked',
          image: new URL('@/assets/images/calendar/6.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 7,
          title: '7',
          status: 'locked',
          image: new URL('@/assets/images/calendar/7.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 8,
          title: '8',
          status: 'locked',
          image: new URL('@/assets/images/calendar/8.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 9,
          title: '9',
          status: 'locked',
          image: new URL('@/assets/images/calendar/9.png', import.meta.url).href,
          unlockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]

      days.value = mockDays
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch calendar days'
      console.error('Error fetching calendar days:', err)
    } finally {
      isLoading.value = false
    }
  }

  const openCalendarDay = async (dayId: number): Promise<Gift | null> => {
    try {
      const mockGifts: Gift[] = [
        {
          id: 1,
          title: 'Plush Pepe #607',
          description: 'Поздравляем, вам выпал телеграм подарок. Испытайте удачу еще раз.',
          image: new URL('@/assets/images/calendar/gift-nft.png', import.meta.url).href,
        },
        {
          id: 2,
          title: '1 TON',
          description: 'Добавь настроение в переписку с друзьями.',
          image: new URL('@/assets/images/calendar/gift-ton.png', import.meta.url).href,
        },
        {
          id: 3,
          title: '1 snowflake',
          description: 'Поздравляем, вам выпал 1 snow. Испытайте удачу еще раз.',
          image: new URL('@/assets/images/calendar/gift-snow.png', import.meta.url).href,
        },
      ]

      const randomGift = mockGifts[Math.floor(Math.random() * mockGifts.length)]
      if (!randomGift) {
        return null
      }
      openedDayIds.value.add(dayId)
      return randomGift
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to open calendar day'
      console.error('Error opening calendar day:', err)
      return null
    }
  }

  const isDayOpened = (dayId: number): boolean => {
    return openedDayIds.value.has(dayId)
  }

  const updateCountdown = () => {
    currentTime.value = Date.now()
  }

  const formatCountdown = (unlockDate: string): string => {
    const now = new Date(currentTime.value)
    const unlock = new Date(unlockDate)
    const diff = unlock.getTime() - now.getTime()

    if (diff <= 0) {
      return 'Открыть'
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      return `${days} д`
    }

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')} ч`
    }

    return `${minutes} мин`
  }

  const getDayInfo = computed(() => {
    void currentTime.value
    return (day: CalendarDay): string => {
      if (day.unlockDate) {
        return formatCountdown(day.unlockDate)
      }
      return 'Открыть'
    }
  })

  const initialize = async () => {
    await fetchCalendarDays()
  }

  return {
    days,
    openedDayIds: computed(() => openedDayIds.value),
    isLoading,
    error,
    fetchCalendarDays,
    openCalendarDay,
    isDayOpened,
    getDayInfo,
    formatCountdown,
    updateCountdown,
    initialize,
  }
}
