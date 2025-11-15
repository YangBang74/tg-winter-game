<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { Referral } from '../model/types'

interface Props {
  referral: Referral
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white/70 rounded-xl p-1.5 flex items-center gap-3">
    <img
      :src="referral.avatar"
      :alt="referral.name"
      class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
    />
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-[#484C52] white/80 truncate">{{ referral.name }}</p>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <div class="bg-[#A79EFF] rounded-full px-2.5 py-1 flex items-center gap-1.5">
        <Icons name="snow-small" :size="12" class="text-white" />
        <span class="text-xs font-bold text-white">+{{ referral.snow }}</span>
      </div>
      <div class="bg-[#4A90E2] rounded-full px-2.5 py-1 flex items-center gap-1.5">
        <Icons name="ton" :size="12" class="text-white" />
        <span class="text-xs font-bold text-white">+{{ referral.ton }}</span>
      </div>
    </div>
  </div>
</template>

