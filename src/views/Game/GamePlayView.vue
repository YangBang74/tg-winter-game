<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import GameHeader from './ui/GameHeader.vue'
import GameResultsSheet from './ui/GameResultsSheet.vue'
import GameSecondSheet from './ui/GameSecondSheet.vue'
import redGift from '@/assets/images/game/red.png'
import yellowGift from '@/assets/images/game/yellow.png'
import blueGift from '@/assets/images/game/blue.png'
import violetGift from '@/assets/images/game/violet.png'
import redBox from '@/assets/images/game/red-box.png'
import yellowBox from '@/assets/images/game/yellow-box.png'
import blueBox from '@/assets/images/game/blue-box.png'
import violetBox from '@/assets/images/game/violet-box.png'

type GiftColor = 'red' | 'yellow' | 'blue' | 'violet'
type Difficulty = 'easy' | 'medium' | 'hard'

interface Gift {
  id: number
  color: GiftColor
  x: number
  y: number
  caught: boolean
  startTime: number
}

interface SmokeEffect {
  id: number
  x: number
}

interface ParticleEffect {
  id: number
  x: number
  y: number
}

const router = useRouter()

const failNumber = ref(0)
const checkNumber = ref(0)
const difficulty = ref<Difficulty>('hard')
const gifts = ref<Gift[]>([])
const selectedGift = ref<Gift | null>(null)
const smokeEffects = ref<SmokeEffect[]>([])
const particleEffects = ref<ParticleEffect[]>([])
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const hoveredBox = ref<GiftColor | null>(null)
const isGameActive = ref(true)
const showFirstSheet = ref(false)
const showSecondSheet = ref(false)
const gameTime = ref(60)

let giftIdCounter = 0
let smokeIdCounter = 0
let particleIdCounter = 0
let spawnTimeout: ReturnType<typeof setTimeout> | null = null
let animationFrame: number | null = null
let lastTime = 0

const difficultyConfig = {
  easy: {
    spawnInterval: { min: 5000, max: 6000 },
    fallDuration: 3000,
  },
  medium: {
    spawnInterval: { min: 3500, max: 4500 },
    fallDuration: 2000,
  },
  hard: {
    spawnInterval: { min: 2500, max: 3500 },
    fallDuration: 95,
  },
}

const giftImages = {
  red: redGift,
  yellow: yellowGift,
  blue: blueGift,
  violet: violetGift,
}

const boxImages = {
  red: redBox,
  yellow: yellowBox,
  blue: blueBox,
  violet: violetBox,
}

const boxPositions = computed(() => {
  const screenHeight = window.innerHeight
  const spacing = screenHeight / 5

  return {
    red: { x: 0, y: spacing * 0.8, side: 'left' as const },
    yellow: { x: window.innerWidth - 80, y: spacing * 0.8, side: 'right' as const },
    blue: { x: 0, y: spacing * 2, side: 'left' as const },
    violet: { x: window.innerWidth - 80, y: spacing * 2, side: 'right' as const },
  }
})

const getRandomColor = (): GiftColor => {
  const colors: GiftColor[] = ['red', 'yellow', 'blue', 'violet']
  const index = Math.floor(Math.random() * colors.length)
  return colors[index] ?? 'red'
}

const spawnGift = () => {
  const color = getRandomColor()
  const x = Math.random() * (window.innerWidth - 100) + 50
  const gift: Gift = {
    id: giftIdCounter++,
    color,
    x,
    y: 0,
    caught: false,
    startTime: Date.now(),
  }
  gifts.value.push(gift)
}

const startSpawning = () => {
  if (!isGameActive.value) return

  const config = difficultyConfig[difficulty.value]

  const scheduleNext = () => {
    if (!isGameActive.value) return
    spawnGift()
    const nextInterval =
      config.spawnInterval.min +
      Math.random() * (config.spawnInterval.max - config.spawnInterval.min)
    spawnTimeout = setTimeout(scheduleNext, nextInterval)
  }

  spawnGift()
  const firstInterval =
    config.spawnInterval.min + Math.random() * (config.spawnInterval.max - config.spawnInterval.min)
  spawnTimeout = setTimeout(scheduleNext, firstInterval)
}

