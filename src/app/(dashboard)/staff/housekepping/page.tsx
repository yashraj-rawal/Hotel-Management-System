import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";
import {
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Brush,
  Info,
  Clock,
  User,
  Hammer,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default async function HousekeepingPage() {
  await dbConnect();
  const rooms = await Room.find({}).sort({ roomNumber: 1 });
  const stats = {
    clean: rooms.filter(r => r.housekeepingStatus === 'Clean').length,
    dirty: rooms.filter(r => r.housekeepingStatus === 'Dirty').length,
    progress: rooms.filter(r => r.housekeepingStatus === 'In Progress').length,
  };

  return (
    <div className="flex-col md:flex bg-slate-50/50 min-h-screen">
      <div className="flex-1 space-y-8 p-8 pt-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
              <Brush className="h-8 w-8 text-primary" strokeWidth={2.5} />
              Housekeeping <span className="text-slate-400 font-light">
                &
              </span>{" "}
              Maintenance
            </h2>
            <p className="text-muted-foreground font-medium">
              Real-time room sanitization and readiness tracking
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-100 px-3 py-1 gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Clean:{" "}
              {stats.clean}
            </Badge>
            <Badge
              variant="outline"
              className="bg-rose-50 text-rose-700 border-rose-100 px-3 py-1 gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Dirty:{" "}
              {stats.dirty}
            </Badge>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Card
              key={room._id}
              className="group overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 text-white w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-xl shadow-lg group-hover:bg-primary transition-colors">
                      {room.roomNumber}
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900 leading-none mb-1">
                        {room.type}
                      </CardTitle>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        Floor {room.roomNumber.toString()[0]}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={room.housekeepingStatus || "Dirty"} />
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-4">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tight text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> Last Activity
                    </div>
                    <span className="text-slate-900">2h 15m ago</span>
                  </div>
                  <Separator className="bg-slate-200/60" />
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tight text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Occupancy
                    </div>
                    <Badge
                      variant={room.isAvailable ? "outline" : "secondary"}
                      className={`h-5 text-[9px] ${room.isAvailable ? "text-emerald-600 border-emerald-200" : ""}`}
                    >
                      {room.isAvailable ? "VACANT" : "OCCUPIED"}
                    </Badge>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-5 py-4 bg-slate-50/50 border-t flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Mark as Clean</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">In Progress</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
                      >
                        <Hammer className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Maintenance Req.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button variant="ghost" size="sm" className="px-2">
                  <MoreVertical className="h-4 w-4 text-slate-400" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    {
      Clean: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Dirty: "bg-rose-100 text-rose-800 border-rose-200",
      "In Progress": "bg-amber-100 text-amber-800 border-amber-200",
    }[status] || "bg-slate-100 text-slate-800";

  return (
    <Badge
      className={`${styles} hover:${styles} font-black text-[10px] px-2 shadow-none border`}
    >
      {status.toUpperCase()}
    </Badge>
  );
}
