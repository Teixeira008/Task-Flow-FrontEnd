
"use client"

import { useEffect, useState } from "react"

type FeedbackItem = {
  userId: string
  name: string
  message: string
  createdAt: number
}

export default function SuportePage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("taskflow:feedback")
    if (stored) {
      const list: FeedbackItem[] = JSON.parse(stored)
      // 🧠 ordena do mais recente para o mais antigo
      setFeedbacks(list.sort((a, b) => b.createdAt - a.createdAt))
    }
  }, [])

  return (
    <div className="max-w-2xl">

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Suporte</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Mensagens enviadas pelos usuários
        </p>
      </div>

      {/* Lista de feedbacks */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">

        {feedbacks.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-zinc-400 text-sm">Nenhuma mensagem ainda.</p>
            <p className="text-zinc-500 text-xs mt-1">
              As mensagens enviadas pelos usuários aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {feedbacks.map((item, index) => (
              <div key={index} className="px-5 py-4">

                {/* Header da mensagem */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                        {item.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Mensagem */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-9">
                  {item.message}
                </p>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  )
}
