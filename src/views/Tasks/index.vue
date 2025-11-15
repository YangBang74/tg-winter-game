<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from '@/components/shared/Icons.vue'
import task1Image from '@/assets/images/tasks/task-1.png'
import task2Image from '@/assets/images/tasks/task-2.png'
import DailyRewardSheet from './ui/DailyRewardSheet.vue'

interface Task {
  id: number
  image: string
  title: string
  time: string
  timeLabel: string
}

interface TaskItem {
  id: string
  img: string
  title: string
  reward: {
    icon: string
    amount: string
    color: string
  }
  description?: string
  status?: 'completed' | 'in-progress' | 'pending'
}

interface TaskTab {
  id: string
  label: string
  isActive: boolean
}

const tasks = ref<Task[]>([
  {
    id: 1,
    image: task1Image,
    title: 'Ежедневная награда',
    time: '00:00:00',
    timeLabel: 'до следующей награды',
  },
  {
    id: 2,
    image: task2Image,
    title: 'Ежедневная награда',
    time: '00:00:00',
    timeLabel: 'до следующей награды',
  },
])

const tabs = ref<TaskTab[]>([
  {
    id: 'main',
    label: 'Главные',
    isActive: true,
  },
  {
    id: 'other',
    label: 'Другие',
    isActive: false,
  },
])

const mainTasks = ref<TaskItem[]>([
  {
    id: 'quiz',
    img: task1Image,
    title: 'Ответь правильно на 3 вопроса викторины про TON',
    reward: {
      icon: 'snow-small',
      amount: '+0.10',
      color: 'bg-[#0095EF]',
    },
    description: 'Пройдите викторину и ответьте правильно на 3 вопроса о блокчейне TON',
    status: 'pending',
  },
  {
    id: 'daily',
    img: task2Image,
    title: 'Выполни ежедневное задание 3 дня подряд',
    reward: {
      icon: 'star',
      amount: '+1',
      color: 'bg-[#FF9500]',
    },
    description: 'Выполняйте ежедневные задания три дня подряд для получения бонуса',
    status: 'in-progress',
  },
  {
    id: 'game',
    img: task1Image,
    title: 'Сыграй в игру "Собери 5 звёзд"',
    reward: {
      icon: 'star',
      amount: '+100',
      color: 'bg-[#A79EFF]',
    },
    description: 'Соберите 5 звёзд в мини-игре для получения награды',
    status: 'pending',
  },
])

const otherTasks = ref<TaskItem[]>([
  {
    id: 'referral',
    img: task2Image,
    title: 'Пригласи 5 друзей',
    reward: {
      icon: 'snow-small',
      amount: '+50',
      color: 'bg-[#0095EF]',
    },
    description: 'Пригласите 5 друзей по реферальной ссылке',
    status: 'pending',
  },
  {
    id: 'social',
    img: task1Image,
    title: 'Подпишись на канал',
    reward: {
      icon: 'star',
      amount: '+10',
      color: 'bg-[#FF9500]',
    },
    description: 'Подпишитесь на наш Telegram канал',
    status: 'completed',
  },
])

const openedTaskId = ref<string | null>(null)

const activeTab = computed(() => {
  return tabs.value.find((tab) => tab.isActive)?.id || 'main'
})

const currentTasks = computed(() => {
  return activeTab.value === 'main' ? mainTasks.value : otherTasks.value
})

const switchTab = (tabId: string) => {
  tabs.value.forEach((tab) => {
    tab.isActive = tab.id === tabId
  })
  openedTaskId.value = null
}

const toggleTask = (taskId: string) => {
  if (openedTaskId.value === taskId) {
    openedTaskId.value = null
  } else {
    openedTaskId.value = taskId
  }
}

const getIconClass = (taskId: string) => {
  const baseClasses = 'shrink-0 transition-transform duration-200'
  return openedTaskId.value === taskId ? `${baseClasses} rotate-180` : baseClasses
}

const isDailyRewardSheet1Open = ref(false)
const isDailyRewardSheet2Open = ref(false)
</script>

