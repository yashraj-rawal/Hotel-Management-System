import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import User from "@/models/User";
import { format } from "date-fns";
import { CheckCircle2, 
  Clock, 
  Users, 
  MoreHorizontal, 
  ArrowUpRight, 
  Calendar as CalendarIcon,
  Search } from "lucide-react";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminArrivalsPage() {
  await dbConnect();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const arrivals = await Booking.find({
    checkInDate: { $gte: todayStart, $lte: endDate },
    status: { $ne: "Cancelled" },
  })
    .populate("user", "name email phoneNumber")
    .populate("room", "roomNumber type")
    .sort({ createdAt: 1 });

  return (
    <div className="flex-col md:flex bg-slate-50/50 min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* Header & Actions */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Arrivals</h2>
            <div className="flex items-center text-muted-foreground mt-1">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">
                {format(new Date(), "EEEE, MMMM do, yyyy")}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Download Report
            </Button>
            <Button size="sm">Print Guest List</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expected
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{arrivals.length}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rooms Ready</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/22</div>
              <p className="text-xs text-muted-foreground">
                81.8% occupancy ready
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Table Section */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Guest Registry</CardTitle>
                <CardDescription>
                  Managing today's scheduled check-ins and room assignments.
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search guests..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-75">Guest Information</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arrivals.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground italic"
                    >
                      No arrivals scheduled for today.
                    </TableCell>
                  </TableRow>
                ) : (
                  arrivals.map((arrival) => (
                    <TableRow key={arrival._id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-slate-100">
                            <AvatarFallback className="bg-slate-900 text-white text-xs">
                              {arrival.user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                              {arrival.user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {arrival.user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-mono font-medium text-sm">
                            Room {arrival.room.roomNumber}
                          </span>
                          <span className="text-[10px] uppercase text-muted-foreground tracking-wider">
                            {arrival.room.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {arrival.paymentStatus === "Paid" ? (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 border-emerald-100 gap-1"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Paid
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-amber-600 border-amber-200 gap-1"
                          >
                            <Clock className="h-3 w-3" /> Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            arrival.status === "Confirmed"
                              ? "default"
                              : "outline"
                          }
                        >
                          {arrival.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2 group-hover:bg-primary group-hover:text-white transition-all"
                        >
                          Check-in <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center pt-4">
          Standard check-in protocol: Verify ID and collect security deposit for
          all "Pending" payments.
        </p>
      </div>
    </div>
  );
}
