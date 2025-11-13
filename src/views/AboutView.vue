<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="about">
    <h1 class="about__title">{{ t('about.title') }}</h1>
    <p class="about__text">
      {{ t('about.paragraphs.mission') }}
    </p>
    <p class="about__text">
      {{ t('about.paragraphs.technology') }}
    </p>
    <p class="about__text">
      {{ t('about.paragraphs.feedback') }}
    </p>
  </section>
</template>
