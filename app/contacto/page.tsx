"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function ContactPage() {
  const { t } = useLanguage()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      setMapLoaded(true)
    }, 5000) // si no carga en 5s, ocultamos el loader igual

    return () => clearTimeout(fallbackTimeout)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    console.log('whatsap number',whatsappNumber);

    const text = `
*Nuevo mensaje desde TransporteBA* 🚖

*Nombre:* ${name}
*Teléfono:* ${phone}
*Mensaje:* ${message || "-"}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">{t("contact.title")}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("contact.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Mapa */}
        <div className="h-full">
          <Card className="h-full overflow-hidden">
            <CardHeader>
              <CardTitle>{t("contact.zone.title")}</CardTitle>
              <CardDescription>{t("contact.zone.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] px-4 pb-4">
              <div className="w-full h-full overflow-hidden rounded-md relative">
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center text-gray-500 text-sm z-10">
                    {t("contact.map.loading")}
                  </div>
                )}
                <iframe
                  title="Ubicación TransporteBA"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13129.05730842594!2d-58.4173096!3d-34.6036844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb28e4c2b3f7%3A0xb634f6dbd9b04e09!2sBuenos%20Aires!5e0!3m2!1ses-419!2sar!4v1713216791702!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  className={`${mapLoaded ? "block" : "hidden"}`}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  onError={() => setMapLoaded(true)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formulario */}
        <div className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{t("contact.help.title")}</CardTitle>
              <CardDescription>{t("contact.help.subtitle")}</CardDescription>
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

                <Button
                  type="submit"
                  className="w-full bg-colorPrimary-500 hover:bg-colorPrimary-600 text-black"
                >
                  {t("form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
