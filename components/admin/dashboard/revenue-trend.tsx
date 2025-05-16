"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface DataPoint {
  name: string;
  hotels: number;
  yachts: number;
  tours: number;
}

const generateRevenueData = (): DataPoint[] => {
  return Array.from({ length: 12 }).map((_, i) => ({
    name: months[i],
    hotels: Math.floor(Math.random() * 20000) + 15000,
    yachts: Math.floor(Math.random() * 15000) + 10000, 
    tours: Math.floor(Math.random() * 12000) + 8000,
  }));
};

export function RevenueTrend() {
  const [data, setData] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    setData(generateRevenueData());
  }, []);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--muted))" }}
            axisLine={{ stroke: "hsl(var(--muted))" }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--muted))" }}
            axisLine={{ stroke: "hsl(var(--muted))" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">{label}</div>
                      <div className="font-medium">Revenue</div>
                      {payload.map((entry) => (
                        <div
                          key={entry.dataKey}
                          className="flex items-center gap-1 text-sm"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor:
                                entry.dataKey === "hotels"
                                  ? "hsl(var(--chart-1))"
                                  : entry.dataKey === "yachts"
                                  ? "hsl(var(--chart-2))"
                                  : "hsl(var(--chart-3))",
                            }}
                          />
                          <span className="capitalize">{entry.dataKey}</span>
                        </div>
                      ))}
                      {payload.map((entry) => (
                        <div
                          key={entry.dataKey}
                          className="text-right text-sm font-medium"
                        >
                          ${Number(entry.value).toLocaleString()}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="hotels"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="yachts"
            stroke="hsl(var(--chart-2))"
            fill="hsl(var(--chart-2))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="tours"
            stroke="hsl(var(--chart-3))"
            fill="hsl(var(--chart-3))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}