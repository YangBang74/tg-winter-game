<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const featureKeys = ['missions', 'tournaments', 'rewards'] as const

const features = computed(() =>
  featureKeys.map((key) => ({
    key,
    title: t(`home.features.${key}.title`),
    description: t(`home.features.${key}.description`),
  })),
)
</script>

<template>
  <section class="home">
    <h1 class="text-primary">{{ t('home.title') }}</h1>
    <p class="home__subtitle">
      {{ t('home.subtitle') }}
    </p>

    <ul class="home__features">
      <li v-for="feature in features" :key="feature.key" class="home__feature">
        <h2 class="home__feature-title">{{ feature.title }}</h2>
        <p class="home__feature-description">{{ feature.description }}</p>
      </li>
    </ul>
  </section>
</template>
