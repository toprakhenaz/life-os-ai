"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Apple, BarChart, Bed, Dumbbell } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getHealth, saveHealth } from "@/lib/actions"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

const sleepSchema = z.object({
  date: z.string(),
  bedTime: z.string(),
  wakeTime: z.string(),
  quality: z.string().min(1, "Kalite gereklidir"),
  notes: z.string().optional(),
})

const nutritionSchema = z.object({
  date: z.string(),
  mealType: z.string().min(1, "Öğün türü gereklidir"),
  foods: z.string().min(1, "Yiyecekler gereklidir"),
  calories: z.string().optional(),
  notes: z.string().optional(),
})

const exerciseSchema = z.object({
  date: z.string(),
  type: z.string().min(1, "Egzersiz türü gereklidir"),
  duration: z.string().min(1, "Süre gereklidir"),
  intensity: z.string().min(1, "Yoğunluk gereklidir"),
  notes: z.string().optional(),
})

export default function Saglik() {
  const today = new Date().toISOString().split("T")[0]
  const [activeTab, setActiveTab] = useState("sleep")
  const [sleepData, setSleepData] = useState([])
  const [nutritionData, setNutritionData] = useState([])
  const [exerciseData, setExerciseData] = useState([])

  const sleepForm = useForm({
    resolver: zodResolver(sleepSchema),
    defaultValues: {
      date: today,
      bedTime: "",
      wakeTime: "",
      quality: "",
      notes: "",
    },
  })

  const nutritionForm = useForm({
    resolver: zodResolver(nutritionSchema),
    defaultValues: {
      date: today,
      mealType: "",
      foods: "",
      calories: "",
      notes: "",
    },
  })

  const exerciseForm = useForm({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      date: today,
      type: "",
      duration: "",
      intensity: "",
      notes: "",
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const sleepResult = await getHealth("sleep")
      if (sleepResult.success) {
        setSleepData(sleepResult.data || [])
      }

      const nutritionResult = await getHealth("nutrition")
      if (nutritionResult.success) {
        setNutritionData(nutritionResult.data || [])
      }

      const exerciseResult = await getHealth("exercise")
      if (exerciseResult.success) {
        setExerciseData(exerciseResult.data || [])
      }
    }

    fetchData()
  }, [])

  const onSleepSubmit = async (data) => {
    const result = await saveHealth({ type: "sleep", ...data })
    if (result.success) {
      sleepForm.reset({
        date: today,
        bedTime: "",
        wakeTime: "",
        quality: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const sleepResult = await getHealth("sleep")
      if (sleepResult.success) {
        setSleepData(sleepResult.data || [])
      }
    }
  }

  const onNutritionSubmit = async (data) => {
    const result = await saveHealth({ type: "nutrition", ...data })
    if (result.success) {
      nutritionForm.reset({
        date: today,
        mealType: "",
        foods: "",
        calories: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const nutritionResult = await getHealth("nutrition")
      if (nutritionResult.success) {
        setNutritionData(nutritionResult.data || [])
      }
    }
  }

  const onExerciseSubmit = async (data) => {
    const result = await saveHealth({ type: "exercise", ...data })
    if (result.success) {
      exerciseForm.reset({
        date: today,
        type: "",
        duration: "",
        intensity: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const exerciseResult = await getHealth("exercise")
      if (exerciseResult.success) {
        setExerciseData(exerciseResult.data || [])
      }
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sağlık ve Zindelik</h1>
        <p className="text-muted-foreground">Uyku, beslenme ve egzersiz alışkanlıklarınızı optimize edin</p>
      </div>

      <Tabs defaultValue="sleep" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            <span>Uyku</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Apple className="h-4 w-4" />
            <span>Beslenme</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span>Egzersiz</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Analiz</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sleep">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Uyku Optimizasyonu</CardTitle>
                <CardDescription>Uyku düzeninizi ve kalitesini kaydedin</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...sleepForm}>
                  <form onSubmit={sleepForm.handleSubmit(onSleepSubmit)} className="space-y-4">
                    <FormField
                      control={sleepForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tarih</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={sleepForm.control}
                        name="bedTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yatış Saati</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={sleepForm.control}
                        name="wakeTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kalkış Saati</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={sleepForm.control}
                      name="quality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Uyku Kalitesi</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Kalite seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="çok kötü">Çok Kötü</SelectItem>
                              <SelectItem value="kötü">Kötü</SelectItem>
                              <SelectItem value="orta">Orta</SelectItem>
                              <SelectItem value="iyi">İyi</SelectItem>
                              <SelectItem value="çok iyi">Çok İyi</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={sleepForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notlar</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Uyku ile ilgili notlar..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Kaydet</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uyku Tavsiyeleri</CardTitle>
                <CardDescription>Kronotipinize göre uyku optimizasyonu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Aslan Kronotipi (Sabah İnsanı)</h3>
                    <p className="text-sm text-muted-foreground">
                      Yatış saati: 21:00 - 22:00, Kalkış saati: 05:00 - 06:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      En verimli çalışma saatleri: Sabah 08:00 - 12:00 arası
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Yunus Kronotipi (Gün Ortası İnsanı)</h3>
                    <p className="text-sm text-muted-foreground">
                      Yatış saati: 22:00 - 23:00, Kalkış saati: 06:00 - 07:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      En verimli çalışma saatleri: Sabah 10:00 - 14:00 arası
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Kurt Kronotipi (Gece İnsanı)</h3>
                    <p className="text-sm text-muted-foreground">
                      Yatış saati: 00:00 - 01:00, Kalkış saati: 08:00 - 09:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      En verimli çalışma saatleri: Öğleden sonra 16:00 - 20:00 arası
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Ayı Kronotipi (Düzensiz Uyku)</h3>
                    <p className="text-sm text-muted-foreground">
                      Yatış saati: 23:00 - 00:00, Kalkış saati: 07:00 - 08:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      En verimli çalışma saatleri: Değişken, genellikle 11:00 - 15:00 arası
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Beslenme Takibi</CardTitle>
                <CardDescription>Beslenme alışkanlıklarınızı kaydedin</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...nutritionForm}>
                  <form onSubmit={nutritionForm.handleSubmit(onNutritionSubmit)} className="space-y-4">
                    <FormField
                      control={nutritionForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tarih</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={nutritionForm.control}
                      name="mealType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Öğün Türü</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Öğün seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="kahvaltı">Kahvaltı</SelectItem>
                              <SelectItem value="öğle">Öğle Yemeği</SelectItem>
                              <SelectItem value="akşam">Akşam Yemeği</SelectItem>
                              <SelectItem value="atıştırmalık">Atıştırmalık</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={nutritionForm.control}
                      name="foods"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yiyecekler</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Yediğiniz yiyecekleri yazın..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={nutritionForm.control}
                      name="calories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tahmini Kalori</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="500" {...field} />
                          </FormControl>
                          <FormDescription>İsteğe bağlı</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={nutritionForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notlar</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Beslenme ile ilgili notlar..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Kaydet</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beslenme Tavsiyeleri</CardTitle>
                <CardDescription>Sağlıklı beslenme için öneriler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Aralıklı Oruç (Intermittent Fasting)</h3>
                    <p className="text-sm text-muted-foreground">
                      16:8 metodu: 16 saat oruç, 8 saat beslenme penceresi
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faydaları: Metabolik sağlık, otofaji, insülin hassasiyeti
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Akdeniz Diyeti</h3>
                    <p className="text-sm text-muted-foreground">
                      Zeytinyağı, balık, sebze, meyve, kuruyemiş ağırlıklı beslenme
                    </p>
                    <p className="text-sm text-muted-foreground">Faydaları: Kalp sağlığı, uzun ömür, bilişsel sağlık</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Düşük Karbonhidrat Yaklaşımı</h3>
                    <p className="text-sm text-muted-foreground">
                      İşlenmiş karbonhidratları azaltma, protein ve sağlıklı yağları artırma
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faydaları: Kilo kontrolü, kan şekeri dengeleme, enerji seviyesi
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Mikrobiyom Dostu Beslenme</h3>
                    <p className="text-sm text-muted-foreground">
                      Fermente gıdalar, prebiyotik lifler, çeşitli bitki bazlı gıdalar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faydaları: Bağırsak sağlığı, bağışıklık sistemi, ruh hali
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exercise">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Egzersiz Takibi</CardTitle>
                <CardDescription>Fiziksel aktivitelerinizi kaydedin</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...exerciseForm}>
                  <form onSubmit={exerciseForm.handleSubmit(onExerciseSubmit)} className="space-y-4">
                    <FormField
                      control={exerciseForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tarih</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={exerciseForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Egzersiz Türü</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Tür seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="kardiyovasküler">Kardiyovasküler</SelectItem>
                              <SelectItem value="güç">Güç Antrenmanı</SelectItem>
                              <SelectItem value="esneklik">Esneklik</SelectItem>
                              <SelectItem value="denge">Denge ve Koordinasyon</SelectItem>
                              <SelectItem value="hiit">HIIT</SelectItem>
                              <SelectItem value="diğer">Diğer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={exerciseForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Süre (dakika)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="30" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={exerciseForm.control}
                        name="intensity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yoğunluk</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Yoğunluk seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="düşük">Düşük (Zone 1-2)</SelectItem>
                                <SelectItem value="orta">Orta (Zone 3)</SelectItem>
                                <SelectItem value="yüksek">Yüksek (Zone 4)</SelectItem>
                                <SelectItem value="maksimum">Maksimum (Zone 5)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={exerciseForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notlar</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Egzersiz ile ilgili notlar..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Kaydet</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Egzersiz Tavsiyeleri</CardTitle>
                <CardDescription>Optimal egzersiz protokolleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Zone 2 Kardiyovasküler Antrenman</h3>
                    <p className="text-sm text-muted-foreground">
                      Maksimum kalp hızının %60-70'i, konuşabilecek tempoda
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faydaları: Mitokondriyal sağlık, yağ yakımı, dayanıklılık
                    </p>
                    <p className="text-sm text-muted-foreground">Önerilen: Haftada 3-5 kez, 30-60 dakika</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Güç Antrenmanı</h3>
                    <p className="text-sm text-muted-foreground">Büyük kas gruplarını hedefleyen bileşik hareketler</p>
                    <p className="text-sm text-muted-foreground">
                      Faydaları: Kas kütlesi, kemik yoğunluğu, metabolik sağlık
                    </p>
                    <p className="text-sm text-muted-foreground">Önerilen: Haftada 2-3 kez, 30-45 dakika</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">HIIT (Yüksek Yoğunluklu Interval Antrenman)</h3>
                    <p className="text-sm text-muted-foreground">
                      Kısa, yoğun egzersiz patlamaları ve dinlenme aralıkları
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faydaları: Zaman verimliliği, metabolik hız, kardiyovasküler sağlık
                    </p>
                    <p className="text-sm text-muted-foreground">Önerilen: Haftada 1-2 kez, 15-20 dakika</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sağlık Özeti</CardTitle>
                <CardDescription>Son 30 günlük sağlık istatistikleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Uyku Kalitesi</h3>
                    <Progress value={sleepData.length > 0 ? 75 : 0} />
                    <p className="text-sm text-muted-foreground">
                      Ortalama uyku süresi: {sleepData.length > 0 ? "7.5 saat" : "Veri yok"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Beslenme Kalitesi</h3>
                    <Progress value={nutritionData.length > 0 ? 65 : 0} />
                    <p className="text-sm text-muted-foreground">
                      Ortalama günlük kalori: {nutritionData.length > 0 ? "2100 kcal" : "Veri yok"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Egzersiz Düzenliliği</h3>
                    <Progress value={exerciseData.length > 0 ? 80 : 0} />
                    <p className="text-sm text-muted-foreground">
                      Haftalık egzersiz: {exerciseData.length > 0 ? "3.5 gün" : "Veri yok"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Genel Sağlık Puanı</h3>
                    <Progress
                      value={sleepData.length > 0 || nutritionData.length > 0 || exerciseData.length > 0 ? 70 : 0}
                    />
                    <p className="text-sm text-muted-foreground">
                      Sağlık puanınız:{" "}
                      {sleepData.length > 0 || nutritionData.length > 0 || exerciseData.length > 0
                        ? "70/100"
                        : "Veri yok"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sağlık Önerileri</CardTitle>
                <CardDescription>Verilerinize göre kişiselleştirilmiş öneriler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Uyku Optimizasyonu</h3>
                    <p className="text-sm text-muted-foreground">
                      Yatmadan 1 saat önce mavi ışık maruziyetini azaltın.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Uyku rutininizi standartlaştırın ve her gün aynı saatte yatın.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Beslenme İyileştirmeleri</h3>
                    <p className="text-sm text-muted-foreground">
                      Günde en az 5 farklı renkte sebze ve meyve tüketmeyi hedefleyin.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      İşlenmiş gıdaları azaltın ve tam gıdalara odaklanın.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Egzersiz Dengesi</h3>
                    <p className="text-sm text-muted-foreground">
                      Kardiyovasküler, güç ve esneklik antrenmanlarını dengeli şekilde birleştirin.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Haftada en az 150 dakika orta yoğunlukta aktivite yapın.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
