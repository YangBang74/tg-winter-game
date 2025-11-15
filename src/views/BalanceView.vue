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

const activeTab = computed(() => {
  return balanceTabs.value.find((tab) => tab.isActive)?.id || 'deposit'
})

const currentMinAmount = computed(() => {
  const method = paymentMethods.find((m) => m.id === selectedPaymentMethod.value)
  return method?.minAmount || '0.01'
})

const currentMethodName = computed(() => {
  const method = paymentMethods.find((m) => m.id === selectedPaymentMethod.value)
  return method?.name || 'TON'
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
    // Можно добавить уведомление об успешном копировании
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const handleDeposit = () => {
  // Логика пополнения баланса
  console.log('Deposit:', {
    method: selectedPaymentMethod.value,
    amount: amount.value,
    address: depositAddress.value,
    memo: memo.value,
  })
}

const getCoinBgColor = (coinName: string): string => {
  switch (coinName.toLowerCase()) {
    case 'snow':
      return '#A79EFF'
    case 'ton':
      return '#0095EF'
    case 'stars':
      return '#EB8700'
    default:
      return '#01978b'
  }
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
      <div class="">
        <p class="text-lg font-bold">
          {{ coin.amount }}
        </p>
        <p class="text-xs text-white/70 font-medium">
          {{ coin.usd }}
        </p>
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

    <!-- Блок пополнения -->
    <div
      v-if="activeTab === 'deposit'"
      class="space-y-2.5 bg-white text-[#484C52] rounded-2xl p-2.5"
    >
      <h2 class="text-lg text-center font-bold">Пополнить баланс</h2>

      <!-- Выбор способа оплаты -->
      <div class="space-y-2">
        <p class="text-xs font-medium text-black">Выберите способ</p>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            class="rounded-xl p-2.5 flex flex-col items-center gap-1.5 transition-all"
            :class="selectedPaymentMethod === method.id ? 'bg-[#0095EF]' : 'bg-white/70'"
            @click="selectPaymentMethod(method.id)"
          >
            <img :src="method.icon" :alt="method.name" class="w-6 h-6" />
            <p class="text-xs font-medium text-center">{{ method.name }}</p>
            <p class="text-[0.625rem] text-white/70">от {{ method.minAmount }}</p>
          </button>
        </div>
      </div>

      <!-- Количество -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-white/80">Количество</label>
        <input
          v-model="amount"
          type="number"
          placeholder="Введите количество"
          class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[#0095EF]"
        />
      </div>

      <!-- Адрес пополнения -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-white/80">Адрес пополнения</label>
        <div class="flex items-center gap-2">
          <input
            v-model="depositAddress"
            type="text"
            readonly
            class="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[#0095EF]"
          />
          <button
            @click="copyAddress"
            class="bg-white/10 border border-white/20 rounded-xl p-3 hover:bg-white/20 transition-colors"
          >
            <Icons name="copy" :size="20" class="text-white" />
          </button>
        </div>
      </div>

      <!-- Комментарий к переводу -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-white/80">Комментарий к переводу</label>
        <input
          v-model="memo"
          type="text"
          placeholder="Введите МЕМО"
          class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[#0095EF]"
        />
      </div>

      <!-- Кнопка пополнения -->
      <button
        @click="handleDeposit"
        class="w-full bg-[#0095EF] rounded-full py-3 px-4 flex items-center justify-center gap-2.5 hover:bg-[#0085DF] transition-colors"
      >
        <Icons name="wallet" :size="20" class="text-white" />
        <span class="font-bold text-white">Пополнить баланс</span>
      </button>

      <!-- Минимальная сумма -->
      <p class="text-xs text-white/70 text-center">
        Мин. сумма для ввода - {{ currentMinAmount }} {{ currentMethodName }}
      </p>
    </div>
  </section>
</template>
<style scoped>
.coin-block {
  background: url('@/assets/images/balance/coin-block.png') no-repeat right center;
  background-size: cover;
}
</style>
