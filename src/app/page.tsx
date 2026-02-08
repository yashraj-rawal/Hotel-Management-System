"use client";

import Link from "next/link";
import {
  Bed,
  MapPin,
  ShieldCheck,
  Star,
  ArrowRight,
  Compass,
  Crown,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary selection:text-white">
      {/* 1. HERO SECTION: THE CINEMATIC ENTRANCE */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Visual Foundation */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
            alt="Yashraj Grand Lobby"
            className="w-full h-full object-cover brightness-[0.4] scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-white"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="flex justify-center mb-8">
            <Badge
              variant="outline"
              className="px-6 py-2 rounded-full border-primary/50 bg-primary/10 backdrop-blur-xl text-primary text-[10px] font-black uppercase tracking-[0.5em] animate-in fade-in slide-in-from-bottom-4 duration-1000"
            >
              <Crown size={14} className="mr-2" /> The Gold Standard of Mumbai
            </Badge>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic text-white leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Relentless{" "}
            <span className="text-primary text-not-italic">Luxury</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            An architectural masterpiece where heritage meets modern opulence.
            Your sanctuary in the heart of the metropolis.
          </p>

          {/* Presidential Search Bar */}
          <div className="bg-white/10 backdrop-blur-3xl p-3 rounded-[3rem] border border-white/20 shadow-2xl flex flex-col md:flex-row gap-3 max-w-3xl mx-auto group hover:border-white/40 transition-all duration-500">
            <div className="flex-1 flex items-center gap-4 px-8 py-4 text-white/90 border-white/10 md:border-r">
              <MapPin size={22} className="text-primary animate-pulse" />
              <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
                  Location
                </p>
                <p className="text-sm font-bold tracking-tight uppercase">
                  Marine Drive, Mumbai
                </p>
              </div>
            </div>
            <Link href="/rooms" className="h-full">
              <Button className="w-full md:w-auto bg-primary hover:bg-white hover:text-black rounded-[2.5rem] px-12 py-8 text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all duration-500 group-hover:px-14">
                Explore the Suites{" "}
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-2 transition-transform"
                />
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <ChevronDown size={32} strokeWidth={1} />
        </div>
      </section>

      {/* 2. THE LEGACY: STRATEGIC DIFFERENTIATION */}
      <section className="py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  Since 1994
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-slate-900 leading-[0.9]">
                The{" "}
                <span className="text-primary underline decoration-slate-100 underline-offset-8">
                  Legacy
                </span>{" "}
                of <br />
                Mumbai Excellence
              </h2>
              <p className="mt-8 text-slate-500 font-medium leading-relaxed text-lg">
                Beyond 5 stars, we provide a curated environment designed for
                the global elite. Every detail, from the 1,200 thread count to
                the 24/7 butler service, is an intentional act of hospitality.
              </p>
            </div>
            <Button
              variant="ghost"
              className="group text-[11px] font-black uppercase tracking-[0.3em] hover:bg-transparent"
            >
              View Our Heritage{" "}
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-2 transition-transform"
              />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<Bed size={32} strokeWidth={1} />}
              title="Signature Suites"
              desc="Interiors curated by world-renowned architects, featuring hand-carved Italian marble."
            />
            <FeatureCard
              icon={<Compass size={32} strokeWidth={1} />}
              title="Bespoke Concierge"
              desc="A dedicated elite team capable of securing the impossible, from private jets to secret tables."
            />
            <FeatureCard
              icon={<ShieldCheck size={32} strokeWidth={1} />}
              title="Private Sanctuary"
              desc="Advanced biometric access and silent security protocols ensure absolute discretion."
            />
          </div>
        </div>
      </section>

      {/* 3. CTA: THE CONVERSION POINT */}
      <section className="px-6 pb-20">
        <div className="bg-slate-950 rounded-[4rem] py-32 relative overflow-hidden text-center shadow-3xl">
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="flex justify-center mb-10">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl flex gap-1 text-primary shadow-inner">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                    className="animate-in zoom-in duration-500"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase italic leading-[0.9] text-white">
              Step Into The <br />
              <span className="text-primary">Yashraj</span> Circle
            </h2>

            <p className="text-white/50 mb-14 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Unlock preferred rates, early check-ins, and complimentary lounge
              access. Your legacy begins here.
            </p>

            <Link href="/register">
              <Button className="h-20 px-16 rounded-full bg-primary hover:bg-white hover:text-black font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl shadow-primary/40 transition-all duration-500">
                <Sparkles size={18} className="mr-3 text-amber-300" /> Join the
                Legacy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 hover:bg-white hover:border-primary/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-3">
      <div className="mb-10 p-5 bg-white w-fit rounded-[1.5rem] shadow-sm text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-700">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic text-slate-900">
        {title}
      </h3>
      <p className="text-slate-400 text-base font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
