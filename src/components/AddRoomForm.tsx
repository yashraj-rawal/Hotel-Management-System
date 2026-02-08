"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BedDouble, 
  IndianRupee, 
  Image as ImageIcon, 
  Type, 
  PlusCircle,
  Sparkles,
  ArrowLeft
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Assuming you use Sonner for premium notifications

export default function AddRoomForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    type: "Deluxe",
    pricePerNight: "",
    description: "",
    imageUrl: "" 
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/admin/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });

      if (res.ok) {
        toast.success("Inventory Updated: New Suite Registered");
        router.push("/admin/rooms");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to sync with central database");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl">
      
      {/* 1. DATA ENTRY FORM */}
      <form onSubmit={handleAdd} className="space-y-8 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-100">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">Register <span className="text-primary">New Suite</span></h2>
          <p className="text-sm text-slate-500 font-medium">Add a new architectural masterpiece to the Yashraj collection.</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Room Identity</Label>
            <div className="relative">
              <Type className="absolute left-3 top-3 text-slate-400" size={16} />
              <Input 
                placeholder="e.g. 101-A" 
                className="pl-10 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-primary"
                value={roomData.roomNumber}
                onChange={(e) => setRoomData({...roomData, roomNumber: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Suite Tier</Label>
            <Select onValueChange={(value) => setRoomData({...roomData, type: value})}>
              <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none">
                <SelectValue placeholder="Select Tier" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="Deluxe">Deluxe Sanctuary</SelectItem>
                <SelectItem value="Executive">Executive Studio</SelectItem>
                <SelectItem value="Presidential">Presidential Suite</SelectItem>
                <SelectItem value="Royal">Royal Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nightly Rate (INR)</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input 
              type="number"
              placeholder="0.00" 
              className="pl-10 h-12 rounded-xl bg-slate-50 border-none"
              value={roomData.pricePerNight}
              onChange={(e) => setRoomData({...roomData, pricePerNight: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visual Asset (URL)</Label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 text-slate-400" size={16} />
            <Input 
              placeholder="https://images.unsplash.com/..." 
              className="pl-10 h-12 rounded-xl bg-slate-50 border-none"
              value={roomData.imageUrl}
              onChange={(e) => setRoomData({...roomData, imageUrl: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Curated Description</Label>
          <Textarea 
            placeholder="Describe the ambiance, view, and bespoke features..." 
            className="min-h-30 rounded-xl bg-slate-50 border-none resize-none p-4"
            value={roomData.description}
            onChange={(e) => setRoomData({...roomData, description: e.target.value})}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="ghost" 
            className="flex-1 h-14 rounded-xl uppercase font-black text-[10px] tracking-widest"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} className="mr-2" /> Cancel
          </Button>
          <Button 
            disabled={loading}
            className="flex-2 h-14 rounded-xl bg-slate-900 hover:bg-primary font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-200"
          >
            {loading ? "Syncing..." : "Finalize Room"} <PlusCircle size={16} className="ml-2" />
          </Button>
        </div>
      </form>

      {/* 2. REAL-TIME PREVIEW CARD */}
      <div className="sticky top-24 space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-2">Live Registry Preview</h4>
        <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl group">
          <div className="aspect-video relative overflow-hidden bg-slate-100">
            {roomData.imageUrl ? (
              <img src={roomData.imageUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-300">
                <ImageIcon size={48} strokeWidth={1} />
                <span className="text-[10px] font-black uppercase tracking-widest mt-4">Awaiting Visual Asset</span>
              </div>
            )}
            <div className="absolute top-6 left-6">
              <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-4 py-1.5 rounded-full font-black uppercase text-[9px] tracking-widest">
                {roomData.type}
              </Badge>
            </div>
          </div>
          <div className="p-8 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Suite {roomData.roomNumber || "000"}</p>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Signature {roomData.type}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">From</p>
                <p className="text-xl font-black text-slate-900">₹{roomData.pricePerNight || "0"}</p>
              </div>
            </div>
            <Separator className="bg-slate-50" />
            <p className="text-sm text-slate-400 font-medium line-clamp-2 italic">
              {roomData.description || "The suite's narrative will appear here. Focus on the sensory experience and architectural highlights."}
            </p>
            <Button disabled className="w-full rounded-2xl h-12 bg-slate-50 text-slate-300 border-none font-black uppercase text-[10px] tracking-widest">
              Preview Booking Flow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}