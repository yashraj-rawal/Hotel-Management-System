"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Hash,
  Layers,
  DollarSign,
  FileText,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function AddRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "Single",
    pricePerNight: "",
    description: "",
  });

  const handleSubmit: React.EventHandler<
    React.FormEvent<HTMLFormElement>
  > = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/rooms");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Navigation */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="group text-muted-foreground hover:text-slate-900"
        >
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Inventory
        </Button>

        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Add New Room
                </CardTitle>
                <CardDescription>
                  Enter details to add a new unit to the Yashraj property
                  inventory.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="roomNumber"
                    className="text-xs uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2"
                  >
                    <Hash className="h-3 w-3" /> Room Number
                  </Label>
                  <Input
                    id="roomNumber"
                    required
                    placeholder="e.g. 302"
                    className="bg-slate-50/50 focus-visible:ring-primary font-mono"
                    onChange={(e) =>
                      setFormData({ ...formData, roomNumber: e.target.value })
                    }
                  />
                </div>

                {/* Room Type */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2">
                    <Layers className="h-3 w-3" /> Room Category
                  </Label>
                  <Select
                    defaultValue="Single"
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-50/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single Standard</SelectItem>
                      <SelectItem value="Double">Double Deluxe</SelectItem>
                      <SelectItem value="Suite">Executive Suite</SelectItem>
                      <SelectItem value="Deluxe">
                        Presidential Deluxe
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="price"
                    className="text-xs uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2"
                  >
                    <DollarSign className="h-3 w-3" /> Rate per Night (USD)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      $
                    </span>
                    <Input
                      id="price"
                      required
                      type="number"
                      placeholder="0.00"
                      className="pl-7 bg-slate-50/50 font-bold text-lg"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerNight: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="desc"
                    className="text-xs uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2"
                  >
                    <FileText className="h-3 w-3" /> Description & Features
                  </Label>
                  <Textarea
                    id="desc"
                    placeholder="Detail the amenities, views, and specific bedding configuration..."
                    className="min-h-30 bg-slate-50/50 resize-none"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <Separator className="my-4" />

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-md"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-md shadow-md shadow-primary/10"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Room...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Room Entry
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground italic">
          All new rooms are set to "Available" by default upon creation.
        </p>
      </div>
    </div>
  );
}
