<script setup lang="ts">
import Sheet from '@/components/shared/Sheet.vue'
import Icons from '@/components/shared/Icons.vue'
import { computed } from 'vue'

interface Props {
  open: boolean
  checkNumber: number
  failNumber: number
  time: number // время в секундах
  totalCost?: number // итоговая стоимость
  commission?: number // комиссия в процентах
}

const props = withDefaults(defineProps<Props>(), {
  totalCost: 50.8,
  commission: 15,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const formattedTime = computed(() => {
  const mins = Math.floor(props.time / 60)
  const secs = props.time % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const incomePercent = computed(() => {
  const total = props.checkNumber + props.failNumber
  if (total === 0) return 0
  return ((props.checkNumber / total) * 100).toFixed(2)
})

const finalAmount = computed(() => {
  const afterCommission = props.totalCost * (1 - props.commission / 100)
  return afterCommission.toFixed(2)
})

const onWithdraw = () => {
  // Логика вывода средств
  emit('update:open', false)
}
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <template #default>
      <div class="text-[#484C52]">
        <!-- Header -->
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold">Позиция завершена</h2>
        </div>

        <!-- Total Cost -->
        <div class="mb-2">
          <p class="text-xs text-gray-500 mb-1">Итоговая стоимость</p>
          <p class="text-2xl font-bold">${{ totalCost.toFixed(2) }}</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 gap-2.5 mb-2">
          <!-- Time Card -->
          <div class="bg-blue-50 rounded-lg p-2 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icons name="time" :size="20" class="text-blue-600" />
            </div>
            <div>
              <p class="text-lg font-bold">01:00</p>
              <p class="text-xs text-gray-500">Время</p>
            </div>
          </div>

          <!-- Income Card -->
          <div
            class="bg-linear-to-br from-pink-50 to-green-50 rounded-lg p-2 flex items-center gap-3"
          >
            <div
              class="w-10 h-10 aspect-square rounded-lg bg-white/50 flex items-center justify-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H21V21H3V3ZM5 5V19H19V5H5ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p class="text-lg font-bold">{{ incomePercent }}%</p>
              <p class="text-xs text-gray-500">Доход</p>
            </div>
          </div>

          <!-- Success Card -->
          <div class="bg-green-50 rounded-lg p-2 flex items-center gap-3">
            <div
              class="w-10 h-10 aspect-square rounded-lg bg-green-100 flex items-center justify-center"
            >
              <Icons name="check-strong" :size="20" class="text-green-600" />
            </div>
            <div>
              <p class="text-lg font-bold text-green-600">{{ checkNumber }}</p>
              <p class="text-xs text-gray-500">Успешных</p>
            </div>
          </div>

          <!-- Failures Card -->
          <div class="bg-pink-50 rounded-lg p-2 flex items-center gap-3">
            <div
              class="w-10 h-10 aspect-square rounded-lg bg-pink-100 flex items-center justify-center"
            >
              <Icons name="x-strong" :size="20" class="text-red-600" />
            </div>
            <div>
              <p class="text-lg font-bold text-red-600">{{ failNumber }}</p>
              <p class="text-xs text-gray-500">Промахов</p>
            </div>
          </div>
        </div>

        <!-- Final Amount After Commission -->
        <div class="mb-4">
          <p class="text-xs text-gray-500 mb-1">Итоговая стоимость после вычета комиссии</p>
          <div class="flex items-center justify-start gap-2">
            <p class="text-3xl font-bold text-blue-600">${{ finalAmount }}</p>
            <div class="bg-gray-100 rounded-full px-3 py-1">
              <p class="text-xs text-gray-500">Комиссия: {{ commission }}%</p>
            </div>
          </div>
        </div>

        <!-- Withdraw Button -->
        <button
          @click="onWithdraw"
          class="w-full bg-primary text-white rounded-lg py-4 px-6 flex items-center justify-center gap-2 font-bold text-lg"
        >
          <Icons name="wallet" />
          <span>Забрать ${{ finalAmount }}</span>
        </button>
      </div>
    </template>
  </Sheet>
</template>
