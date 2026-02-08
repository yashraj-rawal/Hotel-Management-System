import AddRoomForm from "@/components/AddRoomForm";
import Link from "next/link";
import { ChevronRight, LayoutGrid, Box } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddRoomPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Contextual Header */}
      <header className="bg-white border-b border-slate-200 mb-12">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex flex-col">
            {/* Breadcrumbs for easy navigation */}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
              <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Portal</Link>
              <ChevronRight size={10} />
              <Link href="/admin/rooms" className="hover:text-primary transition-colors">Inventory</Link>
              <ChevronRight size={10} />
              <span className="text-slate-900">New Suite</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-slate-900">
              Inventory <span className="text-primary text-not-italic">Expansion</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <Link href="/admin/rooms">
              <Button variant="outline" className="rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest h-11 px-6">
                <LayoutGrid size={14} className="mr-2" /> View Collection
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace */}
      <main className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Informational Toast/Alert Area */}
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 flex items-start gap-4 mb-4">
            <div className="bg-primary/20 p-2 rounded-xl text-primary shrink-0">
              <Box size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">Deployment Protocol</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                Once a room is finalized, it will be instantly visible to global guests. Please ensure all photography links are high-resolution (16:9 ratio) for the best visual experience.
              </p>
            </div>
          </div>

          {/* The Core Form Component */}
          <AddRoomForm />
        </div>
      </main>
    </div>
  );
}