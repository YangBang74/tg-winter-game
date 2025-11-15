<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import type { FriendLevel } from '../model/types'

interface Props {
  level: FriendLevel
  isMain?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      isMain
        ? 'main-block py-[0.9375rem] px-[0.8125rem] rounded-2xl pb-8 flex items-start justify-start gap-2.5'
        : 'sub-block py-[0.9375rem] gap-1 flex flex-col items-center justify-start px-[0.8125rem] rounded-2xl',
    ]"
  >
    <div
      v-if="isMain"
      class="space-y-1"
    >
      <h2 class="text-[1.75rem] font-bold uppercase leading-none">
        {{ level.level }} уровень
      </h2>
      <p class="text-sm font-medium text-[#A79EFF]">{{ level.description }}</p>
    </div>
    <div
      class="flex items-center mt-px w-16 rounded-full bg-white/27 justify-center h-[1.375rem] gap-1"
    >
      <Icons name="user" />
      <span class="text-[0.625rem] font-bold">{{ level.count }}</span>
    </div>
    <template v-if="!isMain">
      <h3 class="text-lg font-bold uppercase">{{ level.level }} уровень</h3>
      <p class="text-xs font-medium text-white/50">{{ level.description }}</p>
    </template>
  </div>
</template>

<style scoped>
.main-block {
  background-image: url('@/assets/images/friends/main-block.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.sub-block {
  background-image: url('@/assets/images/friends/sub-block.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

