"use client"

import { useEffect, useState } from "react"

export function useTheme() {
  // Começa com "dark" como padrão
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Quando o app carrega, verifica se usuário já escolheu um tema antes
    const saved = localStorage.getItem("taskflow:theme") as "light" | "dark" | null
    
    if (saved) {
      // Tinha preferência salva → usa ela
      apply(saved)
    } else {
      // Nunca escolheu → verifica preferência do sistema operacional
      // window.matchMedia detecta se o SO está em modo escuro
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      apply(prefersDark ? "dark" : "light")
    }
  }, [])

  function apply(newTheme: "light" | "dark") {
    setTheme(newTheme)
    localStorage.setItem("taskflow:theme", newTheme)
    
    // Adiciona ou remove a classe "dark" no <html>
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  function toggleTheme() {
    // Se está dark → vai pra light, e vice-versa
    apply(theme === "dark" ? "light" : "dark")
  }

  return { theme, toggleTheme }
}