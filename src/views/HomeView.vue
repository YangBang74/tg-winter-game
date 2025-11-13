<script setup lang="ts">
const features = [
  {
    title: 'Зимние задания',
    description:
      'Выполняйте ежедневные миссии и собирайте кристаллы для участия в сезонном рейтинге.',
  },
  {
    title: 'Командные турниры',
    description: 'Объединяйтесь с друзьями и участвуйте в турнирах внутри Telegram-чатов.',
  },
  {
    title: 'Магазин наград',
    description: 'Обменивайте очки на эксклюзивные стикеры, скины и мерч.',
  },
]
</script>

<template>
  <section class="home">
    <h1 class="text-primary">Добро пожаловать в Winter Game</h1>
    <p class="home__subtitle">
      Игровой портал с зимними событиями и челленджами, доступный прямо в Telegram.
    </p>

    <ul class="home__features">
      <li v-for="feature in features" :key="feature.title" class="home__feature">
        <h2 class="home__feature-title">{{ feature.title }}</h2>
        <p class="home__feature-description">{{ feature.description }}</p>
      </li>
    </ul>
  </section>
</template>
