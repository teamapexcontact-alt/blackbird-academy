"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Mail, Phone, Globe } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  experience: string;
  status: string;
  createdAt: string;
  enrollment: { status: string } | null;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchLeads();
  }, [search, statusFilter]);

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Instagram", "Experience", "Status", "Date"];
    const csv = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          lead.name,
          lead.email,
          lead.phone,
          lead.instagram,
          lead.experience,
          lead.enrollment?.status || lead.status,
          new Date(lead.createdAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "success" | "destructive"> = {
      NEW: "secondary",
      CONTACTED: "default",
      ENROLLED: "success",
      LOST: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Leads</h1>
          <p className="text-sm text-muted-text mt-1">
            Manage and track your leads
          </p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
          <Input
            placeholder="Search leads..."
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
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="ENROLLED">Enrolled</SelectItem>
            <SelectItem value="LOST">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-text">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Contact</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Instagram</th>
                <th className="text-left p-4 text-sm font-medium text-muted-text">Experience</th>
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
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-text">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary-bg/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{lead.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-muted-text">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-text">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-3 h-3 text-muted-text" />
                        {lead.instagram}
                      </div>
                    </td>
                    <td className="p-4 text-sm capitalize">{lead.experience}</td>
                    <td className="p-4">
                      {getStatusBadge(lead.enrollment?.status === "COMPLETED" ? "ENROLLED" : lead.status)}
                    </td>
                    <td className="p-4 text-sm text-muted-text">
                      {new Date(lead.createdAt).toLocaleDateString()}
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
