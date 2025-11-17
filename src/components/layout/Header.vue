<script setup lang="ts">
import { computed, defineOptions, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Icons from '@/components/shared/Icons.vue'
import Sheet from '@/components/shared/Sheet.vue'
import { SUPPORT_LOCALES, setI18nLanguage, type AppLocale } from '@/plugins/i18n'

defineOptions({ name: 'AppHeader' })

const isSettingsOpen = ref(false)
const isSoundEnabled = ref(true)
const isVibrationEnabled = ref(true)

const { t, locale } = useI18n()

const flagSources: Record<AppLocale, string> = {
  en: new URL('@/assets/images/uk.png', import.meta.url).href,
  ru: new URL('@/assets/images/ru.png', import.meta.url).href,
  uk: new URL('@/assets/images/ukr.png', import.meta.url).href,
}

const currentLocale = computed<AppLocale>({
  get: () => locale.value as AppLocale,
  set: (value) => {
    if (locale.value !== value) {
      locale.value = value
      setI18nLanguage(value)
    }
  },
})

const languageOrder: AppLocale[] = ['en', 'ru', 'uk']

const languageOptions = computed(() =>
  languageOrder
    .filter((id) => SUPPORT_LOCALES.includes(id))
    .map((id) => ({
      id,
      label: t(`settings.languages.${id}`),
      image: flagSources[id],
    })),
)

const selectLanguage = (id: AppLocale) => {
  currentLocale.value = id
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
      class="flex items-start gap-2 rounded-2xl bg-primary py-2 px-2 text-sm font-medium text-white"
    >
      <Icons name="wallet" :size="20" />
      {{ t('header.connectWallet') }}
    </button>

    <Sheet v-model:open="isSettingsOpen">
      <template #trigger="{ open }">
        <button
          class="rounded-full bg-[#484C52] p-2.5 z-100 text-white flex items-center gap-2"
          type="button"
          @click="open"
        >
          <Icons name="setting" :size="20" />
          <span class="text-sm font-medium">Настройки</span>
        </button>
      </template>

      <template #default>
        <div class="space-y-2.5 pt-10 font-raleway text-[#484C52]">
          <div class="flex items-center justify-between gap-2.5 rounded-xl bg-[#F5F5F5] p-1.5">
            <button
              class="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#A79EFF] py-2 text-white"
            >
              <Icons name="down-arrow" />
              <span class="font-raleway font-bold">{{ t('settings.actions.deposit') }}</span>
            </button>
            <button
              class="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#E4E4E4] bg-white py-2 text-[#484C52]"
            >
              <span class="font-raleway font-bold">{{ t('settings.actions.withdraw') }}</span>
              <Icons name="up-arrow" />
            </button>
          </div>

          <h2 class="text-center text-2xl font-bold uppercase">{{ t('settings.title') }}</h2>

          <div class="space-y-2.5 text-sm font-semibold">
            <div class="flex gap-2 border-b border-[#EFEFEF] pb-2.5">
              <button
                v-for="language in languageOptions"
                :key="language.id"
                type="button"
                class="flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 transition"
                :class="
                  currentLocale === language.id
                    ? 'bg-[#0095EF] text-white border-[#0095EF]'
                    : 'bg-white text-[#484C52] border-[#E4E4E4]'
                "
                @click="selectLanguage(language.id)"
              >
                <img :src="language.image" :alt="language.label" class="h-5 aspect-[4/3] rounded-sm" />
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
                {{ t('settings.sound.on') }}
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
                {{ t('settings.sound.off') }}
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
                {{ t('settings.vibration.on') }}
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
                {{ t('settings.vibration.off') }}
              </button>
            </div>

            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 rounded-full bg-[#484C52] px-3 py-3 text-base font-semibold text-white transition hover:bg-[#3b3f44]"
            >
              <Icons name="chat-q" :size="20" />
              {{ t('settings.support') }}
            </button>
          </div>
        </div>
      </template>
    </Sheet>
  </header>
</template>
