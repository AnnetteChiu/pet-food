'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface OrdersByCountryChartProps {
  data: { country: string; orders: number }[];
}

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
};

export function OrdersByCountryChart({ data }: OrdersByCountryChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            dataKey="country"
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
          <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
