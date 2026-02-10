"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Loader2,
  Hotel,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit: React.EventHandler<
    React.SyntheticEvent<HTMLFormElement>
  > = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Visual Depth Accents */}
      <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[140px]" />

      <div className="max-w-lg w-full mx-4 relative z-10">
        <Card className="bg-white/90 backdrop-blur-3xl border-slate-200/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[3rem] overflow-hidden">
          <CardContent className="p-8 md:p-14">
            {/* Brand Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-[2rem] mb-6 shadow-2xl shadow-primary/20 transform rotate-3 hover:rotate-0 transition-all duration-500 group">
                <Hotel
                  size={36}
                  strokeWidth={1.5}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter uppercase text-slate-900 italic leading-none">
                Yashraj <span className="text-primary">Membership</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mt-4">
                Begin your luxury journey with us
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <Alert
                variant="destructive"
                className="mb-6 rounded-2xl bg-destructive/5 border-destructive/20 py-3"
              >
                <AlertDescription className="text-xs font-bold text-center">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-1.5 px-1">
                <Label
                  htmlFor="name"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400"
                >
                  Full Name
                </Label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Yashraj Rawal"
                    className="h-14 pl-12 bg-slate-50/50 border-slate-200 focus:ring-primary rounded-2xl font-medium"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5 px-1">
                <Label
                  htmlFor="email"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400"
                >
                  E-Mail Address
                </Label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="yash@luxury.com"
                    className="h-14 pl-12 bg-slate-50/50 border-slate-200 focus:ring-primary rounded-2xl font-medium"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 px-1">
                <Label
                  htmlFor="password"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400"
                >
                  Security Key
                </Label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    className="h-14 pl-12 bg-slate-50/50 border-slate-200 focus:ring-primary rounded-2xl font-medium"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button
                  disabled={loading}
                  className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-slate-200 transition-all hover:-translate-y-0.5"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <span className="flex items-center gap-3">
                      Create Account <ArrowRight size={16} />
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Redirect to Login */}
            <div className="mt-10 text-center border-t border-slate-100 pt-8">
              <p className="text-sm font-medium text-slate-500">
                Part of the family?{" "}
                <Link
                  href="/login"
                  className="text-primary font-black uppercase text-xs tracking-widest hover:text-primary/80 transition-colors ml-1"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fine Print */}
        <div className="flex items-center justify-center gap-2 mt-8 opacity-30">
          <ShieldCheck size={12} className="text-slate-900" />
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-900">
            Yashraj Identity Guard • Established 2024
          </p>
        </div>
      </div>
    </div>
  );
}
