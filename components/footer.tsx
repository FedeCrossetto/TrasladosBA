"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500">
              TrasladosBA
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t("home.about.description")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact.title")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span>info@trasladosba.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("nav.home")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reservas"
                  className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  {t("nav.reservations")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifas"
                  className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  {t("nav.rates")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} TrasladosBA. {t("footer.rights")}
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="/privacidad"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terminos"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
