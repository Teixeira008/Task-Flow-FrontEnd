import { Task } from "@/types/task"
//import { mockTasks } from "@/lib/mock-data" 
//import { getFromStorage, saveToStorage } from "@/lib/storage"



function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// entender o getStoredtasks, função para ler
function getStoredTasks(userId: string): Task[] {
  const stored = localStorage.getItem(`taskflow:tasks:${userId}`)
  return stored ? JSON.parse(stored) : []
}

// entender o savetasks 
function saveTasks(tasks: Task[], userId: string) {
  localStorage.setItem(`taskflow:tasks:${userId}`, JSON.stringify(tasks))
}

export async function getTasks(userId: string): Promise<Task[]> {
  await delay(500)
  return getStoredTasks(userId)
}

export async function createTask(title: string, userId: string): Promise<Task> {
  await delay(500)
  
  const tasks = getStoredTasks(userId)
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  }

  const updatedTasks = [...tasks, newTask]

  saveTasks(updatedTasks, userId)

  return newTask
}

export async function updateTask(id: string, userId: string, title: string): Promise<void> {
  const tasks = getStoredTasks(userId)
  
  const updatedTasks = tasks.map((task: Task) =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  )
  saveTasks(updatedTasks, userId)

  
}

export async function toggleTask(id: string, userId: string): Promise<void> {
  await delay(500)
  const tasks = getStoredTasks(userId)
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
  saveTasks(updatedTasks, userId)
}

export async function deleteTask(id: string, userId: string): Promise<void> {
  await delay(500)
  const tasks = getStoredTasks(userId)
  const updatedTasks = tasks.filter((task: { id: string }) => task.id !== id)
  saveTasks(updatedTasks, userId)
}