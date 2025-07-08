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
import { Icons } from '@/components/icons';
import { LayoutDashboard, TrendingUp, DollarSign, Dog } from 'lucide-react';
import Link from 'next/link';
import { MarketAnalysis } from '@/components/dashboard/market-analysis';

export default function MarketAnalysisPage() {
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
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Market Analysis" isActive>
                <Link href="/market-analysis">
                  <TrendingUp />
                  <span>Market Analysis</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Sales Report">
                <Link href="/sales-report">
                  <DollarSign />
                  <span>Sales Report</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Pet Industry">
                <Link href="/pet-industry">
                  <Dog />
                  <span>Pet Industry</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <MarketAnalysis />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
