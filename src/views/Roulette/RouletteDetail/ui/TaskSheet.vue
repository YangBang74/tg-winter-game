<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import Sheet from '@/components/shared/Sheet.vue'
import type { TaskItem } from '../model/types'
import { TASK_STATUS_META } from '../model/types'

interface Props {
  taskItems: TaskItem[]
  isSpinning: boolean
  isLoading: boolean
  open?: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'spin'): void
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
})
const emit = defineEmits<Emits>()
</script>

<template>
  <Sheet :open="props.open" @update:open="emit('update:open', $event)">
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
              emit('spin')
            }
          "
        >
          <template v-if="isLoading">
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
</template>

