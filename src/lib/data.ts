import { Package, Truck, Warehouse, CheckCircle } from 'lucide-react';

// This is mock data simulating what would be parsed from Royal Canin's GitHub CSVs.
// In a real application, this would be fetched and processed dynamically.

const kpiData = [
  {
    title: "Total Orders",
    value: "12,450",
    icon: Package,
    change: "+12.5%",
    changeType: "increase",
  },
  {
    title: "Avg. Transit Time",
    value: "4.2 days",
    icon: Truck,
    change: "-5.2%",
    changeType: "decrease",
  },
  {
    title: "Warehouses",
    value: "8",
    icon: Warehouse,
    change: "Operational",
    changeType: "neutral",
  },
  {
    title: "On-time Delivery",
    value: "97.8%",
    icon: CheckCircle,
    change: "+1.1%",
    changeType: "increase",
  },
];

const ordersByCountry = [
  { country: "USA", orders: 4200 },
  { country: "Germany", orders: 2100 },
  { country: "France", orders: 1850 },
  { country: "Canada", orders: 1500 },
  { country: "UK", orders: 1250 },
  { country: "Japan", orders: 1050 },
  { country: "Australia", orders: 500 },
];

const inventoryLevels = [
  { month: "Jan", "Product A": 4000, "Product B": 2400 },
  { month: "Feb", "Product A": 3000, "Product B": 1398 },
  { month: "Mar", "Product A": 2000, "Product B": 9800 },
  { month: "Apr", "Product A": 2780, "Product B": 3908 },
  { month: "May", "Product A": 1890, "Product B": 4800 },
  { month: "Jun", "Product A": 2390, "Product B": 3800 },
  { month: "Jul", "Product A": 3490, "Product B": 4300 },
];

const metrics = {
  supplierLocations: [
    { supplier: "Supplier A", country: "USA", leadTime: 5 },
    { supplier: "Supplier B", country: "China", leadTime: 20 },
    { supplier: "Supplier C", country: "Germany", leadTime: 7 },
  ],
  transitTimes: {
    average: 4.2,
    min: 2,
    max: 25,
    stdDev: 3.1
  },
  inventoryLevels: {
    totalUnits: 45820,
    turnoverRatio: 5.8,
    stockoutRate: "2.1%"
  },
};

const historicalData = {
  pastPerformance: [
    { year: 2022, onTimeDelivery: "96.5%", totalOrders: 11000 },
    { year: 2023, onTimeDelivery: "97.1%", totalOrders: 11800 },
  ],
  disruptions: [
    { date: "2023-04-15", event: "Port congestion in Shanghai", impact: "Delayed shipments by 10 days" },
    { date: "2023-11-20", event: "Warehouse C temporary shutdown", impact: "Reduced capacity by 25% for 1 week" },
  ]
};

const salesReportRawData = [
  { "date": "2024-04-01", "product": "Product A", "units_sold": 150, "revenue": 7500, "region": "USA" },
  { "date": "2024-04-05", "product": "Product B", "units_sold": 100, "revenue": 8000, "region": "Germany" },
  { "date": "2024-04-12", "product": "Product A", "units_sold": 200, "revenue": 10000, "region": "USA" },
  { "date": "2024-05-02", "product": "Product C", "units_sold": 50, "revenue": 4500, "region": "France" },
  { "date": "2024-05-18", "product": "Product B", "units_sold": 120, "revenue": 9600, "region": "USA" },
  { "date": "2024-06-10", "product": "Product A", "units_sold": 180, "revenue": 9000, "region": "UK" },
  { "date": "2024-_06-25", "product": "Product C", "units_sold": 80, "revenue": 7200, "region": "Germany" }
];

const marketingCostRawData = {
  "campaign": "Summer Pet Health",
  "budget": 20000,
  "channels": [
    { "name": "Social Media", "spend": 8500, "conversions": 150, "revenue": 45000 },
    { "name": "Search Ads", "spend": 7500, "conversions": 120, "revenue": 40000 },
    { "name": "Email Marketing", "spend": 3000, "conversions": 200, "revenue": 55000 }
  ]
};


export const supplyChainData = {
  kpiData,
  ordersByCountry,
  inventoryLevels,
  metrics: JSON.stringify(metrics, null, 2),
  historicalData: JSON.stringify(historicalData, null, 2),
  salesReportData: JSON.stringify(salesReportRawData, null, 2),
  marketingCostData: JSON.stringify(marketingCostRawData, null, 2),
};
