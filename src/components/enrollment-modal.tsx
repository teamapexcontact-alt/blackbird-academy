"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Lock, Users, Shield, Check } from "lucide-react";

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnrollmentModal({ open, onOpenChange }: EnrollmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    experience: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    discountedPrice: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const DEFAULT_PRICE = 999;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });
      const data = await res.json();

      if (data.valid) {
        setAppliedCoupon({
          code: data.code,
          discount: data.discount,
          discountedPrice: data.discountedPrice,
        });
      } else {
        setCouponError(data.error || "Invalid coupon");
      }
    } catch {
      setCouponError("Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          couponCode: appliedCoupon?.code || null,
          discountAmount: appliedCoupon?.discount || 0,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Enrollment error:", error);
      setLoading(false);
    }
  };

  const benefits = [
    "Lifetime access to all 5 modules",
    "Private WhatsApp community",
    "AI prompt library & viral hooks DB",
    "30-day content planner",
  ];

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg p-8 border-border/60 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-accent" />
          </div>
          <DialogHeader className="space-y-2">
            <DialogTitle className="display-heading text-2xl">
              Registration <span className="serif-accent text-accent">Submitted</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-text">
              Thank you for registering, <span className="text-primary-text font-medium">{formData.name}</span>! We'll reach out to you via WhatsApp with the next steps.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => onOpenChange(false)}
            className="mt-6 font-label uppercase tracking-[0.2em]"
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-border/60">
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-6 bg-accent/50" />
            <span className="eyebrow">Secure Enrollment</span>
            <span className="h-px w-6 bg-accent/50" />
          </div>
          <DialogHeader className="space-y-2">
            <DialogTitle className="display-heading text-3xl text-center">
              Enroll in <span className="serif-accent text-accent">BlackBird</span>
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              Join 1000+ creators. Limited seats — secure your spot now.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-2">
          <div className="flex items-center justify-center gap-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-accent">
              <Users className="w-3.5 h-3.5" />
              <span className="font-medium">18 seats remaining</span>
            </div>
            <span className="text-border">•</span>
            <span className="text-muted-text">Only ₹999 today</span>
          </div>
        </div>

        <div className="px-6 pb-3 grid grid-cols-2 gap-1.5">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-1.5 text-xs text-muted-text">
              <Check className="w-3 h-3 text-accent shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitForm} className="px-6 pb-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-label uppercase tracking-wider">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-secondary-bg/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-label uppercase tracking-wider">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-secondary-bg/50"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-label uppercase tracking-wider">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-secondary-bg/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="instagram" className="text-xs font-label uppercase tracking-wider">Instagram</Label>
              <Input
                id="instagram"
                name="instagram"
                placeholder="@yourhandle"
                required
                value={formData.instagram}
                onChange={handleInputChange}
                className="bg-secondary-bg/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="experience" className="text-xs font-label uppercase tracking-wider">Experience</Label>
            <Select
              name="experience"
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, experience: value }))
              }
              required
            >
              <SelectTrigger className="bg-secondary-bg/50">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-label uppercase tracking-wider">Coupon Code</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="bg-secondary-bg/50 uppercase flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleApplyCoupon}
                disabled={couponLoading || !couponCode.trim()}
                className="shrink-0"
              >
                {couponLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
            {couponError && (
              <p className="text-xs text-red-400">{couponError}</p>
            )}
            {appliedCoupon && (
              <p className="text-xs text-accent">
                Coupon applied! Discounted price: ₹{appliedCoupon.discountedPrice}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full font-label uppercase tracking-[0.2em] mt-2" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Register Now <Lock className="ml-2 h-3.5 w-3.5" />
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-text pt-1">
            <Shield className="w-3 h-3" />
            <span>
              {appliedCoupon
                ? `₹${appliedCoupon.discountedPrice} • You save ₹${appliedCoupon.discount}`
                : "Free registration • Limited seats available"}
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
