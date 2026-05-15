"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A bar chart";

const chartData = [
  { status: "Backlog", projects: 8 },
  { status: "En curso", projects: 14 },
  { status: "En revision", projects: 5 },
  { status: "Completado", projects: 19 },
  { status: "Bloqueado", projects: 3 },
];

const chartConfig = {
  projects: {
    label: "Proyectos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos por estado</CardTitle>
        <CardDescription>Distribucion actual del portafolio</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="projects" fill="var(--color-projects)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          19 proyectos finalizados este ciclo <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Vista rapida de carga operativa por estado
        </div>
      </CardFooter>
    </Card>
  );
}
