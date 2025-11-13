<script setup lang="ts">
import { computed, defineOptions, ref } from 'vue'

import Icons from '@/components/shared/Icons.vue'
import Sheet from '@/components/shared/Sheet.vue'

type LanguageId = 'en' | 'ru' | 'ukr'

defineOptions({ name: 'AppHeader' })

const isSettingsOpen = ref(false)
const selectedLanguage = ref<LanguageId>('ru')
const isSoundEnabled = ref(true)
const isVibrationEnabled = ref(true)

const languageOptions = computed(() => [
  {
    id: 'en' as const,
    label: 'ENG',
    image: new URL('../../assets/images/uk.png', import.meta.url).href,
  },
  {
    id: 'ru' as const,
    label: 'RUS',
    image: new URL('../../assets/images/ru.png', import.meta.url).href,
  },
  {
    id: 'ukr' as const,
    label: 'UKR',
    image: new URL('../../assets/images/ukr.png', import.meta.url).href,
  },
])

const selectLanguage = (id: LanguageId) => {
  selectedLanguage.value = id
}

const setSound = (enabled: boolean) => {
  isSoundEnabled.value = enabled
}

const setVibration = (enabled: boolean) => {
  isVibrationEnabled.value = enabled
}
</script>

<template>
  <header class="flex items-center justify-between px-4 pt-2">
    <button
      class="flex items-start gap-2 rounded-2xl bg-primary p-1.5 px-2 text-sm font-medium text-white"
    >
      <Icons name="wallet" :size="20" />
      Connect wallet
    </button>

    <Sheet v-model:open="isSettingsOpen">
      <template #trigger="{ open }">
        <button class="rounded-full bg-[#023A35] p-2.5 text-white" type="button" @click="open">
          <Icons name="setting" :size="20" />
        </button>
      </template>

      <template #default>
        <div class="space-y-2.5 pt-8 font-raleway text-[#484C52]">
          <div class="flex items-center justify-between gap-2.5 rounded-xl bg-[#F5F5F5] p-1.5">
            <button
              class="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#A79EFF] py-3.5 text-white"
            >
              <Icons name="down-arrow" />
              <span class="font-raleway font-bold">Пополнить</span>
            </button>
            <button
              class="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#E4E4E4] bg-white py-3.5 text-black"
            >
              <span class="font-raleway font-bold">Вывести</span>
              <Icons name="up-arrow" />
            </button>
          </div>

          <h2 class="text-center text-2xl font-bold uppercase">Настройки</h2>

          <div class="space-y-2.5 text-sm font-semibold">
            <div class="flex gap-2 border-b border-[#EFEFEF] pb-2.5">
              <button
                v-for="language in languageOptions"
                :key="language.id"
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 transition"
                :class="
                  selectedLanguage === language.id
                    ? 'bg-[#0095EF] text-white border-[#0095EF]'
                    : 'bg-white text-[#484C52] border-[#E4E4E4]'
                "
                @click="selectLanguage(language.id)"
              >
                <img :src="language.image" :alt="language.label" class="h-5 w-5 rounded-full" />
                {{ language.label }}
              </button>
            </div>

            <div class="flex gap-2 border-b border-[#EFEFEF] pb-2.5">
              <button
                type="button"
                class="flex flex-1 items-center border justify-center gap-2 rounded-full px-3 py-2 transition"
                :class="
                  isSoundEnabled
                    ? 'bg-[#0095EF] text-white border-[#0095EF] '
                    : 'bg-white text-[#484C52] border-[#E4E4E4]'
                "
                @click="setSound(true)"
              >
                <Icons name="sound" :size="20" />
                Со звуком
              </button>
              <button
                type="button"
                class="flex flex-1 items-center border justify-center gap-2 rounded-full px-3 py-2 transition"
                :class="
                  !isSoundEnabled
                    ? 'bg-[#0095EF] text-white border-[#0095EF]'
                    : 'bg-white text-[#484C52] border-[#E4E4E4]'
                "
                @click="setSound(false)"
              >
                <Icons name="muted" :size="20" />
                Без звука
              </button>
            </div>

            <div class="flex gap-2 border-b border-[#EFEFEF] pb-2.5">
              <button
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 transition"
                :class="
                  isVibrationEnabled
                    ? 'bg-[#0095EF] text-white border-[#0095EF]'
                    : 'bg-white text-[#484C52] border-[#E4E4E4]'
                "
                @click="setVibration(true)"
              >
                <Icons name="vibro" :size="20" />
                С вибрацией
              </button>
              <button
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 transition"
                :class="
                  !isVibrationEnabled
                    ? 'bg-[#0095EF] text-white border-[#0095EF]'
                    : 'bg-white text-[#484C52] border-[#E4E4E4]'
                "
                @click="setVibration(false)"
              >
                <Icons name="no-vibro" :size="20" />
                Без вибрации
              </button>
            </div>

            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 rounded-full bg-[#484C52] px-3 py-3 text-base font-semibold text-white transition hover:bg-[#3b3f44]"
            >
              <Icons name="chat-q" :size="20" />
              Поддержка
            </button>
          </div>
        </div>
      </template>
    </Sheet>
  </header>
</template>
