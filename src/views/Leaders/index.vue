<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'

const user = {
  rank: 43,
  name: 'Petya Petrov',
  snow: 1000,
  ton: 0.1,
}

const leaders = [
  {
    id: 1,
    rank: 1,
    name: 'Petya Petrov',
    isSelf: true,
    snow: 1000,
    ton: 0.1,
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=160&h=160&fit=crop',
  },
  {
    id: 2,
    rank: 2,
    name: 'Ivan Ivanov',
    isSelf: false,
    snow: 980,
    ton: 0.08,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=160&h=160&fit=crop',
  },
  {
    id: 3,
    rank: 3,
    name: 'Maria Sidorova',
    isSelf: false,
    snow: 960,
    ton: 0.07,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=160&h=160&fit=crop',
  },
  {
    id: 4,
    rank: 4,
    name: 'Alex Petrov',
    isSelf: false,
    snow: 940,
    ton: 0.06,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop',
  },
  {
    id: 5,
    rank: 5,
    name: 'Olga Smirnova',
    isSelf: false,
    snow: 920,
    ton: 0.05,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop',
  },

  {
    id: 6,
    rank: 6,
    name: 'Olga Smirnova',
    isSelf: false,
    snow: 920,
    ton: 0.05,
    avatar: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=160&h=160&fit=crop',
  },
]
</script>
<template>
  <div
    class="game-intro relative -bottom-2 text-white p-4 pt-0 flex flex-col items-center justify-start gap-2 mt-4"
  >
    <h1 class="text-2xl text-center font-bold uppercase">Рейтинг</h1>
    <div
      class="bg-linear-to-r from-[#0095EF] to-[#0095EF]/0 rounded-xl p-[0.3125rem] w-full flex gap-2 items-center"
    >
      <span class="size-8 flex items-center justify-center font-bold leading-7">
        {{ user.rank }}
      </span>
      <img
        src="@/assets/images/leaders/avatar.png"
        alt="leader"
        class="size-10.5 object-cover shrink-0 rounded-lg"
      />
      <span class="text-[0.8125rem] font-medium flex-1 truncate">(ВЫ) {{ user.name }} </span>
      <div class="flex items-center p-[0.3125rem] gap-1 rounded-full px-2 bg-accent">
        <Icons name="snow-small" :size="10" />
        <span class="text-[0.625rem] font-bold">{{ user.snow }}</span>
      </div>
      <div class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-primary">
        <Icons name="ton" :size="12" />
        <span class="text-[0.625rem] font-bold">{{ user.ton }}</span>
      </div>
    </div>
    <div class="flex items-center justify-center gap-2.5 mt-14 w-full">
      <div
        class="rounded-xl flex flex-col items-center relative h-[90%] bg-linear-to-b w-26.75 from-[#38434A] to-[#38434A]/0 pb-[11px] px-3.5"
      >
        <img
          src="@/assets/images/leaders/second.svg"
          alt=""
          class="absolute bottom-26 w-full h-full right-0"
        />
        <div
          class="border-3 z-10 relative bottom-7 border-[#748189] rounded-full bg-[#38434A] size-[4.375rem]"
        >
          <img
            src="@/assets/images/leaders/second-ava.png"
            alt=""
            class="object-cover w-full h-full"
          />
        </div>
        <div class="relative bottom-6.5 space-y-1">
          <p class="text-sm font-medium">Ivan Ivanov</p>
          <div
            class="flex items-center justify-center p-[0.3125rem] gap-1 rounded-full px-2 bg-accent"
          >
            <Icons name="snow-small" :size="10" />
            <span class="text-[0.625rem] font-bold">{{ user.snow }}</span>
          </div>
          <div
            class="flex items-center justify-center p-[0.3125rem] gap-px rounded-full px-2 bg-primary"
          >
            <Icons name="ton" :size="12" />
            <span class="text-[0.625rem] font-bold">{{ user.ton }}</span>
          </div>
        </div>
      </div>
      <div
        class="rounded-xl flex flex-col items-center relative h-[90%] bg-linear-to-b w-26.75 from-[#FFCC00] to-[#FFCC00]/0 pb-[11px] px-3.5"
      >
        <div class="z-10 relative bottom-7 size-[4.375rem]">
          <img
            src="@/assets/images/leaders/first-ava.png"
            alt=""
            class="object-cover w-full h-full border-3 z-100 border-[#EBC945] rounded-full bg-[#C49E05]"
          />

          <img
            src="@/assets/images/leaders/first.svg"
            alt=""
            class="absolute bottom-6 size-20 z-[-1] right-0"
          />
        </div>
        <div class="relative bottom-6.5 space-y-1">
          <p class="text-sm font-medium">Ivan Ivanov</p>
          <div
            class="flex items-center justify-center p-[0.3125rem] gap-1 rounded-full px-2 bg-accent"
          >
            <Icons name="snow-small" :size="10" />
            <span class="text-[0.625rem] font-bold">{{ user.snow }}</span>
          </div>
          <div
            class="flex items-center justify-center p-[0.3125rem] gap-px rounded-full px-2 bg-primary"
          >
            <Icons name="ton" :size="12" />
            <span class="text-[0.625rem] font-bold">{{ user.ton }}</span>
          </div>
        </div>
      </div>
      <div
        class="rounded-xl flex flex-col items-center relative h-[90%] bg-linear-to-b w-26.75 from-[#AF7A63] to-[#AF7A63]/0 pb-[11px] px-3.5"
      >
        <img
          src="@/assets/images/leaders/third.svg"
          alt=""
          class="absolute bottom-38 w-full right-0"
        />
        <div class="z-10 relative bottom-7 size-[4.375rem]">
          <img
            src="@/assets/images/leaders/third-ava.png"
            alt=""
            class="object-cover w-full h-full border-3 z-100 border-[#AF7A63] rounded-full bg-[#553C31]"
          />
        </div>
        <div class="relative bottom-6.5 space-y-1">
          <p class="text-sm font-medium">Ivan Ivanov</p>
          <div
            class="flex items-center justify-center p-[0.3125rem] gap-1 rounded-full px-2 bg-accent"
          >
            <Icons name="snow-small" :size="10" />
            <span class="text-[0.625rem] font-bold">{{ user.snow }}</span>
          </div>
          <div
            class="flex items-center justify-center p-[0.3125rem] gap-px rounded-full px-2 bg-primary"
          >
            <Icons name="ton" :size="12" />
            <span class="text-[0.625rem] font-bold">{{ user.ton }}</span>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-2xl text-center font-bold uppercase">Топ пользователей</h2>
    <div class="flex flex-col items-stretch w-full space-y-1.25">
      <div
        v-for="leader in leaders"
        :key="leader.id"
        class="bg-linear-to-r w-full z-1 from-[#262626]/70 to-[#262626]/0 rounded-xl p-[0.3125rem] w-full flex gap-2 items-center"
      >
        <span class="size-8 flex items-center justify-center font-bold leading-7">
          {{ leader.rank }}
        </span>
        <img :src="leader.avatar" alt="leader" class="size-10.5 object-cover shrink-0 rounded-lg" />
        <span class="text-[0.8125rem] font-medium flex-1 truncate">
          {{ leader.isSelf ? '(ВЫ) ' : '' }}{{ leader.name }}
        </span>
        <div class="flex items-center p-[0.3125rem] gap-1 rounded-full px-2 bg-accent">
          <Icons name="snow-small" :size="10" />
          <span class="text-[0.625rem] font-bold">{{ leader.snow }}</span>
        </div>
        <div class="flex items-center p-[0.3125rem] gap-px rounded-full px-2 bg-primary">
          <Icons name="ton" :size="12" />
          <span class="text-[0.625rem] font-bold">{{ leader.ton }}</span>
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
</style>
