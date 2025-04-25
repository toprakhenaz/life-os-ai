// Aktivite Takibi Tipleri
export interface SleepActivity {
  id?: string
  date: string
  duration: string
  quality: string
  notes?: string
}

export interface NutritionActivity {
  id?: string
  date: string
  meal: string
  description: string
  notes?: string
}

export interface ExerciseActivity {
  id?: string
  date: string
  type: string
  duration: string
  intensity: string
  notes?: string
}

export interface ProductivityActivity {
  id?: string
  date: string
  task: string
  duration: string
  focusLevel: string
  notes?: string
}

// Duygusal Durum Tipleri
export interface MoodEntry {
  id?: string
  date: string
  time: string
  mood: string
  energy: string
  notes?: string
}

export interface StressEntry {
  id?: string
  date: string
  trigger: string
  intensity: string
  coping: string
  notes?: string
}

// Zaman Yönetimi Tipleri
export interface Task {
  id?: string
  title: string
  description?: string
  priority: string
  dueDate?: string
  estimatedTime: string
  category: string
  completed?: boolean
}

// Hedef Takip Tipleri
export interface Goal {
  id?: string
  title: string
  description?: string
  category: string
  deadline?: string
  specific: string
  measurable: string
  achievable: string
  relevant: string
  timeBound: string
  progress?: number
}

export interface Habit {
  id?: string
  title: string
  description?: string
  frequency: string
  trigger: string
  action: string
  reward: string
  streak?: number
  completedDates?: string[]
}
