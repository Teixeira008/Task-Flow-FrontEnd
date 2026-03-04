"use client"

import { Task } from "@/so-para-teste/src/types/task"
import { TaskItem } from "./TaskItem"

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Nenhuma tarefa ainda.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}