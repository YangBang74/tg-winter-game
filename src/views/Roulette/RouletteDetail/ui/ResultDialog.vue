<script setup lang="ts">
import Dialog from '@/components/shared/Dialog.vue'
import type { SpinnerResult } from '../model/types'

interface Props {
  selectedPresent: SpinnerResult | null
  open?: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
})
const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('update:open', false)
  emit('close')
}
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)" @close="handleClose">
    <div v-if="selectedPresent" class="space-y-4 text-center">
      <h3 class="font-raleway text-xl font-bold text-[#123552]">Поздравляем!</h3>
      <div class="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl bg-[#F3F7FF]">
        <img
          :src="selectedPresent.image"
          :alt="selectedPresent.title"
          class="h-24 w-24 object-contain"
        />
      </div>
      <div class="space-y-1">
        <p class="text-base font-bold text-[#484C52]">{{ selectedPresent.title }}</p>
        <p class="text-sm font-semibold text-[#2F9FF8]">{{ selectedPresent.price }} TON</p>
      </div>
      <button
        type="button"
        class="w-full rounded-full bg-[#2F9FF8] py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#1f8cdd]"
        @click="handleClose"
      >
        Забрать награду
      </button>
    </div>
    <div v-else class="text-center text-sm font-semibold text-[#484C52]">
      Результат не найден. Попробуйте снова.
    </div>
  </Dialog>
</template>

