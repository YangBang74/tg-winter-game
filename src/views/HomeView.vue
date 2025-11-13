<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
</script>

<template>
  <section class="text-white p-4 space-y-4">
    <div class="advent rounded-2xl py-6 px-2.5">
      <h3 class="text-[1.75rem] font-bold leading-none uppercase font-raleway">
        Открывай адвент <br />
        календари
      </h3>
      <p class="pt-1 pb-2 font-medium">Получай подарки</p>
      <button class="bg-primary py-2.5 px-4 rounded-full flex items-center gap-2">
        <Icons name="calendar" />
        <span class="font-raleway font-bold">Открыть</span>
      </button>
    </div>
    <div class="roulete rounded-2xl py-6 px-2.5">
      <h3 class="text-[2.625rem] font-bold leading-none uppercase font-raleway">
        Играй в <br />
        Рулетку
      </h3>
      <button class="bg-primary mt-3 py-2.5 px-4 rounded-full flex items-center gap-2">
        <Icons name="tron" />
        <span class="font-bold">0.00005 TON</span>
      </button>
    </div>
    <div class="lottery flex flex-col items-center gap-3 rounded-2xl py-6 pb-10 px-2.5">
      <h3 class="text-[2.625rem] font-bold leading-none uppercase font-raleway">
        Играй в <br />
        лотерею
      </h3>
      <button class="bg-primary py-2.5 px-4 rounded-full flex items-center gap-2">
        <Icons name="calendar" />
        <span class="font-raleway font-bold">Открыть</span>
      </button>
    </div>
  </section>
</template>
<style scoped>
.advent {
  background: url('@/assets/images/home/advent-card.png') no-repeat center center;
  background-size: cover;
}
.roulete {
  background: url('@/assets/images/home/roulete-card.png') no-repeat center center;
  background-size: cover;
}
.lottery {
  background: url('@/assets/images/home/lottery-card.png') no-repeat center center;
  background-size: cover;
}
</style>
