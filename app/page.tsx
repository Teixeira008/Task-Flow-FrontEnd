"use client"

//import { useState } from "react"
import { useTasks } from "@/hooks/useTask"
import { TaskList } from "@/components/TaskList"
import { AddTaskForm } from "@/components/AddTaskform"

export default function Home() {
  const {
    tasks,
    loading,
    handleCreate,
    handleToggle,
    handleDelete,
  } = useTasks()

  

  return (
    <main className="min-h-screen flex justify-center bg-gray-100 p-6">
      <AddTaskForm onCreate={handleCreate} />
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          TaskFlow
        </h1>

        {/* Formulário */}
        
        {loading && (
          <p className="text-center text-gray-500">Carregando...</p>
        )}

        {!loading && (
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