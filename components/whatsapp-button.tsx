"use client"

import { useState } from "react"
import Link from "next/link"

export function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const message = "Hola! , me gustaría reservar un viaje!"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full p-3 shadow-lg flex items-center justify-center"
      aria-label="WhatsApp"
    >
      {/* Official WhatsApp SVG logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path d="M16.002 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.6-1.72c1.88 1.03 4.01 1.58 6.2 1.58h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.2c-2.01 0-3.98-.53-5.7-1.54l-.41-.24-3.92 1.02 1.05-3.82-.26-.39c-1.09-1.65-1.67-3.57-1.67-5.53 0-5.63 4.58-10.2 10.2-10.2s10.2 4.57 10.2 10.2-4.58 10.2-10.2 10.2zm5.6-7.61c-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.29-.34.44-.51.15-.17.2-.29.3-.48.1-.19.05-.36 0-.51-.05-.15-.71-1.71-.98-2.34-.26-.62-.53-.54-.73-.55-.19-.01-.41-.01-.63-.01-.22 0-.57.08-.87.39-.3.31-1.14 1.11-1.14 2.71 0 1.6 1.17 3.14 1.34 3.36.17.22 2.32 3.7 5.62 4.89.79.28 1.41.45 1.89.58.8.21 1.53.18 2.1.11.64-.09 1.97-.8 2.25-1.57.28-.77.28-1.43.19-1.57-.09-.14-.28-.22-.59-.38z"/>
      </svg>
    </a>
  )
}
