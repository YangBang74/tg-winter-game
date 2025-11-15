<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'

interface Emits {
  (e: 'copy-link'): void
  (e: 'invite'): void
}

defineEmits<Emits>()
</script>

<template>
  <div class="referral-block py-4 px-[0.8125rem] rounded-2xl text-center">
    <h4 class="text-[1.25rem] font-bold uppercase">ваша реферальная ссылка!</h4>
    <p class="">Приглашай друзей прямо сейчас</p>
    <div
      class="bg-[#8981DD] my-2 rounded-full w-full gap-2.5 py-2 flex items-center justify-between px-2.5"
    >
      <p>https://t.me...ym64k4d84bbl</p>
      <button @click="$emit('copy-link')">
        <Icons name="copy" :size="20" />
      </button>
    </div>
    <button
      class="bg-primary rounded-full w-full py-2 gap-2.5 flex items-center justify-center px-2.5"
      @click="$emit('invite')"
    >
      <Icons name="user" :size="16" />
      <p class="font-bold">Пригласить друга</p>
    </button>
  </div>
</template>

<style scoped>
.referral-block {
  background-image: url('@/assets/images/friends/referral-block.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