const animateGifts = (currentTime: number) => {
  if (!lastTime) lastTime = currentTime
  const deltaTime = currentTime - lastTime
  lastTime = currentTime

  const config = difficultyConfig[difficulty.value]
  const screenHeight = window.innerHeight
  const fallSpeed = screenHeight / config.fallDuration

  const giftsToRemove: number[] = []

  gifts.value.forEach((gift) => {
    if (!gift.caught && isGameActive.value) {
      gift.y += fallSpeed * (deltaTime / 16.67)

      if (gift.y > screenHeight) {
        const smokeX = window.innerWidth / 2
        const smokeId = smokeIdCounter++
        smokeEffects.value.push({
          id: smokeId,
          x: smokeX,
        })

        setTimeout(() => {
          smokeEffects.value = smokeEffects.value.filter((s) => s.id !== smokeId)
        }, 3000)

        failNumber.value++
        giftsToRemove.push(gift.id)

        if (selectedGift.value?.id === gift.id) {
          selectedGift.value = null
        }
      }
    }
  })

  if (giftsToRemove.length > 0) {
    gifts.value = gifts.value.filter((g) => !giftsToRemove.includes(g.id))
  }

  animationFrame = requestAnimationFrame(animateGifts)
}

const getBoxBounds = (boxColor: GiftColor) => {
  const boxPos = boxPositions.value[boxColor]
  const boxSize = 80
  const padding = 30
  return {
    left: boxPos.x - padding,
    right: boxPos.x + boxSize + padding,
    top: boxPos.y - padding,
    bottom: boxPos.y + boxSize + padding,
  }
}

const checkGiftInBox = (gift: Gift): GiftColor | null => {
  const giftCenterX = gift.x
  const giftCenterY = gift.y
  const boxColors: GiftColor[] = ['red', 'yellow', 'blue', 'violet']

  for (const color of boxColors) {
    const bounds = getBoxBounds(color)
    if (
      giftCenterX >= bounds.left &&
      giftCenterX <= bounds.right &&
      giftCenterY >= bounds.top &&
      giftCenterY <= bounds.bottom
    ) {
      return color
    }
  }
  return null
}

const getHoveredBox = (gift: Gift): GiftColor | null => {
  return checkGiftInBox(gift)
}

const getEventCoordinates = (event: MouseEvent | TouchEvent) => {
  if ('touches' in event && event.touches[0]) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }
  const mouseEvent = event as MouseEvent
  return { x: mouseEvent.clientX, y: mouseEvent.clientY }
}

const onGiftMouseDown = (event: MouseEvent | TouchEvent, gift: Gift) => {
  event.preventDefault()
  if (gift.caught || !isGameActive.value) return

  const { x: clientX, y: clientY } = getEventCoordinates(event)

  // Получаем реальные координаты элемента из DOM, чтобы избежать рассинхронизации
  const target = event.target as HTMLElement
  const giftElement = target.closest('.gift') as HTMLElement
  if (giftElement) {
    const rect = giftElement.getBoundingClientRect()
    // Центр элемента (из-за transform: translate(-50%, -50%))
    const elementCenterX = rect.left + rect.width / 2
    const elementCenterY = rect.top + rect.height / 2

    // Обновляем координаты подарка реальными координатами из DOM
    gift.x = elementCenterX
    gift.y = elementCenterY
  }

  // Помечаем подарок как пойманный после синхронизации координат
  gift.caught = true
  selectedGift.value = gift

  // Вычисляем offset относительно реальной позиции подарка
  dragOffset.value = {
    x: clientX - gift.x,
    y: clientY - gift.y,
  }

  isDragging.value = true
}

const onGiftMouseMove = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !selectedGift.value) return

  event.preventDefault()
  const { x: clientX, y: clientY } = getEventCoordinates(event)

  selectedGift.value.x = clientX - dragOffset.value.x
  selectedGift.value.y = clientY - dragOffset.value.y
  hoveredBox.value = getHoveredBox(selectedGift.value)
}

