"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MoodData {
  date: string
  mood: number
  energy: number
}

const moodValueMap = {
  "çok kötü": 1,
  kötü: 2,
  nötr: 3,
  iyi: 4,
  "çok iyi": 5,
}

const energyValueMap = {
  "çok düşük": 1,
  düşük: 2,
  orta: 3,
  yüksek: 4,
  "çok yüksek": 5,
}

export function MoodChart({ data }: { data: any[] }) {
  // Veriyi grafik için hazırla
  const chartData = data
    .map((item) => {
      const moodValue = moodValueMap[item.data.mood] || 3
      const energyValue = energyValueMap[item.data.energy] || 3

      return {
        date: new Date(item.data.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }),
        mood: moodValue,
        energy: energyValue,
      }
    })
    .reverse() // En eski tarihten en yeniye doğru sırala

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ruh Hali ve Enerji Seviyesi Trendi</CardTitle>
        <CardDescription>Son 30 günlük ruh hali ve enerji seviyesi değişimi</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            mood: {
              label: "Ruh Hali",
              color: "hsl(var(--chart-1))",
            },
            energy: {
              label: "Enerji",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="mood" stroke="var(--color-mood)" strokeWidth={2} />
              <Line type="monotone" dataKey="energy" stroke="var(--color-energy)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
