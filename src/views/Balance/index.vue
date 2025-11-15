<script setup lang="ts">
import { useBalance } from './model/useBalance'
import { INITIAL_COINS } from './model/constants'
import CoinBlock from './ui/CoinBlock.vue'
import BalanceTabs from './ui/BalanceTabs.vue'
import DepositForm from './ui/DepositForm.vue'
import TransactionHistory from './ui/TransactionHistory.vue'

const {
  balanceTabs,
  selectedPaymentMethod,
  amount,
  depositAddress,
  memo,
  activeTab,
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
} = useBalance()
</script>

<template>
  <section class="p-4 text-white space-y-2.5">
    <h1 class="text-2xl text-center font-bold uppercase">Баланс</h1>

    <CoinBlock
      v-for="coin in INITIAL_COINS"
      :key="coin.name"
      :coin="coin"
      :bg-color="getCoinBgColor(coin.name)"
    />

    <BalanceTabs :tabs="balanceTabs" @switch="switchTab" />

    <DepositForm
      v-if="activeTab === 'deposit'"
      v-model:selected-payment-method="selectedPaymentMethod"
      v-model:amount="amount"
      v-model:deposit-address="depositAddress"
      v-model:memo="memo"
      :is-ton-selected="isTonSelected"
      :is-telegram-stars-selected="isTelegramStarsSelected"
      :is-crypto-selected="isCryptoSelected"
      :received-ton="receivedTon"
      :crypto-networks="cryptoNetworks"
      :current-min-amount="currentMinAmount"
      :current-method-name="currentMethodName"
      @copy-address="copyAddress"
      @deposit="handleDeposit"
    />

    <TransactionHistory
      v-if="activeTab === 'deposit' || activeTab === 'withdraw'"
      :transactions="currentTransactions"
      :parse-color-with-opacity="parseColorWithOpacity"
    />
  </section>
</template>
