import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import {
  DollarSign,
  Bed,
  CalendarCheck,
  Users,
  TrendingUp,
  ArrowUpRight,
  Download,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function AdminAnalyticsPage() {
  await dbConnect();

  const allBookings = await Booking.find({ status: { $ne: "Cancelled" } });
  const totalRooms = await Room.countDocuments();

  const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalBookings = allBookings.length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const occupiedToday = await Booking.countDocuments({
    checkInDate: { $lte: today },
    checkOutDate: { $gte: today },
    status: "Confirmed",
  });
  const occupancyRate = totalRooms > 0 ? (occupiedToday / totalRooms) * 100 : 0;

  const stats = [
    {
      name: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      trend: "+12.5%",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      name: "Total Bookings",
      value: totalBookings,
      trend: "+4% growth",
      icon: CalendarCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "Occupancy Rate",
      value: `${occupancyRate.toFixed(1)}%`,
      trend: "Near capacity",
      icon: Bed,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      name: "Active Guests",
      value: occupiedToday,
      trend: "Live check-ins",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="flex-col md:flex bg-slate-50/50 min-h-screen">
      <div className="flex-1 space-y-8 p-8 pt-6">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Market Intelligence
            </h2>
            <p className="text-muted-foreground font-medium">
              Performance metrics for Yashraj Hotel & Spa
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-white">
              <TrendingUp className="mr-2 h-4 w-4" /> Compare Dates
            </Button>
            <Button size="sm" className="shadow-md">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.name}
              className="border-slate-200 shadow-sm transition-all hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center font-medium">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Main Chart Card */}
          <Card className="lg:col-span-4 border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Financial performance over the current billing cycle.
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs bg-white shadow-sm"
                >
                  Weekly
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Monthly
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-75 flex items-center justify-center">
              <div className="relative w-full h-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden">
                {/* Visual Chart Placeholder */}
                <div className="absolute inset-0 flex items-end justify-around px-8 opacity-20">
                  {[35, 60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                    <div
                      key={i}
                      className="w-8 bg-primary rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <BarChart3 className="h-10 w-10 text-slate-300 mb-2" />
                <p className="text-sm font-semibold text-slate-400">
                  Chart Visualization Area
                </p>
                <p className="text-xs text-slate-400 italic">
                  Integrate Recharts or Chart.js here
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Goals Card */}
          <Card className="lg:col-span-3 border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Inventory Goals</CardTitle>
              <CardDescription>
                Target vs Actual room occupancy distribution.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="relative flex items-center justify-center">
                  {/* Custom Circle Progress using SVG for high-end look */}
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-100"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * occupancyRate) / 100}
                      className="text-primary transition-all duration-1000 ease-in-out"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold tracking-tighter">
                    {occupancyRate.toFixed(1)}%
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="mt-4 bg-primary/5 text-primary border-primary/20"
                >
                  Active Utilization
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                    <span className="text-muted-foreground">
                      Standard Rooms
                    </span>
                    <span className="text-slate-900">
                      {Math.round(occupancyRate * 0.4)}%
                    </span>
                  </div>
                  <Progress value={occupancyRate * 0.4} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                    <span className="text-muted-foreground">
                      Executive Suites
                    </span>
                    <span className="text-slate-900">
                      {Math.round(occupancyRate * 0.6)}%
                    </span>
                  </div>
                  <Progress value={occupancyRate * 0.6} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
