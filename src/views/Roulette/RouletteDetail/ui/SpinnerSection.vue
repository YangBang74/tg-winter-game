<script setup lang="ts">
import { ref, computed } from 'vue'
import RouletteSpinner from '@/components/roulette/RouletteSpinner.vue'

interface Props {
  items: any[]
}

interface Emits {
  (e: 'finished', item: any): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const spinnerRef = ref<InstanceType<typeof RouletteSpinner> | null>(null)

defineExpose({
  spin: () => spinnerRef.value?.spin(),
  get isSpinning() {
    return spinnerRef.value?.isSpinning ?? false
  },
})
</script>

<template>
  <RouletteSpinner
    ref="spinnerRef"
    :items="items"
    :item-width="191"
    :gap="18"
    :spin-duration="5500"
    @finished="emit('finished', $event)"
  />
</template>

