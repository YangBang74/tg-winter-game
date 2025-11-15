export type SpinnerResult = { id: number | string; image: string; title: string; price: number }
export type TaskStatus = 'done' | 'progress' | 'todo'

export interface TaskItem {
  id: string
  icon: string
  title: string
  status: TaskStatus
}

export const TASK_STATUS_META: Record<TaskStatus, { color: string; background: string }> = {
  done: { color: '#A4DD9E', background: 'rgba(164, 221, 158, 0.15)' },
  progress: { color: '#0095EF', background: 'rgba(0, 149, 239, 0.1)' },
  todo: { color: '#D85252', background: 'rgba(216, 82, 82, 0.1)' },
}
