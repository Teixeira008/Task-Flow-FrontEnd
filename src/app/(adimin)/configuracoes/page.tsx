"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import { getUsers, saveUsers } from "@/services/auth.service"

export default function ConfiguracoesPage() {
  const { session, handleLogout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const [name, setName] = useState(session?.user.name ?? "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [feedback, setFeedback] = useState("")

  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  function showSuccess(msg: string) {
    setSuccessMsg(msg)
    setErrorMsg("")
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  function showError(msg: string) {
    setErrorMsg(msg)
    setSuccessMsg("")
    setTimeout(() => setErrorMsg(""), 3000)
  }

  function handleUpdateName() {
    if (!name.trim()) return showError("Nome não pode ser vazio")
    if (!session) return

    const users = getUsers()
    const updated = users.map((u) =>
      u.id === session.user.id ? { ...u, name: name.trim() } : u
    )
    saveUsers(updated)
    showSuccess("Nome atualizado com sucesso!")
  }

  function handleUpdatePassword() {
    if (!session) return
    if (!currentPassword || !newPassword) return showError("Preencha os dois campos")
    if (newPassword.length < 6) return showError("Nova senha precisa ter ao menos 6 caracteres")

    const users = getUsers()
    const user = users.find((u) => u.id === session.user.id)

    if (!user) return showError("Usuário não encontrado")
    if (user.passwordHash !== currentPassword) return showError("Senha atual incorreta")

    const updated = users.map((u) =>
      u.id === session.user.id ? { ...u, passwordHash: newPassword } : u
    )
    saveUsers(updated)
    setCurrentPassword("")
    setNewPassword("")
    showSuccess("Senha atualizada com sucesso!")
  }

  function handleSendFeedback() {
    if (!feedback.trim()) return showError("Escreva algo antes de enviar")

    // 🧠 No mock, só salvamos no localStorage
    const key = "taskflow:feedback"
    const existing = localStorage.getItem(key)
    const list = existing ? JSON.parse(existing) : []
    list.push({
      userId: session?.user.id,
      name: session?.user.name,
      message: feedback.trim(),
      createdAt: Date.now(),
    })
    localStorage.setItem(key, JSON.stringify(list))

    setFeedback("")
    showSuccess("Feedback enviado! Obrigado 🙏")
  }

  return (
    <div className="max-w-xl space-y-6">

      {/* Título */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Configurações</h1>
        <p className="text-sm text-zinc-400 mt-1">Gerencie sua conta e preferências</p>
      </div>

      {/* Feedback global */}
      {successMsg && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-500">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      {/* Informações da conta */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Informações da conta
        </h2>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400 uppercase tracking-wider">Email</label>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 rounded-xl">
            {session?.user.email}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400 uppercase tracking-wider">Nome</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
            />
            <button
              onClick={handleUpdateName}
              className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>

      {/* Trocar senha */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Trocar senha
        </h2>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400 uppercase tracking-wider">Senha atual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400 uppercase tracking-wider">Nova senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mín. 6 caracteres"
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
        </div>

        <button
          onClick={handleUpdatePassword}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Atualizar senha
        </button>
      </div>

      {/* Tema */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Tema</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              {theme === "dark" ? "Modo escuro ativado" : "Modo claro ativado"}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="relative w-10 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors"
          >
            <span
              className="absolute top-1 w-4 h-4 rounded-full bg-violet-600 transition-all duration-300"
              style={{ left: theme === "dark" ? "calc(100% - 18px)" : "2px" }}
            />
          </button>
        </div>
      </div>

      {/* Suporte / Feedback */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Suporte & Feedback
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Deixe sua opinião ou reporte um problema
          </p>
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Escreva sua mensagem aqui..."
          rows={4}
          className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition resize-none"
        />

        <button
          onClick={handleSendFeedback}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Enviar feedback
        </button>
      </div>

      {/* Zona de perigo */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-red-200 dark:border-red-500/20 p-5">
        <h2 className="text-sm font-semibold text-red-500 mb-1">Zona de perigo</h2>
        <p className="text-xs text-zinc-400 mb-4">
          Ao sair, você precisará fazer login novamente.
        </p>
        <button
          onClick={handleLogout}
          className="w-full py-2.5 text-red-500 border border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium rounded-xl transition-colors"
        >
          Sair da conta
        </button>
      </div>

    </div>
  )
}
