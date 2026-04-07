"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { session, loading } = useAuth()

  // 🧠 Proteção de rota admin
  // Se não está logado → vai para login
  // Se está logado mas não é admin → vai para home
  useEffect(() => {
    if (!loading && !session) {
      router.push("/login")
      return
    }
    if (!loading && session && session.user.role !== "admin") {
      router.push("/")
    }
  }, [loading, session, router])

  if (loading) return null
  if (!session || session.user.role !== "admin") return null

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 transition-colors">
      <Sidebar />

      {/* Conteúdo fica à direita da sidebar (w-56 = 224px) */}
      <main className="ml-56 p-8">
        {children}
      </main>
    </div>
  )
}
