"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { getRates } from "@/services/rates-service"
import type { Rate } from "@/types/supabase"

export default function RatesPage() {
  const { t, language } = useLanguage()
  const [rates, setRates] = useState<Rate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRates() {
      try {
        const data = await getRates()
        setRates(data)
      } catch (error) {
        console.error("Error loading rates:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRates()
  }, [])

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">{t("rates.title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("rates.subtitle")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("rates.title")}</CardTitle>
            <CardDescription>{t("rates.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-500 border-r-transparent"></div>
                <p className="mt-4">Cargando tarifas...</p>
              </div>
            ) : (
              <Table>
                <TableCaption>{t("rates.note")}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("rates.origin")}</TableHead>
                    <TableHead>{t("rates.destination")}</TableHead>
                    <TableHead className="text-right">{t("rates.price")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rates.map((rate) => (
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

        <Alert className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900">
          <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-600 dark:text-yellow-400">{t("rates.note")}</AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
