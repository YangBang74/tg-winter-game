<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { TransactionWithStyle } from '../model/types'

interface Props {
  transactions: TransactionWithStyle[]
  parseColorWithOpacity: (colorWithOpacity: string) => string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white text-[#484C52] rounded-2xl p-4">
    <h2 class="text-lg font-bold text-center mb-4">История транзакций</h2>

    <div v-if="transactions.length > 0" class="space-y-3">
      <template v-for="transaction in transactions" :key="transaction.id">
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
</template>

