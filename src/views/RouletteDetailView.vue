<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import Dialog from '@/components/shared/Dialog.vue'
import Icons from '@/components/shared/Icons.vue'
import Sheet from '@/components/shared/Sheet.vue'
import RouletteSpinner from '@/components/roulette/RouletteSpinner.vue'
import { presentData } from '@/data/presentData'
import { getRouletteCardById } from '@/data/rouletteCards'

const route = useRoute()

const card = computed(() => getRouletteCardById(route.params.id as string))

const headingText = computed(() => {
  if (!card.value) {
    return 'Кейс'
  }

  if (card.value.price === 0) {
    return 'Бесплатный кейс'
  }

  return `Кейс за ${card.value.price} TON`
})

const tonButtonLabel = computed(() => {
  if (!card.value || card.value.price === 0) {
    return 'Открыть бесплатно'
  }

  return `Открыть за ${card.value.price} TON`
})

type SpinnerResult = { id: number | string; image: string; title: string; price: number }
type TaskStatus = 'done' | 'progress' | 'todo'

const spinnerRef = ref<InstanceType<typeof RouletteSpinner> | null>(null)
const selectedPresent = ref<SpinnerResult | null>(null)
const isResultDialogOpen = ref(false)
const isSpinning = computed(() => spinnerRef.value?.isSpinning ?? false)
const starsCost = 75
const isTaskSheetOpen = ref(false)
const isFreeCase = computed(() => card.value?.price === 0)
const TASK_STATUS_META: Record<TaskStatus, { color: string; background: string }> = {
  done: { color: '#A4DD9E', background: 'rgba(164, 221, 158, 0.15)' },
  progress: { color: '#0095EF', background: 'rgba(0, 149, 239, 0.1)' },
  todo: { color: '#D85252', background: 'rgba(216, 82, 82, 0.1)' },
}

const taskItems: Array<{ id: string; icon: string; title: string; status: TaskStatus }> = [
  {
    id: 'quiz',
    icon: 'ton',
    title: 'Ответь правильно на 3 вопроса викторины про TON',
    status: 'done',
  },
  {
    id: 'daily',
    icon: 'calendar',
    title: 'Выполни ежедневное задание 3 дня подряд',
    status: 'progress',
  },
  {
    id: 'game',
    icon: 'star',
    title: 'Сыграй в игру “Собери 5 звёзд”',
    status: 'todo',
  },
] as const

const isTonLoading = ref(false)
const isStarsLoading = ref(false)
const isTaskLoading = ref(false)

const runSpin = async (source: 'task' | 'ton' | 'stars') => {
  if (isSpinning.value) return

  if (source === 'task') {
    isTaskLoading.value = true
  } else if (source === 'ton') {
    isTonLoading.value = true
  } else {
    isStarsLoading.value = true
  }

  try {
    await spinnerRef.value?.spin()
  } finally {
    isTonLoading.value = false
    isStarsLoading.value = false
    isTaskLoading.value = false
  }
}

const startSpin = (source: 'task' | 'ton' | 'stars') => {
  runSpin(source)
}

const handleFinished = (item: SpinnerResult) => {
  selectedPresent.value = item
  isResultDialogOpen.value = true
}

const closeResultDialog = () => {
  isResultDialogOpen.value = false
}
</script>

