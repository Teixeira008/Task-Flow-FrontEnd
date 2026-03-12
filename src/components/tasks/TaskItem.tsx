"use client"

import { Task } from "@/types/task"

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="p-3 border rounded-lg flex justify-between items-center">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500"
      >
        ✕
      </button>
    </li>
  )
}