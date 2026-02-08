"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  LogOut,
  ClipboardList,
  Settings,
  ShieldCheck,
  UserCircle,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const navItems = [
  {
    name: "Analytics",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    name: "Manage Rooms",
    href: "/admin/rooms",
    icon: BedDouble,
    roles: ["admin"],
  },
  {
    name: "Arrivals",
    href: "/admin/arrivals",
    icon: CalendarDays,
    roles: ["admin", "staff"],
  },
  {
    name: "My Bookings",
    href: "/user/my-bookings",
    icon: ClipboardList,
    roles: ["user"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role || "user";

  const filteredLinks = navItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <aside className="hidden lg:flex w-80 h-screen bg-slate-50/50 border-r border-slate-200 flex-col fixed left-0 top-0 z-40 backdrop-blur-xl">
      {/* 1. Brand Header */}
      <div className="p-8">
        <div className="flex items-center gap-3 group">
          <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-xl shadow-slate-200 group-hover:bg-primary transition-colors">
            <BedDouble size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900">
              Yashraj
            </span>
            <span className="text-[9px] font-black tracking-[0.4em] text-primary uppercase">
              Operations
            </span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        {/* 2. Personalized Profile Card */}
        <div className="mb-8 px-2">
          <div className="bg-white rounded-[2rem] p-5 border border-slate-200/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
              <Bell size={14} className="text-slate-400" />
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-slate-50 shadow-sm">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-slate-100 text-slate-400 font-bold">
                  {session?.user?.name?.charAt(0) || "G"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-900 truncate">
                  {session?.user?.name || "Guest Access"}
                </span>
                <Badge
                  variant="secondary"
                  className="w-fit h-5 text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-slate-100 mt-1"
                >
                  <ShieldCheck size={10} className="mr-1 text-primary" />{" "}
                  {userRole}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dynamic Navigation */}
        <div className="space-y-8">
          <div>
            <h4 className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
              Core Modules
            </h4>
            <nav className="space-y-1">
              {filteredLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-4 h-14 rounded-2xl transition-all duration-300 group ${
                        isActive
                          ? "bg-slate-900 text-white shadow-2xl shadow-slate-300 scale-[1.02]"
                          : "text-slate-500 hover:text-slate-900 hover:bg-white"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? "text-primary"
                            : "text-slate-400 group-hover:text-primary transition-colors"
                        }
                      />
                      <span className="text-xs font-bold uppercase tracking-widest flex-1 text-left">
                        {link.name}
                      </span>
                      {isActive && (
                        <ChevronRight size={14} className="text-primary/50" />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <h4 className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
              Preferences
            </h4>
            <Link href="/settings">
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 h-14 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-white group"
              >
                <Settings
                  size={18}
                  className="text-slate-400 group-hover:rotate-45 transition-transform duration-500"
                />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Global Settings
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </ScrollArea>

      {/* 4. Action Footer */}
      <div className="p-6 mt-auto">
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="w-full h-14 justify-start gap-4 rounded-2xl border-slate-200 bg-white text-slate-500 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 transition-all group"
        >
          <LogOut
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-left">
            Terminate Session
          </span>
        </Button>
      </div>
    </aside>
  );
}
