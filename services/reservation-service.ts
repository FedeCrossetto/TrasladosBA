import { supabase } from "@/lib/supabase"
import type { Reservation } from "@/types/supabase"

export async function createReservation(reservation: Omit<Reservation, "id" | "created_at" | "status">) {
  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        ...reservation,
        status: "pending",
      },
    ])
    .select()

  if (error) {
    console.error("Error creating reservation:", error)
    throw new Error("No se pudo crear la reserva")
  }

  return data?.[0] as Reservation
}

export async function getReservations() {
  const { data, error } = await supabase.from("reservations").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reservations:", error)
    return []
  }

  return data as Reservation[]
}
