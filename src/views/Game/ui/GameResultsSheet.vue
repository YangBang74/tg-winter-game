<script setup lang="ts">
import Sheet from '@/components/shared/Sheet.vue'
import success from '@/assets/images/game/success.png'
import fail from '@/assets/images/game/fail.png'

interface Props {
  open: boolean
  checkNumber: number
  failNumber: number
}

defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <template #default>
      <div class="text-[#484C52]">
        <h2 class="text-xl text-center font-bold mb-4">Результаты игры</h2>
        <div class="grid grid-cols-2 items-center justify-between gap-2.5">
          <div
            class="flex flex-col gap-1.5 items-center justify-center bg-cover bg-center bg-no-repeat py-4 px-4 rounded-lg"
            :style="{ backgroundImage: `url(${success})` }"
          >
            <span class="font-bold bg-white/50 w-12 text-center rounded-full text-sm">{{
              checkNumber
            }}</span>
            <p class="uppercase font-bold text-sm">Успешно</p>
          </div>
          <div
            class="flex flex-col gap-1.5 items-center justify-center bg-cover bg-center bg-no-repeat py-4 px-4 rounded-lg"
            :style="{ backgroundImage: `url(${fail})` }"
          >
            <span class="font-bold bg-white/50 w-12 text-center rounded-full text-sm">{{
              failNumber
            }}</span>
            <p class="uppercase font-bold text-sm">Не успешно</p>
          </div>
        </div>
      </div>
    </template>
  </Sheet>
</template>
