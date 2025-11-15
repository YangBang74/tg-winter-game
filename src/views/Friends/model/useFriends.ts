import { ref, computed } from 'vue'
import type { FriendLevel, ReferralTab, Referral } from './types'

export function useFriends() {
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

  const copyReferralLink = async () => {
    const link = 'https://t.me...ym64k4d84bbl'
    try {
      await navigator.clipboard.writeText(link)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const inviteFriend = () => {
    console.log('Invite friend')
  }

  return {
    firstLevel,
    friendLevels,
    referralTabs,
    currentReferrals,
    switchTab,
    copyReferralLink,
    inviteFriend,
  }
}

