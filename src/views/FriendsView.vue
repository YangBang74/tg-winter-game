<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from '@/components/shared/Icons.vue'

interface FriendLevel {
  level: number
  description: string
  count: number
}

const firstLevel: FriendLevel = {
  level: 1,
  description: '+6 SNOW \\ за друга',
  count: 0,
}

const friendLevels: FriendLevel[] = [
  {
    level: 2,
    description: '*рефы твоего друга',
    count: 0,
  },
  {
    level: 3,
    description: '*рефы 2-ого уровня',
    count: 0,
  },
]

interface ReferralTab {
  level: number
  amount: string
  isActive: boolean
}

interface Referral {
  avatar: string
  name: string
  snow: number
  ton: number
}

const referralTabs = ref<ReferralTab[]>([
  {
    level: 1,
    amount: '10.1K',
    isActive: true,
  },
  {
    level: 2,
    amount: '0',
    isActive: false,
  },
  {
    level: 3,
    amount: '0',
    isActive: false,
  },
])

const referralsLevel1 = ref<Referral[]>([
  {
    avatar:
      'https://avatars.mds.yandex.net/i?id=1ce9c44ed31ebf63e165bccdf43c974e03d3a51a-4723319-images-thumbs&n=13',
    name: 'MefLop',
    snow: 100,
    ton: 0.1,
  },
  {
    avatar:
      'https://avatars.mds.yandex.net/i?id=1ce9c44ed31ebf63e165bccdf43c974e03d3a51a-4723319-images-thumbs&n=13',
    name: 'MefLop',
    snow: 100,
    ton: 0.1,
  },
])

const referralsLevel2 = ref<Referral[]>([])
const referralsLevel3 = ref<Referral[]>([])

const currentReferrals = computed(() => {
  const activeTab = referralTabs.value.find((tab) => tab.isActive)
  if (!activeTab) return referralsLevel1.value

  switch (activeTab.level) {
    case 1:
      return referralsLevel1.value
    case 2:
      return referralsLevel2.value
    case 3:
      return referralsLevel3.value
    default:
      return referralsLevel1.value
  }
})

const switchTab = (level: number) => {
  referralTabs.value.forEach((tab) => {
    tab.isActive = tab.level === level
  })
}
</script>

<template>
  <section class="p-4 text-white space-y-2.5">
    <h1 class="text-2xl text-center font-bold uppercase">Друзья</h1>
    <div
      class="main-block py-[0.9375rem] px-[0.8125rem] rounded-2xl pb-8 flex items-start justify-start gap-2.5"
    >
      <div class="space-y-1">
        <h2 class="text-[1.75rem] font-bold uppercase leading-none">
          {{ firstLevel.level }} уровень
        </h2>
        <p class="text-sm font-medium text-[#A79EFF]">{{ firstLevel.description }}</p>
      </div>
      <div
        class="flex items-center mt-px w-16 rounded-full bg-white/27 justify-center h-[1.375rem] gap-1"
      >
        <Icons name="user" />
        <span class="text-[0.625rem] font-bold">{{ firstLevel.count }}</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2.5">
      <div
        v-for="friendLevel in friendLevels"
        :key="friendLevel.level"
        class="sub-block py-[0.9375rem] gap-1 flex flex-col items-center justify-start px-[0.8125rem] rounded-2xl"
      >
        <div
          class="flex items-center mt-px w-16 rounded-full bg-white/27 justify-center h-[1.375rem] gap-1"
        >
          <Icons name="user" />
          <span class="text-[0.625rem] font-bold">{{ friendLevel.count }}</span>
        </div>
        <h3 class="text-lg font-bold uppercase">{{ friendLevel.level }} уровень</h3>
        <p class="text-xs font-medium text-white/50">{{ friendLevel.description }}</p>
      </div>
    </div>
    <div class="referral-block py-4 px-[0.8125rem] rounded-2xl text-center">
      <h4 class="text-[1.25rem] font-bold uppercase">ваша реферальная ссылка!</h4>
      <p class="">Приглашай друзей прямо сейчас</p>
      <div
        class="bg-[#8981DD] my-2 rounded-full w-full gap-2.5 py-2 flex items-center justify-between px-2.5"
      >
        <p>https://t.me...ym64k4d84bbl</p>
        <button>
          <Icons name="copy" :size="20" />
        </button>
      </div>
      <button
        class="bg-primary rounded-full w-full py-2 gap-2.5 flex items-center justify-center px-2.5"
      >
        <Icons name="user" :size="16" />
        <p class="font-bold">Пригласить друга</p>
      </button>
    </div>
    <h2 class="text-2xl text-center font-bold uppercase">Рефералы</h2>
    <div class="grid grid-cols-3 gap-2.5">
      <div
        v-for="tab in referralTabs"
        :key="tab.level"
        class="relative rounded-full py-2.5 cursor-pointer transition-all border"
        :class="tab.isActive ? 'bg-[#023A35] border-[#023A35]' : '  border-white'"
        @click="switchTab(tab.level)"
      >
        <div
          class="absolute -top-3 right-1 bg-[#4A90E2] rounded-full px-2 py-0.5 flex items-center gap-1"
        >
          <Icons name="ton" :size="12" class="text-white" />
          <span class="text-xs font-bold text-white">+{{ tab.amount }}</span>
        </div>
        <h3 class="text-sm font-medium text-center">{{ tab.level }} уровень</h3>
      </div>
    </div>
    <div class="space-y-2.5">
      <div
        v-for="referral in currentReferrals"
        :key="referral.name + referral.avatar"
        class="bg-white/70 rounded-xl p-1.5 flex items-center gap-3"
      >
        <img
          :src="referral.avatar"
          :alt="referral.name"
          class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-[#484C52] white/80 truncate">{{ referral.name }}</p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="bg-[#A79EFF] rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <Icons name="snow-small" :size="12" class="text-white" />
            <span class="text-xs font-bold text-white">+{{ referral.snow }}</span>
          </div>
          <div class="bg-[#4A90E2] rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <Icons name="ton" :size="12" class="text-white" />
            <span class="text-xs font-bold text-white">+{{ referral.ton }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="currentReferrals.length === 0"
      class="bg-white/70 text-[#484C52] text-center rounded-xl p-1.5 py-5 gap-3"
    >
      <p class="font-medium text-sm">Пока нет рефералов для этого уровня</p>
    </div>
  </section>
</template>
<style scoped>
.main-block {
  background-image: url('@/assets/images/friends/main-block.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.sub-block {
  background-image: url('@/assets/images/friends/sub-block.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.referral-block {
  background-image: url('@/assets/images/friends/referral-block.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
