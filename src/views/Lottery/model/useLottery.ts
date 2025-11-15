import { ref } from 'vue'
import type { AccordionItem, Prize, SparklePosition } from './types'

export function useLottery() {
  const accordionItems = ref<AccordionItem[]>([
    {
      id: 1,
      title: 'Плюсы SNOW',
      content:
        'SNOW — это основной токен нашей платформы, который можно зарабатывать, выполняя задания и участвуя в играх.',
    },
    {
      id: 2,
      title: 'Как заработать больше?',
      content:
        'Выполняйте ежедневные задания, участвуйте в календаре, рулетке и лотерее. Чем активнее вы играете, тем больше токенов зарабатываете.',
    },
    {
      id: 3,
      title: 'Нужны ли вложения?',
      content:
        'Нет, вложений не требуется. Играть и выводить TON можно абсолютно бесплатно. Основная идея проекта в том, что мы продаём только уникальные NFT и игровые предметы.',
    },
  ])

  const openedItemId = ref<number | null>(3)
  const isPaymentOpen = ref(false)
  const quantity = ref(20)
  const minQuantity = 1
  const maxQuantity = 100

  const prizes: Prize[] = [
    {
      name: 'Айфон 17 или 1200 USDT',
      chance: 3,
      color: 'bg-[#EDABAB]',
      background: 'bg-[#EDABAB]/10',
    },
    { name: 'Swiss Watches', chance: 5, color: 'bg-[#EDABAB]', background: 'bg-[#EDABAB]/10' },
    { name: '300 TON', chance: 40, color: 'bg-[#F9CEA0]', background: 'bg-[#F9CEA0]/10' },
    { name: 'Telegram подарок', chance: 90, color: 'bg-[#A4DD9E]', background: 'bg-[#A4DD9E]/15' },
  ]

  const sparklePositions: SparklePosition[] = [
    { top: '-8px', left: '-15px' },
    { top: '-12px', left: '10px' },
    { top: '5px', left: '-20px' },
    { top: '8px', left: '15px' },
    { top: '-5px', left: '25px' },
    { top: '12px', left: '-10px' },
  ]

  const toggleItem = (id: number) => {
    if (openedItemId.value === id) {
      openedItemId.value = null
    } else {
      openedItemId.value = id
    }
  }

  const getIconClass = (itemId: number) => {
    const baseClasses = 'shrink-0 transition-transform duration-200 text-[#484C52]'
    return openedItemId.value === itemId ? `${baseClasses} rotate-180` : baseClasses
  }

  return {
    accordionItems,
    openedItemId,
    isPaymentOpen,
    quantity,
    minQuantity,
    maxQuantity,
    prizes,
    sparklePositions,
    toggleItem,
    getIconClass,
  }
}

