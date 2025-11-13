<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <nav class="layout__nav">
        <RouterLink to="/" class="layout__link">Главная</RouterLink>
        <RouterLink to="/about" class="layout__link">О проекте</RouterLink>
      </nav>
    </header>
    <main class="layout__content">
      <RouterView />
    </main>
  </div>
</template>
