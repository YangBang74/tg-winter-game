import { computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import RouletteSpinner from '@/components/roulette/RouletteSpinner.vue'
import type { SpinnerResult, TaskItem } from './types'
import { TASK_STATUS_META } from './types'

export function useRouletteDetail(card: ComputedRef<any>) {
  const headingText = computed(() => {
    if (!card.value) {
      return 'Кейс'
    }

    if (card.value.price === 0) {
      return 'Бесплатный кейс'
    }

    return `Кейс за ${card.value.price} TON`
  })

  const tonButtonLabel = computed(() => {
    if (!card.value || card.value.price === 0) {
      return 'Открыть бесплатно'
    }

    return `Открыть за ${card.value.price} TON`
  })

  const spinnerRef = ref<InstanceType<typeof RouletteSpinner> | null>(null)
  const selectedPresent = ref<SpinnerResult | null>(null)
  const isResultDialogOpen = ref(false)
  const isSpinning = computed(() => spinnerRef.value?.isSpinning ?? false)
  const starsCost = 75
  const isTaskSheetOpen = ref(false)
  const isFreeCase = computed(() => card.value?.price === 0)

  const taskItems: TaskItem[] = [
    {
      id: 'quiz',
      icon: 'ton',
      title: 'Ответь правильно на 3 вопроса викторины про TON',
      status: 'done',
    },
    {
      id: 'daily',
      icon: 'calendar',
      title: 'Выполни ежедневное задание 3 дня подряд',
      status: 'progress',
    },
    {
      id: 'game',
      icon: 'star',
      title: 'Сыграй в игру "Собери 5 звёзд"',
      status: 'todo',
    },
  ] as const

  const isTonLoading = ref(false)
  const isStarsLoading = ref(false)
  const isTaskLoading = ref(false)

  const runSpin = async (source: 'task' | 'ton' | 'stars') => {
    if (isSpinning.value) return

    if (source === 'task') {
      isTaskLoading.value = true
    } else if (source === 'ton') {
      isTonLoading.value = true
    } else {
      isStarsLoading.value = true
    }

    try {
      await spinnerRef.value?.spin()
    } finally {
      isTonLoading.value = false
      isStarsLoading.value = false
      isTaskLoading.value = false
    }
  }

  const handleFinished = (item: SpinnerResult) => {
    selectedPresent.value = item
    isResultDialogOpen.value = true
  }

  const closeResultDialog = () => {
    isResultDialogOpen.value = false
  }

  return {
    headingText,
    tonButtonLabel,
    spinnerRef,
    selectedPresent,
    isResultDialogOpen,
    isSpinning,
    starsCost,
    isTaskSheetOpen,
    isFreeCase,
    taskItems,
    TASK_STATUS_META,
    isTonLoading,
    isStarsLoading,
    isTaskLoading,
    runSpin,
    handleFinished,
    closeResultDialog,
  }
}

