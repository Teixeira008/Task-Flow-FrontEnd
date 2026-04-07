"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"

// 🧠 Lookup table dos itens de navegação
const navItems = [
  { label: "Dashboard",      href: "/dashboard"      },
  { label: "Configurações",  href: "/configuracoes"  },
  { label: "Suporte",        href: "/suporte"        },
]

export function Sidebar() {
  const pathname = usePathname()
  const { session, handleLogout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="
      fixed left-0 top-0 h-screen w-56
      bg-white dark:bg-zinc-900
      border-r border-zinc-200 dark:border-zinc-800
      flex flex-col
      z-40
    ">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
          Task<span className="text-violet-600 dark:text-violet-400">Flow</span>
        </span>
        <p className="text-xs text-zinc-400 mt-0.5">Painel Admin</p>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          // 🧠 pathname verifica qual página está ativa
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200"
                }
              `}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Rodapé — usuário + tema + sair */}
      <div className="px-3 py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">

        {/* Info do usuário */}
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
            {session?.user.name}
          </p>
          <p className="text-xs text-zinc-400 truncate">{session?.user.email}</p>
        </div>

        {/* Toggle tema */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <span>Tema</span>
          <div className="relative w-8 h-5 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors">
            <span
              className="absolute top-0.5 w-4 h-4 rounded-full bg-violet-600 transition-all duration-300"
              style={{ left: theme === "dark" ? "calc(100% - 18px)" : "2px" }}
            />
          </div>
        </button>

        {/* Sair */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          Sair
        </button>

      </div>
    </aside>
  )
}
