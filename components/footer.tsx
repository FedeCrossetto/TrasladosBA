"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t text-sm">
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-colorPrimary-500 to-colorPrimary-600 dark:from-colorPrimary-400 dark:to-colorPrimary-500">
              TrasladosBA
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-snug">
              {t("home.about.description")}
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">{t("contact.title")}</h3>
            <ul className="space-y-1">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 text-colorPrimary-500" />
                <span>
                  {whatsappNumber
                    ? `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 4)} ${whatsappNumber.slice(4, 8)}-${whatsappNumber.slice(8)}`
                    : "+54 11 1234-5678"}
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 text-colorPrimary-500" />
                <span>info@trasladosba.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-colorPrimary-500" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">{t("nav.home")}</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:text-colorPrimary-500 dark:hover:text-colorPrimary-400 text-gray-600 dark:text-gray-400">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="hover:text-colorPrimary-500 dark:hover:text-colorPrimary-400 text-gray-600 dark:text-gray-400">
                  {t("nav.reservations")}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-colorPrimary-500 dark:hover:text-colorPrimary-400 text-gray-600 dark:text-gray-400">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/tarifas" className="hover:text-colorPrimary-500 dark:hover:text-colorPrimary-400 text-gray-600 dark:text-gray-400">
                  {t("nav.rates")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {currentYear} TrasladosBA. {t("footer.rights")}
          </p>
          <div className="flex gap-3">
            <Link href="/privacidad" className="hover:text-colorPrimary-500 dark:hover:text-colorPrimary-400 text-gray-600 dark:text-gray-400">
              {t("footer.privacy")}
            </Link>
            <Link href="/terminos" className="hover:text-colorPrimary-500 dark:hover:text-colorPrimary-400 text-gray-600 dark:text-gray-400">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
