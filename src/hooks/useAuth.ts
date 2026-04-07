// /hooks/useAuth.ts
"use client"

import { useState, useEffect } from "react"
import { Session } from "@/types/user"
import { login, logout, register, getSession } from "@/services/auth.service"

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // 🧠 CONCEITO: ao carregar o app, verificamos se já tem sessão salva
  // É como "lembrar" que o usuário já estava logado
  useEffect(() => {
    const stored = getSession()
    setSession(stored)
    setLoading(false)
  }, [])

  async function handleLogin(email: string, password: string) {
    const session = await login(email, password)
    setSession(session)
    return session
  }

  async function handleRegister(name: string, email: string, password: string) {
    const session = await register(name, email, password)
    setSession(session)
  }

  function handleLogout() {
    logout()
    setSession(null)
  }

  return {
    session,
    loading,
    isAuthenticated: !!session, // 🧠 !! transforma qualquer valor em boolean
    handleLogin,
    handleRegister,
    handleLogout,
  }
}