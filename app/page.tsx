"use client"

import { useState } from "react"
import { useTasks } from "@/hooks/useTask"

export default function Home() {
  const {
    tasks,
    loading,
    handleCreate,
    handleToggle,
    handleDelete,
  } = useTasks()

  const [newTask, setNewTask] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!newTask.trim()) return

    await handleCreate(newTask)
    setNewTask("")
  }

  return (
    <main className="min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          TaskFlow
        </h1>

        {/* Formulário */}
        <form onSubmit={onSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nova tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 rounded-lg"
          >
            +
          </button>
        </form>

        {loading && (
          <p className="text-center text-gray-500">Carregando...</p>
        )}

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 border rounded-lg flex justify-between items-center"
            >
              <span
                onClick={() => handleToggle(task.id)}
                className={`cursor-pointer ${
                  task.completed
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {task.title}
              </span>

              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}