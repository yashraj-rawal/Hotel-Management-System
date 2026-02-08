"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  Wifi,
  Coffee,
  Wind,
  Tv,
  ShieldCheck,
  Info,
  ArrowRight,
  Maximize2,
  Users,
  MapPin,
  Sparkles,
  Loader2
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState<any>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then((res) => res.json())
      .then((data) => setRoom(data));
  }, [id]);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const days =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 3600 * 24);
    return days > 0 ? days * room.pricePerNight : 0;
  };

  const handleBooking = async () => {
    if (!session) return router.push("/login");
    setLoading(true);

    const total = calculateTotal();
    const url = `/checkout?roomId=${id}&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}&type=${room.type}`;
    router.push(url);
  };

  if (!room)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="space-y-4 text-center">
          <Loader2 className="animate-spin h-10 w-10 text-primary mx-auto" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Curating Experience...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 1. Header & Hero Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 group text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft
            size={16}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Return to Collection
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh] min-h-125">
          <div className="md:col-span-3 rounded-[3rem] overflow-hidden shadow-2xl relative group bg-slate-100 border border-slate-200">
            <img
              src={room.images?.[0] || "/placeholder.jpg"}
              className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
              alt={room.type}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <Badge className="bg-white/20 backdrop-blur-md border-white/20 text-[10px] mb-4 uppercase tracking-widest font-black">
                Signature Suite
              </Badge>
              <h1 className="text-6xl font-black tracking-tighter uppercase italic">
                {room.type}
              </h1>
            </div>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-4">
            <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg">
              <img
                src={room.images?.[1] || room.images?.[0]}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="rounded-[2rem] overflow-hidden relative border border-slate-200 shadow-lg group">
              <img
                src={room.images?.[2] || room.images?.[0]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm cursor-pointer">
                <span className="text-white font-black text-[10px] tracking-widest uppercase flex items-center gap-2">
                  <Maximize2 size={14} /> Full Gallery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Layout */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <MapPin size={12} className="text-primary" /> East Wing, Level
                12
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Users size={12} className="text-primary" /> Up to 4 Guests
              </div>
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              The Sanctuary Experience
            </h2>
            <p className="text-slate-500 leading-relaxed font-medium text-lg">
              {room.description ||
                "Indulge in an atmosphere of refined elegance. This suite offers sweeping views of the city skyline, featuring hand-selected Italian marble, bespoke furnishings, and a state-of-the-art climate control system."}
            </p>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Wifi />, label: "Giga-WiFi" },
              { icon: <Coffee />, label: "Private Bar" },
              { icon: <Wind />, label: "Air Pure" },
              { icon: <Tv />, label: "8K Smart TV" },
            ].map((amenity, i) => (
              <div
                key={i}
                className="group border border-slate-100 bg-slate-50/50 p-6 rounded-3xl flex flex-col items-center gap-3 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all"
              >
                <div className="text-slate-400 group-hover:text-primary transition-colors">
                  {amenity.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  {amenity.label}
                </span>
              </div>
            ))}
          </section>

          <Separator className="bg-slate-100" />

          <section className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden group">
            <Sparkles className="absolute -top-5 -right-5 h-40 w-40 text-white/5 rotate-12" />
            <div className="relative flex items-start gap-8">
              <div className="bg-primary p-5 rounded-[1.5rem] shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-black uppercase tracking-tight text-xl italic">
                  The Yashraj{" "}
                  <span className="text-primary text-not-italic">Platinum</span>{" "}
                  Promise
                </h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md">
                  Your stay includes priority check-in, complimentary wellness
                  access, and 24/7 dedicated concierge service.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Section: Sticky Booking Sidebar */}
        <aside className="relative">
          <Card className="border border-slate-200/60 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] sticky top-32 overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardContent className="p-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Investment
                  </p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                    ${room.pricePerNight}
                    <span className="text-xs font-bold text-slate-300 ml-2 italic tracking-normal opacity-100">
                      / night
                    </span>
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">
                    Arrival Date
                  </label>
                  <div className="relative group">
                    <CalendarIcon
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"
                      size={18}
                    />
                    <input
                      type="date"
                      className="w-full h-14 pl-12 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">
                    Departure Date
                  </label>
                  <div className="relative group">
                    <CalendarIcon
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"
                      size={18}
                    />
                    <input
                      type="date"
                      className="w-full h-14 pl-12 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2rem] space-y-2 text-center border-t border-white/10 shadow-inner">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">
                  Estimated Sanctuary Total
                </p>
                <p className="text-4xl font-black text-white tracking-tighter">
                  ${calculateTotal().toLocaleString()}
                </p>
                {calculateTotal() > 0 && (
                  <p className="text-[9px] font-bold text-primary flex items-center justify-center gap-1 uppercase tracking-widest">
                    <Info size={10} /> Concierge fees included
                  </p>
                )}
              </div>

              <Button
                onClick={handleBooking}
                disabled={loading || calculateTotal() <= 0}
                className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 group overflow-hidden relative"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-3 z-10">
                    Secure This Suite{" "}
                    <ArrowRight className="group-hover:translate-x-2 transition-transform h-4 w-4" />
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
