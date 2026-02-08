import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  CreditCard,
  ChevronRight,
  BedDouble,
  ArrowRight,
  History,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  const bookings = await Booking.find({ user: session.user.id })
    .populate("room")
    .sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              Your <span className="text-primary">Stays</span>
            </h1>
            <p className="text-muted-foreground font-medium">
              View and manage your luxury experiences at Yashraj Hotel & Spa
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <History className="h-4 w-4" /> Export History
          </Button>
        </header>

        {bookings.length === 0 ? (
          <Card className="border-2 border-dashed bg-transparent p-16 text-center">
            <CardContent className="flex flex-col items-center gap-6">
              <div className="bg-white p-6 rounded-full shadow-sm border border-slate-100">
                <CalendarDays className="h-12 w-12 text-slate-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
                  No Active Reservations
                </h3>
                <p className="text-muted-foreground">
                  Your next luxury getaway is just a few clicks away.
                </p>
              </div>
              <Link href="/rooms">
                <Button className="rounded-full px-8 shadow-lg shadow-primary/20">
                  Browse Rooms <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card
                key={booking._id}
                className="group overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Visual Side Block */}
                  <div className="lg:w-48 bg-slate-100 relative flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
                    <BedDouble className="h-10 w-10 text-slate-300 group-hover:text-primary/40 transition-colors" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/80 backdrop-blur-sm text-[9px] font-black tracking-tighter text-slate-900 border-none">
                        YASHRAJ PREMIER
                      </Badge>
                    </div>
                  </div>

                  {/* Main Info Block */}
                  <div className="flex-1 p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                          {booking.room?.type} Suite
                        </h2>
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          <MapPin className="h-3 w-3 text-primary" /> Room{" "}
                          {booking.room?.roomNumber} • Main Wing
                        </div>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    <Separator className="bg-slate-100" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                      {/* Stay Dates */}
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Stay Dates
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/5 p-1.5 rounded text-primary">
                            <CalendarDays className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">
                            {format(new Date(booking.checkInDate), "MMM dd")} –{" "}
                            {format(
                              new Date(booking.checkOutDate),
                              "MMM dd, yyyy",
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Total Invested
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="bg-emerald-50 p-1.5 rounded text-emerald-600">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-black text-slate-900">
                            ${booking.totalAmount.toLocaleString()}.00
                          </span>
                        </div>
                      </div>

                      {/* Link to Details */}
                      <div className="flex md:justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full group-hover:bg-primary group-hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                        >
                          View Details <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <footer className="pt-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">
            Luxury Management System • 2026
          </p>
        </footer>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    {
      Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Pending: "bg-amber-50 text-amber-700 border-amber-100",
      Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
      CheckedIn: "bg-blue-50 text-blue-700 border-blue-100",
    }[status] || "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <Badge
      variant="outline"
      className={`${styles} font-black text-[10px] px-3 py-1 uppercase tracking-wider`}
    >
      {status}
    </Badge>
  );
}
