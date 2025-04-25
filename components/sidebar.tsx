"use client"

import { cn } from "@/lib/utils"
import { BarChart2, Brain, Calendar, Clock, HeartPulse, Home, Target, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Ana Sayfa",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Aktivite Takibi",
      href: "/aktivite-takibi",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      name: "Duygusal Durum",
      href: "/duygusal-durum",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Zaman Yönetimi",
      href: "/zaman-yonetimi",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Hedefler",
      href: "/hedefler",
      icon: <Target className="h-5 w-5" />,
    },
    {
      name: "Öğrenme ve Gelişim",
      href: "/ogrenme",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: "Sağlık ve Zindelik",
      href: "/saglik",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      name: "Profil",
      href: "/profil",
      icon: <User className="h-5 w-5" />,
    },
  ]

  return (
    <div className="hidden border-r bg-background lg:block lg:w-64">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">LifeOS</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
