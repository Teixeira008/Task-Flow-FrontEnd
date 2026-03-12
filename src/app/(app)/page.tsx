"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTasks } from "@/hooks/useTask"
import { useAuth } from "@/hooks/useAuth"
import { TaskList } from "@/components/tasks/TaskList"
import { AddTaskForm } from "@/components/tasks/AddTaskform"

export default function Home() {
  const router = useRouter()
  const { session, loading: authLoading, handleLogout } = useAuth()
  const { tasks, loading, handleCreate, handleToggle, handleDelete } = useTasks()

  // 🧠 CONCEITO: proteção de rota
  // Se terminou de checar auth e não tem sessão → manda para login
  useEffect(() => {
    if (!authLoading && !session) {
      router.push("/login")
    }
  }, [authLoading, session, router])

  // Enquanto verifica auth, mostra tela em branco (evita "flash" de conteúdo)
  if (authLoading) return null

  // Se não tem sessão, não renderiza nada (o useEffect já redireciona)
  if (!session) return null

  return (
    <main className="min-h-screen bg-zinc-950 p-4">

      {/* Glow decorativo */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full bg-violet-600 opacity-5 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">

        {/* Header */}
        <header className="flex items-center justify-between mb-8 pt-4">
          <div>
            <span className="text-2xl font-black tracking-tight text-white">
              Task<span className="text-violet-400">Flow</span>
            </span>
            <p className="text-xs text-zinc-500 mt-0.5">
              Olá, {session.user.name} 👋
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800"
          >
            Sair
          </button>
        </header>

        {/* Adicionar tarefa */}
        <div className="mb-6">
          <AddTaskForm onCreate={handleCreate} />
        </div>

        {/* Lista */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-zinc-800/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}

      </div>
    </main>
  )
}
