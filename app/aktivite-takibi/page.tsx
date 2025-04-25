"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Moon, Utensils, Dumbbell, Brain, BarChart } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getActivities, saveActivity } from "@/lib/actions"
import { SleepChart } from "@/components/charts/sleep-chart"

const sleepSchema = z.object({
  date: z.string(),
  duration: z.string().min(1, "Süre gereklidir"),
  quality: z.string().min(1, "Kalite gereklidir"),
  notes: z.string().optional(),
})

const nutritionSchema = z.object({
  date: z.string(),
  meal: z.string().min(1, "Öğün gereklidir"),
  description: z.string().min(1, "Açıklama gereklidir"),
  notes: z.string().optional(),
})

const exerciseSchema = z.object({
  date: z.string(),
  type: z.string().min(1, "Tür gereklidir"),
  duration: z.string().min(1, "Süre gereklidir"),
  intensity: z.string().min(1, "Yoğunluk gereklidir"),
  notes: z.string().optional(),
})

const productivitySchema = z.object({
  date: z.string(),
  task: z.string().min(1, "Görev gereklidir"),
  duration: z.string().min(1, "Süre gereklidir"),
  focusLevel: z.string().min(1, "Odak seviyesi gereklidir"),
  notes: z.string().optional(),
})

export default function AktiviteTakibi() {
  const today = new Date().toISOString().split("T")[0]
  const [activeTab, setActiveTab] = useState("sleep")
  const [sleepData, setSleepData] = useState([])
  const [nutritionData, setNutritionData] = useState([])
  const [exerciseData, setExerciseData] = useState([])
  const [productivityData, setProductivityData] = useState([])

  const sleepForm = useForm({
    resolver: zodResolver(sleepSchema),
    defaultValues: {
      date: today,
      duration: "",
      quality: "",
      notes: "",
    },
  })

  const nutritionForm = useForm({
    resolver: zodResolver(nutritionSchema),
    defaultValues: {
      date: today,
      meal: "",
      description: "",
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

  const productivityForm = useForm({
    resolver: zodResolver(productivitySchema),
    defaultValues: {
      date: today,
      task: "",
      duration: "",
      focusLevel: "",
      notes: "",
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const sleepResult = await getActivities("sleep")
      if (sleepResult.success) {
        setSleepData(sleepResult.data || [])
      }

      const nutritionResult = await getActivities("nutrition")
      if (nutritionResult.success) {
        setNutritionData(nutritionResult.data || [])
      }

      const exerciseResult = await getActivities("exercise")
      if (exerciseResult.success) {
        setExerciseData(exerciseResult.data || [])
      }

      const productivityResult = await getActivities("productivity")
      if (productivityResult.success) {
        setProductivityData(productivityResult.data || [])
      }
    }

    fetchData()
  }, [])

  const onSleepSubmit = async (data) => {
    const result = await saveActivity({ type: "sleep", ...data })
    if (result.success) {
      sleepForm.reset({
        date: today,
        duration: "",
        quality: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const sleepResult = await getActivities("sleep")
      if (sleepResult.success) {
        setSleepData(sleepResult.data || [])
      }
    }
  }

  const onNutritionSubmit = async (data) => {
    const result = await saveActivity({ type: "nutrition", ...data })
    if (result.success) {
      nutritionForm.reset({
        date: today,
        meal: "",
        description: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const nutritionResult = await getActivities("nutrition")
      if (nutritionResult.success) {
        setNutritionData(nutritionResult.data || [])
      }
    }
  }

  const onExerciseSubmit = async (data) => {
    const result = await saveActivity({ type: "exercise", ...data })
    if (result.success) {
      exerciseForm.reset({
        date: today,
        type: "",
        duration: "",
        intensity: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const exerciseResult = await getActivities("exercise")
      if (exerciseResult.success) {
        setExerciseData(exerciseResult.data || [])
      }
    }
  }

  const onProductivitySubmit = async (data) => {
    const result = await saveActivity({ type: "productivity", ...data })
    if (result.success) {
      productivityForm.reset({
        date: today,
        task: "",
        duration: "",
        focusLevel: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const productivityResult = await getActivities("productivity")
      if (productivityResult.success) {
        setProductivityData(productivityResult.data || [])
      }
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Aktivite Takibi</h1>
        <p className="text-muted-foreground">Günlük aktivitelerinizi takip edin ve analiz edin</p>
      </div>

      <Tabs defaultValue="sleep" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Uyku</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Beslenme</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Egzersiz</span>
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Üretkenlik</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Analiz</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sleep">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Uyku Takibi</CardTitle>
                <CardDescription>Uyku sürenizi ve kalitesini kaydedin</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...sleepForm}>
                  <form onSubmit={sleepForm.handleSubmit(onSleepSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <FormField
                        control={sleepForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Süre (saat)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" placeholder="8.0" {...field} />
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
                          <FormLabel>Kalite</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Uyku kalitesini seçin" />
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

            <div className="space-y-6">
              <SleepChart data={sleepData} />

              <Card>
                <CardHeader>
                  <CardTitle>Son Kayıtlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sleepData.slice(0, 5).map((item, index) => (
                      <div key={index} className="border-b pb-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{new Date(item.data.date).toLocaleDateString("tr-TR")}</span>
                          <span>{item.data.duration} saat</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Kalite: {item.data.quality}</span>
                          <span>{item.data.notes ? "Not var" : "Not yok"}</span>
                        </div>
                      </div>
                    ))}

                    {sleepData.length === 0 && (
                      <p className="text-center text-muted-foreground">Henüz kayıt bulunmuyor</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>Beslenme Takibi</CardTitle>
              <CardDescription>Beslenme alışkanlıklarınızı kaydedin</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...nutritionForm}>
                <form onSubmit={nutritionForm.handleSubmit(onNutritionSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      name="meal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Öğün</FormLabel>
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
                  </div>
                  <FormField
                    control={nutritionForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Açıklama</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ne yediğinizi yazın..." {...field} />
                        </FormControl>
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
        </TabsContent>

        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Egzersiz Takibi</CardTitle>
              <CardDescription>Fiziksel aktivitelerinizi kaydedin</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...exerciseForm}>
                <form onSubmit={exerciseForm.handleSubmit(onExerciseSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <SelectValue placeholder="Egzersiz türünü seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="koşu">Koşu</SelectItem>
                              <SelectItem value="yürüyüş">Yürüyüş</SelectItem>
                              <SelectItem value="bisiklet">Bisiklet</SelectItem>
                              <SelectItem value="yüzme">Yüzme</SelectItem>
                              <SelectItem value="ağırlık">Ağırlık Çalışması</SelectItem>
                              <SelectItem value="yoga">Yoga</SelectItem>
                              <SelectItem value="diğer">Diğer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                              <SelectItem value="düşük">Düşük</SelectItem>
                              <SelectItem value="orta">Orta</SelectItem>
                              <SelectItem value="yüksek">Yüksek</SelectItem>
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
        </TabsContent>

        <TabsContent value="productivity">
          <Card>
            <CardHeader>
              <CardTitle>Üretkenlik Takibi</CardTitle>
              <CardDescription>Üretkenlik ve odaklanma periyotlarınızı kaydedin</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...productivityForm}>
                <form onSubmit={productivityForm.handleSubmit(onProductivitySubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={productivityForm.control}
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
                      control={productivityForm.control}
                      name="task"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Görev</FormLabel>
                          <FormControl>
                            <Input placeholder="Görev adı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={productivityForm.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Süre (dakika)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="45" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={productivityForm.control}
                      name="focusLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Odak Seviyesi</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Odak seviyesi seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="çok düşük">Çok Düşük</SelectItem>
                              <SelectItem value="düşük">Düşük</SelectItem>
                              <SelectItem value="orta">Orta</SelectItem>
                              <SelectItem value="yüksek">Yüksek</SelectItem>
                              <SelectItem value="çok yüksek">Çok Yüksek</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={productivityForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notlar</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Üretkenlik ile ilgili notlar..." {...field} />
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
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <SleepChart data={sleepData} />

            <Card>
              <CardHeader>
                <CardTitle>Aktivite Özeti</CardTitle>
                <CardDescription>Son 30 günlük aktivite istatistikleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Ortalama Uyku Süresi</p>
                      <p className="text-2xl font-bold">
                        {sleepData.length > 0
                          ? (
                              sleepData.reduce((acc, item) => acc + Number.parseFloat(item.data.duration), 0) /
                              sleepData.length
                            ).toFixed(1)
                          : "0"}{" "}
                        saat
                      </p>
                    </div>
                    <Moon className="h-8 w-8 text-blue-500" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Toplam Egzersiz Süresi</p>
                      <p className="text-2xl font-bold">
                        {exerciseData.length > 0
                          ? exerciseData.reduce((acc, item) => acc + Number.parseInt(item.data.duration), 0)
                          : "0"}{" "}
                        dakika
                      </p>
                    </div>
                    <Dumbbell className="h-8 w-8 text-green-500" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Toplam Üretken Zaman</p>
                      <p className="text-2xl font-bold">
                        {productivityData.length > 0
                          ? productivityData.reduce((acc, item) => acc + Number.parseInt(item.data.duration), 0)
                          : "0"}{" "}
                        dakika
                      </p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Kayıtlı Öğün Sayısı</p>
                      <p className="text-2xl font-bold">{nutritionData.length}</p>
                    </div>
                    <Utensils className="h-8 w-8 text-amber-500" />
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
