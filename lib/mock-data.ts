import { Task } from "@/types/task"

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Estudar Next.js",
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "Aprender arquitetura limpa",
    completed: false,
    createdAt: Date.now(),
  },
]