const onGiftMouseUp = () => {
  if (!isDragging.value || !selectedGift.value || !isGameActive.value) return

  isDragging.value = false
  const currentHoveredBox = hoveredBox.value
  hoveredBox.value = null

  const boxColor = checkGiftInBox(selectedGift.value) || currentHoveredBox

  if (boxColor) {
    const boxPos = boxPositions.value[boxColor]

    if (selectedGift.value.color === boxColor) {
      checkNumber.value++

      const particleId = particleIdCounter++
      particleEffects.value.push({
        id: particleId,
        x: boxPos.x + 40,
        y: boxPos.y + 40,
      })

      setTimeout(() => {
        particleEffects.value = particleEffects.value.filter((p) => p.id !== particleId)
      }, 2000)
    } else {
      failNumber.value++
    }

    gifts.value = gifts.value.filter((g) => g.id !== selectedGift.value!.id)
    selectedGift.value = null
  } else {
    selectedGift.value.caught = false
    selectedGift.value.startTime =
      Date.now() -
      (selectedGift.value.y /
        (window.innerHeight / difficultyConfig[difficulty.value].fallDuration)) *
        1000
    selectedGift.value = null
  }
}

const onTimeEnd = () => {
  isGameActive.value = false

  if (spawnTimeout) {
    clearTimeout(spawnTimeout)
    spawnTimeout = null
  }

  gameTime.value = 60
  showFirstSheet.value = true
}

watch(showFirstSheet, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      showSecondSheet.value = true
    }, 300)
  }
})

watch(showSecondSheet, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      router.push({ name: 'game' })
    }, 300)
  }
})

onMounted(() => {
  startSpawning()
  lastTime = performance.now()
  animationFrame = requestAnimationFrame(animateGifts)

  window.addEventListener('mousemove', onGiftMouseMove)
  window.addEventListener('mouseup', onGiftMouseUp)
  window.addEventListener('touchmove', onGiftMouseMove)
  window.addEventListener('touchend', onGiftMouseUp)
})

onUnmounted(() => {
  if (spawnTimeout) {
    clearTimeout(spawnTimeout)
  }
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
  }

  window.removeEventListener('mousemove', onGiftMouseMove)
  window.removeEventListener('mouseup', onGiftMouseUp)
  window.removeEventListener('touchmove', onGiftMouseMove)
  window.removeEventListener('touchend', onGiftMouseUp)
})
</script>
<template>
  <div class="game h-screen relative overflow-hidden">
    <GameHeader
      :time="60"
      :fail-number="failNumber"
      :check-number="checkNumber"
      @time-end="onTimeEnd"
      @time-update="(seconds) => (gameTime = 60 - seconds)"
    />

    <!-- Gift Boxes -->
    <div
      v-for="(pos, colorKey) in boxPositions"
      :key="colorKey"
      class="box absolute cursor-pointer rotate-180 transition-all z-20"
      :class="{
        'box-highlight': hoveredBox === colorKey && selectedGift?.color === colorKey,
        'box-wrong': hoveredBox === colorKey && selectedGift && selectedGift.color !== colorKey,
      }"
      :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
    >
      <img
        :src="boxImages[colorKey as GiftColor]"
        alt=""
        class="w-20 h-20 transition-transform hover:scale-110"
      />
    </div>

    <!-- Falling Gifts -->
    <div
      v-for="gift in gifts"
      :key="gift.id"
      class="gift absolute cursor-grab transition-all z-30"
      :class="{
        'gift-selected': selectedGift?.id === gift.id,
        'gift-dragging': isDragging && selectedGift?.id === gift.id,
      }"
      :style="{
        left: `${gift.x}px`,
        top: `${gift.y}px`,
      }"
      @mousedown="(e) => onGiftMouseDown(e, gift)"
      @touchstart="(e) => onGiftMouseDown(e, gift)"
    >
      <img :src="giftImages[gift.color]" alt="" class="w-16 h-16 pointer-events-none" />
    </div>

    <!-- White Particle Effects -->
    <div
      v-for="effect in particleEffects"
      :key="effect.id"
      class="particle-effect absolute pointer-events-none z-40"
      :style="{ left: `${effect.x}px`, top: `${effect.y}px` }"
    >
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>

    <!-- Black Smoke Effects -->
    <div
      v-for="smoke in smokeEffects"
      :key="smoke.id"
      class="smoke-effect absolute pointer-events-none z-40"
      :style="{ left: `${smoke.x}px` }"
    >
      <div class="smoke"></div>
      <div class="smoke"></div>
      <div class="smoke"></div>
    </div>

    <!-- First Sheet -->
    <GameResultsSheet
      v-model:open="showFirstSheet"
      :check-number="checkNumber"
      :fail-number="failNumber"
    />

    <!-- Second Sheet -->
    <GameSecondSheet
      v-model:open="showSecondSheet"
      :check-number="checkNumber"
      :fail-number="failNumber"
      :time="60 - gameTime"
    />
  </div>
