<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineExpose,
  defineProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

type SpinnerItem = {
  id: number | string
  image: string
  title: string
  price: number
  background?: string
}

const props = defineProps<{
  items: SpinnerItem[]
  itemWidth?: number
  gap?: number
  spinDuration?: number
}>()

const emit = defineEmits<{
  (event: 'finished', item: SpinnerItem): void
}>()

const itemWidth = computed(() => props.itemWidth ?? 0)
const gap = computed(() => props.gap ?? 16)
const spinDuration = computed(() => props.spinDuration ?? 3000)

const isSpinning = ref(false)
const internalIndex = ref(0)
const track = ref<HTMLDivElement | null>(null)
const wrapper = ref<HTMLDivElement | null>(null)
const repeatedItemsCount = 4
const cardWidth = ref(props.itemWidth ?? 120)

const repeatedItems = computed(() => {
  if (!props.items?.length) {
    return []
  }
  const copies: SpinnerItem[] = []
  for (let i = 0; i < repeatedItemsCount; i += 1) {
    copies.push(...props.items)
  }
  return copies
})

const baseOffset = computed(() => {
  const base = props.items.length
  return base
})

const step = computed(() => cardWidth.value + gap.value)

const translateX = ref(0)
const centerOffset = ref(0)

const measureCardWidth = () => {
  const trackEl = track.value
  if (!trackEl) {
    return
  }
  const itemEl = trackEl.querySelector<HTMLElement>('[data-spinner-item]')
  if (itemEl) {
    const width = itemEl.getBoundingClientRect().width
    if (width > 0) {
      cardWidth.value = width
    }
  }
}

const updateCenterOffset = () => {
  measureCardWidth()
  const wrapperEl = wrapper.value
  if (!wrapperEl) {
    centerOffset.value = 0
    return
  }
  const containerWidth = wrapperEl.clientWidth
  centerOffset.value = containerWidth / 2 - cardWidth.value / 2
}

const applyTransform = (offsetIndex: number, duration: number) => {
  const trackEl = track.value
  if (!trackEl) {
    return
  }

  translateX.value = offsetIndex * step.value - centerOffset.value
  trackEl.style.transition = `transform ${duration}ms cubic-bezier(0.15, 0.75, 0.35, 1)`
  trackEl.style.transform = `translateX(-${translateX.value}px)`
}

const resetWithoutAnimation = (targetIndex: number) => {
  const trackEl = track.value
  if (!trackEl) {
    return
  }
  trackEl.style.transition = 'none'
  translateX.value = targetIndex * step.value - centerOffset.value
  trackEl.style.transform = `translateX(-${translateX.value}px)`
}

const SPIN_ENDPOINT = 'https://twinbyai.ru/spin'

const resolvePrizeIndex = async () => {
  try {
    const response = await fetch(SPIN_ENDPOINT, { method: 'GET' })

    if (!response.ok) {
      throw new Error(`Spin request failed with status ${response.status}`)
    }

    const data = await response.json().catch(() => null)
    const rawPrizeId =
      data?.prizeId ?? data?.prizeID ?? data?.['prize-id'] ?? data?.['prizeId'] ?? data?.id ?? null

    if (typeof rawPrizeId === 'number') {
      const prizeIndex = props.items.findIndex((item) => Number(item.id) === Number(rawPrizeId))
      if (prizeIndex !== -1) {
        return prizeIndex
      }
    }
  } catch (error) {
    console.error('[RouletteSpinner] Failed to resolve prize index', error)
  }

  return Math.floor(Math.random() * props.items.length)
}

const spin = async () => {
  if (isSpinning.value || props.items.length === 0) {
    return
  }

  isSpinning.value = true

  const prizeIndex = await resolvePrizeIndex()

  const target = baseOffset.value * (repeatedItemsCount - 1) + prizeIndex
  internalIndex.value = target

  requestAnimationFrame(() => {
    applyTransform(target, spinDuration.value)
  })

  setTimeout(() => {
    const normalizedIndex = baseOffset.value + prizeIndex
    internalIndex.value = normalizedIndex
    resetWithoutAnimation(normalizedIndex)
    isSpinning.value = false
    const selected = props.items[prizeIndex]
    if (selected) {
      emit('finished', selected)
    }
  }, spinDuration.value + 100)
}

const updateGeometry = async () => {
  await nextTick()
  updateCenterOffset()
  resetWithoutAnimation(internalIndex.value)
}

onMounted(async () => {
  await updateGeometry()
  window.addEventListener('resize', updateGeometry)

  if (props.items.length > 0) {
    const startIndex = baseOffset.value
    internalIndex.value = startIndex
    resetWithoutAnimation(startIndex)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateGeometry)
})

watch(
  () => props.items,
  async (next) => {
    if (!next?.length) {
      return
    }
    await updateGeometry()
    const startIndex = baseOffset.value
    internalIndex.value = startIndex
    resetWithoutAnimation(startIndex)
  },
  { immediate: true, deep: true },
)

watch([itemWidth, gap], () => {
  updateGeometry()
})

defineExpose({
  spin,
  isSpinning,
})
</script>

<template>
  <div ref="wrapper" class="relative w-full overflow-hidden rounded-3xl py-4">
    <div
      ref="track"
      class="flex items-center"
      :style="{
        gap: `${gap}px`,
      }"
    >
      <div
        v-for="(item, index) in repeatedItems"
        :key="`${item.id}-${index}`"
        class="flex h-[230px] min-w-[191px] shrink-0 flex-col items-center justify-center rounded-2xl px-2"
        data-spinner-item
        :style="{
          width: props.itemWidth ? `${props.itemWidth}px` : undefined,
          backgroundImage: item.background ? `url(${item.background})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="h-[131px] w-[131px] object-contain rounded-full border-3 border-white/40"
        />
        <span class="mt-2 text-center font-semibold whitespace-nowrap text-white">{{
          item.title
        }}</span>
      </div>
    </div>

    <div
      class="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center justify-center"
    >
      <svg
        width="19"
        height="270"
        viewBox="0 0 19 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="3" height="253" transform="matrix(1 0 0 -1 8 259)" fill="white" />
        <path d="M9.5 255L17.7272 266.25H1.27276L9.5 255Z" fill="#A4DD9E" />
        <path d="M9.5 15L17.7272 3.75H1.27276L9.5 15Z" fill="#A4DD9E" />
      </svg>
    </div>
  </div>
</template>
