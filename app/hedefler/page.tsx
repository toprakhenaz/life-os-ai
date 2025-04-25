"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { saveGoal } from "@/lib/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, CheckSquare } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const goalSchema = z.object({
  title: z.string().min(1, "Başlık gereklidir"),
  description: z.string().optional(),
  category: z.string().min(1, "Kategori gereklidir"),
  deadline: z.string().optional(),
  specific: z.string().min(1, "Spesifik hedef gereklidir"),
  measurable: z.string().min(1, "Ölçülebilir kriter gereklidir"),
  achievable: z.string().min(1, "Ulaşılabilirlik açıklaması gereklidir"),
  relevant: z.string().min(1, "İlgililik açıklaması gereklidir"),
  timeBound: z.string().min(1, "Zaman sınırı gereklidir"),
})

const habitSchema = z.object({
  title: z.string().min(1, "Başlık gereklidir"),
  description: z.string().optional(),
  frequency: z.string().min(1, "Sıklık gereklidir"),
  trigger: z.string().min(1, "Tetikleyici gereklidir"),
  action: z.string().min(1, "Eylem gereklidir"),
  reward: z.string().min(1, "Ödül gereklidir"),
})

export default function Hedefler() {
  const today = new Date().toISOString().split("T")[0]

  const goalForm = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      deadline: "",
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      timeBound: "",
    },
  })

  const habitForm = useForm({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      title: "",
      description: "",
      frequency: "",
      trigger: "",
      action: "",
      reward: "",
    },
  })

  const onGoalSubmit = async (data) => {
    await saveGoal({ type: "goal", ...data })
    goalForm.reset({
      title: "",
      description: "",
      category: "",
      deadline: "",
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      timeBound: "",
    })
  }

  const onHabitSubmit = async (data) => {
    await saveGoal({ type: "habit", ...data })
    habitForm.reset({
      title: "",
      description: "",
      frequency: "",
      trigger: "",
      action: "",
      reward: "",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hedef Takip ve İlerleme</h1>
        <p className="text-muted-foreground">Hedeflerinizi belirleyin ve ilerlemenizi takip edin</p>
      </div>

      <Tabs defaultValue="goals">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Hedefler</span>
          </TabsTrigger>
          <TabsTrigger value="habits" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span>Alışkanlıklar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="goals">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Yeni Hedef Ekle</CardTitle>
                <CardDescription>SMART hedef çerçevesini kullanarak hedeflerinizi belirleyin</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...goalForm}>
                  <form onSubmit={goalForm.handleSubmit(onGoalSubmit)} className="space-y-4">
                    <FormField
                      control={goalForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlık</FormLabel>
                          <FormControl>
                            <Input placeholder="Hedef başlığı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={goalForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Açıklama</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Hedef açıklaması" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={goalForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Kategori seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="kariyer">Kariyer</SelectItem>
                                <SelectItem value="eğitim">Eğitim</SelectItem>
                                <SelectItem value="sağlık">Sağlık</SelectItem>
                                <SelectItem value="finans">Finans</SelectItem>
                                <SelectItem value="kişisel">Kişisel</SelectItem>
                                <SelectItem value="ilişkiler">İlişkiler</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={goalForm.control}
                        name="deadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Son Tarih</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={goalForm.control}
                      name="specific"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spesifik (S)</FormLabel>
                          <FormControl>
                            <Input placeholder="Hedef tam olarak nedir?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={goalForm.control}
                      name="measurable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ölçülebilir (M)</FormLabel>
                          <FormControl>
                            <Input placeholder="Başarıyı nasıl ölçeceksiniz?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={goalForm.control}
                      name="achievable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ulaşılabilir (A)</FormLabel>
                          <FormControl>
                            <Input placeholder="Bu hedefe ulaşmak gerçekçi mi?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={goalForm.control}
                      name="relevant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İlgili (R)</FormLabel>
                          <FormControl>
                            <Input placeholder="Bu hedef sizin için neden önemli?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={goalForm.control}
                      name="timeBound"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zaman Sınırlı (T)</FormLabel>
                          <FormControl>
                            <Input placeholder="Hedefe ne zaman ulaşmayı planlıyorsunuz?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Hedef Ekle</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aktif Hedefler</CardTitle>
                <CardDescription>İlerleme durumunuzu görüntüleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Haftada 3 kez egzersiz yapmak</h3>
                    <span className="text-sm text-muted-foreground">2/3</span>
                  </div>
                  <Progress value={66} />
                  <p className="text-sm text-muted-foreground">Son tarih: 30 Haziran 2023</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Yeni bir programlama dili öğrenmek</h3>
                    <span className="text-sm text-muted-foreground">30%</span>
                  </div>
                  <Progress value={30} />
                  <p className="text-sm text-muted-foreground">Son tarih: 15 Ağustos 2023</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">10 kg vermek</h3>
                    <span className="text-sm text-muted-foreground">4/10</span>
                  </div>
                  <Progress value={40} />
                  <p className="text-sm text-muted-foreground">Son tarih: 1 Eylül 2023</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="habits">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Yeni Alışkanlık Ekle</CardTitle>
                <CardDescription>BJ Fogg davranış modeli temelli alışkanlık oluşturma</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...habitForm}>
                  <form onSubmit={habitForm.handleSubmit(onHabitSubmit)} className="space-y-4">
                    <FormField
                      control={habitForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlık</FormLabel>
                          <FormControl>
                            <Input placeholder="Alışkanlık başlığı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={habitForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Açıklama</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Alışkanlık açıklaması" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={habitForm.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sıklık</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sıklık seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="günlük">Günlük</SelectItem>
                              <SelectItem value="haftada-1">Haftada 1 kez</SelectItem>
                              <SelectItem value="haftada-2">Haftada 2 kez</SelectItem>
                              <SelectItem value="haftada-3">Haftada 3 kez</SelectItem>
                              <SelectItem value="haftada-5">Haftada 5 kez</SelectItem>
                              <SelectItem value="ayda-1">Ayda 1 kez</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={habitForm.control}
                      name="trigger"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tetikleyici (Tiny Habit)</FormLabel>
                          <FormControl>
                            <Input placeholder="Hangi olay sonrası bu alışkanlığı yapacaksınız?" {...field} />
                          </FormControl>
                          <FormDescription>Örn: "Kahvaltıdan sonra..."</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={habitForm.control}
                      name="action"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Eylem</FormLabel>
                          <FormControl>
                            <Input placeholder="Yapacağınız eylem" {...field} />
                          </FormControl>
                          <FormDescription>Örn: "...10 dakika meditasyon yapacağım"</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={habitForm.control}
                      name="reward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ödül</FormLabel>
                          <FormControl>
                            <Input placeholder="Kendinize vereceğiniz ödül" {...field} />
                          </FormControl>
                          <FormDescription>Örn: "Kendime 'Harika iş çıkardım!' diyeceğim"</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Alışkanlık Ekle</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alışkanlık Takibi</CardTitle>
                <CardDescription>Alışkanlıklarınızı takip edin ve zinciri kırmayın</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Günlük Su İçme (2L)</h3>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">6/7 gün tamamlandı</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Sabah Meditasyonu</h3>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">5/7 gün tamamlandı</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Haftada 3 Kez Egzersiz</h3>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-muted rounded-sm"></div>
                    <div className="w-6 h-6 bg-muted rounded-sm"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">2/3 haftalık hedef</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