</template>
<style scoped>
.game {
  background:
    url('@/assets/images/game/play.png'),
    radial-gradient(50% 50% at 50% 50%, #01978b 0%, #006e65 100%);
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}

.gift {
  transform: translate(-50%, -50%);
  user-select: none;
  will-change: transform;
}

.gift-selected {
  transform: translate(-50%, -50%) scale(1.1);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
}

.gift-dragging {
  transform: translate(-50%, -50%) scale(1.15);
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 1));
  cursor: grabbing;
  z-index: 50;
  transition: none;
}

.box-highlight {
  animation: box-pulse 0.5s ease-in-out infinite alternate;
}

.box-wrong {
  animation: box-shake 0.3s ease-in-out;
}

@keyframes box-pulse {
  from {
    filter: drop-shadow(0 0 5px rgba(52, 199, 89, 0.5));
  }
  to {
    filter: drop-shadow(0 0 15px rgba(52, 199, 89, 1));
  }
}

@keyframes box-shake {
  0%,
  100% {
    filter: drop-shadow(0 0 5px rgba(255, 59, 48, 0.5));
  }
  25% {
    filter: drop-shadow(-5px 0 5px rgba(255, 59, 48, 0.7));
  }
  75% {
    filter: drop-shadow(5px 0 5px rgba(255, 59, 48, 0.7));
  }
}

@keyframes pulse {
  from {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
  }
  to {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 1));
  }
}

.box {
  transform: translateY(-50%);
  user-select: none;
}

/* White Particle Effect */
.particle-effect {
  transform: translate(-50%, -50%);
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
  animation: particle-explode 2s ease-out forwards;
}

.particle:nth-child(1) {
  animation-delay: 0s;
  transform: translate(0, 0) rotate(0deg);
}

.particle:nth-child(2) {
  animation-delay: 0.1s;
  transform: translate(0, 0) rotate(45deg);
}

.particle:nth-child(3) {
  animation-delay: 0.15s;
  transform: translate(0, 0) rotate(90deg);
}

.particle:nth-child(4) {
  animation-delay: 0.2s;
  transform: translate(0, 0) rotate(135deg);
}

.particle:nth-child(5) {
  animation-delay: 0.1s;
  transform: translate(0, 0) rotate(180deg);
}

.particle:nth-child(6) {
  animation-delay: 0.15s;
  transform: translate(0, 0) rotate(225deg);
}

.particle:nth-child(7) {
  animation-delay: 0.2s;
  transform: translate(0, 0) rotate(270deg);
}

.particle:nth-child(8) {
  animation-delay: 0.1s;
  transform: translate(0, 0) rotate(315deg);
}

@keyframes particle-explode {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx, 60px), var(--dy, -60px)) scale(0);
  }
}

.particle:nth-child(1) {
  --dx: 40px;
  --dy: -40px;
}

.particle:nth-child(2) {
  --dx: 50px;
  --dy: -20px;
}

.particle:nth-child(3) {
  --dx: 40px;
  --dy: 0px;
}

.particle:nth-child(4) {
  --dx: 20px;
  --dy: 20px;
}

.particle:nth-child(5) {
  --dx: -20px;
  --dy: 40px;
}

.particle:nth-child(6) {
  --dx: -40px;
  --dy: 20px;
}

.particle:nth-child(7) {
  --dx: -50px;
  --dy: -20px;
}

.particle:nth-child(8) {
  --dx: -40px;
  --dy: -40px;
}

/* Black Smoke Effect */
.smoke-effect {
  bottom: 20%;
  transform: translateX(-50%);
}

.smoke {
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: smoke-rise 3s ease-out forwards;
}

.smoke:nth-child(1) {
  left: -30px;
  animation-delay: 0s;
  width: 50px;
  height: 50px;
}

.smoke:nth-child(2) {
  left: -20px;
  animation-delay: 0.2s;
  width: 70px;
  height: 70px;
}

.smoke:nth-child(3) {
  left: -10px;
  animation-delay: 0.4s;
  width: 60px;
  height: 60px;
}

@keyframes smoke-rise {
  0% {
    opacity: 0.8;
    transform: translateY(0) scale(0.5);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-50px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-150px) scale(1.5);
  }
}
</style>
