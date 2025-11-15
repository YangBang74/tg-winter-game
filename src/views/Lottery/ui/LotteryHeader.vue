<script setup lang="ts">
import Sheet from '@/components/shared/Sheet.vue'

interface Props {
  isPaymentOpen: boolean
}

interface Emits {
  (e: 'update:isPaymentOpen', value: boolean): void
  (e: 'open-payment'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div
    class="gift-box p-8 rounded-2xl space-y-2 min-h-120 text-center flex flex-col items-center"
  >
    <h1 class="font-bold text-5xl">ЛОТЕРЕЯ</h1>
    <p class="font-medium leading-none">Принимай участие в лотереи и выигрывай призы</p>
    <Sheet :open="isPaymentOpen" @update:open="emit('update:isPaymentOpen', $event)">
      <template #trigger="{ open }">
        <button class="bg-primary py-2.5 px-6 rounded-full flex items-center gap-2" @click="open">
          <span class="font-bold">Принять участие</span>
        </button>
      </template>

      <template #default>
        <slot name="payment-content" />
      </template>
    </Sheet>
  </div>
</template>

<style scoped>
.gift-box {
  background: url('@/assets/images/lottery/gifts.png') no-repeat center center / cover;
}
</style>