<template>
  <section class="p-4 text-white space-y-2.5">
    <div class="banner p-4 flex justify-center rounded-2xl py-3.5">
      <button class="bg-accent py-2.5 px-[1.0625rem] rounded-full font-bold">Купить рекламу</button>
    </div>
    <h1 class="text-2xl font-bold uppercase text-center">Задачи</h1>

    <DailyRewardSheet v-model:open="isDailyRewardSheet1Open">
      <template #trigger>
        <div
          v-if="tasks[0]"
          class="flex justify-between items-center bg-[#023A35] p-[0.3125rem] rounded-xl gap-2.5 cursor-pointer"
          @click="isDailyRewardSheet1Open = true"
        >
          <img :src="tasks[0].image" alt="task" class="rounded-xl" />
          <div class="flex-1">
            <h3 class="font-bold uppercase">{{ tasks[0].title }}</h3>
            <p class="font-bold text-[#0095EF] leading-none">{{ tasks[0].time }}</p>
            <p class="text-[0.625rem] leading-none">{{ tasks[0].timeLabel }}</p>
          </div>
          <button class="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
            <Icons name="arrow" class="rotate-90" :size="14" />
          </button>
        </div>
      </template>
    </DailyRewardSheet>

    <DailyRewardSheet v-model:open="isDailyRewardSheet2Open">
      <template #trigger>
        <div
          v-if="tasks[1]"
          class="flex justify-between items-center bg-[#023A35] p-[0.3125rem] rounded-xl gap-2.5 cursor-pointer"
          @click="isDailyRewardSheet2Open = true"
        >
          <img :src="tasks[1].image" alt="task" class="rounded-xl" />
          <div class="flex-1">
            <h3 class="font-bold uppercase">{{ tasks[1].title }}</h3>
            <p class="font-bold text-[#0095EF] leading-none">{{ tasks[1].time }}</p>
            <p class="text-[0.625rem] leading-none">{{ tasks[1].timeLabel }}</p>
          </div>
          <button class="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
            <Icons name="arrow" class="rotate-90" :size="14" />
          </button>
        </div>
      </template>
    </DailyRewardSheet>

    <h2 class="text-2xl font-bold uppercase text-center">список заданий</h2>

    <div class="grid grid-cols-2 gap-2.5">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="relative rounded-full py-2.5 cursor-pointer transition-all border"
        :class="tab.isActive ? 'bg-[#023A35] border-[#023A35]' : 'border-white'"
        @click="switchTab(tab.id)"
      >
        <h3 class="text-sm font-bold text-center">{{ tab.label }}</h3>
      </div>
    </div>

    <div class="space-y-2.5">
      <div
        v-for="task in currentTasks"
        :key="task.id"
        class="bg-white/70 rounded-xl overflow-hidden transition-all duration-200"
      >
        <button
          class="w-full flex items-center justify-between p-1.5 pr-3.5 text-left gap-2"
          @click="toggleTask(task.id)"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white">
              <img :src="task.img" alt="task icon" />
            </div>
            <p class="text-sm font-semibold leading-tight text-[#484C52] flex-1">
              {{ task.title }}
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <div
              :class="task.reward.color"
              class="rounded-full px-2.5 py-1 flex items-center gap-1.5"
            >
              <Icons :name="task.reward.icon" :size="12" class="text-white" />
              <span class="text-xs font-bold text-white">{{ task.reward.amount }}</span>
            </div>
            <Icons name="arrow" :class="getIconClass(task.id)" :size="16" class="text-[#484C52]" />
          </div>
        </button>
        <Transition name="accordion">
          <div
            v-if="openedTaskId === task.id && task.description"
            class="mx-3 ml-1.5 mb-3 pt-0 text-[#484C52] border-t border-[#484C52]/20"
          >
            <p class="text-xs leading-relaxed py-1">{{ task.description }}</p>
            <div class="flex gap-2.5">
              <button
                class="flex-1 bg-white text-black rounded-full py-2 font-bold border border-[#E4E4E4]"
              >
                Проверить
              </button>
              <button class="flex-1 bg-[#0095EF] text-white rounded-full py-2 font-bold">
                Перейти
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  background-image: url('@/assets/images/tasks/banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.accordion-enter-active {
  transition: all 0.2s ease-out;
  overflow: hidden;
}

.accordion-leave-active {
  transition: all 0.2s ease-in;
  overflow: hidden;
}

.accordion-enter-from {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.accordion-enter-to {
  max-height: 300px;
  opacity: 1;
}

.accordion-leave-from {
  max-height: 300px;
  opacity: 1;
}

.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
