<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavBar from './NavBar.vue'
import Header from './Header.vue'
const { t } = useI18n()
</script>

<template>
  <div class="layout flex flex-col h-full min-h-screen">
    <Header />
    <main class="layout__content flex-1 text-transparent">
      <RouterView />
    </main>
    <footer>
      <NavBar />
    </footer>
  </div>
</template>
