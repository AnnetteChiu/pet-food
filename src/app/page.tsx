import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { OrdersByCountryChart } from '@/components/dashboard/orders-by-country-chart';
import { InventoryLevelsChart } from '@/components/dashboard/inventory-levels-chart';
import { AiRecommendations } from '@/components/dashboard/ai-recommendations';
import { supplyChainData } from '@/lib/data';
import { Icons } from '@/components/icons';
import { LayoutDashboard, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { kpiData, ordersByCountry, inventoryLevels, metrics, historicalData } = supplyChainData;
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
             <Icons.logo className="w-8 h-8 text-primary" />
             <span className="text-lg font-semibold">Supply Chain Analyzer</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
               <SidebarMenuButton asChild tooltip="Dashboard" isActive>
                <Link href="/">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Market Analysis">
                <Link href="/market-analysis">
                  <TrendingUp />
                  <span>Market Analysis</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4 md:p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}

          <div className="md:col-span-2 lg:col-span-4 xl:col-span-2 rounded-lg bg-card text-card-foreground shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Orders by Country</h3>
            <div className="h-[300px]">
              <OrdersByCountryChart data={ordersByCountry} />
            </div>
          </div>
          
          <div className="md:col-span-2 lg:col-span-4 xl:col-span-2 rounded-lg bg-card text-card-foreground shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Inventory Levels</h3>
            <div className="h-[300px]">
              <InventoryLevelsChart data={inventoryLevels} />
            </div>
          </div>
          
          <div className="md:col-span-2 lg:col-span-4">
            <AiRecommendations metrics={metrics} historicalData={historicalData} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
