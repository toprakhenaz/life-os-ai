import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables = {
  activities: {
    id: string
    user_id: string
    type: string
    data: any
    created_at: string
  }
  moods: {
    id: string
    user_id: string
    type: string
    data: any
    created_at: string
  }
  tasks: {
    id: string
    user_id: string
    title: string
    description: string
    priority: string
    due_date: string
    estimated_time: string
    category: string
    completed: boolean
    created_at: string
  }
  goals: {
    id: string
    user_id: string
    type: string
    data: any
    progress: number
    created_at: string
  }
  learning: {
    id: string
    user_id: string
    type: string
    data: any
    created_at: string
  }
  health: {
    id: string
    user_id: string
    type: string
    data: any
    created_at: string
  }
}
