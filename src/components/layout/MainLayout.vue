<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './NavBar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="layout flex flex-col h-full min-h-screen">
    <Header />
    <main class="layout__content flex-1 text-transparent pb-20">
      <RouterView />
    </main>
    <footer>
      <NavBar />
    </footer>
  </div>
</template>
<style scoped>
.layout {
  background:
    url('@/assets/images/background.png'),
    radial-gradient(50% 50% at 50% 50%, #01978b 0%, #006e65 100%);
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}
</style>