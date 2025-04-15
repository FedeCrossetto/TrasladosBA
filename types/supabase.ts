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
  email: string
  phone: string
  pickup: string
  destination: string
  date: string
  time: string
  passengers: number
  message?: string
  created_at?: string
  status?: "pending" | "confirmed" | "cancelled"
}
