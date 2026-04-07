"use client"

import { useEffect, useState } from "react"
import { getUsers } from "@/services/auth.service"
import { User } from "@/types/user"

type Stats = {
  totalUsers: number
  totalTasks: number
  completedTasks: number
  pendingTasks: number
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  function loadStats() {
    const allUsers = getUsers()

    // 🧠 Para cada usuário, lê as tasks do localStorage usando o userId
    let totalTasks = 0
    let completedTasks = 0

    allUsers.forEach((user) => {
      const stored = localStorage.getItem(`taskflow:tasks:${user.id}`)
      const tasks = stored ? JSON.parse(stored) : []
      totalTasks += tasks.length
      completedTasks += tasks.filter((t: { completed: boolean }) => t.completed).length
    })

    setUsers(allUsers.filter((u) => u.role === "user")) // só usuários comuns
    setStats({
      totalUsers: allUsers.filter((u) => u.role === "user").length,
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks,
    })
  }

  const statCards = [
    { label: "Usuários",         value: stats.totalUsers,     color: "text-violet-600 dark:text-violet-400" },
    { label: "Tasks totais",     value: stats.totalTasks,     color: "text-zinc-800 dark:text-white"        },
    { label: "Concluídas",       value: stats.completedTasks, color: "text-green-600 dark:text-green-400"   },
    { label: "Pendentes",        value: stats.pendingTasks,   color: "text-yellow-600 dark:text-yellow-400" },
  ]

  return (
    <div className="max-w-4xl">

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Dashboard</h1>
        <p className="text-sm text-zinc-400 mt-1">Visão geral da aplicação</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800"
          >
            <p className="text-xs text-zinc-400 mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Tabela de usuários */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Usuários cadastrados
          </h2>
        </div>

        {users.length === 0 ? (
          <p className="text-center text-zinc-400 text-sm py-8">
            Nenhum usuário cadastrado ainda.
          </p>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {users.map((user) => {
              const stored = localStorage.getItem(`taskflow:tasks:${user.id}`)
              const tasks = stored ? JSON.parse(stored) : []
              const completed = tasks.filter((t: { completed: boolean }) => t.completed).length

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  {/* Avatar + info */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {user.name}
                      </p>
                      <p className="text-xs text-zinc-400">{user.email}</p>
                    </div>
                  </div>

                  {/* Tasks do usuário */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {tasks.length} tasks
                    </p>
                    <p className="text-xs text-zinc-400">
                      {completed} concluídas
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
