"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Tag } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "fixed" | "percentage";
  expiryDate: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  createdAt: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    discountType: "fixed",
    expiryDate: "",
    maxUses: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/coupons");
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          discount: form.discount,
          discountType: form.discountType,
          expiryDate: form.expiryDate,
          maxUses: form.maxUses,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to create coupon");
        return;
      }

      setForm({ code: "", discount: "", discountType: "fixed", expiryDate: "", maxUses: "" });
      setShowForm(false);
      fetchCoupons();
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      await fetch(`/api/coupons?id=${id}`, { method: "DELETE" });
      fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const getStatusBadge = (coupon: Coupon) => {
    if (!coupon.isActive) return <Badge variant="destructive">Inactive</Badge>;
    if (new Date(coupon.expiryDate) < new Date()) return <Badge variant="secondary">Expired</Badge>;
    if (coupon.currentUses >= coupon.maxUses) return <Badge variant="secondary">Exhausted</Badge>;
    return <Badge variant="success">Active</Badge>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Coupons</h1>
          <p className="text-sm text-muted-text mt-1">
            Create and manage discount coupon codes
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          {showForm ? "Cancel" : "New Coupon"}
        </Button>
      </div>

      {showForm && (
        <div className="glass rounded-xl border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Create New Coupon</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="code" className="text-xs font-label uppercase tracking-wider">Code</Label>
                <Input
                  id="code"
                  placeholder="SUMMER50"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  className="bg-secondary-bg/50 uppercase"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="discount" className="text-xs font-label uppercase tracking-wider">Discount</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="500"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: e.target.value })}
                  className="bg-secondary-bg/50"
                  required
                  min="0"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="discountType" className="text-xs font-label uppercase tracking-wider">Type</Label>
                <Select
                  value={form.discountType}
                  onValueChange={(value) => setForm({ ...form, discountType: value })}
                >
                  <SelectTrigger className="bg-secondary-bg/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed (₹)</SelectItem>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="expiryDate" className="text-xs font-label uppercase tracking-wider">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  className="bg-secondary-bg/50"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="maxUses" className="text-xs font-label uppercase tracking-wider">Max Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  placeholder="100"
                  value={form.maxUses}
                  onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
                  className="bg-secondary-bg/50"
                  required
                  min="1"
                />
              </div>
            </div>
            <Button type="submit" className="gap-2">
              <Tag className="w-4 h-4" />
              Create Coupon
            </Button>
          </form>
        </div>
      )}

      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-text">Code</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Discount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Uses</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Expiry</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Created</th>
                <th className="text-right p-4 text-sm font-medium text-muted-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-text">
                    Loading...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-text">
                    No coupons found
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-border/50 hover:bg-secondary-bg/50 transition-colors">
                    <td className="p-4">
                      <code className="text-sm font-mono font-bold text-accent">{coupon.code}</code>
                    </td>
                    <td className="p-4">
                      {coupon.discountType === "fixed"
                        ? `₹${coupon.discount}`
                        : `${coupon.discount}%`}
                    </td>
                    <td className="p-4 text-sm">
                      {coupon.currentUses} / {coupon.maxUses}
                    </td>
                    <td className="p-4 text-sm text-muted-text">
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">{getStatusBadge(coupon)}</td>
                    <td className="p-4 text-sm text-muted-text">
                      {new Date(coupon.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(coupon.id)}
                        className="text-muted-text hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
