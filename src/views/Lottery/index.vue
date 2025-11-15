<script setup lang="ts">
import { useLottery } from './model/useLottery'
import LotteryHeader from './ui/LotteryHeader.vue'
import PaymentSheet from './ui/PaymentSheet.vue'
import AccordionItem from './ui/AccordionItem.vue'

const {
  accordionItems,
  openedItemId,
  isPaymentOpen,
  quantity,
  minQuantity,
  maxQuantity,
  prizes,
  sparklePositions,
  toggleItem,
} = useLottery()
</script>

<template>
  <div class="p-4 text-white space-y-3">
    <LotteryHeader
      v-model:is-payment-open="isPaymentOpen"
      @open-payment="isPaymentOpen = true"
    >
      <template #payment-content>
        <PaymentSheet
          v-model:quantity="quantity"
          :min-quantity="minQuantity"
          :max-quantity="maxQuantity"
          :prizes="prizes"
          :sparkle-positions="sparklePositions"
        />
      </template>
    </LotteryHeader>

    <div class="space-y-3 mt-6">
      <AccordionItem
        v-for="item in accordionItems"
        :key="item.id"
        :item="item"
        :is-open="openedItemId === item.id"
        @toggle="toggleItem(item.id)"
      />
    </div>
  </div>
</template>

