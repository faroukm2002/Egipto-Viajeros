"use client";

import { Progress } from "@/components/ui/progress";
import { Building, Sailboat, Compass, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopPerformerItem {
  id: number;
  name: string;
  type: "hotel" | "yacht" | "tour" | "package";
  revenue: number;
  growth: number;
  bookings: number;
}

const topPerformers: TopPerformerItem[] = [
  {
    id: 1,
    name: "Nile View Palace",
    type: "hotel",
    revenue: 24350,
    growth: 12,
    bookings: 178,
  },
  {
    id: 2,
    name: "Royal Yacht Experience",
    type: "yacht",
    revenue: 18720,
    growth: 8,
    bookings: 92,
  },
  {
    id: 3,
    name: "Pyramids & Sphinx Tour",
    type: "tour",
    revenue: 15940,
    growth: 23,
    bookings: 246,
  },
  {
    id: 4,
    name: "Complete Cairo Experience",
    type: "package",
    revenue: 42150,
    growth: 18,
    bookings: 85,
  },
  {
    id: 5,
    name: "Luxor Heritage Tour",
    type: "tour",
    revenue: 12840,
    growth: 15,
    bookings: 163,
  },
];

export function TopPerformers() {
  const maxRevenue = Math.max(...topPerformers.map(item => item.revenue));
  
  const getIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Building className="h-4 w-4" />;
      case "yacht":
        return <Sailboat className="h-4 w-4" />;
      case "tour":
        return <Compass className="h-4 w-4" />;
      case "package":
        return <Package className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {topPerformers.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                item.type === "hotel" && "bg-red-100 text-red-700",
                item.type === "yacht" && "bg-blue-100 text-blue-700",
                item.type === "tour" && "bg-amber-100 text-amber-700",
                item.type === "package" && "bg-emerald-100 text-emerald-700",
              )}>
                {getIcon(item.type)}
              </div>
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs capitalize text-muted-foreground">{item.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">${item.revenue.toLocaleString()}</p>
              <p className="text-xs text-emerald-500">+{item.growth}%</p>
            </div>
          </div>
          <Progress value={(item.revenue / maxRevenue) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">{item.bookings} bookings</p>
        </div>
      ))}
    </div>
  );
}