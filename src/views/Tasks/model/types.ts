export type DailyRewardDayStatus = 'available' | 'locked' | 'opened'

export interface DailyRewardDay {
  id: number
  day: number
  reward: string
  status: DailyRewardDayStatus
  image: string
}

export interface DailyRewardGift {
  id: number
  title: string
  description: string
  image: string
  reward: string
}

