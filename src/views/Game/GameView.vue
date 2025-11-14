<script setup lang="ts">
import { useRouter } from 'vue-router'
import Icons from '@/components/shared/Icons.vue'

const router = useRouter()

const startGame = () => {
  router.push({ name: 'game-play' })
}
</script>
<template>
  <div class="game-intro p-4 pt-0 min-h-[calc(100vh-12rem)] flex flex-col justify-between mt-4">
    <div class="text-center max-w-[15rem] mx-auto space-y-1">
      <h1 class="text-[1.5rem] text-white font-bold uppercase">Задание</h1>
      <p class="text-center text-white">Распредели подарки свайпами в нужную трубу</p>
    </div>
    <button
      @click="startGame"
      class="flex items-center relative bottom-4 gap-2 justify-center bg-primary w-full font-bold rounded-full text-white px-4 py-2.5"
    >
      <Icons name="play" />
      Запустить игру
    </button>
  </div>
</template>
<style scoped>
.game-intro {
  background-image: url('@/assets/images/game/game-intro.png');
  background-size: cover;
  background-position: 0 -100px;
  background-repeat: no-repeat;
}
</style>
