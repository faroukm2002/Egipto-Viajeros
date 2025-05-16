"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: string;
  trendType: "up" | "down";
}

export function StatCard({ title, value, description, icon, trend, trendType }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted">
            {icon}
          </div>
          <div className="flex items-center space-x-2">
            {trendType === "up" ? (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-rose-500" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                trendType === "up" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {trend}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}