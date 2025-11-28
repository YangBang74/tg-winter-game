<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icons } from '@/components/shared'

const coinsStyle =
  'text-brand-accent gap-px inline-flex items-center rounded-full text-sm bg-primary p-[0.3125rem]'

const tonBalance = ref(0)
const starsBalance = ref(0)

// Timer logic
const hours = ref(10)
const minutes = ref(10)
const seconds = ref(10)

let timerInterval: number | null = null

const formatTime = (value: number) => {
  return value.toString().padStart(2, '0')
}

const formattedTime = computed(() => {
  return `${formatTime(hours.value)}:${formatTime(minutes.value)}:${formatTime(seconds.value)}`
})

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else {
      seconds.value = 59
      if (minutes.value > 0) {
        minutes.value--
      } else {
        minutes.value = 59
        if (hours.value > 0) {
          hours.value--
        } else {
          hours.value = 23
        }
      }
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

const handleDeposit = () => {
  // TODO HANDLE
}

const handleWithdraw = () => {
  // TODO HANDLE WITHDRAW
}
</script>

<template>
  <div
    class="game-intro relative -bottom-2 p-4 pt-0 h-[calc(100vh-9rem)] flex flex-col items-center justify-start gap-2.5 mt-4"
  >
    <div class="main-block relative rounded-2xl text-center px-2.5 pt-4 pb-10 w-full">
      <h1 class="text-[1.25rem] leading-7.5 text-white font-bold uppercase mb-4">
        Получайте до 1% наград <br />
        в
        <span :class="[coinsStyle, 'bg-primary']">
          <Icons name="ton" :size="16" />
          TON
        </span>
        или
        <span :class="[coinsStyle, '!bg-[#FFA32F]', 'text-[#484C52]']">
          <Icons name="star" :size="13" />
          STARS
        </span>
      </h1>

      <div class="flex gap-2.5 mb-3 justify-center">
        <button
          @click="handleDeposit"
          class="flex items-center justify-center gap-2 bg-primary font-bold rounded-full text-white px-4 py-2.5"
        >
          <Icons name="down-arrow" :size="11" />
          Пополнить
        </button>
        <button
          @click="handleWithdraw"
          class="flex items-center justify-center gap-2 bg-white font-bold rounded-full text-[#484C52] px-4 py-2.5"
        >
          Вывести
          <Icons name="up-arrow" :size="11" />
        </button>
      </div>

      <div
        class="text-white text-sm absolute left-0 right-0 font-bold bottom-0 rounded-b-2xl py-2.5 bg-[#5F9C58] w-full"
      >
        Начисление через: {{ formattedTime }}
      </div>
    </div>

    <div class="flex gap-2.5 w-full">
      <!-- TON Balance Card -->
      <div class="ton-block flex-1 rounded-2xl overflow-hidden relative h-32">
        <div class="absolute inset-0 p-3 flex flex-col justify-start items-center">
          <div class="flex items-center gap-1 bg-white text-[#484C52] rounded-full px-5 py-1.5">
            <Icons name="ton" :size="14" class="" />
            <p class="font-bold text-xs">{{ tonBalance }} TON</p>
          </div>
          <div>
            <p class="text-white text-[0.625rem]">Вы заработали</p>
          </div>
        </div>
      </div>

      <!-- STARS Balance Card -->
      <div class="star-block flex-1 rounded-2xl overflow-hidden relative h-32">
        <div class="absolute inset-0 p-3 flex flex-col justify-start items-center">
          <div class="flex items-center gap-1 bg-white text-[#484C52] rounded-full px-5 py-1.5">
            <Icons name="star-circle" :size="12" class="" />
            <p class="font-bold text-xs">{{ starsBalance }} STARS</p>
          </div>
          <div>
            <p class="text-white text-[0.625rem]">Вы заработали</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-intro {
  background-image: url('@/assets/images/stake/background.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
.main-block {
  background-image: url('@/assets/images/stake/main-block.png');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
.ton-block {
  background-image: url('@/assets/images/stake/ton-block.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
.star-block {
  background-image: url('@/assets/images/stake/star-block.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
</style>
