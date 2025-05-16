"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building, 
  Sailboat, 
  Compass, 
  FileText, 
  Star, 
  MessageSquare, 
  Package,
  Users,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { StatCard } from "./stat-card";
import { RecentActivityPanel } from "./recent-activity";
import { RevenueTrend } from "./revenue-trend";
import { TopPerformers } from "./top-performers";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Egipto Viajeros admin dashboard</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Hotels" 
          value="24" 
          trend={"+12%"} 
          trendType="up"
          icon={<Building className="h-5 w-5" />} 
          description="Active properties" 
        />
        <StatCard 
          title="Active Yachts" 
          value="16" 
          trend={"+8%"} 
          trendType="up"
          icon={<Sailboat className="h-5 w-5" />} 
          description="Available for booking" 
        />
        <StatCard 
          title="Tours Booked" 
          value="243" 
          trend={"+32%"} 
          trendType="up"
          icon={<Compass className="h-5 w-5" />} 
          description="Last 30 days" 
        />
        <StatCard 
          title="Inquiries" 
          value="56" 
          trend={"-3%"} 
          trendType="down"
          icon={<MessageSquare className="h-5 w-5" />} 
          description="Pending responses" 
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue for the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueTrend />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Best performing services this month</CardDescription>
          </CardHeader>
          <CardContent>
            <TopPerformers />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivityPanel />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>At a glance performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Total Users</span>
              </div>
              <span className="font-medium">4,271</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Avg. Rating</span>
              </div>
              <span className="font-medium">4.8/5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Conversion</span>
              </div>
              <span className="font-medium">23.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Avg. Revenue</span>
              </div>
              <span className="font-medium">$842/user</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Package Sales</span>
              </div>
              <span className="font-medium">+17% (m/m)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}