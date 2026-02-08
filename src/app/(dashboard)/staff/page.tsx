import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import { Clock, 
  LogIn, 
  LogOut, 
  UserCheck, 
  DoorOpen, 
  ArrowRightLeft,
  Search,
  RefreshCw,
  MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default async function StaffDashboard() {
  await dbConnect();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const arrivals = await Booking.find({
    checkInDate: { $gte: today, $lt: tomorrow },
    status: "Confirmed",
  }).populate("user room");

  const departures = await Booking.find({
    checkOutDate: { $gte: today, $lt: tomorrow },
    status: "CheckedIn",
  }).populate("user room");

  return (
    <div className="flex-col md:flex bg-slate-50/50 min-h-screen">
      <div className="flex-1 space-y-6 p-8 pt-6">
        
        {/* Top Operational Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Operations
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Front Desk <span className="text-slate-400 font-light">Ops</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search guest or room..." className="pl-9 bg-white" />
            </div>
            <Button variant="outline" size="icon" className="bg-white">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs defaultValue="arrivals" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger value="arrivals" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-8">
                Arrivals <Badge variant="secondary" className="ml-2 bg-slate-200">{arrivals.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="departures" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-8">
                Departures <Badge variant="secondary" className="ml-2 bg-slate-200">{departures.length}</Badge>
              </TabsTrigger>
            </TabsList>
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground font-medium bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <Clock className="h-3.5 w-3.5" /> Shift: Morning Desk (8:00 AM - 4:00 PM)
            </div>
          </div>

          {/* Arrivals Tab Content */}
          <TabsContent value="arrivals" className="space-y-4 border-none p-0 outline-none">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <LogIn className="h-5 w-5" />
                    <CardTitle className="text-lg">Pending Arrivals</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">Mark All Ready</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-125">
                  {arrivals.length === 0 ? (
                    <div className="p-20 text-center text-muted-foreground italic">No pending arrivals.</div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {arrivals.map((b) => (
                        <div key={b._id} className="flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border border-slate-200">
                              <AvatarFallback className="bg-emerald-50 text-emerald-700 font-bold">
                                {b.user?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-slate-900 leading-none mb-1.5">{b.user?.name}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono text-[10px] bg-white">
                                  ROOM {b.room?.roomNumber}
                                </Badge>
                                <span className="text-[11px] text-muted-foreground uppercase font-medium tracking-tight">
                                  {b.room?.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-slate-400">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-100">
                              <UserCheck className="mr-2 h-4 w-4" /> Check In
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departures Tab Content */}
          <TabsContent value="departures" className="space-y-4 border-none p-0 outline-none">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b py-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <LogOut className="h-5 w-5" />
                  <CardTitle className="text-lg">Scheduled Departures</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-125">
                  {departures.length === 0 ? (
                    <div className="p-20 text-center text-muted-foreground italic">No pending departures.</div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {departures.map((b) => (
                        <div key={b._id} className="flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border border-slate-200">
                              <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
                                {b.user?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-slate-900 leading-none mb-1.5">{b.user?.name}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Room {b.room?.roomNumber}</span>
                                <Separator orientation="vertical" className="h-3" />
                                <span className="text-amber-600">Pending Checkout</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                            <DoorOpen className="mr-2 h-4 w-4" /> Check Out
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer System Status */}
        <div className="flex items-center justify-between pt-4 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] border-t border-slate-200">
          <div className="flex gap-4">
            <span>Terminal: FRONT-DESK-01</span>
            <span>Sync: 0.2ms</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Yashraj Cloud Active
          </div>
        </div>
      </div>
    </div>
  );
}