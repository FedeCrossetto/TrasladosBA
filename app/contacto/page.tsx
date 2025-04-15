"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const { t } = useLanguage()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const whatsappNumber = "5491168877949"
    const text = `
*Nuevo mensaje desde TransporteBA* 🚖

*Nombre:* ${name}
*Teléfono:* ${phone}
*Mensaje:* ${message || "-"}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">{t("contact.title")}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t("contact.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        <div className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{t("contact.title")}</CardTitle>
              <CardDescription>{t("contact.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("contact.phone")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">+54 11 1234-5678</p>
                  <p className="text-gray-600 dark:text-gray-400">+54 11 8765-4321</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("contact.email")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">info@trasladosba.com</p>
                  <p className="text-gray-600 dark:text-gray-400">reservas@trasladosba.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("contact.address")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Buenos Aires, Argentina</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("contact.hours")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t("contact.hours.value")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{t("contact.title")}</CardTitle>
              <CardDescription>{t("contact.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("form.name")}</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">{t("form.phone")}</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">{t("form.message")}</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  {t("form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
