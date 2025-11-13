import birthdayCard from '@/assets/images/roulette/birthday-card.png'
import firstCard from '@/assets/images/roulette/first-card.png'
import froggyCard from '@/assets/images/roulette/froggy-card.png'
import halloweenCard from '@/assets/images/roulette/halloween-card.png'
import newYearCard from '@/assets/images/roulette/newyear-card.png'
import partyCard from '@/assets/images/roulette/party-card.png'

export type RouletteCardType = 'free' | 'hot'

export type RouletteCard = {
  id: string
  image: string
  title: string
  price: number
  type: RouletteCardType
  background?: string
}

export const rouletteCards: RouletteCard[] = [
  {
    id: 'starter-pack',
    image: firstCard,
    title: 'Название кейса',
    price: 0,
    type: 'free',
    background: '#FFFFFFB3',
  },
  {
    id: 'halloween',
    image: halloweenCard,
    title: 'Хэллоуин',
    price: 2.5,
    type: 'hot',
    background: '#A4DD9E',
  },
  {
    id: 'new-year-2026',
    image: newYearCard,
    title: 'New Year 2026',
    price: 0.5,
    type: 'hot',
    background: '#F7D33E',
  },
  {
    id: 'birthday',
    image: birthdayCard,
    title: 'Название кейса',
    price: 0,
    type: 'free',
    background: '#FFFFFFB3',
  },
  {
    id: 'froggy',
    image: froggyCard,
    title: 'Froggy',
    price: 0,
    type: 'free',
    background: '#FFFFFFB3',
  },
  {
    id: 'party',
    image: partyCard,
    title: 'Party',
    price: 0,
    type: 'free',
    background: '#FFFFFFB3',
  },
]

export function getRouletteCardById(id: string) {
  return rouletteCards.find((card) => card.id === id)
}
