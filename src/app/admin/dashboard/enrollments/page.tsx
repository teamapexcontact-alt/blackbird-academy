"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, CreditCard } from "lucide-react";

interface Enrollment {
  id: string;
  orderId: string;
  paymentId: string | null;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  lead: {
    name: string;
    email: string;
    phone: string;
    instagram: string;
  };
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, [search, statusFilter]);

  const fetchEnrollments = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/enrollments?${params}`);
      const data = await res.json();
      setEnrollments(data.enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "success" | "destructive"> = {
      PENDING: "secondary",
      COMPLETED: "success",
      FAILED: "destructive",
      REFUNDED: "default",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const filtered = enrollments.filter((e) =>
    e.lead.name.toLowerCase().includes(search.toLowerCase()) ||
    e.lead.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Enrollments</h1>
          <p className="text-sm text-muted-text mt-1">
            Track all course enrollments and payments
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
          <Input
            placeholder="Search enrollments..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-text">Student</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Payment ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-text">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-text">
                    No enrollments found
                  </td>
                </tr>
              ) : (
                filtered.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b border-border/50 hover:bg-secondary-bg/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{enrollment.lead.name}</div>
                      <div className="text-sm text-muted-text">{enrollment.lead.email}</div>
                    </td>
                    <td className="p-4">
                      <code className="text-xs text-muted-text bg-background px-2 py-1 rounded">
                        {enrollment.orderId}
                      </code>
                    </td>
                    <td className="p-4">
                      {enrollment.paymentId ? (
                        <code className="text-xs text-muted-text bg-background px-2 py-1 rounded">
                          {enrollment.paymentId}
                        </code>
                      ) : (
                        <span className="text-xs text-muted-text">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 font-medium">
                        <CreditCard className="w-3 h-3" />
                        ₹{(enrollment.amount / 100).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(enrollment.status)}</td>
                    <td className="p-4 text-sm text-muted-text">
                      {new Date(enrollment.createdAt).toLocaleDateString()}
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
