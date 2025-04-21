export type Rate = {
  id: number
  origin: string
  destination: string
  price: number
  created_at?: string
}

export type Reservation = {
  id: number
  name: string
  phone: string
  pickup: string
  destination: string
  datetime: string
  passengers: number
  bags: number,
  flightNumber: string
  message?: string
  created_at?: string
  status?: "pending" | "confirmed" | "cancelled"
}
