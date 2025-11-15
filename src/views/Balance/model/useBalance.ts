import { ref, computed } from 'vue'
import type { BalanceTab, Transaction, TransactionStyle } from './types'
import {
  PAYMENT_METHODS,
  CRYPTO_NETWORKS,
  EXCHANGE_RATE,
  TRANSACTION_STYLES,
  COIN_BG_COLORS,
} from './constants'

export function useBalance() {
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

  const activeTab = computed(() => {
    return balanceTabs.value.find((tab) => tab.isActive)?.id || 'deposit'
  })

  const currentPaymentMethod = computed(() => {
    return PAYMENT_METHODS.find((m) => m.id === selectedPaymentMethod.value) ?? PAYMENT_METHODS[0]
  })

  const currentMinAmount = computed(() => currentPaymentMethod.value?.minAmount ?? '0.01')

  const currentMethodName = computed(() => currentPaymentMethod.value?.name ?? 'TON')

  const isTonSelected = computed(() => selectedPaymentMethod.value === 'ton')

  const isTelegramStarsSelected = computed(() => selectedPaymentMethod.value === 'telegram-stars')

  const isCryptoSelected = computed(() => !isTonSelected.value && !isTelegramStarsSelected.value)

  const receivedTon = computed(() => {
    const starsAmount = parseFloat(amount.value) || 0
    return (starsAmount / EXCHANGE_RATE).toFixed(4)
  })

  const cryptoNetworks = computed(() => {
    return CRYPTO_NETWORKS[selectedPaymentMethod.value] || 'BEP20, ETH, POLYGON'
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
    return COIN_BG_COLORS[coinName.toLowerCase()] || '#01978b'
  }

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

  const getTransactionStyle = (type: Transaction['type']): TransactionStyle => {
    return TRANSACTION_STYLES[type] || TRANSACTION_STYLES.withdraw
  }

  const currentTransactions = computed(() => {
    const transactions =
      activeTab.value === 'deposit' ? depositTransactions.value : withdrawTransactions.value
    return transactions.map((transaction) => ({
      ...transaction,
      style: getTransactionStyle(transaction.type),
    }))
  })

  return {
    balanceTabs,
    selectedPaymentMethod,
    amount,
    depositAddress,
    memo,
    depositTransactions,
    withdrawTransactions,
    activeTab,
    currentPaymentMethod,
    currentMinAmount,
    currentMethodName,
    isTonSelected,
    isTelegramStarsSelected,
    isCryptoSelected,
    receivedTon,
    cryptoNetworks,
    currentTransactions,
    switchTab,
    selectPaymentMethod,
    copyAddress,
    handleDeposit,
    getCoinBgColor,
    parseColorWithOpacity,
  }
}
