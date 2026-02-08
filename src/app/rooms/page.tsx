import dbConnect from "@/lib/dbConnect";
import Room from "@/models/Room";
import Link from "next/link";
import {
  BedDouble,
  Sparkles,
  Filter,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Ensure the type reflects the Promise requirement in Next.js 15
export default async function RoomSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  await dbConnect();

  // 1. Unwrap the Promise
  const resolvedParams = await searchParams;
  const activeType = resolvedParams.type || "All";

  // 2. Build the MongoDB Query
  const query: any = { isAvailable: true };
  if (activeType !== "All") {
    query.type = activeType;
  }

  // 3. Fetch Data (Lean for performance)
  const rooms = await Room.find(query).sort({ pricePerNight: 1 }).lean();

  const roomTypes = ["All", "Single", "Double", "Suite", "Deluxe"];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-12">
      {/* Cinematic Header */}
      <header className="max-w-4xl mx-auto mb-16 text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.4em] mx-auto transition-all hover:bg-primary cursor-default">
          <Sparkles size={12} className="text-amber-400" /> The Winter
          Collection
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-slate-900 leading-[0.85]">
            Refined{" "}
            <span className="text-primary italic font-serif lowercase">
              living
            </span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-md mx-auto leading-relaxed">
            From executive suites to minimalist sanctuaries, find the space that
            speaks to your journey.
          </p>
        </div>
      </header>

      {/* Persistent Filter Bar */}
      <div className="sticky top-6 z-40 mb-20 flex justify-center">
        <nav className="bg-white/80 backdrop-blur-2xl border border-slate-200/50 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center gap-1">
          {roomTypes.map((t) => {
            const isActive = activeType === t;
            return (
              <Link
                key={t}
                href={`/rooms?type=${t}`}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-300 scale-105"
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {t}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* The Discovery Grid */}
      <div className="max-w-7xl mx-auto">
        {rooms.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-200 bg-white/50 rounded-[3rem] p-32 text-center">
            <Filter
              size={48}
              strokeWidth={1}
              className="mx-auto mb-6 text-slate-300"
            />
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-2">
              Sanctuary Not Found
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              No rooms are available in the {activeType} category today.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {rooms.map((room: any) => (
              <div key={room._id.toString()} className="group relative">
                {/* Visual Asset Container */}
                <div className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-4">
                  <img
                    src={
                      room.imageUrl ||
                      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
                    }
                    alt={room.type}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Floating Price Tag */}
                  <div className="absolute top-8 right-8">
                    <div className="bg-white/95 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-2xl">
                      <span className="text-xl font-black text-slate-900 italic">
                        ₹{room.pricePerNight}
                      </span>
                      <span className="text-[9px] font-black text-slate-400 uppercase ml-1.5 tracking-tighter">
                        / night
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8">
                    <Badge className="bg-primary text-white border-none px-4 py-1.5 rounded-full font-black uppercase text-[9px] tracking-widest shadow-xl">
                      {room.type} Tier
                    </Badge>
                  </div>
                </div>

                {/* Typography Block */}
                <div className="mt-8 space-y-4 px-2">
                  <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                    <MapPin size={12} /> Marine Drive • Floor{" "}
                    {room.roomNumber.charAt(0)}
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
                    {room.type}{" "}
                    <span className="text-slate-200 group-hover:text-slate-400 transition-colors">
                      Residence
                    </span>
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 italic">
                    {room.description}
                  </p>
                  <Link href={`/rooms/${room._id}`} className="block pt-2">
                    <Button
                      variant="outline"
                      className="w-full h-14 rounded-2xl border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] group/btn"
                    >
                      Begin Discovery{" "}
                      <ChevronRight
                        size={16}
                        className="ml-2 group-hover/btn:translate-x-2 transition-transform"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
