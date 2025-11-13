<script setup lang="ts">
import { ref } from 'vue'

import Icons from '@/components/shared/Icons.vue'
import Sheet from '@/components/shared/Sheet.vue'

const isSettingsOpen = ref(false)
</script>

<template>
  <header class="flex items-center justify-between px-4 pt-2">
    <button
      class="flex items-start gap-2 rounded-2xl bg-primary p-1.5 px-2 text-sm font-medium text-white"
    >
      <Icons name="wallet" :size="20" />
      Connect wallet
    </button>

    <Sheet v-model:open="isSettingsOpen">
      <template #trigger="{ open }">
        <button class="rounded-full bg-[#023A35] p-2.5 text-white" type="button" @click="open">
          <Icons name="setting" :size="20" />
        </button>
      </template>

      <template #default>
        <div class="space-y-2.5 font-raleway text-black pt-8">
          <div class="flex items-center gap-2.5 justify-between rounded-xl bg-[#F5F5F5] p-1.5">
            <button
              class="w-full flex gap-2 items-center justify-center py-3.5 bg-[#A79EFF] text-white rounded-full"
            >
              <Icons name="down-arrow" />
              <span class="font-raleway font-bold">Пополнить</span>
            </button>
            <button
              class="w-full flex gap-2 items-center justify-center py-3.5 bg-white text-black border border-[#E4E4E4] rounded-full"
            >
              <Icons name="down-arrow" />
              <span class="font-raleway font-bold">Пополнить</span>
            </button>
          </div>
          <h2 class="text-center text-[#484C52] text-2xl font-bold uppercase">Настройки</h2>
        </div>
      </template>
    </Sheet>
  </header>
</template>
