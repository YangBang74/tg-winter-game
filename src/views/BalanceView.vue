<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import tonIcon from '@/assets/images/coins/ton.png'
import tgStarIcon from '@/assets/images/coins/tg-star.png'
import usdtIcon from '@/assets/images/coins/usdt.png'
import solanaIcon from '@/assets/images/coins/solana.png'
import bnbIcon from '@/assets/images/coins/bnb.png'
import ethIcon from '@/assets/images/coins/eth.png'
import tronIcon from '@/assets/images/coins/tron.png'
import liteIcon from '@/assets/images/coins/lite.png'

type Coin = {
  name: string
  amount: number
  usd: string
  icon: string
}

interface BalanceTab {
  id: string
  label: string
  isActive: boolean
}

interface PaymentMethod {
  id: string
  name: string
  icon: string
  minAmount: string
}

interface Transaction {
  id: string
  type: 'deposit' | 'withdraw' | 'reward'
  title: string
  date: string
  amount: string
}

const coins: Coin[] = [
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

const balanceTabs = ref<BalanceTab[]>([
  {
    id: 'deposit',
    label: 'Пополнение',
    isActive: true,
  },
  {
    id: 'withdraw',
    label: 'Вывод',
    isActive: false,
  },
])

const paymentMethods: PaymentMethod[] = [
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

const selectedPaymentMethod = ref<string>('ton')
const amount = ref('')
const depositAddress = ref('0x5b2C82a36367032c4A7BDDCA14058625..')
const memo = ref('')

const depositTransactions = ref<Transaction[]>([
  {
    id: '1',
    type: 'withdraw',
    title: 'Вывод баланса',
    date: '12.12.2025',
    amount: '-0.123123',
  },
  {
    id: '2',
    type: 'deposit',
    title: 'Депозит',
    date: '12.12.2025',
    amount: '+100',
  },
  {
    id: '3',
    type: 'reward',
    title: 'Награда',
    date: '12.12.2025',
    amount: '+1',
  },
])

const withdrawTransactions = ref<Transaction[]>([])

const parseColorWithOpacity = (colorWithOpacity: string): string => {
  const [color, opacity] = colorWithOpacity.split('/')
  if (!opacity || !color) return color || '#000000'

  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const alpha = parseInt(opacity) / 100

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getTransactionStyle = (type: Transaction['type']) => {
  const styles = {
    withdraw: {
      iconColor: '#A4DD9E',
      iconBg: '#A4DD9E/20',
      iconName: 'check',
    },
    deposit: {
      iconColor: '#0095EF',
      iconBg: '#0095EF/20',
      iconName: 'deposit',
    },
    reward: {
      iconColor: '#F67F2A',
      iconBg: '#F67F2A/20',
      iconName: 'gift',
    },
  }

  return styles[type] || styles.withdraw
}

const activeTab = computed(() => {
  return balanceTabs.value.find((tab) => tab.isActive)?.id || 'deposit'
})

const currentTransactions = computed(() => {
  const transactions =
    activeTab.value === 'deposit' ? depositTransactions.value : withdrawTransactions.value
  return transactions.map((transaction) => ({
    ...transaction,
    style: getTransactionStyle(transaction.type),
  }))
})

const currentPaymentMethod = computed(() => {
  return paymentMethods.find((m) => m.id === selectedPaymentMethod.value) ?? paymentMethods[0]
})

const currentMinAmount = computed(() => currentPaymentMethod.value?.minAmount ?? '0.01')

const currentMethodName = computed(() => currentPaymentMethod.value?.name ?? 'TON')

const isTonSelected = computed(() => selectedPaymentMethod.value === 'ton')

const isTelegramStarsSelected = computed(() => selectedPaymentMethod.value === 'telegram-stars')

const isCryptoSelected = computed(() => !isTonSelected.value && !isTelegramStarsSelected.value)

const receivedTon = computed(() => {
  const starsAmount = parseFloat(amount.value) || 0
  const exchangeRate = 1000
  return (starsAmount / exchangeRate).toFixed(4)
})

const cryptoNetworks = computed(() => {
  const networks: Record<string, string> = {
    usdt: 'BEP20, ETH, POLYGON',
    bnb: 'BEP20, ETH, POLYGON',
    eth: 'ETH, POLYGON',
    solana: 'SOL',
    tron: 'TRC20',
    litecoin: 'LTC',
  }
  return networks[selectedPaymentMethod.value] || 'BEP20, ETH, POLYGON'
})

const switchTab = (tabId: string) => {
  balanceTabs.value.forEach((tab) => {
    tab.isActive = tab.id === tabId
  })
}

const selectPaymentMethod = (methodId: string) => {
  selectedPaymentMethod.value = methodId
}

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(depositAddress.value)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const handleDeposit = () => {
  console.log('Deposit:', {
    method: selectedPaymentMethod.value,
    amount: amount.value,
    address: depositAddress.value,
    memo: memo.value,
  })
}

const getCoinBgColor = (coinName: string): string => {
  const colors: Record<string, string> = {
    snow: '#A79EFF',
    ton: '#0095EF',
    stars: '#EB8700',
  }
  return colors[coinName.toLowerCase()] || '#01978b'
}
</script>

<template>
  <section class="p-4 text-white space-y-2.5">
    <h1 class="text-2xl text-center font-bold uppercase">Баланс</h1>
    <div
      v-for="coin in coins"
      :key="coin.name"
      class="coin-block rounded-2xl p-2 flex items-center gap-3"
      :style="{ backgroundColor: getCoinBgColor(coin.name) }"
    >
      <div
        class="text-[#484C52] bg-white flex items-center justify-center gap-1.5 w-20 py-3 rounded-full"
      >
        <Icons :name="coin.icon" :size="16" />
        <p class="font-bold text-[0.8125rem] uppercase">{{ coin.name }}</p>
      </div>
      <div>
        <p class="text-lg font-bold">{{ coin.amount }}</p>
        <p class="text-xs text-white/70 font-medium">{{ coin.usd }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2.5">
      <div
        v-for="tab in balanceTabs"
        :key="tab.id"
        class="relative rounded-full py-2.5 cursor-pointer transition-all border"
        :class="tab.isActive ? 'bg-[#023A35] border-[#023A35]' : 'border-white'"
        @click="switchTab(tab.id)"
      >
        <h3 class="text-sm font-bold text-center">{{ tab.label }}</h3>
      </div>
    </div>

    <div
      v-if="activeTab === 'deposit'"
      class="space-y-2.5 bg-white text-[#484C52] rounded-2xl p-2.5"
    >
      <h2 class="text-lg text-center font-bold">Пополнить баланс</h2>

      <div class="space-y-2">
        <p class="text-xs font-medium text-black">Выберите способ</p>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            class="rounded-xl p-2.5 flex flex-col items-center gap-1.5 transition-all"
            :class="selectedPaymentMethod === method.id ? 'bg-[#0095EF]' : 'bg-[#F7F7F7]'"
            @click="selectPaymentMethod(method.id)"
          >
            <img :src="method.icon" :alt="method.name" class="w-6 h-6" />
            <p
              class="text-xs font-medium text-center"
              :class="selectedPaymentMethod === method.id ? 'text-white' : 'text-black'"
            >
              {{ method.name }}
            </p>
            <p
              class="text-[0.625rem]"
              :class="selectedPaymentMethod === method.id ? 'text-white/50' : 'text-black/50'"
            >
              от {{ method.minAmount }}
            </p>
          </button>
        </div>
      </div>

      <div v-if="isTonSelected" class="space-y-2.5">
        <div class="space-y-2">
          <label class="text-xs font-medium text-black">Количество</label>
          <input
            v-model="amount"
            type="number"
            placeholder="Введите количество"
            class="w-full bg-white/10 border border-[#484C52]/10 rounded-full px-4 py-3 focus:outline-none"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-medium text-black">Адрес пополнения</label>
          <div class="flex items-center relative gap-2">
            <input
              v-model="depositAddress"
              type="text"
              readonly
              class="w-full pr-12 truncate bg-white/10 border border-[#484C52]/10 rounded-full px-4 py-3 focus:outline-none"
            />
            <button @click="copyAddress" class="absolute right-1 p-3">
              <Icons name="copy" :size="20" class="text-white" />
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-medium text-black">Комментарий к переводу</label>
          <input
            v-model="memo"
            type="text"
            placeholder="Введите МЕМО"
            class="w-full bg-white/10 border border-[#484C52]/10 rounded-full px-4 py-3 focus:outline-none"
          />
        </div>

        <button
          @click="handleDeposit"
          class="w-full bg-[#0095EF] rounded-full py-3 px-4 flex items-center justify-center gap-2.5 hover:bg-[#0085DF] transition-colors"
        >
          <Icons name="wallet" :size="20" class="text-white" />
          <span class="font-bold text-white">Пополнить баланс</span>
        </button>

        <p class="text-xs text-[#484C52]/70">
          Мин. сумма для ввода -
          <span class="text-[#0095EF]">{{ currentMinAmount }} {{ currentMethodName }}</span>
        </p>
      </div>

      <div v-if="isTelegramStarsSelected" class="space-y-2.5">
        <h2 class="text-xs font-medium text-black">TON за звёзды</h2>

        <div class="space-y-2">
          <input
            v-model="amount"
            type="number"
            placeholder="Введите количество"
            class="w-full bg-white border border-[#484C52]/10 rounded-full px-4 py-3 text-black placeholder:text-[#484C52]/50 focus:outline-none"
          />
        </div>

        <button
          @click="handleDeposit"
          class="w-full bg-[#0095EF] rounded-full py-3 px-4 flex items-center justify-center gap-2.5 hover:bg-[#0085DF] transition-colors"
        >
          <Icons name="star" :size="20" class="text-white" />
          <span class="text-sm font-bold text-white">Купить TON за звёзды</span>
        </button>

        <p class="text-xs text-[#484C52]/70">
          Вы получите -
          <span class="text-[#0095EF]">{{ receivedTon }} TON</span>
        </p>
      </div>

      <div v-if="isCryptoSelected" class="space-y-2.5">
        <p class="text-xs font-medium text-black">{{ cryptoNetworks }}</p>

        <div class="space-y-2">
          <div class="flex items-center relative gap-2">
            <input
              v-model="depositAddress"
              type="text"
              readonly
              class="w-full pr-12 truncate bg-[#F7F7F7] border border-[#484C52]/10 rounded-full px-4 py-3 text-black focus:outline-none"
            />
            <button @click="copyAddress" class="absolute right-1 p-3">
              <Icons name="copy" :size="20" class="text-[#484C52]" />
            </button>
          </div>
        </div>

        <p class="text-xs text-[#484C52]/70">
          Минимальный депозит -
          <span class="text-[#0095EF]">{{ currentMinAmount }} {{ currentMethodName }}</span>
        </p>

        <p class="text-xs text-[#484C52]">
          * Все переведённые токены будут конвертированы в TON по актуальному курсу.
        </p>
      </div>
    </div>

    <div
      v-if="activeTab === 'deposit' || activeTab === 'withdraw'"
      class="bg-white text-[#484C52] rounded-2xl p-4"
    >
      <h2 class="text-lg font-bold text-center mb-4">История транзакций</h2>

      <div v-if="currentTransactions.length > 0" class="space-y-3">
        <template v-for="transaction in currentTransactions" :key="transaction.id">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              :style="{ backgroundColor: parseColorWithOpacity(transaction.style.iconBg) }"
            >
              <Icons
                :name="transaction.style.iconName"
                :size="20"
                :style="{ color: transaction.style.iconColor }"
              />
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-black">{{ transaction.title }}</p>
              <p class="text-xs text-[#484C52]/70">{{ transaction.date }}</p>
            </div>

            <div
              class="bg-[#0095EF] flex items-center text-white justify-center gap-1 rounded-full px-3 py-1 shrink-0"
            >
              <Icons name="ton" :size="16" />
              <p class="text-xs font-medium">{{ transaction.amount }}</p>
            </div>
          </div>
        </template>
      </div>

      <div v-else class="text-center py-4">
        <p class="text-xs text-[#484C52]">На данный момент нет истории транзакций</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.coin-block {
  background: url('@/assets/images/balance/coin-block.png') no-repeat right center;
  background-size: cover;
}
</style>
