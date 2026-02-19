import { Task } from "@/types/task"
import { mockTasks } from "@/lib/mock-data"
import { getFromStorage, saveToStorage } from "@/lib/storage"


let tasks: Task[] = getFromStorage() ?? [...mockTasks]

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getTasks(): Promise<Task[]> {
  await delay(500)
  return tasks
}

export async function createTask(title: string): Promise<Task> {
  await delay(500)

  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  }

  tasks.unshift(newTask)
  saveToStorage(tasks)
  return newTask
}

export async function toggleTask(id: string): Promise<void> {
  await delay(500)

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
  saveToStorage(tasks)
}

export async function deleteTask(id: string): Promise<void> {
  await delay(500)

  tasks = tasks.filter((task) => task.id !== id)
  saveToStorage(tasks)
} 