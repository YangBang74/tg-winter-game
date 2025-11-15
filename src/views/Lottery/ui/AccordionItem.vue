<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { AccordionItem } from '../model/types'

interface Props {
  item: AccordionItem
  isOpen: boolean
}

interface Emits {
  (e: 'toggle'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const getIconClass = () => {
  const baseClasses = 'shrink-0 transition-transform duration-200 text-[#484C52]'
  return props.isOpen ? `${baseClasses} rotate-180` : baseClasses
}
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-200"
  >
    <button
      class="w-full flex items-center justify-between p-4 text-left text-[#484C52] font-medium"
      @click="emit('toggle')"
    >
      <span class="font-semibold text-xs">{{ item.title }}</span>
      <Icons name="arrow" :class="getIconClass()" />
    </button>
    <Transition name="accordion">
      <div
        v-if="isOpen"
        class="mx-4 py-4 text-[#484C52] border-t border-[#E0E0E0]"
      >
        <p class="text-xs leading-relaxed">{{ item.content }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.accordion-enter-active {
  transition: all 0.2s ease-out;
  overflow: hidden;
}

.accordion-leave-active {
  transition: all 0.2s ease-in;
  overflow: hidden;
}

.accordion-enter-from {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.accordion-enter-to {
  max-height: 300px;
  opacity: 1;
}

.accordion-leave-from {
  max-height: 300px;
  opacity: 1;
}

.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>

