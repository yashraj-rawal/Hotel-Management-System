"use client";

import Link from "next/link";
import {
  BedDouble,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  ShieldCheck,
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Newsletter / Pre-footer Call to Action */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-white font-black uppercase tracking-tighter text-2xl italic">
              The{" "}
              <span className="text-primary text-not-italic">Inner Circle</span>
            </h3>
            <p className="text-sm font-medium opacity-60">
              Join 5,000+ members receiving exclusive seasonal offers.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2">
            <Input
              placeholder="concierge@your-domain.com"
              className="bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-primary h-12"
            />
            <Button className="h-12 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px]">
              Join <Send size={14} className="ml-2" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2.5 rounded-3xl text-white shadow-2xl shadow-primary/20">
                <BedDouble size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter uppercase text-white italic">
                  Yashraj
                </span>
                <span className="text-[9px] font-black tracking-[0.4em] text-primary uppercase">
                  Hotel & Spa
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-medium pr-4 opacity-70">
              Redefining the architecture of rest since 2010. We curate spaces
              that blend minimalist design with maximalist comfort.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-white border border-white/5 bg-white/5 transition-all"
                >
                  <Icon size={18} />
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h6 className="text-white font-black uppercase tracking-[0.2em] text-[11px]">
              Reservations
            </h6>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-primary transition-colors"
                >
                  The Signature Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/amenities"
                  className="hover:text-primary transition-colors"
                >
                  Wellness & Spa
                </Link>
              </li>
              <li>
                <Link
                  href="/dining"
                  className="hover:text-primary transition-colors"
                >
                  Culinary Discovery
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary transition-colors"
                >
                  Private Gatherings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h6 className="text-white font-black uppercase tracking-[0.2em] text-[11px]">
              The Concierge
            </h6>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-snug">
                  123 Luxury Ave, Manhattan, <br />
                  NY 10001, USA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm font-bold">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm">hello@yashraj.com</span>
              </li>
            </ul>
          </div>

          {/* Trust & Location */}
          <div className="space-y-6">
            <h6 className="text-white font-black uppercase tracking-[0.2em] text-[11px]">
              Regional Access
            </h6>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">
                  Global English
                </span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-tight">
                  PCI-DSS SECURE <br />
                  PAYMENT PORTAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="bg-black py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            &copy; {currentYear} Yashraj Hospitality Group. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
