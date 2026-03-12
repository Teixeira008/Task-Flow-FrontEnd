"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function RegisterPage() {
  const router = useRouter()
  const { handleRegister } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // 🧠 Validação no frontend antes de chamar o service
    if (password !== confirm) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      setError("Senha precisa ter ao menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      await handleRegister(name, email, password)
      router.push("/")
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
            Crie sua conta gratuitamente
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-6 shadow-xl">

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Nome
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
              />
            </div>

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

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mín. 6 caracteres"
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Confirmar senha
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-sm font-semibold text-white transition-colors mt-2"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>

          </form>
        </div>

        {/* Link para login */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Entrar
          </Link>
        </p>

      </div>
    </main>
  )
}
