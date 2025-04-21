"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Loader2 } from "lucide-react"
import { createReservation } from "@/services/reservation-service"

export default function ReservationsPage() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      await createReservation({
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        pickup: formData.get("pickup") as string,
        destination: formData.get("destination") as string,
        // Cambia esto según lo que espera tu backend:
        // datetime: formData.get("datetime") as string,
        datetime: formData.get("datetime") ? (formData.get("datetime") as string).split("T")[0] : "",
        passengers: Number.parseInt(formData.get("passengers") as string, 10),
        bags : Number.parseInt(formData.get("bags") as string, 10),
        flight_number: formData.get("flight_number") as string,
        message: (formData.get("message") as string) || undefined,
      })

      // WhatsApp integration
      const name = formData.get("name")
      const phone = formData.get("phone")
      const pickup = formData.get("pickup")
      const destination = formData.get("destination")
      const datetime = formData.get("datetime")
      const passengers = formData.get("passengers")
      const bags = formData.get("bags")
      const flight_number = formData.get("flight_number")
      const message = formData.get("message")

      // Format WhatsApp message
      const whatsappMessage =
        `Nueva solicitud de traslado:\n\n` +
        `Nombre: ${name}\n` +
        `Teléfono: ${phone}\n` +
        `Origen: ${pickup}\n` +
        `Destino: ${destination}\n` +
        `Fecha y hora: ${datetime}\n` +
        `Pasajeros: ${passengers}\n` +
        `Cantidad de Valijas (Opcional): ${bags}\n` +
        `Número de vuelo (Opcional):: ${flight_number}\n` +
        (message ? `Mensaje: ${message}` : "");

      // Replace with your WhatsApp number (with country code, no + or spaces)
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");

      setIsSubmitted(true)
      if (formRef.current) {
        formRef.current.reset()
      }

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar la reserva")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">{t("reservations.title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("reservations.subtitle")}</p>
        </div>

        {isSubmitted && (
          <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-600 dark:text-green-400">{t("form.success")}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
            <AlertDescription className="text-red-600 dark:text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{t("reservations.title")}</CardTitle>
            <CardDescription>{t("reservations.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("form.name")}</Label>
                  <Input id="name" name="name" required />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="email">{t("form.email")}</Label>
                  <Input id="email" name="email" type="email" required />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("form.phone")}</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup">{t("form.pickup")}</Label>
                  <Input id="pickup" name="pickup" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">{t("form.destination")}</Label>
                  <Input id="destination" name="destination" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="datetime">{t("form.date")}</Label>
                  <Input id="datetime" name="datetime" type="datetime-local" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">{t("form.passengers")}</Label>
                  <Input id="passengers" name="passengers" type="number" min="1" required />
                </div>
                {/* Add luggage field */}
                <div className="space-y-2">
                  <Label htmlFor="luggage">{t("form.luggage")}</Label>
                  <Input id="luggage" name="luggage" type="number" min="0" />
                </div>
                {/* Add flight number field */}
                <div className="space-y-2">
                  <Label htmlFor="flight_number">{t("form.flight")}</Label>
                  <Input id="flight_number" name="flight_number" type="text" />
                </div>

              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea id="message" name="message" rows={4} />
              </div>

              <Button
                type="submit"
                className="w-full bg-colorPrimary-500 hover:bg-colorPrimary-600 text-black"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  t("form.submit")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
