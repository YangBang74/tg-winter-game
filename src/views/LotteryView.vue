<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import Sheet from '@/components/shared/Sheet.vue'
import { ref } from 'vue'

interface AccordionItem {
  id: number
  title: string
  content: string
}

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

const isPaymentOpen = ref(false)

const quantity = ref(20)
const minQuantity = 1
const maxQuantity = 100

const prizes = [
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

const sparklePositions = [
  { top: '-8px', left: '-15px' },
  { top: '-12px', left: '10px' },
  { top: '5px', left: '-20px' },
  { top: '8px', left: '15px' },
  { top: '-5px', left: '25px' },
  { top: '12px', left: '-10px' },
]
</script>

<template>
  <div class="p-4 text-white space-y-3">
    <div
      class="gift-box p-8 rounded-2xl space-y-2 min-h-120 text-center flex flex-col items-center"
    >
      <h1 class="font-bold text-5xl">ЛОТЕРЕЯ</h1>
      <p class="font-medium leading-none">Принимай участие в лотереи и выигрывай призы</p>
      <Sheet v-model:open="isPaymentOpen">
        <template #trigger="{ open }">
          <button class="bg-primary py-2.5 px-6 rounded-full flex items-center gap-2" @click="open">
            <span class="font-bold">Принять участие</span>
          </button>
        </template>

        <template #default>
          <div class="space-y-4">
            <div class="text-center">
              <h2 class="text-2xl font-bold text-[#484C52]">Оплата</h2>
              <p class="text-sm font-medium text-[#484C52]/70 mb-4">Выбери количество</p>

              <div class="relative pt-12 pb-4">
                <div class="relative">
                  <div
                    class="absolute top-1/2 left-0 w-full h-[32px] -translate-y-1/2 rounded-full pointer-events-none"
                    :style="{
                      background: `linear-gradient(to right, #A79EFF 0%, #A79EFF ${((quantity - minQuantity) / (maxQuantity - minQuantity)) * 100}%, #F5F0FF ${((quantity - minQuantity) / (maxQuantity - minQuantity)) * 100}%, #F5F0FF 100%)`,
                    }"
                  ></div>
                  <input
                    v-model.number="quantity"
                    type="range"
                    :min="minQuantity"
                    :max="maxQuantity"
                    class="w-full h-3 -bottom-[2.3px] rounded-full appearance-none cursor-pointer slider relative z-20"
                  />
                  <div
                    class="absolute top-[-55px] transition-all duration-200 pointer-events-none z-10"
                    :style="{
                      left: `${((quantity - minQuantity) / (maxQuantity - minQuantity)) * 100}%`,
                      transform: 'translateX(-50%)',
                    }"
                  >
                    <div class="relative">
                      <div
                        class="bg-[#A79EFF] text-white text-sm font-bold px-4 py-2 rounded-2xl whitespace-nowrap shadow-xl relative"
                      >
                        {{ quantity }}
                        <div
                          class="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#A79EFF] rotate-45"
                        ></div>
                      </div>
                      <div
                        v-for="(pos, i) in sparklePositions"
                        :key="i"
                        class="absolute w-1.5 h-1.5 bg-[#A79EFF]/50 rounded-full sparkle"
                        :style="{
                          top: pos.top,
                          left: pos.left,
                          animationDelay: `${i * 0.2}s`,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-[#484C52] mb-4">Шанс на победу</h3>
              <div class="space-y-3">
                <div
                  v-for="prize in prizes"
                  :key="prize.name"
                  class="flex flex-col items-start gap-1"
                >
                  <span class="text-xs font-bold text-[#484C52]">{{ prize.name }}</span>
                  <div
                    class="relative w-full h-6 rounded-full overflow-hidden"
                    :class="prize.background"
                  >
                    <div
                      :class="prize.color"
                      class="absolute inset-y-0 left-0 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                      :style="{
                        width: `${prize.chance < 10 ? 10 + prize.chance : prize.chance}%`,
                      }"
                    >
                      <span class="text-xs font-bold text-[#484C52] whitespace-nowrap"
                        >{{ prize.chance }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center gap-3 pt-4">
              <button
                class="flex-1 bg-[#FF9500] text-white py-4 px-3 rounded-full font-bold flex items-center justify-center gap-2"
              >
                <Icons name="star" :size="20" />
                <span class="whitespace-nowrap text-sm">649 STARS</span>
              </button>
              <span class="text-[#484C52] font-medium">или</span>
              <button
                class="flex-1 bg-[#0095EF] text-white py-4 px-3 rounded-full font-bold flex items-center justify-center gap-2"
              >
                <Icons name="ton" :size="20" />
                <span class="whitespace-nowrap text-sm">3.51 TON</span>
              </button>
            </div>
          </div>
        </template>
      </Sheet>
    </div>

    <div class="space-y-3 mt-6">
      <div
        v-for="item in accordionItems"
        :key="item.id"
        class="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-200"
      >
        <button
          class="w-full flex items-center justify-between p-4 text-left text-[#484C52] font-medium"
          @click="toggleItem(item.id)"
        >
          <span class="font-semibold text-xs">{{ item.title }}</span>
          <Icons name="arrow" :class="getIconClass(item.id)" />
        </button>
        <Transition name="accordion">
          <div
            v-if="openedItemId === item.id"
            class="mx-4 py-4 text-[#484C52] border-t border-[#E0E0E0]"
          >
            <p class="text-xs leading-relaxed">{{ item.content }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<style scoped>
.gift-box {
  background: url('@/assets/images/lottery/gifts.png') no-repeat center center / cover;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  height: 28px;
}

.slider::-webkit-slider-track {
  height: 12px;
  border-radius: 12px;
  background: transparent;
  border: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  background: white;
  border: 2px solid #a79eff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(167, 158, 255, 0.3);
  margin-top: 0px;
  right: -2px;
  position: relative;
  z-index: 2;
}

.slider::-moz-range-track {
  height: 12px;
  border-radius: 12px;
  background: transparent;
}

.slider::-moz-range-thumb {
  width: 28px;
  height: 28px;
  background: white;
  border: 2px solid #a79eff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(167, 158, 255, 0.3);
  position: relative;
  z-index: 2;
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

.accordion-enter-active {
  transition: all 0.2s ease-out;
  overflow: hidden;
}

.accordion-leave-active {
  transition: all 0.2s ease-in;
  overflow: hidden;
}

.accordion-enter-from {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.accordion-enter-to {
  max-height: 300px;
  opacity: 1;
}

.accordion-leave-from {
  max-height: 300px;
  opacity: 1;
}

.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
