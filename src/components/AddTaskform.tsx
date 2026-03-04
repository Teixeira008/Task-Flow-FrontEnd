"use client"

import { useState } from "react"

type Props = {
  onCreate: (title: string) => Promise<void>
}

export function AddTaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim()) return

    await onCreate(title)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 rounded-lg"
      >
        +
      </button>
    </form>
  )
}