"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { month: "Ene", activeUsers: 38, newUsers: 12 },
  { month: "Feb", activeUsers: 42, newUsers: 9 },
  { month: "Mar", activeUsers: 45, newUsers: 11 },
  { month: "Abr", activeUsers: 47, newUsers: 14 },
  { month: "May", activeUsers: 51, newUsers: 10 },
  { month: "Jun", activeUsers: 54, newUsers: 13 },
];

const chartConfig = {
  activeUsers: {
    label: "Usuarios activos",
    color: "var(--chart-1)",
  },
  newUsers: {
    label: "Usuarios nuevos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartLineMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolucion de usuarios</CardTitle>
        <CardDescription>Ultimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="activeUsers"
              type="monotone"
              stroke="var(--color-activeUsers)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="newUsers"
              type="monotone"
              stroke="var(--color-newUsers)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Crecimiento sostenido de usuarios{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Compara base activa contra adquisicion mensual
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
