"use client"

import { useEffect, useState } from "react"
import { Task } from "@/types/task"
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "@/services/task.service"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    setLoading(true)
    const data = await getTasks()
    setTasks(data)
    setLoading(false)
  }

  async function handleCreate(title: string) {
    const newTask = await createTask(title)
    setTasks((prev) => [newTask, ...prev])
  }

  async function handleToggle(id: string) {
    await toggleTask(id)
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  async function handleDelete(id: string) {
    await deleteTask(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return {
    tasks,
    loading,
    loadTasks,
    handleCreate,
    handleToggle,
    handleDelete,
  }
}