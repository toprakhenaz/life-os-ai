"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getMoods, saveMood } from "@/lib/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smile, AlertTriangle, BarChart } from "lucide-react"
import { useEffect, useState } from "react"
import { MoodChart } from "@/components/charts/mood-chart"

const moodSchema = z.object({
  date: z.string(),
  time: z.string(),
  mood: z.string().min(1, "Ruh hali gereklidir"),
  energy: z.string().min(1, "Enerji seviyesi gereklidir"),
  notes: z.string().optional(),
})

const stressSchema = z.object({
  date: z.string(),
  trigger: z.string().min(1, "Tetikleyici gereklidir"),
  intensity: z.string().min(1, "Yoğunluk gereklidir"),
  coping: z.string().min(1, "Başa çıkma stratejisi gereklidir"),
  notes: z.string().optional(),
})

export default function DuygusalDurum() {
  const today = new Date().toISOString().split("T")[0]
  const now = new Date().toTimeString().split(" ")[0].substring(0, 5)
  const [activeTab, setActiveTab] = useState("mood")
  const [moodData, setMoodData] = useState([])
  const [stressData, setStressData] = useState([])

  const moodForm = useForm({
    resolver: zodResolver(moodSchema),
    defaultValues: {
      date: today,
      time: now,
      mood: "",
      energy: "",
      notes: "",
    },
  })

  const stressForm = useForm({
    resolver: zodResolver(stressSchema),
    defaultValues: {
      date: today,
      trigger: "",
      intensity: "",
      coping: "",
      notes: "",
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const moodResult = await getMoods("mood")
      if (moodResult.success) {
        setMoodData(moodResult.data || [])
      }

      const stressResult = await getMoods("stress")
      if (stressResult.success) {
        setStressData(stressResult.data || [])
      }
    }

    fetchData()
  }, [])

  const onMoodSubmit = async (data) => {
    const result = await saveMood({ type: "mood", ...data })
    if (result.success) {
      moodForm.reset({
        date: today,
        time: now,
        mood: "",
        energy: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const moodResult = await getMoods("mood")
      if (moodResult.success) {
        setMoodData(moodResult.data || [])
      }
    }
  }

  const onStressSubmit = async (data) => {
    const result = await saveMood({ type: "stress", ...data })
    if (result.success) {
      stressForm.reset({
        date: today,
        trigger: "",
        intensity: "",
        coping: "",
        notes: "",
      })

      // Verileri yeniden yükle
      const stressResult = await getMoods("stress")
      if (stressResult.success) {
        setStressData(stressResult.data || [])
      }
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Duygusal Durum İzleme</h1>
        <p className="text-muted-foreground">Ruh halinizi ve duygusal durumunuzu takip edin</p>
      </div>

      <Tabs defaultValue="mood" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Smile className="h-4 w-4" />
            <span>Ruh Hali</span>
          </TabsTrigger>
          <TabsTrigger value="stress" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Stres Tetikleyicileri</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Analiz</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ruh Hali Kaydı</CardTitle>
                <CardDescription>Günlük ruh halinizi ve enerji seviyenizi kaydedin</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...moodForm}>
                  <form onSubmit={moodForm.handleSubmit(onMoodSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={moodForm.control}
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
                        control={moodForm.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Saat</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={moodForm.control}
                        name="mood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ruh Hali</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Ruh halinizi seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="çok kötü">Çok Kötü</SelectItem>
                                <SelectItem value="kötü">Kötü</SelectItem>
                                <SelectItem value="nötr">Nötr</SelectItem>
                                <SelectItem value="iyi">İyi</SelectItem>
                                <SelectItem value="çok iyi">Çok İyi</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={moodForm.control}
                        name="energy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enerji Seviyesi</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Enerji seviyenizi seçin" />
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
                      control={moodForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notlar</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Ruh halinizle ilgili notlar..." {...field} />
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
              <MoodChart data={moodData} />

              <Card>
                <CardHeader>
                  <CardTitle>Son Kayıtlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {moodData.slice(0, 5).map((item, index) => (
                      <div key={index} className="border-b pb-2">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {new Date(item.data.date).toLocaleDateString("tr-TR")} {item.data.time}
                          </span>
                          <span>{item.data.mood}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Enerji: {item.data.energy}</span>
                          <span>{item.data.notes ? "Not var" : "Not yok"}</span>
                        </div>
                      </div>
                    ))}

                    {moodData.length === 0 && (
                      <p className="text-center text-muted-foreground">Henüz kayıt bulunmuyor</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stress">
          <Card>
            <CardHeader>
              <CardTitle>Stres Tetikleyicileri</CardTitle>
              <CardDescription>Stres tetikleyicilerinizi ve başa çıkma stratejilerinizi kaydedin</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...stressForm}>
                <form onSubmit={stressForm.handleSubmit(onStressSubmit)} className="space-y-4">
                  <FormField
                    control={stressForm.control}
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
                    control={stressForm.control}
                    name="trigger"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tetikleyici</FormLabel>
                        <FormControl>
                          <Input placeholder="Stres tetikleyicisi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={stressForm.control}
                    name="intensity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yoğunluk</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Stres yoğunluğunu seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hafif">Hafif</SelectItem>
                            <SelectItem value="orta">Orta</SelectItem>
                            <SelectItem value="şiddetli">Şiddetli</SelectItem>
                            <SelectItem value="çok şiddetli">Çok Şiddetli</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={stressForm.control}
                    name="coping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Başa Çıkma Stratejisi</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Stresle nasıl başa çıktınız?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={stressForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notlar</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ek notlar..." {...field} />
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
            <MoodChart data={moodData} />

            <Card>
              <CardHeader>
                <CardTitle>Stres Tetikleyicileri Analizi</CardTitle>
                <CardDescription>En sık karşılaşılan stres tetikleyicileri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stressData.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        <h3 className="font-medium">Tetikleyiciler</h3>
                        <ul className="space-y-1">
                          {Array.from(new Set(stressData.map((item) => item.data.trigger)))
                            .slice(0, 5)
                            .map((trigger, index) => (
                              <li key={index} className="flex justify-between">
                                <span>{trigger}</span>
                                <span className="text-muted-foreground">
                                  {stressData.filter((item) => item.data.trigger === trigger).length} kez
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Başa Çıkma Stratejileri</h3>
                        <ul className="space-y-1">
                          {Array.from(new Set(stressData.map((item) => item.data.coping)))
                            .slice(0, 5)
                            .map((coping, index) => (
                              <li key={index}>{coping}</li>
                            ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-muted-foreground">Henüz stres kaydı bulunmuyor</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
