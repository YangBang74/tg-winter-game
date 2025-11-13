<script setup lang="ts">
import { computed, defineOptions } from 'vue'

defineOptions({ name: 'AppBadge' })

const props = defineProps<{
  free?: boolean
  hot?: boolean
}>()

const variant = computed<'free' | 'hot'>(() => {
  if (props.hot && props.free) {
    return 'hot'
  }

  if (props.hot) {
    return 'hot'
  }

  return 'free'
})

const label = computed(() => {
  if (variant.value === 'hot') {
    return 'HOT'
  }

  return 'FREE'
})

const baseClasses =
  'inline-flex w-[45px] h-[19px] items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-[0.02em]'

const variantClasses = computed(() =>
  variant.value === 'hot' ? 'bg-[#D85252] text-white' : 'bg-[#A4DD9E] text-[#484C52]',
)

const classes = computed(() => [baseClasses, variantClasses.value])
</script>

<template>
  <span :class="classes">
    <slot>{{ label }}</slot>
  </span>
</template>

<!-- Tailwind utilities handle styling; no component-scoped styles required. -->
