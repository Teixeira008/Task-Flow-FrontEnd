"use client"

import { Task, Priority } from "@/types/task"

const PRIORITY_COLORS: Record<Priority, string> = {
  red: "#ef4444",
  yellow: "#eab308",
  green: "#22c55e",
}

function getPriorityColor(priority?: Priority): string {
  if (!priority) return "#3f3f46"
  return PRIORITY_COLORS[priority]
}

// 🧠 Formata o timestamp em texto legível
// Date.now() retorna algo como 1710000000000 → vira "20/03/2026"
function formatDate(timestamp?: number): string | null {
  if (!timestamp) return null
  return new Date(timestamp).toLocaleDateString("pt-BR")
}

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onClick: (task: Task) => void  // ← abre o detalhe da task
}

export function TaskItem({ task, onToggle, onDelete, onClick }: Props) {
  const borderColor = getPriorityColor(task.priority)
  const dueDate = formatDate(task.dueDate)

  return (
    <li
      onClick={() => onClick(task)}
      className="
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        rounded-xl p-3 cursor-pointer
        transition-opacity
        active:opacity-70
      "
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="flex justify-between items-center">

        {/* Título */}
        <span
          onClick={(e) => {
            e.stopPropagation() // ← evita abrir o detalhe ao clicar no título
            onToggle(task.id)
          }}
          className={`text-sm flex-1 ${
            task.completed
              ? "line-through text-zinc-400 dark:text-zinc-600"
              : "text-zinc-800 dark:text-zinc-100"
          }`}
        >
          {task.title}
        </span>

        {/* Botão deletar */}
        <button
          onClick={(e) => {
            e.stopPropagation() // ← evita abrir o detalhe ao clicar no X
            onDelete(task.id)
          }}
          className="text-zinc-400 hover:text-red-400 dark:text-zinc-600 dark:hover:text-red-400 transition-colors ml-3 text-sm"
        >
          ✕
        </button>

      </div>

      {/* Data de entrega */}
      {dueDate && (
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
          {task.completed ? "Concluída" : `Vence ${dueDate}`}
        </p>
      )}
    </li>
  )
}
