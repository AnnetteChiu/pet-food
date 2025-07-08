import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export function KpiCard({ title, value, icon: Icon, change, changeType }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <span
            className={cn(
              'flex items-center gap-1',
              changeType === 'increase' && 'text-green-600',
              changeType === 'decrease' && 'text-red-600'
            )}
          >
            {changeType === 'increase' && <ArrowUpRight className="h-4 w-4" />}
            {changeType === 'decrease' && <ArrowDownRight className="h-4 w-4" />}
            {change}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
