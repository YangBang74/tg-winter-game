<script setup lang="ts">
import type { PaymentMethod } from '../model/types'

interface Props {
  methods: PaymentMethod[]
  selectedId: string
}

interface Emits {
  (e: 'select', methodId: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSelect = (methodId: string) => {
  emit('select', methodId)
}
</script>

<template>
  <div class="space-y-2">
    <p class="text-xs font-medium text-black">Выберите способ</p>
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="method in methods"
        :key="method.id"
        class="rounded-xl p-2.5 flex flex-col items-center gap-1.5 transition-all"
        :class="selectedId === method.id ? 'bg-[#0095EF]' : 'bg-[#F7F7F7]'"
        @click="handleSelect(method.id)"
      >
        <img :src="method.icon" :alt="method.name" class="w-6 h-6" />
        <p
          class="text-xs font-medium text-center"
          :class="selectedId === method.id ? 'text-white' : 'text-black'"
        >
          {{ method.name }}
        </p>
        <p
          class="text-[0.625rem]"
          :class="selectedId === method.id ? 'text-white/50' : 'text-black/50'"
        >
          от {{ method.minAmount }}
        </p>
      </button>
    </div>
  </div>
</template>
