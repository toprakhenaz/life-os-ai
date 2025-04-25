"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "./supabase"

// Kullanıcı ID'sini almak için yardımcı fonksiyon
// Gerçek uygulamada bu, oturum açmış kullanıcının ID'sini döndürür
async function getUserId() {
  // Basitlik için sabit bir kullanıcı ID'si kullanıyoruz
  // Gerçek uygulamada bu, oturum bilgilerinden alınmalıdır
  return "user-1"
}

export async function saveActivity(data: any) {
  const userId = await getUserId()

  try {
    const { error } = await supabase.from("activities").insert({
      user_id: userId,
      type: data.type,
      data: data,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/aktivite-takibi")
    return { success: true }
  } catch (error) {
    console.error("Aktivite kaydedilirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function getActivities(type?: string) {
  const userId = await getUserId()

  try {
    let query = supabase.from("activities").select("*").eq("user_id", userId).order("created_at", { ascending: false })

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Aktiviteler alınırken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function saveMood(data: any) {
  const userId = await getUserId()

  try {
    const { error } = await supabase.from("moods").insert({
      user_id: userId,
      type: data.type,
      data: data,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/duygusal-durum")
    return { success: true }
  } catch (error) {
    console.error("Duygu durumu kaydedilirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function getMoods(type?: string) {
  const userId = await getUserId()

  try {
    let query = supabase.from("moods").select("*").eq("user_id", userId).order("created_at", { ascending: false })

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Duygu durumları alınırken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function saveTask(data: any) {
  const userId = await getUserId()

  try {
    const { error } = await supabase.from("tasks").insert({
      user_id: userId,
      title: data.title,
      description: data.description || "",
      priority: data.priority,
      due_date: data.dueDate || null,
      estimated_time: data.estimatedTime,
      category: data.category,
      completed: false,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/zaman-yonetimi")
    return { success: true }
  } catch (error) {
    console.error("Görev kaydedilirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function getTasks() {
  const userId = await getUserId()

  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("due_date", { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Görevler alınırken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function updateTaskStatus(id: string, completed: boolean) {
  try {
    const { error } = await supabase.from("tasks").update({ completed }).eq("id", id)

    if (error) throw error

    revalidatePath("/zaman-yonetimi")
    return { success: true }
  } catch (error) {
    console.error("Görev durumu güncellenirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function saveGoal(data: any) {
  const userId = await getUserId()

  try {
    const { error } = await supabase.from("goals").insert({
      user_id: userId,
      type: data.type,
      data: data,
      progress: 0,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/hedefler")
    return { success: true }
  } catch (error) {
    console.error("Hedef kaydedilirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function getGoals(type?: string) {
  const userId = await getUserId()

  try {
    let query = supabase.from("goals").select("*").eq("user_id", userId).order("created_at", { ascending: false })

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Hedefler alınırken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function updateGoalProgress(id: string, progress: number) {
  try {
    const { error } = await supabase.from("goals").update({ progress }).eq("id", id)

    if (error) throw error

    revalidatePath("/hedefler")
    return { success: true }
  } catch (error) {
    console.error("Hedef ilerlemesi güncellenirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function saveLearning(data: any) {
  const userId = await getUserId()

  try {
    const { error } = await supabase.from("learning").insert({
      user_id: userId,
      type: data.type,
      data: data,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/ogrenme")
    return { success: true }
  } catch (error) {
    console.error("Öğrenme verisi kaydedilirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function getLearning(type?: string) {
  const userId = await getUserId()

  try {
    let query = supabase.from("learning").select("*").eq("user_id", userId).order("created_at", { ascending: false })

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Öğrenme verileri alınırken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function saveHealth(data: any) {
  const userId = await getUserId()

  try {
    const { error } = await supabase.from("health").insert({
      user_id: userId,
      type: data.type,
      data: data,
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/saglik")
    return { success: true }
  } catch (error) {
    console.error("Sağlık verisi kaydedilirken hata oluştu:", error)
    return { success: false, error }
  }
}

export async function getHealth(type?: string) {
  const userId = await getUserId()

  try {
    let query = supabase.from("health").select("*").eq("user_id", userId).order("created_at", { ascending: false })

    if (type) {
      query = query.eq("type", type)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Sağlık verileri alınırken hata oluştu:", error)
    return { success: false, error }
  }
}
