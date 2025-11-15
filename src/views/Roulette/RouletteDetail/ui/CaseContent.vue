<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'

interface Props {
  items: Array<{ id: number | string; image: string; title: string; price: number }>
}

defineProps<Props>()
</script>

<template>
  <section class="space-y-4">
    <h3 class="text-center font-raleway text-2xl font-bold uppercase text-white">
      Содержимое кейса
    </h3>
    <div class="grid grid-cols-3 gap-3 rounded-3xl">
      <article
        v-for="item in items"
        :key="item.id"
        class="flex flex-col items-center gap-1 pb-2 rounded-2xl bg-white/70 p-1 text-center text-[#484C52]"
      >
        <div class="relative flex h-[98px] w-full items-center justify-center rounded-xl">
          <img :src="item.image" :alt="item.title" class="h-[98px] w-[98px] object-cover rounded-xl" />
          <div
            class="absolute flex items-center text-white rounded-full py-px px-2 justify-center gap-1 bottom-2 right-2 text-xs font-semibold uppercase bg-[#2F9FF8]"
          >
            <span class="text-10">{{ item.price }}</span>
            <Icons name="ton" :size="14" />
          </div>
        </div>
        <span class="text-sm font-semibold leading-none">{{ item.title }}</span>
      </article>
    </div>
  </section>
</template>

