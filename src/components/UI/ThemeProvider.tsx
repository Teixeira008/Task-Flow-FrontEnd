"use client"

import { useEffect } from "react"
import { useTheme } from "@/hooks/useTheme"
import { seedAdmin } from "@/services/auth.service"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  useEffect(() => {
    seedAdmin()
    // Aplica a classe dark no <html> assim que o componente carrega
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return <>{children}</>
}