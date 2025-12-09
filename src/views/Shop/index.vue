<script setup lang="ts">
import { Icons } from '@/components/shared'

const coinsStyle =
  'font-bold gap-px inline-flex items-center rounded-full text-sm bg-primary p-[0.3125rem]'
</script>

<template>
  <div
    class="game-intro relative -bottom-2 p-4 pt-0 text-white flex flex-col items-center justify-start gap-2.5 mt-4"
  >
    <h1 class="text-2xl text-center font-bold uppercase">Магазин</h1>

    <div class="flex-1 w-full space-y-2.5">
      <div
        class="main-block overflow-hidden flex items-center justify-center relative rounded-2xl text-center p-4 h-34 w-full"
      >
        <h1 class="text-[1.25rem] leading-7.5 text-white font-bold uppercase z-10">
          заработй больше <br />
          <span :class="[coinsStyle, 'bg-primary']">
            <Icons name="ton" :size="16" />
            TON
          </span>
          или
          <span :class="[coinsStyle, '!bg-[#FFA32F]', 'text-[#484C52]']">
            <Icons name="star-circle" :size="14" class="mr-0.5" />
            STARS
          </span>
        </h1>
        <img
          src="@/assets/images/shop/gift.png"
          alt="Shop background"
          class="object-cover absolute left-0 bottom-0 z-1"
        />
        <img
          src="@/assets/images/shop/stick.png"
          alt="Shop background"
          class="object-cover absolute right-2 bottom-0 z-1"
        />
        <img
          src="@/assets/images/stake/snow.png"
          alt="TON & STARS background"
          class="object-cover absolute left-0 w-full -bottom-8"
        />
      </div>
    </div>
    <h2 class="text-2xl text-center font-bold uppercase my-2">Игрушки</h2>
    <div class="rounded-[0.9375rem] bg-[#1A5954] z-1 overflow-hidden w-full">
      <div class="bg-[#000000]/36 p-2.5">
        <div class="flex items-center gap-2">
          <div class="bg-white/10 rounded-[0.875rem]">
            <img src="@/assets/images/shop/toys-1.png" alt="Toy" class="object-cover" />
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span>Стоимость:</span>

              <div class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-primary">
                <Icons name="ton" :size="12" />
                <span class="text-[0.625rem] font-bold">1 TON</span>
              </div>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span>Цикл:</span>
              <div class="flex items-center gap-2">
                <p class="font-bold">24 ч</p>
                <Icons name="clock" :size="20" />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span>Доход:</span>

              <div class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-primary">
                <Icons name="ton" :size="12" />
                <span class="text-[0.625rem] font-bold">+0.0001 TON</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="py-2.5 px-[1.0625rem] w-full bg-[#FFCC00] rounded-full text-[#484C52] font-bold flex items-center gap-1.5 justify-center mt-2"
        >
          <Icons name="ton" :size="24" />
          Купить за 1 TON
        </button>
      </div>
      <div class="flex items-center p-2.5 justify-between gap-2">
        <p class="font-bold">Заработано:</p>
        <div
          class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-linear-to-r from-[#0095EF] to-[#0095EF]/0"
        >
          <Icons name="ton" :size="12" />
          <span class="text-[0.625rem] font-bold">+0.0001 TONN</span>
        </div>
      </div>
    </div>
    <div class="rounded-[0.9375rem] bg-[#1A5954] z-1 overflow-hidden w-full">
      <div class="bg-[#000000]/36 p-2.5">
        <div class="flex items-center gap-2">
          <div class="bg-white/10 rounded-[0.875rem]">
            <img src="@/assets/images/shop/toys-2.png" alt="Toy" class="object-cover" />
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span>Стоимость:</span>

              <div class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-[#EB8700]">
                <Icons name="star" :size="10" />
                <span class="text-[0.625rem] font-bold">+5</span>
              </div>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span>Цикл:</span>
              <div class="flex items-center gap-2">
                <p class="font-bold">24 ч</p>
                <Icons name="clock" :size="20" />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span>Доход:</span>

              <div class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-[#EB8700]">
                <Icons name="star" :size="10" />
                <span class="text-[0.625rem] font-bold">+1</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="py-2.5 px-[1.0625rem] w-full bg-[#FFCC00] rounded-full text-[#484C52] font-bold flex items-center gap-1.5 justify-center mt-2"
        >
          <Icons name="star" :size="20" />
          Купить за 5 STARS
        </button>
      </div>
      <div class="flex items-center p-2.5 justify-between gap-2">
        <p class="font-bold">Заработано:</p>
        <div
          class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-linear-to-r from-[#EB8700] to-[#EB8700]/0"
        >
          <Icons name="star" :size="10" />
          <span class="text-[0.625rem] font-bold">+5</span>
        </div>
      </div>
    </div>
  </div>

  <div class="relative w-full h-full">
    <img
      src="@/assets/images/stake/snow.png"
      alt="TON & STARS background"
      class="object-cover fixed left-0 w-full bottom-10"
    />
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
  background-image: url('@/assets/images/stake/main-block.svg');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
</style>
