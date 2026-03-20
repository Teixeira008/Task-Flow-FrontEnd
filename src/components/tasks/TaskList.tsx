"use client"

import { Task } from "@/types/task"
import { TaskItem } from "./TaskItem"

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onClick: (task: Task) => void
}

export function TaskList({ tasks, onToggle, onDelete, onClick }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 dark:text-zinc-600 text-sm">
          Nenhuma tarefa ainda.
        </p>
        <p className="text-zinc-300 dark:text-zinc-700 text-xs mt-1">
          Adicione sua primeira tarefa acima!
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </ul>
  )
}
