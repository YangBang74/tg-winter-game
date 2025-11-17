<script setup lang="ts">
import { computed, ref } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import PaymentMethodSelector from './PaymentMethodSelector.vue'
import { PAYMENT_METHODS } from '../model/constants'

interface Props {
  selectedPaymentMethod: string
  amount: string
  depositAddress: string
  memo: string
  isTonSelected: boolean
  isTelegramStarsSelected: boolean
  isCryptoSelected: boolean
  receivedTon: string
  cryptoNetworks: string
  currentMinAmount: string
  currentMethodName: string
}

interface Emits {
  (e: 'update:selectedPaymentMethod', value: string): void
  (e: 'update:amount', value: string): void
  (e: 'update:depositAddress', value: string): void
  (e: 'update:memo', value: string): void
  (e: 'copy-address'): void
  (e: 'deposit'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isCopied = ref(false)

const handleSelectMethod = (methodId: string) => {
  emit('update:selectedPaymentMethod', methodId)
}

const handleCopy = () => {
  emit('copy-address')
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 3000)
}

const handleAmountUpdate = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:amount', target.value)
}

const handleAddressUpdate = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:depositAddress', target.value)
}

const handleMemoUpdate = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:memo', target.value)
}
</script>

<template>
  <div class="space-y-2.5 bg-white text-[#484C52] rounded-2xl p-2.5">
    <h2 class="text-lg text-center font-bold">Пополнить баланс</h2>

    <PaymentMethodSelector
      :methods="PAYMENT_METHODS"
      :selected-id="selectedPaymentMethod"
      @select="handleSelectMethod"
    />

    <div v-if="isTonSelected" class="space-y-2.5">
      <div class="space-y-2">
        <label class="text-xs font-medium text-black">Количество</label>
        <input
          :value="amount"
          type="number"
          placeholder="Введите количество"
          class="w-full bg-white/10 border border-[#484C52]/10 rounded-full px-4 py-3 focus:outline-none"
          @input="handleAmountUpdate"
        />
      </div>

      <div class="space-y-2">
        <label class="text-xs font-medium text-black">Адрес пополнения</label>
        <div class="flex items-center relative gap-2">
          <input
            :value="depositAddress"
            type="text"
            readonly
            class="w-full pr-12 truncate bg-white/10 border border-[#484C52]/10 rounded-full px-4 py-3 focus:outline-none"
            @input="handleAddressUpdate"
          />
          <button @click="handleCopy" class="absolute right-1 p-3">
            <Icons :name="isCopied ? 'check' : 'copy'" :size="isCopied ? 16 : 20" class="text-[#484C52]" />
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-medium text-black">Комментарий к переводу</label>
        <input
          :value="memo"
          type="text"
          placeholder="Введите МЕМО"
          class="w-full bg-white/10 border border-[#484C52]/10 rounded-full px-4 py-3 focus:outline-none"
          @input="handleMemoUpdate"
        />
      </div>

      <button
        @click="emit('deposit')"
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
          :value="amount"
          type="number"
          placeholder="Введите количество"
          class="w-full bg-white border border-[#484C52]/10 rounded-full px-4 py-3 text-black placeholder:text-[#484C52]/50 focus:outline-none"
          @input="handleAmountUpdate"
        />
      </div>

      <button
        @click="emit('deposit')"
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
            :value="depositAddress"
            type="text"
            readonly
            class="w-full pr-12 truncate bg-[#F7F7F7] border border-[#484C52]/10 rounded-full px-4 py-3 text-black focus:outline-none"
            @input="handleAddressUpdate"
          />
          <button @click="handleCopy" class="absolute right-1 p-3">
            <Icons :name="isCopied ? 'check' : 'copy'" :size="isCopied ? 16 : 20" class="text-[#484C52]" />
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
</template>

