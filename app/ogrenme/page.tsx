"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { BookOpen, Lightbulb, Repeat } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getLearning, saveLearning } from "@/lib/actions"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

const learningSchema = z.object({
  title: z.string().min(1, "Başlık gereklidir"),
  description: z.string().optional(),
  category: z.string().min(1, "Kategori gereklidir"),
  priority: z.string().min(1, "Öncelik gereklidir"),
  learningMethod: z.string().min(1, "Öğrenme metodu gereklidir"),
  estimatedTime: z.string().min(1, "Tahmini süre gereklidir"),
})

const repetitionSchema = z.object({
  topic: z.string().min(1, "Konu gereklidir"),
  notes: z.string().optional(),
  difficulty: z.string().min(1, "Zorluk seviyesi gereklidir"),
  nextReview: z.string().min(1, "Sonraki tekrar tarihi gereklidir"),
})

export default function Ogrenme() {
  const today = new Date().toISOString().split("T")[0]
  const [activeTab, setActiveTab] = useState("learning")
  const [learningData, setLearningData] = useState([])
  const [repetitionData, setRepetitionData] = useState([])

  const learningForm = useForm({
    resolver: zodResolver(learningSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "",
      learningMethod: "",
      estimatedTime: "",
    },
  })

  const repetitionForm = useForm({
    resolver: zodResolver(repetitionSchema),
    defaultValues: {
      topic: "",
      notes: "",
      difficulty: "",
      nextReview: today,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const learningResult = await getLearning("learning")
      if (learningResult.success) {
        setLearningData(learningResult.data || [])
      }

      const repetitionResult = await getLearning("repetition")
      if (repetitionResult.success) {
        setRepetitionData(repetitionResult.data || [])
      }
    }

    fetchData()
  }, [])

  const onLearningSubmit = async (data) => {
    const result = await saveLearning({ type: "learning", ...data })
    if (result.success) {
      learningForm.reset({
        title: "",
        description: "",
        category: "",
        priority: "",
        learningMethod: "",
        estimatedTime: "",
      })

      // Verileri yeniden yükle
      const learningResult = await getLearning("learning")
      if (learningResult.success) {
        setLearningData(learningResult.data || [])
      }
    }
  }

  const onRepetitionSubmit = async (data) => {
    const result = await saveLearning({ type: "repetition", ...data })
    if (result.success) {
      repetitionForm.reset({
        topic: "",
        notes: "",
        difficulty: "",
        nextReview: today,
      })

      // Verileri yeniden yükle
      const repetitionResult = await getLearning("repetition")
      if (repetitionResult.success) {
        setRepetitionData(repetitionResult.data || [])
      }
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Öğrenme ve Gelişim</h1>
        <p className="text-muted-foreground">Öğrenme planlarınızı oluşturun ve bilgilerinizi pekiştirin</p>
      </div>

      <Tabs defaultValue="learning" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Öğrenme Planı</span>
          </TabsTrigger>
          <TabsTrigger value="repetition" className="flex items-center gap-2">
            <Repeat className="h-4 w-4" />
            <span>Spaced Repetition</span>
          </TabsTrigger>
          <TabsTrigger value="techniques" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Öğrenme Teknikleri</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learning">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Yeni Öğrenme Planı</CardTitle>
                <CardDescription>Öğrenmek istediğiniz konuları planlayın</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...learningForm}>
                  <form onSubmit={learningForm.handleSubmit(onLearningSubmit)} className="space-y-4">
                    <FormField
                      control={learningForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Başlık</FormLabel>
                          <FormControl>
                            <Input placeholder="Öğrenme konusu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={learningForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Açıklama</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Konu hakkında detaylar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={learningForm.control}
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
                                <SelectItem value="programlama">Programlama</SelectItem>
                                <SelectItem value="dil">Yabancı Dil</SelectItem>
                                <SelectItem value="bilim">Bilim</SelectItem>
                                <SelectItem value="sanat">Sanat</SelectItem>
                                <SelectItem value="spor">Spor</SelectItem>
                                <SelectItem value="diğer">Diğer</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={learningForm.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Öncelik</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Öncelik seçin" />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={learningForm.control}
                        name="learningMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Öğrenme Metodu</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Metot seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="video">Video Kursları</SelectItem>
                                <SelectItem value="kitap">Kitap/Makale</SelectItem>
                                <SelectItem value="uygulama">Pratik Uygulama</SelectItem>
                                <SelectItem value="mentor">Mentorluk</SelectItem>
                                <SelectItem value="grup">Grup Çalışması</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={learningForm.control}
                        name="estimatedTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tahmini Süre (saat)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit">Kaydet</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aktif Öğrenme Planları</CardTitle>
                <CardDescription>Mevcut öğrenme planlarınız ve ilerlemeniz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningData.length > 0 ? (
                    learningData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.data.title}</h3>
                          <span className="text-sm text-muted-foreground">{item.data.priority}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.data.description}</p>
                        <div className="flex justify-between text-sm">
                          <span>{item.data.category}</span>
                          <span>{item.data.learningMethod}</span>
                          <span>{item.data.estimatedTime} saat</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 100)} />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Henüz öğrenme planı bulunmuyor</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="repetition">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spaced Repetition</CardTitle>
                <CardDescription>Bilgileri uzun süreli hafızaya aktarmak için tekrar planı oluşturun</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...repetitionForm}>
                  <form onSubmit={repetitionForm.handleSubmit(onRepetitionSubmit)} className="space-y-4">
                    <FormField
                      control={repetitionForm.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Konu</FormLabel>
                          <FormControl>
                            <Input placeholder="Tekrar edilecek konu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={repetitionForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notlar</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Konu hakkında notlar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={repetitionForm.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zorluk Seviyesi</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Zorluk seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="kolay">Kolay</SelectItem>
                                <SelectItem value="orta">Orta</SelectItem>
                                <SelectItem value="zor">Zor</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Zorluk seviyesine göre tekrar sıklığı belirlenir</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={repetitionForm.control}
                        name="nextReview"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sonraki Tekrar</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit">Kaydet</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tekrar Planı</CardTitle>
                <CardDescription>Bugün ve yaklaşan tekrarlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repetitionData.length > 0 ? (
                    repetitionData.map((item, index) => (
                      <div key={index} className="border-b pb-2">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.data.topic}</h3>
                          <span
                            className={`text-sm ${
                              new Date(item.data.nextReview) <= new Date() ? "text-red-500" : "text-muted-foreground"
                            }`}
                          >
                            {new Date(item.data.nextReview).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.data.notes}</p>
                        <div className="flex justify-between text-sm">
                          <span>Zorluk: {item.data.difficulty}</span>
                          <Button variant="outline" size="sm">
                            Tekrar Edildi
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">Henüz tekrar planı bulunmuyor</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="techniques">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Feynman Tekniği</CardTitle>
                <CardDescription>Karmaşık konuları basitleştirerek öğrenme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">1. Konuyu Seçin</h3>
                    <p className="text-sm text-muted-foreground">Öğrenmek istediğiniz konuyu bir kağıda yazın.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">2. Basit Anlatın</h3>
                    <p className="text-sm text-muted-foreground">
                      Konuyu bir çocuğa anlatır gibi basit kelimelerle açıklayın.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">3. Boşlukları Belirleyin</h3>
                    <p className="text-sm text-muted-foreground">
                      Anlatırken takıldığınız noktaları not edin ve bu konuları tekrar çalışın.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">4. Basitleştirin ve Hikayeleştirin</h3>
                    <p className="text-sm text-muted-foreground">
                      Konuyu daha da basitleştirin ve anlaşılır bir hikaye haline getirin.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deliberate Practice</CardTitle>
                <CardDescription>Bilinçli ve odaklanmış pratik ile beceri geliştirme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">1. Belirli Hedefler Belirleyin</h3>
                    <p className="text-sm text-muted-foreground">
                      Geliştirmek istediğiniz becerinin hangi yönüne odaklanacağınızı belirleyin.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">2. Tam Konsantrasyon</h3>
                    <p className="text-sm text-muted-foreground">
                      Pratik yaparken tam konsantrasyon ile çalışın, otomatik pilotta çalışmayın.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">3. Anında Geri Bildirim</h3>
                    <p className="text-sm text-muted-foreground">
                      Performansınız hakkında hemen geri bildirim alın ve hatalarınızı düzeltin.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">4. Konfor Alanınızın Dışına Çıkın</h3>
                    <p className="text-sm text-muted-foreground">
                      Kendinizi zorlayın ve sürekli olarak sınırlarınızı genişletin.
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
