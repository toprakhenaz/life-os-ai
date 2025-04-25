import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart2, Brain, Calendar, Clock, HeartPulse, Target } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const modules = [
    {
      title: "Aktivite Takibi",
      description: "Zaman kullanımı, uyku, beslenme ve fiziksel aktivite kayıtları",
      icon: <Clock className="h-6 w-6" />,
      href: "/aktivite-takibi",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Duygusal Durum İzleme",
      description: "Ruh hali, enerji seviyesi ve stres tetikleyicileri",
      icon: <Brain className="h-6 w-6" />,
      href: "/duygusal-durum",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Zaman Yönetimi",
      description: "Optimal çalışma ve dinlenme blokları, görev planlaması",
      icon: <Calendar className="h-6 w-6" />,
      href: "/zaman-yonetimi",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Hedef Takip",
      description: "Hedef yol haritaları, ilerleme görselleştirme ve alışkanlık izleme",
      icon: <Target className="h-6 w-6" />,
      href: "/hedefler",
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Öğrenme ve Gelişim",
      description: "Öğrenme planları, beceri geliştirme ve bilgi ağları",
      icon: <BarChart2 className="h-6 w-6" />,
      href: "/ogrenme",
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Sağlık ve Zindelik",
      description: "Uyku optimizasyonu, beslenme planları ve stres yönetimi",
      icon: <HeartPulse className="h-6 w-6" />,
      href: "/saglik",
      color: "bg-teal-100 text-teal-700",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">LifeOS</h1>
        <p className="text-muted-foreground">Kişisel yaşam yönetim sisteminiz</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Link href={module.href} key={index}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${module.color}`}>{module.icon}</div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
