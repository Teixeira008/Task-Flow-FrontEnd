import { Task } from "@/so-para-teste/src/types/task"

const STORAGE_KEY = "taskflow_tasks"

export function getFromStorage(): Task[] | null {
  if (typeof window === "undefined") return null

  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return null

  return JSON.parse(data)
}

export function saveToStorage(tasks: Task[]) {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}