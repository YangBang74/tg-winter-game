<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Icons from '@/components/shared/Icons.vue'
import { presentData } from '@/data/presentData'
import { getRouletteCardById } from '@/data/rouletteCards'
import { useRouletteDetail } from './model/useRouletteDetail'
import SpinnerSection from './ui/SpinnerSection.vue'
import TaskSheet from './ui/TaskSheet.vue'
import ResultDialog from './ui/ResultDialog.vue'
import CaseContent from './ui/CaseContent.vue'

const route = useRoute()
const card = computed(() => getRouletteCardById(route.params.id as string))

const {
  headingText,
  tonButtonLabel,
  spinnerRef: spinnerRefFromComposable,
  selectedPresent,
  isResultDialogOpen,
  isSpinning,
  starsCost,
  isTaskSheetOpen,
  isFreeCase,
  taskItems,
  isTonLoading,
  isStarsLoading,
  isTaskLoading,
  runSpin,
  handleFinished,
  closeResultDialog,
} = useRouletteDetail(card)

const spinnerRef = spinnerRefFromComposable
</script>

<template>
  <div class="space-y-2 text-white">
    <h2 class="text-center pt-2 px-4 !loading-none pb-0 text-[2.375rem] font-bold uppercase">
      {{ headingText }}
    </h2>

    <SpinnerSection
      ref="spinnerRef"
      :items="presentData"
      @finished="handleFinished"
    />

    <div class="space-y-6 p-4">
      <div class="flex flex-col gap-3">
        <TaskSheet
          v-if="isFreeCase"
          v-model:open="isTaskSheetOpen"
          :task-items="taskItems"
          :is-spinning="isSpinning"
          :is-loading="isTaskLoading"
          @spin="runSpin('task')"
        />

        <template v-else>
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-full bg-[#2F9FF8] py-3 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-[#1f8cdd] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSpinning"
            @click="runSpin('ton')"
          >
            <template v-if="isTonLoading">
              <span class="flex items-center justify-center gap-2">
                <span
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
              </span>
            </template>
            <template v-else>
              <Icons name="ton" />
              {{ tonButtonLabel }}
            </template>
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-full bg-[#F89E29] py-3 text-base font-semibold uppercase tracking-wide text-white transition hover:bg-[#e28912] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSpinning"
            @click="runSpin('stars')"
          >
            <template v-if="isStarsLoading">
              <span class="flex items-center justify-center gap-2">
                <span
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
              </span>
            </template>
            <template v-else>
              <Icons name="star" />
              Открыть за {{ starsCost }} звёзд
            </template>
          </button>
        </template>
      </div>

      <CaseContent :items="presentData" />
    </div>

    <ResultDialog
      v-model:open="isResultDialogOpen"
      :selected-present="selectedPresent"
      @close="closeResultDialog"
    />
  </div>
</template>

