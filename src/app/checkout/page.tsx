"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  Info,
  ArrowRight,
  Lock,
  Hotel,
  Check,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// 1. Create a sub-component for the checkout logic
function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const roomId = searchParams.get("roomId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const total = searchParams.get("total");
  const roomType = searchParams.get("type");

  const handleFinalConfirm = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          totalAmount: total,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push(`/checkout/success?bookingId=${data._id}&total=${total}&checkIn=${checkIn}`);
      } else {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      alert("Something went wrong with the reservation. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Modern Progress Tracker */}
        <div className="flex items-center justify-center space-x-4 max-w-lg mx-auto mb-12">
          {[
            { label: "Select", done: true },
            { label: "Details", done: true },
            { label: "Payment", done: false, active: true }
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors ${step.done ? 'bg-primary border-primary text-white' : step.active ? 'border-primary text-primary bg-white' : 'border-slate-200 text-slate-300'}`}>
                  {step.done ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-tighter ${step.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
              {i !== arr.length - 1 && (
                <div className={`h-0.5 w-full mx-4 mb-6 transition-colors ${step.done ? 'bg-primary' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
            Confirm Your <span className="text-primary">Stay</span>
          </h1>
          <p className="text-muted-foreground font-medium italic">Review your itinerary and secure your reservation</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900">
                    <Calendar className="h-5 w-5 text-primary" />
                    <CardTitle className="text-sm font-bold uppercase tracking-wider">Stay Itinerary</CardTitle>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-bold px-3">
                    GUARANTEED RATE
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Accommodation</p>
                    <h3 className="text-2xl font-bold text-slate-900">{roomType} Suite</h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Hotel className="h-3.5 w-3.5" /> Premier Wing • 1 King Bed
                    </div>
                  </div>

                  <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="text-center space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Check-In</p>
                      <p className="font-bold text-slate-900">{checkIn}</p>
                    </div>
                    <ArrowRight className="text-slate-300 h-5 w-5" />
                    <div className="text-center space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Check-Out</p>
                      <p className="font-bold text-slate-900">{checkOut}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="bg-primary/5 border-primary/10 rounded-2xl p-6">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <AlertTitle className="text-sm font-bold uppercase tracking-tight text-primary">Booking Protection Active</AlertTitle>
              <AlertDescription className="text-xs text-slate-600 leading-relaxed font-medium">
                Enjoy peace of mind with our 24-hour free cancellation policy.
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-primary/20 shadow-xl h-fit sticky top-8 overflow-hidden">
              <CardHeader className="bg-slate-900 text-white py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
                  <Lock className="h-3 w-3 text-primary" /> Secure Checkout
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-8 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-primary p-2.5 rounded-lg text-white">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs uppercase text-slate-900">Pay at Property</p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-tight">Standard Card verification</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Room Charge</span>
                    <span className="text-slate-900">${total}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Occupancy Taxes</span>
                    <span className="text-emerald-600">Included</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase text-slate-400">Amount Due</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-slate-900 tracking-tighter">${total}</span>
                      <p className="text-[9px] font-bold text-slate-400 -mt-1 uppercase">USD</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex flex-col gap-4">
                <Button 
                  onClick={handleFinalConfirm}
                  disabled={isProcessing}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 uppercase tracking-widest text-xs font-black transition-all"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" /> Finalizing...
                    </div>
                  ) : "Complete Booking"}
                </Button>
                <div className="flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <Info className="h-3 w-3" /> Encrypted 256-bit SSL
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Main export wrapped in Suspense
export default function CheckOutPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CheckoutForm />
    </Suspense>
  );
}