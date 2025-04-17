"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/reservas", label: t("nav.reservations") },
    { href: "/contacto", label: t("nav.contact") },
    { href: "/tarifas", label: t("nav.rates") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-colorPrimary-500 to-colorPrimary-600 dark:from-colorPrimary-400 dark:to-colorPrimary-500">
              TrasladosBA
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-colorPrimary-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Toggle - MODIFICADO */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
            className="px-2 min-w-[60px]"
          >
            <span
              className={`text-sm font-medium ${language === "en" ? "text-colorPrimary-500 font-bold" : "text-gray-500"}`}
            >
              EN
            </span>
            <span className="mx-1 text-gray-400">/</span>
            <span
              className={`text-sm font-medium ${language === "es" ? "text-colorPrimary-500 font-bold" : "text-gray-500"}`}
            >
              ES
            </span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon"   className="hover:bg-primary hover:text-primary-foreground"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium transition-colors hover:text-colorPrimary-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
