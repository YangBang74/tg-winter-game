<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { defineOptions } from 'vue'
import { onBeforeUnmount, watch } from 'vue'

defineOptions({ name: 'AppSheet' })

const isOpen = defineModel<boolean>('open', { default: false })

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

watch(
  isOpen,
  (value) => {
    if (value) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div>
    <slot name="trigger" :open="open" :close="close" :toggle="toggle" />

    <Teleport to="body">
      <Transition name="sheet">
        <div v-if="isOpen" class="sheet fixed inset-0 z-50 flex flex-col">
          <button
            class="absolute inset-0 bg-black/70"
            type="button"
            aria-label="Закрыть"
            @click="close"
          />

          <div
            class="relative mt-auto rounded-t-3xl bg-white p-3 text-black shadow-lg shadow-black/30"
            @click.stop
          >
            <button
              class="absolute z-100 right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-lg font-medium text-black/70 transition hover:bg-black/10 hover:text-black"
              type="button"
              aria-label="Закрыть"
              @click="close"
            >
              <Icons name="x" />
            </button>
            <slot :close="close" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.25s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from .relative,
.sheet-leave-to .relative {
  transform: translateY(100%);
}
</style>
