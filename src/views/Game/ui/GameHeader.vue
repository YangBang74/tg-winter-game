<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import Icons from '@/components/shared/Icons.vue'

interface Props {
  time?: number // время в секундах (по умолчанию 60)
  failNumber?: number
  checkNumber?: number
}

const props = withDefaults(defineProps<Props>(), {
  time: 60,
  failNumber: 0,
  checkNumber: 0,
})

const emit = defineEmits<{
  timeEnd: []
  timeUpdate: [seconds: number]
}>()

const seconds = ref(props.time)
let intervalId: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const mins = Math.floor(seconds.value / 60)
  const secs = seconds.value % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

watch(seconds, (newValue) => {
  if (newValue <= 0) {
    emit('timeEnd')
  }
})

const startTimer = () => {
  seconds.value = props.time

  if (intervalId) {
    clearInterval(intervalId)
  }

  intervalId = setInterval(() => {
    seconds.value--
    emit('timeUpdate', seconds.value)

    if (seconds.value <= 0) {
      clearInterval(intervalId!)
      intervalId = null
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
<template>
  <div class="px-4 pt-2 flex items-center justify-between">
    <div class="bg-primary rounded-full px-2.5 py-1 flex items-center gap-2">
      <Icons name="time" :size="20" />
      <span class="font-bold text-white">{{ formattedTime }}</span>
    </div>
    <div class="flex items-center justify-end gap-2">
      <div class="bg-[#023A35] rounded-full px-2.5 py-1 flex items-center gap-2">
        <Icons name="x-strong" class="text-[#FF383C]" />
        <span class="font-bold text-white">{{ failNumber }}</span>
      </div>
      <div class="bg-[#023A35] rounded-full px-2.5 py-1 flex items-center gap-2">
        <Icons name="check-strong" class="text-[#34C759]" />
        <span class="font-bold text-white">{{ checkNumber }}</span>
      </div>
    </div>
  </div>
</template>
