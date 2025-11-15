<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import CalendarCard from './ui/CalendarCard.vue'

const { t } = useI18n()

const calendarTypes = [
  { id: 'free', title: 'Календарь\nБесплатный', price: null, class: 'free' },
  { id: 'premium', title: 'Календарь\nПремиум', price: '5 TON', class: 'premium' },
  { id: 'legendary', title: 'Календарь\nЛегендарный', price: '20 TON', class: 'legendary' },
]
</script>

<template>
  <div class="p-4 text-white space-y-4">
    <h1 class="text-2xl text-center uppercase font-semibold">Календари</h1>
    <div class="space-y-2.5">
      <CalendarCard
        v-for="calendar in calendarTypes"
        :key="calendar.id"
        :id="calendar.id"
        :title="calendar.title"
        :price="calendar.price"
        :class-name="calendar.class"
      />
    </div>
  </div>
</template>
