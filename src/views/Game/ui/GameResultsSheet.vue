<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import Sheet from '@/components/shared/Sheet.vue'
import success from '@/assets/images/game/success.png'
import fail from '@/assets/images/game/fail.png'

interface Props {
  open: boolean
  checkNumber: number
  failNumber: number
  earnedAmount?: number
  totalReferrals?: number
  activeReferrals?: number
}

withDefaults(defineProps<Props>(), {
  earnedAmount: 435,
  totalReferrals: 999,
  activeReferrals: 10,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  claim: []
}>()

const handleClaim = () => {
  emit('claim')
  emit('update:open', false)
}
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <template #default>
      <div class="text-[#484C52] space-y-4">
        <h2 class="text-xl text-center font-bold">Результаты игры</h2>

        <!-- Referral Statistics -->
        <div class="grid grid-cols-2 gap-2.5">
          <div class="bg-[#F7F7F7] rounded-lg py-3 px-4 flex flex-col items-start gap-1">
            <div class="flex items-center gap-1">
              <Icons name="user-circle" :size="18" class="text-[#484C52]" />
              <p class="text-lg font-bold">{{ totalReferrals }}</p>
            </div>
            <p class="text-xs text-[#484C52]/50">Всего рефералов</p>
          </div>
          <div class="bg-[#F7F7F7] rounded-lg py-3 px-4 flex flex-col items-start gap-1">
            <div class="flex items-center gap-1">
              <Icons name="user-circle" :size="18" class="text-[#484C52]" />
              <p class="text-lg font-bold text-[#34C759]">{{ activeReferrals }}</p>
            </div>

            <p class="text-xs text-[#484C52]/50">Активных рефералов</p>
          </div>
        </div>
        <!-- Game Results Cards -->
        <div class="grid grid-cols-2 gap-2.5">
          <div
            class="flex flex-col gap-2 items-center justify-center bg-cover bg-center bg-no-repeat py-4 px-4 rounded-xl relative overflow-hidden"
            :style="{ backgroundImage: `url(${success})` }"
          >
            <!-- Festive lights decoration -->
            <div
              class="flex items-center gap-2 mt-2 py-px px-1 bg-white/50 min-w-16 justify-center rounded-full"
            >
              <Icons name="check-strong" :size="13" class="text-[#A4DD9E]" />
              <span class="font-bold text-[#484C52]">{{ checkNumber }}</span>
            </div>
            <p class="uppercase font-bold text-lg text-[#484C52]">Успешных</p>
          </div>
          <div
            class="flex flex-col gap-2 items-center justify-center bg-cover bg-center bg-no-repeat py-4 px-4 rounded-xl relative overflow-hidden"
            :style="{ backgroundImage: `url(${fail})` }"
          >
            <!-- Festive lights decoration -->
            <div
              class="flex items-center gap-2 mt-2 py-px px-1 bg-white/50 min-w-16 justify-center rounded-full"
            >
              <Icons name="x-strong" :size="12" class="text-[#D85252]" />
              <span class="font-bold text-[#484C52]">{{ failNumber }}</span>
            </div>
            <p class="uppercase font-bold text-lg text-[#484C52]">Промахов</p>
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium text-[#484C52]">Заработано</p>
          <div class="flex items-center justify-start gap-1">
            <Icons name="ton" :size="24" />
            <p class="text-2xl font-bold">{{ earnedAmount }} TON</p>
          </div>
        </div>
        <button
          @click="handleClaim"
          class="w-full bg-[#0095EF] rounded-full py-3 px-4 flex items-center justify-center gap-2.5 hover:bg-[#0085DF] transition-colors"
        >
          <Icons name="wallet" :size="20" class="text-white" />
          <span class="font-bold text-white">Забрать {{ earnedAmount }} TON</span>
        </button>
      </div>
    </template>
  </Sheet>
</template>
