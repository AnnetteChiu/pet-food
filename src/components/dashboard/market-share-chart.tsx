'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface MarketShareChartProps {
  data: { company: string; share: number }[];
}

const chartConfig = {
  share: {
    label: "Market Share (%)",
    color: "hsl(var(--primary))",
  },
};

export function MarketShareChart({ data }: MarketShareChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 0,
          }}
          accessibilityLayer
        >
          <XAxis
            type="number"
            domain={[0, 'dataMax + 5']}
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            dataKey="company"
            type="category"
            width={100}
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--foreground))"
            fontSize={12}
          />
          <Tooltip
             cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
             content={<ChartTooltipContent formatter={(value) => `${value}%`} />}
          />
          <Bar dataKey="share" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
