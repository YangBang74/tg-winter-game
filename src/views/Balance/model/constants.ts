import tonIcon from '@/assets/images/coins/ton.png'
import tgStarIcon from '@/assets/images/coins/tg-star.png'
import usdtIcon from '@/assets/images/coins/usdt.png'
import solanaIcon from '@/assets/images/coins/solana.png'
import bnbIcon from '@/assets/images/coins/bnb.png'
import ethIcon from '@/assets/images/coins/eth.png'
import tronIcon from '@/assets/images/coins/tron.png'
import liteIcon from '@/assets/images/coins/lite.png'

import type { Coin, PaymentMethod } from './types'

export const INITIAL_COINS: Coin[] = [
  {
    name: 'Snow',
    amount: 12.12314124,
    usd: '12.12',
    icon: 'snow-small',
  },
  {
    name: 'Ton',
    amount: 12.12314124,
    usd: '12.12',
    icon: 'ton',
  },
  {
    name: 'Stars',
    amount: 12.12314124,
    usd: '12.12',
    icon: 'star',
  },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'ton',
    name: 'TON',
    icon: tonIcon,
    minAmount: '0.01',
  },
  {
    id: 'telegram-stars',
    name: 'Telegram Stars',
    icon: tgStarIcon,
    minAmount: '50',
  },
  {
    id: 'usdt',
    name: 'USDT',
    icon: usdtIcon,
    minAmount: '1',
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: solanaIcon,
    minAmount: '0.004',
  },
  {
    id: 'bnb',
    name: 'BNB',
    icon: bnbIcon,
    minAmount: '0.001',
  },
  {
    id: 'eth',
    name: 'ETH',
    icon: ethIcon,
    minAmount: '0.012',
  },
  {
    id: 'tron',
    name: 'Tron TRX',
    icon: tronIcon,
    minAmount: '10',
  },
  {
    id: 'litecoin',
    name: 'LiteCoin',
    icon: liteIcon,
    minAmount: '0.002',
  },
]

export const COIN_BG_COLORS: Record<string, string> = {
  snow: '#A79EFF',
  ton: '#0095EF',
  stars: '#EB8700',
}

export const CRYPTO_NETWORKS: Record<string, string> = {
  usdt: 'BEP20, ETH, POLYGON',
  bnb: 'BEP20, ETH, POLYGON',
  eth: 'ETH, POLYGON',
  solana: 'SOL',
  tron: 'TRC20',
  litecoin: 'LTC',
}

export const EXCHANGE_RATE = 1000

export const TRANSACTION_STYLES = {
  withdraw: {
    iconColor: '#A4DD9E',
    iconBg: '#A4DD9E/20',
    iconName: 'check',
  },
  deposit: {
    iconColor: '#0095EF',
    iconBg: '#0095EF/10',
    iconName: 'deposit',
  },
  reward: {
    iconColor: '#F67F2A',
    iconBg: '#F67F2A/10',
    iconName: 'gift',
  },
} as const
