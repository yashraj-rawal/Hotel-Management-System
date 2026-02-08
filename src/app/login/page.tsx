"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, Loader2, Hotel, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin: React.EventHandler<React.SyntheticEvent<HTMLFormElement>> = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="max-w-md w-full mx-4 relative z-10">
        <Card className="bg-white/80 backdrop-blur-2xl border-slate-200/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-10 md:p-12">
            {/* Brand Identity */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 text-white rounded-3xl mb-6 shadow-2xl shadow-slate-900/20 transform -rotate-3 hover:rotate-0 transition-all duration-500 group">
                <Hotel size={38} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase text-slate-900 italic">
                Yashraj <span className="text-primary">Hotel</span>
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Secure Concierge Portal
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Identity Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Identity
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@yashraj.com"
                    className="h-14 pl-12 bg-slate-50/50 border-slate-200 focus:ring-primary rounded-2xl font-medium transition-all"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Security Key Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Security Key
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-14 pl-12 bg-slate-50/50 border-slate-200 focus:ring-primary rounded-2xl font-medium transition-all"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <span className="flex items-center gap-3">
                      Enter Lobby <LogIn size={16} />
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Footer Support */}
            <div className="mt-10 text-center">
              <button className="text-[10px] font-bold uppercase text-slate-400 hover:text-primary transition-colors tracking-tighter">
                Forgot your security key? Contact Management
              </button>
            </div>
          </CardContent>
        </Card>
        
        {/* Subtle Copyright */}
        <p className="text-center mt-10 text-[9px] font-bold uppercase tracking-[0.5em] text-slate-300">
          Yashraj Hospitality Group • Established 2024
        </p>
      </div>
    </div>
  );
}