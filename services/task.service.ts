import { Task } from "@/types/task"
import { mockTasks } from "@/lib/mock-data"
import { getFromStorage, saveToStorage } from "@/lib/storage"


let tasks: Task[] = getFromStorage() ?? [...mockTasks]

const STORAGE_KEY = "taskflow:tasks"

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// entender o getStoredtasks, função para ler
function getStoredTasks() {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return mockTasks
  }

  return JSON.parse(stored)
}

// entender o savetasks 
function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export async function getTasks(): Promise<Task[]> {
  await delay(500)
  return getStoredTasks()
}

export async function createTask(title: string): Promise<Task> {
  await delay(500)
  
  const tasks = getStoredTasks()
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  }

  const updatedTasks = [...tasks, newTask]

  saveTasks(updatedTasks)

  return newTask
}

export async function updateTask(id: string, title: string): Promise<void> {
  const tasks = getStoredTasks()
  
  const updatedTasks = tasks.map((task: Task) =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  )
  saveTasks(updatedTasks)
  const updatedTask = updatedTasks.find((task: Task) => task.id === id)
  return updatedTasks

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
  const tasks = getStoredTasks()
  const updatedTasks = tasks.filter((task: { id: string }) => task.id !== id)
  saveTasks(updatedTasks)
}
