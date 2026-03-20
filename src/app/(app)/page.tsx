"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTasks } from "@/hooks/useTask"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import { TaskList } from "@/components/tasks/TaskList"
import { Task } from "@/types/task"

export default function Home() {
  const router = useRouter()
  const { session, loading: authLoading, handleLogout } = useAuth()
  const { tasks, loading, handleCreate, handleToggle, handleDelete } = useTasks(
    session?.user.id ?? ""
  )
  const { theme, toggleTheme } = useTheme()

  const [input, setInput] = useState("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  useEffect(() => {
    if (!authLoading && !session) {
      router.push("/login")
    }
  }, [authLoading, session, router])

  if (authLoading) return null
  if (!session) return null

  // 🧠 Conta as tasks concluídas filtrando pelo completed = true
  const completedCount = tasks.filter((t) => t.completed).length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    await handleCreate(input.trim())
    setInput("")
  }

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-4 transition-colors">
      <div className="w-full max-w-md mx-auto">

        {/* Header */}
        <header className="flex items-center justify-between mb-6 pt-4">
          <div>
            <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Task<span className="text-violet-600 dark:text-violet-400">Flow</span>
            </span>
            <p className="text-xs text-zinc-400 mt-0.5">
              Olá, {session.user.name} 👋
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Toggle de tema */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors"
              aria-label="Alternar tema"
            >
              <span
                className="absolute top-1 w-4 h-4 rounded-full bg-violet-600 transition-all duration-300"
                style={{ left: theme === "dark" ? "calc(100% - 18px)" : "2px" }}
              />
            </button>

            <button
              onClick={handleLogout}
              className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              Sair
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 mb-1">total</p>
            <p className="text-2xl font-semibold text-zinc-800 dark:text-white">
              {tasks.length}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 mb-1">concluídas</p>
            <p className="text-2xl font-semibold text-violet-600 dark:text-violet-400">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Campo de adicionar task */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nova tarefa..."
            className="
              flex-1 bg-white dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-800
              rounded-xl px-4 py-2.5 text-sm
              text-zinc-800 dark:text-zinc-100
              placeholder-zinc-400 dark:placeholder-zinc-600
              outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500
              transition
            "
          />
          <button
            type="submit"
            className="w-10 h-10 bg-violet-600 hover:bg-violet-500 rounded-xl text-white text-xl font-light transition-colors flex items-center justify-center"
          >
            +
          </button>
        </form>

        {/* Lista */}
        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-zinc-200 dark:bg-zinc-800/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onClick={(task) => setSelectedTask(task)}
          />
        )}

        {/* 🧠 Modal de detalhe — próximo passo! */}
        {selectedTask && (
          <div
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4"
            onClick={() => setSelectedTask(null)}
          >
            <div
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">
                {selectedTask.title}
              </h2>
              <p className="text-sm text-zinc-400">
                Criada em{" "}
                {new Date(selectedTask.createdAt).toLocaleDateString("pt-BR")}
              </p>
              <p className="text-xs text-zinc-300 dark:text-zinc-600 mt-4 text-center">
                Em breve: prioridade, data de entrega e mais...
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
