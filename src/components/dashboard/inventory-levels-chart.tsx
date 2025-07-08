'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface InventoryLevelsChartProps {
  data: { month: string; "Product A": number; "Product B": number }[];
}

const chartConfig = {
  productA: {
    label: "Product A",
    color: "hsl(var(--primary))",
  },
  productB: {
    label: "Product B",
    color: "hsl(var(--chart-2))",
  },
};

export function InventoryLevelsChart({ data }: InventoryLevelsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -10,
              bottom: 0,
            }}
            accessibilityLayer
          >
            <XAxis
              dataKey="month"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
              content={<ChartTooltipContent />}
            />
            <Area
              type="monotone"
              dataKey="Product A"
              stackId="1"
              stroke={chartConfig.productA.color}
              fill={chartConfig.productA.color}
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="Product B"
              stackId="1"
              stroke={chartConfig.productB.color}
              fill={chartConfig.productB.color}
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
