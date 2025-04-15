"use client"

import type React from "react"

import { useState } from "react"
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
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        pickup: formData.get("pickup") as string,
        destination: formData.get("destination") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
        passengers: Number.parseInt(formData.get("passengers") as string, 10),
        message: (formData.get("message") as string) || undefined,
      })

      setIsSubmitted(true)
      e.currentTarget.reset()

      // Reset form after 5 seconds
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("form.name")}</Label>
                  <Input id="name" name="name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("form.email")}</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

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
                  <Label htmlFor="date">{t("form.date")}</Label>
                  <Input id="date" name="date" type="date" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">{t("form.time")}</Label>
                  <Input id="time" name="time" type="time" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">{t("form.passengers")}</Label>
                  <Input id="passengers" name="passengers" type="number" min="1" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea id="message" name="message" rows={4} />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
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
