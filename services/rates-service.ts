import { supabase } from "@/lib/supabase"
import type { Rate } from "@/types/supabase"

export async function getRates() {
  const { data, error } = await supabase.from("rates").select("*").order("id", { ascending: true })

  if (error) {
    console.error("Error fetching rates:", error)
    return []
  }

  return data as Rate[]
}

export async function getFeaturedRates(limit = 4) {
  const { data, error } = await supabase.from("rates").select("*").order("id", { ascending: true }).limit(limit)

  if (error) {
    console.error("Error fetching featured rates:", error)
    return []
  }

  return data as Rate[]
}
