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
import { saveTask } from "@/lib/actions"

const taskSchema = z.object({
  title: z.string().min(1, "Başlık gereklidir"),
  description: z.string().optional(),
  priority: z.string().min(1, "Öncelik gereklidir"),
  dueDate: z.string().optional(),
  estimatedTime: z.string().min(1, "Tahmini süre gereklidir"),
  category: z.string().min(1, "Kategori gereklidir"),
})

export default function ZamanYonetimi() {
  const today = new Date().toISOString().split("T")[0]

  const taskForm = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      dueDate: today,
      estimatedTime: "",
      category: "",
    },
  })

  const onTaskSubmit = async (data) => {
    await saveTask(data)
    taskForm.reset({
      title: "",
      description: "",
      priority: "",
      dueDate: today,
      estimatedTime: "",
      category: "",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Zaman Yönetimi</h1>
        <p className="text-muted-foreground">Görevlerinizi planlayın ve zamanınızı optimize edin</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Yeni Görev Ekle</CardTitle>
            <CardDescription>Eisenhower Matrisi ve Pareto prensibi ile görevlerinizi önceliklendirin</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...taskForm}>
              <form onSubmit={taskForm.handleSubmit(onTaskSubmit)} className="space-y-4">
                <FormField
                  control={taskForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık</FormLabel>
                      <FormControl>
                        <Input placeholder="Görev başlığı" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={taskForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Görev açıklaması" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={taskForm.control}
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
                            <SelectItem value="acil-önemli">Acil ve Önemli</SelectItem>
                            <SelectItem value="önemli">Önemli, Acil Değil</SelectItem>
                            <SelectItem value="acil">Acil, Önemli Değil</SelectItem>
                            <SelectItem value="rutin">Ne Acil Ne Önemli</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Eisenhower Matrisi</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={taskForm.control}
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
                            <SelectItem value="iş">İş</SelectItem>
                            <SelectItem value="kişisel">Kişisel</SelectItem>
                            <SelectItem value="sağlık">Sağlık</SelectItem>
                            <SelectItem value="eğitim">Eğitim</SelectItem>
                            <SelectItem value="sosyal">Sosyal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={taskForm.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bitiş Tarihi</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={taskForm.control}
                    name="estimatedTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tahmini Süre (dakika)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="25" {...field} />
                        </FormControl>
                        <FormDescription>Pomodoro tekniği için</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Görev Ekle</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zaman Yönetimi Teknikleri</CardTitle>
            <CardDescription>Üretkenliğinizi artırmak için kullanabileceğiniz teknikler</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Pomodoro Tekniği</h3>
              <p className="text-sm text-muted-foreground">
                25 dakika çalışma, 5 dakika mola döngüsü. 4 pomodoro sonrası 15-30 dakika uzun mola.
              </p>
              <Button variant="outline" className="w-full">
                Pomodoro Başlat
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Time Blocking</h3>
              <p className="text-sm text-muted-foreground">
                Gününüzü belirli aktiviteler için ayrılmış bloklara bölün.
              </p>
              <Button variant="outline" className="w-full">
                Zaman Bloğu Oluştur
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">90/20 Döngüsü</h3>
              <p className="text-sm text-muted-foreground">
                Ultradian ritimlere göre 90 dakika çalışma, 20 dakika dinlenme.
              </p>
              <Button variant="outline" className="w-full">
                90/20 Döngüsü Başlat
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">MIT (En Önemli Görevler)</h3>
              <p className="text-sm text-muted-foreground">
                Günlük 1-3 en önemli görevi belirleyin ve öncelikli olarak tamamlayın.
              </p>
              <Button variant="outline" className="w-full">
                MIT Belirle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
