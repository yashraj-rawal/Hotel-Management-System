import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  Home,
  MoreHorizontal,
  LayoutGrid,
  Search,
  BedDouble,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default async function ManageRoomPage() {
  await dbConnect();

  const rooms = await Room.find({}).sort({ createdAt: -1 });

  return (
    <div className="flex-col md:flex bg-slate-50/30 min-h-screen">
      <div className="flex-1 space-y-6 p-8 pt-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-slate-900">
              <Home className="h-8 w-8 text-primary" strokeWidth={2.5} />
              Room Management
            </h2>
            <p className="text-muted-foreground mt-1">
              Review and manage your luxury suite inventory and real-time
              status.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full px-6 shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/admin/add">
              <Plus className="mr-2 h-4 w-4" /> Add New Room
            </Link>
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by room number or type..."
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden lg:flex">
              <LayoutGrid className="mr-2 h-4 w-4" /> Grid View
            </Button>
          </div>
        </div>

        {/* Main Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Room Inventory</CardTitle>
              <Badge variant="outline" className="font-mono">
                {rooms.length} Total Units
              </Badge>
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/30">
                <TableHead className="w-25">Room</TableHead>
                <TableHead>Type & ID</TableHead>
                <TableHead>Nightly Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-40 text-center text-muted-foreground italic"
                  >
                    No rooms found in inventory.
                  </TableCell>
                </TableRow>
              ) : (
                rooms.map((room) => (
                  <TableRow key={room._id} className="group transition-colors">
                    <TableCell>
                      <div className="font-mono font-bold text-lg text-primary">
                        {room.roomNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold flex items-center gap-1.5">
                          <BedDouble className="h-3.5 w-3.5 text-slate-400" />
                          {room.type}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          Ref: {room._id.toString().slice(-8)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-900">
                        ${room.pricePerNight}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        /night
                      </span>
                    </TableCell>
                    <TableCell>
                      {room.isAvailable ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 px-3 py-1">
                          <Circle className="h-2 w-2 fill-emerald-500 mr-2 border-none" />
                          Available
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-600 px-3 py-1"
                        >
                          <Circle className="h-2 w-2 fill-slate-400 mr-2 border-none" />
                          Occupied
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit3 className="mr-2 h-4 w-4" /> Edit Room
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Room
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Footer Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live on
              Site
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-300" />{" "}
              Reserved/Internal
            </span>
          </div>
          <p className="italic">Last synchronized: Just now</p>
        </div>
      </div>
    </div>
  );
}
