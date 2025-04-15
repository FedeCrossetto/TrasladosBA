"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeInitializer() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Cuando el componente se monta, verificamos si hay un tema guardado
  useEffect(() => {
    setMounted(true)

    // Si no hay tema definido, intentamos detectar la preferencia del sistema
    if (!theme || theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [theme, setTheme])

  // No renderizamos nada, este componente solo inicializa el tema
  return null
}
