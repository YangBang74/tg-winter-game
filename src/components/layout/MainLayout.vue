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
