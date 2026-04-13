
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"

type FeedbackItem = {
  userId: string
  email: string
  message: string
  createdAt: number
}

export default function SuportePage() {
  const { session, loading } = useAuth()
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([])
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("taskflow:feedback")
    if (stored) {
      const list: FeedbackItem[] = JSON.parse(stored)
      // 🧠 ordena do mais recente para o mais antigo
      setFeedbacks(list.sort((a, b) => b.createdAt - a.createdAt))
    }
  }, [])

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user) {
      alert("Você precisa estar logado para enviar uma mensagem")
      return
    }

    if (!message.trim()) {
      alert("Por favor, escreva uma mensagem")
      return
    }

    setSubmitting(true)

    try {
      const newFeedback: FeedbackItem = {
        userId: session.user.id,
        email: session.user.email,
        message: message.trim(),
        createdAt: Date.now(),
      }

      const stored = localStorage.getItem("taskflow:feedback") || "[]"
      const list: FeedbackItem[] = JSON.parse(stored)
      list.push(newFeedback)

      localStorage.setItem("taskflow:feedback", JSON.stringify(list))

      // Atualiza a lista de feedback
      setFeedbacks(list.sort((a, b) => b.createdAt - a.createdAt))

      // Limpa o formulário e mostra mensagem de sucesso
      setMessage("")
      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      alert("Erro ao enviar mensagem. Tente novamente.")
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl">

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Suporte</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Envie comentários e sugestões para o suporte
        </p>
      </div>

      {/* Formulário de Feedback */}
      {!loading && session?.user && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 mb-6">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">
            Enviar Comentário
          </h2>

          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-500/20 border border-green-200 dark:border-green-500/50 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300">
                ✓ Mensagem enviada com sucesso!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmitFeedback}>
            {/* Campo de E-mail (desabilitado, apenas para exibição) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Seu E-mail
              </label>
              <input
                type="email"
                value={session.user.email}
                disabled
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-not-allowed text-sm"
                placeholder="seu.email@exemplo.com"
              />
              <p className="text-xs text-zinc-400 mt-1">
                Seu e-mail será utilizado para identificar sua mensagem
              </p>
            </div>

            {/* Campo de Mensagem */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Comentário ou Sugestão
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite seu comentário aqui..."
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm resize-none"
                rows={5}
              />
              <p className="text-xs text-zinc-400 mt-1">
                {message.length} caracteres
              </p>
            </div>

            {/* Botão de Envio */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                {submitting ? "Enviando..." : "Enviar Comentário"}
              </button>
              <button
                type="button"
                onClick={() => setMessage("")}
                disabled={submitting || !message.trim()}
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:cursor-not-allowed text-zinc-800 dark:text-white font-medium rounded-lg transition-colors text-sm"
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Seção de Mensagens Recebidas */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">
          Mensagens Recebidas
        </h2>

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
                          {item.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {item.email}
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
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-9 whitespace-pre-wrap break-words">
                    {item.message}
                  </p>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
