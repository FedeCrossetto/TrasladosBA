"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Plane, Map, Clock, Shield, CreditCard, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getFeaturedRates } from "@/services/rates-service"
import type { Rate } from "@/types/supabase"

export default function Home() {
  const { t } = useLanguage()
  const [featuredRates, setFeaturedRates] = useState<Rate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedRates() {
      try {
        const data = await getFeaturedRates(4)
        setFeaturedRates(data)
      } catch (error) {
        console.error("Error loading featured rates:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedRates()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0">
          <img
            src="/images/business-man.png"
            alt="Servicio de traslados ejecutivos en Buenos Aires"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">{t("home.title")}</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">{t("home.subtitle")}</p>
            <Link href="/reservas">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                {t("home.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN DE TARIFAS DESTACADAS */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Nuestras Tarifas</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Precios referenciales para los traslados más solicitados
            </p>
          </div>

          <Card className="border-yellow-200 dark:border-yellow-900/50">
            <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-100 dark:border-yellow-900/30">
              <CardTitle>Tarifas Destacadas</CardTitle>
              <CardDescription>Precios referenciales para los traslados más solicitados</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-500 border-r-transparent"></div>
                  <p className="mt-4">Cargando tarifas...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Origen</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featuredRates.map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell className="font-medium">{rate.origin}</TableCell>
                        <TableCell>{rate.destination}</TableCell>
                        <TableCell className="text-right">${rate.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Link href="/tarifas">
              <Button variant="outline" className="group">
                Ver todas las tarifas
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("home.services.title")}</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                <Plane className="h-7 w-7 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.services.airport.title")}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t("home.services.airport.description")}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                <Car className="h-7 w-7 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.services.city.title")}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t("home.services.city.description")}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                <Map className="h-7 w-7 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.services.tourism.title")}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t("home.services.tourism.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("home.about.title")}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t("home.about.description")}</p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Puntualidad</h3>
                    <p className="text-gray-600 dark:text-gray-400">Siempre a tiempo, respetando su agenda.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Seguridad</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Conductores profesionales y vehículos en perfectas condiciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Facilidad de pago</h3>
                    <p className="text-gray-600 dark:text-gray-400">Múltiples opciones de pago para su comodidad.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-yellow-500/20 dark:bg-yellow-900/30 z-10 rounded-lg"></div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Servicio de traslados en Buenos Aires"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-500 dark:bg-yellow-600">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">¿Necesita un traslado?</h2>
          <p className="text-xl mb-8 text-black/80 max-w-2xl mx-auto">
            Contáctenos ahora y coordinaremos su viaje de la manera más conveniente para usted.
          </p>
          <Link href="/reservas">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
              {t("home.cta")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
