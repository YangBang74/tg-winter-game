<script setup lang="ts">
import { useFriends } from './model/useFriends'
import FriendLevelCard from './ui/FriendLevelCard.vue'
import ReferralLinkBlock from './ui/ReferralLinkBlock.vue'
import ReferralTabs from './ui/ReferralTabs.vue'
import ReferralItem from './ui/ReferralItem.vue'

const {
  firstLevel,
  friendLevels,
  referralTabs,
  currentReferrals,
  switchTab,
  copyReferralLink,
  inviteFriend,
} = useFriends()
</script>

<template>
  <section class="p-4 text-white space-y-2.5">
    <h1 class="text-2xl text-center font-bold uppercase">Друзья</h1>

    <FriendLevelCard :level="firstLevel" is-main />

    <div class="grid grid-cols-2 gap-2.5">
      <FriendLevelCard
        v-for="friendLevel in friendLevels"
        :key="friendLevel.level"
        :level="friendLevel"
      />
    </div>

    <ReferralLinkBlock @copy-link="copyReferralLink" @invite="inviteFriend" />

    <h2 class="text-2xl text-center font-bold uppercase">Рефералы</h2>

    <ReferralTabs :tabs="referralTabs" @switch="switchTab" />

    <div class="space-y-2.5">
      <ReferralItem
        v-for="referral in currentReferrals"
        :key="referral.name + referral.avatar"
        :referral="referral"
      />
    </div>

    <div
      v-if="currentReferrals.length === 0"
      class="bg-white/70 text-[#484C52] text-center rounded-xl p-1.5 py-5 gap-3"
    >
      <p class="font-medium text-sm">Пока нет рефералов для этого уровня</p>
    </div>
  </section>
</template>