<template>
  <div class="space-y-2 text-white">
    <h2 class="text-center pt-2 px-4 !loading-none pb-0 text-[2.375rem] font-bold uppercase">
      {{ headingText }}
    </h2>

    <RouletteSpinner
      ref="spinnerRef"
      :items="presentData"
      :item-width="120"
      :gap="18"
      :spin-duration="3200"
      @finished="handleFinished"
    />

    <div class="space-y-6 p-4">
      <div class="flex flex-col gap-3">
        <Sheet v-if="isFreeCase" v-model:open="isTaskSheetOpen">
          <template #trigger="{ open }">
            <button
              type="button"
              class="rounded-full w-full bg-[#2F9FF8] py-3 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-[#1f8cdd] disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="isSpinning"
              @click="open"
            >
              <span v-if="isSpinning" class="flex items-center justify-center gap-2">
                <span
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
              </span>
              <span v-else>Выполнить задание</span>
            </button>
          </template>

          <template #default="{ close }">
            <div class="space-y-4 text-[#484C52]">
              <div>
                <h3 class="text-center font-raleway text-xl font-bold text-[#123552]">Задания</h3>
                <p class="text-center text-sm font-medium">Выполни задания, чтобы получить спин</p>
              </div>

              <ul class="space-y-2 text-left">
                <li
                  v-for="task in taskItems"
                  :key="task.id"
                  class="flex items-center justify-between gap-3 rounded-2xl bg-[#F7F7F7] px-3 py-2"
                >
                  <div class="flex flex-1 items-center gap-3">
                    <div
                      class="flex h-12 w-12 aspect-square items-center justify-center rounded-2xl bg-white"
                    >
                      <Icons :name="task.icon" :size="24" />
                    </div>
                    <p class="text-sm font-semibold leading-tight text-[#123552]">
                      {{ task.title }}
                    </p>
                  </div>
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                    :style="{
                      backgroundColor: TASK_STATUS_META[task.status].background,
                      color: TASK_STATUS_META[task.status].color,
                    }"
                  >
                    <template v-if="task.status === 'done'">
                      <Icons
                        name="check"
                        :size="12"
                        :style="{ color: TASK_STATUS_META[task.status].color }"
                      />
                    </template>
                    <template v-else-if="task.status === 'progress'">
                      <Icons
                        name="refresh"
                        :size="16"
                        :style="{ color: TASK_STATUS_META[task.status].color }"
                      />
                    </template>
                    <template v-else>
                      <Icons
                        name="x"
                        :size="10"
                        :style="{ color: TASK_STATUS_META[task.status].color }"
                      />
                    </template>
                  </div>
                </li>
              </ul>
              <button
                type="button"
                class="w-full flex items-center justify-center gap-2 rounded-full bg-[#2F9FF8] py-2.5 font-bold tracking-wide text-white transition hover:bg-[#1f8cdd] disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="isSpinning"
                @click="
                  () => {
                    close()
                    startSpin('task')
                  }
                "
              >
                <template v-if="isTaskLoading">
                  <span class="flex items-center justify-center gap-2">
                    <span
                      class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                  </span>
                </template>
                <template v-else>
                  <Icons name="play" :size="18" />
                  Получить спин рулетки
                </template>
              </button>
            </div>
          </template>
        </Sheet>

        <template v-else>
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-full bg-[#2F9FF8] py-3 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-[#1f8cdd] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSpinning"
            @click="startSpin('ton')"
          >
            <template v-if="isTonLoading">
              <span class="flex items-center justify-center gap-2">
                <span
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
              </span>
            </template>
            <template v-else> <Icons name="ton" /> {{ tonButtonLabel }} </template>
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-full bg-[#F89E29] py-3 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-[#e28912] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSpinning"
            @click="startSpin('stars')"
          >
            <template v-if="isStarsLoading">
              <span class="flex items-center justify-center gap-2">
                <span
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
              </span>
            </template>
            <template v-else> <Icons name="star" /> Открыть за {{ starsCost }} звёзд </template>
          </button>
        </template>
      </div>

      <section class="space-y-4">
        <h3 class="text-center font-raleway text-2xl font-bold uppercase text-white">
          Содержимое кейса
        </h3>
        <div class="grid grid-cols-3 gap-3 rounded-3xl">
          <article
            v-for="item in presentData"
            :key="item.id"
            class="flex flex-col items-center gap-2 rounded-2xl bg-white/70 p-1 text-center text-[#484C52]"
          >
            <div class="relative flex h-[98px] w-full items-center justify-center rounded-xl">
              <img :src="item.image" :alt="item.title" class="h-[98px] w-[98px] object-cover" />
              <div
                class="absolute flex items-center text-white rounded-full py-px px-2 justify-center gap-1 bottom-2 right-2 text-xs font-semibold uppercase bg-[#2F9FF8]"
              >
                <span class="text-10">{{ item.price }}</span>
                <Icons name="ton" :size="14" />
              </div>
            </div>

            <span class="text-sm font-semibold">{{ item.title }}</span>
          </article>
        </div>
      </section>
    </div>

    <Dialog v-model:open="isResultDialogOpen" @close="closeResultDialog">
      <div v-if="selectedPresent" class="space-y-4 text-center">
        <h3 class="font-raleway text-xl font-bold text-[#123552]">Поздравляем!</h3>
        <div class="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl bg-[#F3F7FF]">
          <img
            :src="selectedPresent.image"
            :alt="selectedPresent.title"
            class="h-24 w-24 object-contain"
          />
        </div>
        <div class="space-y-1">
          <p class="text-base font-bold text-[#484C52]">{{ selectedPresent.title }}</p>
          <p class="text-sm font-semibold text-[#2F9FF8]">{{ selectedPresent.price }} TON</p>
        </div>
        <button
          type="button"
          class="w-full rounded-full bg-[#2F9FF8] py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#1f8cdd]"
          @click="closeResultDialog"
        >
          Забрать награду
        </button>
      </div>
      <div v-else class="text-center text-sm font-semibold text-[#484C52]">
        Результат не найден. Попробуйте снова.
      </div>
    </Dialog>
  </div>
</template>
