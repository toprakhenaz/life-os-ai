"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SleepData {
  date: string
  duration: number
  quality: number
}

const qualityValueMap = {
  "çok kötü": 1,
  kötü: 2,
  orta: 3,
  iyi: 4,
  "çok iyi": 5,
}

export function SleepChart({ data }: { data: any[] }) {
  // Veriyi grafik için hazırla
  const chartData = data
    .map((item) => {
      const qualityValue = qualityValueMap[item.data.quality] || 3

      return {
        date: new Date(item.data.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" }),
        duration: Number.parseFloat(item.data.duration),
        quality: qualityValue,
      }
    })
    .reverse() // En eski tarihten en yeniye doğru sırala

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uyku Süresi ve Kalitesi</CardTitle>
        <CardDescription>Son 7 günlük uyku süresi ve kalitesi</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            duration: {
              label: "Süre (saat)",
              color: "hsl(var(--chart-1))",
            },
            quality: {
              label: "Kalite",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar yAxisId="left" dataKey="duration" fill="var(--color-duration)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="quality" fill="var(--color-quality)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
