"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  BedDouble, 
  User, 
  LogOut, 
  Menu, 
  ChevronDown, 
  CalendarDays, 
  Settings, 
  LayoutDashboard,
  Sparkles
} from "lucide-react";
import { useState } from "react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";

export default function Navbar() {
  const { data: session } = useSession();

  const navLinks = [
    { name: "Explore Rooms", href: "/rooms" },
    { name: "Amenities", href: "/amenities" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Navbar Start: Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group transition-all">
            <div className="bg-slate-900 p-2 rounded-2xl text-white shadow-xl shadow-slate-200 group-hover:bg-primary transition-colors duration-300">
              <BedDouble size={22} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter uppercase text-slate-900 italic">
                Yashraj
              </span>
              <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase">
                Hotel & Spa
              </span>
            </div>
          </Link>
        </div>

        {/* Navbar Center: Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Navbar End: Auth & Mobile */}
        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-slate-100 ring-offset-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} />
                    <AvatarFallback className="bg-primary text-white font-bold">
                      {session.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2 rounded-[1.5rem] shadow-2xl mt-2 border-slate-100" align="end">
                <DropdownMenuLabel className="px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Welcome back,</p>
                  <p className="text-sm font-bold text-slate-900">{session.user.name}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-50" />
                <DropdownMenuItem asChild>
                  <Link href={session.user.role === 'admin' ? '/admin/dashboard' : '/user/my-bookings'} className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl">
                    <LayoutDashboard size={16} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-tight">Management Portal</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl">
                    <Settings size={16} className="text-slate-400" />
                    <span className="text-xs font-bold uppercase tracking-tight">Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-50" />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl text-destructive focus:bg-destructive/5 focus:text-destructive"
                >
                  <LogOut size={16} />
                  <span className="text-xs font-bold uppercase tracking-tight">End Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-white rounded-xl h-11 px-6 bg-slate-900 hover:bg-slate-800 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200">
                  <Sparkles size={14} className="mr-2 text-amber-400" />
                  Book Now
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Sheet (Hamburger Alternative) */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl border border-slate-100">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 rounded-l-[2rem] border-l-0">
                <div className="flex flex-col h-full py-6">
                  <div className="space-y-6 mt-10">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href}
                        className="block text-2xl font-black uppercase tracking-tighter italic text-slate-900 hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto space-y-4">
                    <Separator className="bg-slate-100" />
                    {!session ? (
                      <div className="grid grid-cols-1 gap-3">
                        <Link href="/login" className="w-full">
                          <Button variant="outline" className="w-full rounded-xl uppercase font-black text-[10px] tracking-widest">Login</Button>
                        </Link>
                        <Link href="/register" className="w-full">
                          <Button className="w-full rounded-xl uppercase font-black text-[10px] tracking-widest">Join Membership</Button>
                        </Link>
                      </div>
                    ) : (
                      <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-300">
                        Logged in as {session.user.name}
                      </p>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}