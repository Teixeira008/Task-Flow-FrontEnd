"use client"

import { useState } from "react"
import Link from "next/link"
import { recoverPassword } from "@/services/auth.service"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setPassword(null)
    setLoading(true)

    try {
      const found = await recoverPassword(email)
      setPassword(found)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro inesperado")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">

      {/* Glow decorativo */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-violet-600 opacity-10 blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">

        {/* Logo / título */}
        <div className="mb-8 text-center">
          <span className="inline-block text-3xl font-black tracking-tight text-white">
            Task<span className="text-violet-400">Flow</span>
          </span>
          <p className="mt-2 text-sm text-zinc-400">
            Recuperar senha
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-6 shadow-xl">

          {/* Erro */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Senha encontrada */}
          {password && (
            <div className="mb-4 rounded-lg bg-violet-500/10 border border-violet-500/20 px-4 py-3">
              <p className="text-xs text-violet-400 mb-1">Sua senha é:</p>
              <p className="text-sm font-mono font-semibold text-white">{password}</p>
              <p className="text-xs text-zinc-500 mt-2">
                🔒 Em produção, um email seria enviado. Isso é só um mock!
              </p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-sm font-semibold text-white transition-colors"
            >
              {loading ? "Buscando..." : "Recuperar senha"}
            </button>
          </form>
        </div>

        {/* Link para login */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Lembrou a senha?{" "}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Voltar ao login
          </Link>
        </p>

      </div>
    </main>
  )
}
