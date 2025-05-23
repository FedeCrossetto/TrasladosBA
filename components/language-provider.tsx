"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en"

type Translations = {
  [key: string]: {
    es: string
    en: string
  }
}

// Traducciones básicas
const translations: Translations = {
  // Navbar
  "nav.home": {
    es: "Inicio",
    en: "Home",
  },
  "nav.reservations": {
    es: "Reservas",
    en: "Reservations",
  },
  "nav.contact": {
    es: "Contacto",
    en: "Contact",
  },
  "nav.rates": {
    es: "Tarifas",
    en: "Rates",
  },
  // Home
  "home.title": {
    es: "Traslados en Buenos Aires",
    en: "Transfers in Buenos Aires",
  },
  "home.subtitle": {
    es: "Servicio premium de traslados en Buenos Aires",
    en: "Premium transfer service in Buenos Aires",
  },
  "home.cta": {
    es: "Reservar ahora",
    en: "Book now",
  },
  "home.services.title": {
    es: "Nuestros Servicios",
    en: "Our Services",
  },
  "home.services.airport.title": {
    es: "Traslados al Aeropuerto",
    en: "Airport Transfers",
  },
  "home.services.airport.description": {
    es: "Servicio de traslado desde y hacia los aeropuertos de Ezeiza y Aeroparque.",
    en: "Transfer service to and from Ezeiza and Aeroparque airports.",
  },
  "home.services.city.title": {
    es: "Traslados en la Ciudad",
    en: "City Transfers",
  },
  "home.services.city.description": {
    es: "Viajes dentro de la Ciudad de Buenos Aires y alrededores.",
    en: "Trips within Buenos Aires City and surroundings.",
  },
  "home.services.tourism.title": {
    es: "Turismo",
    en: "Tourism",
  },
  "home.services.tourism.description": {
    es: "Recorridos turísticos por los principales puntos de interés de Buenos Aires.",
    en: "Tourist tours through the main points of interest in Buenos Aires.",
  },
  "home.about.title": {
    es: "Sobre Nosotros",
    en: "About Us",
  },
  "home.about.description": {
    es: "Con más de 20 años de experiencia en el transporte de pasajeros, ofrecemos un servicio confiable, seguro y puntual para todos sus traslados en Buenos Aires.",
    en: "With over 20 years of experience in passenger transportation, we offer a reliable, safe, and punctual service for all your transfers in Buenos Aires.",
  },
  "home.punctuality": {
    es: "Puntualidad",
    en: "Punctuality",
  },
  "home.punctuality.text": {
    es: "Siempre a tiempo, respetando su agenda.",
    en: "Always on time, respecting your schedule.",
  },
  "home.security": {
    es: "Seguridad",
    en: "Security",
  },
  "home.security.text": {
    es: "Conductores profesionales y vehículos en perfectas condiciones.",
    en: "Professional drivers and vehicles in perfect condition.",
  },
  "home.payment": {
    es: "Facilidad de pago",
    en: "Ease of payment",
  },
  "home.payment.text": {
    es: "Múltiples opciones de pago para su comodidad.",
    en: "Multiple payment options for your convenience.",
  },
  "home.transfer": {
    es: "¿Necesita un traslado?",
    en: "Do you need a transfer?",
  },
  "home.transfer.text": {
    es: "Contáctenos ahora y coordinaremos su viaje de la manera más conveniente para usted.",
    en: "Contact us now and we'll coordinate your trip in the most convenient way for you.",
  },
  
  // Reservations
  "reservations.title": {
    es: "Reserva tu traslado",
    en: "Book your transfer",
  },
  "reservations.subtitle": {
    es: "Complete el formulario y nos pondremos en contacto a la brevedad",
    en: "Fill out the form and we will contact you shortly",
  },
  "form.name": {
    es: "Nombre completo",
    en: "Full name",
  },
  "form.email": {
    es: "Correo electrónico",
    en: "Email",
  },
  "form.phone": {
    es: "Teléfono / WhatsApp",
    en: "Phone / WhatsApp",
  },
  "form.pickup": {
    es: "Lugar de recogida",
    en: "Pickup location",
  },
  "form.destination": {
    es: "Destino",
    en: "Destination",
  },
  "form.date": {
    es: "Fecha",
    en: "Date",
  },
  "form.time": {
    es: "Hora",
    en: "Time",
  },
  "form.passengers": {
    es: "Cantidad de pasajeros",
    en: "Number of passengers",
  },
  // Add these two new fields:
  "form.luggage": {
    es: "Nro. de Valijas o Maletas (opcional)",
    en: "Number of Luggage or Suitcases (optional)",
  },
  "form.flight": {
    es: "Nro. de Vuelo (opcional)",
    en: "Flight Number (optional)",
  },
  "form.message": {
    es: "Mensaje adicional",
    en: "Additional message",
  },
  "form.submit": {
    es: "Enviar solicitud",
    en: "Send request",
  },
  "form.success": {
    es: "Solicitud enviada con éxito. Nos pondremos en contacto pronto.",
    en: "Request sent successfully. We will contact you soon.",
  },
  // Rates
  "rates.title": {
    es: "Nuestras Tarifas",
    en: "Our Rates",
  },
  "rates.subtitle": {
    es: "Precios referenciales para los traslados más comunes",
    en: "Reference prices for the most common transfers",
  },
  "rates.card.title": {
    es: "Calculá tu traslado",
    en: "Calculate your transfer",
  },
  "rates.card.subtitle": {
    es: "Consultá los valores estimados según origen y destino",
    en: "Check the estimated values ​​according to origin and destination",
  },
  "rates.featured.title": {
    es: "Tarifas Destacadas",
    en: "Featured Rates",
  },
  "rates.featured.subtitle": {
    es: "Precios referenciales para los traslados más solicitados",
    en: "Reference prices for the most requested transfers",
  },
  "rates.view.all": {
    es: "Ver todas las tarifas",
    en: "View all rates",
  },
  "rates.origin": {
    es: "Origen",
    en: "Origin",
  },
  "rates.destination": {
    es: "Destino",
    en: "Destination",
  },
  "rates.price": {
    es: "Precio",
    en: "Price",
  },
  "rates.note": {
    es: "Los precios pueden variar según la hora, el día y la disponibilidad.",
    en: "Prices may vary depending on time, day, and availability.",
  },
  "rates.zero": {
    es: "Consultar",
    en: "Inquire",
  },
  // Contact
  "contact.title": {
    es: "Contacto",
    en: "Contact",
  },
  "contact.subtitle": {
    es: "Estamos disponibles 24/7 para atender sus consultas",
    en: "We are available 24/7 to answer your inquiries",
  },
  "contact.address": {
    es: "Dirección",
    en: "Address",
  },
  "contact.phone": {
    es: "Teléfono",
    en: "Phone",
  },
  "contact.email": {
    es: "Correo electrónico",
    en: "Email",
  },
  "contact.hours": {
    es: "Horario de atención",
    en: "Business hours",
  },
  "contact.hours.value": {
    es: "Lunes a Domingo: 24 horas",
    en: "Monday to Sunday: 24 hours",
  },
  "contact.zone.title": {
    es: "Zona de cobertura",
    en: "Service Area",
  },
  "contact.zone.subtitle": {
    es: "Realizamos traslados desde y hacia Buenos Aires y alrededores",
    en: "We offer transfers to and from Buenos Aires and nearby regions",
  },
  "contact.help.title": {
    es: "Asistencia personalizada",
    en: "Personalized assistance",
  },
  "contact.help.subtitle": {
    es: "Consúltenos lo que necesite",
    en: "Let us know if you need anything",
  },
  "contact.map.loading": {
    es: "Cargando mapa...",
    en: "Loading map...",
  },
  // Footer
  "footer.rights": {
    es: "Todos los derechos reservados",
    en: "All rights reserved",
  },
  "footer.privacy": {
    es: "Política de privacidad",
    en: "Privacy policy",
  },
  "footer.terms": {
    es: "Términos y condiciones",
    en: "Terms and conditions",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  // Función para traducir textos
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  // Actualizar el atributo lang del HTML cuando cambia el idioma
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
