"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle, 
  Printer, 
  Calendar, 
  Home, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  QrCode,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  // Fallbacks for demo purposes
  const bookingId = searchParams.get("bookingId") || "YSH-78291";
  const checkIn = searchParams.get("checkIn") || "TBD";
  const total = searchParams.get("total") || "0";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 py-12 lg:py-20 flex flex-col items-center">
      {/* 1. Success Animation & Header */}
      <div className="max-w-3xl w-full text-center mb-12 no-print space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-200">
            <CheckCircle size={40} strokeWidth={2.5} />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            Stay <span className="text-primary">Confirmed</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            Your luxury experience is secured. A digital copy of your voucher
            has been sent to your registered email.
          </p>
        </div>
      </div>

      {/* 2. The Luxury Digital Voucher */}
      <Card className="max-w-2xl w-full bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden print:border print:border-slate-200 print:shadow-none rounded-[2.5rem]">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

        {/* Voucher Content */}
        <CardContent className="p-8 md:p-14">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase flex items-center gap-2">
                Yashraj <span className="text-primary">Hotel</span>
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <MapPin size={10} className="text-primary" /> Grand Luxury
                Suites • Mumbai
              </div>
            </div>
            <div className="md:text-right space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Conf. Number
              </p>
              <p className="font-mono font-black text-xl text-slate-900">
                #{bookingId.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Main Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Guest Arrival
                </p>
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-primary">
                    <Calendar size={20} />
                  </div>
                  <span className="text-lg font-bold">{checkIn}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Check-In Policy
                </p>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Photo ID required upon arrival. <br /> Check-in desk opens at
                  2:00 PM.
                </p>
              </div>
            </div>

            <div className="bg-slate-50/80 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-center items-center md:items-end text-center md:text-right space-y-3">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Amount Due
                </p>
                <p className="text-5xl font-black text-slate-900 tracking-tighter">
                  ${total}
                </p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-black text-[9px] py-1 px-4 tracking-wider uppercase">
                Pay At Property
              </Badge>
            </div>
          </div>

          {/* QR Code / Tech Section */}
          <div className="flex items-center gap-5 bg-slate-900 p-6 rounded-2xl shadow-xl shadow-slate-200">
            <div className="bg-white p-2 rounded-xl">
              <QrCode className="text-slate-900 h-12 w-12" strokeWidth={1.5} />
            </div>
            <div className="space-y-1 text-white">
              <p className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                Digital Key Ready{" "}
                <Sparkles className="h-3 w-3 text-amber-400 fill-amber-400" />
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Scan this voucher at the front desk kiosks for express check-in
                and room key generation.
              </p>
            </div>
          </div>
        </CardContent>

        {/* Perforation Effect (Visual only) */}
        <div className="absolute bottom-1/4 -left-4 w-8 h-8 bg-slate-50/50 rounded-full border border-slate-200 no-print" />
        <div className="absolute bottom-1/4 -right-4 w-8 h-8 bg-slate-50/50 rounded-full border border-slate-200 no-print" />
      </Card>

      {/* 3. Navigation Actions */}
      <div className="max-w-2xl w-full mt-10 space-y-6 no-print px-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handlePrint}
            variant="outline"
            className="h-14 rounded-2xl font-bold uppercase tracking-widest text-[11px] border-slate-200 flex-1"
          >
            <Printer className="mr-2 h-4 w-4" /> Print Voucher
          </Button>
          <Link href="/user/my-bookings" className="flex-1">
            <Button className="h-14 w-full rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20">
              Manage Booking <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="flex justify-center items-center gap-6">
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors flex items-center gap-2"
          >
            <Home className="h-3 w-3" /> Home
          </Link>
          <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
            <Share2 className="h-3 w-3" /> Share
          </button>
          <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
            <Download className="h-3 w-3" /> PDF
          </button>
        </div>
      </div>

      {/* Print Settings Hook */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .print\\:border {
            border: 1px solid #e2e8f0 !important;
          }
        }
      `}</style>
    </div>
  );
}
