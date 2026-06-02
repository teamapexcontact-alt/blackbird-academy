"use client";

import { useState, useEffect } from "react";
import { MetricsCard } from "@/components/admin/metrics-card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity,
  UserPlus,
} from "lucide-react";

interface Metrics {
  totalLeads: number;
  totalEnrollments: number;
  completedEnrollments: number;
  totalRevenue: number;
  conversionRate: string;
}

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
          <p className="text-sm text-muted-text mt-1">
            Overview of your course platform
          </p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Activity className="w-3 h-3" />
          Live
        </Badge>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <MetricsCard
          title="Total Leads"
          value={metrics?.totalLeads || 0}
          icon={UserPlus}
        />
        <MetricsCard
          title="Total Enrollments"
          value={metrics?.totalEnrollments || 0}
          icon={Users}
        />
        <MetricsCard
          title="Completed"
          value={metrics?.completedEnrollments || 0}
          icon={CreditCard}
        />
        <MetricsCard
          title="Revenue"
          value={`₹${((metrics?.totalRevenue || 0) / 100).toLocaleString()}`}
          icon={DollarSign}
        />
        <MetricsCard
          title="Conversion Rate"
          value={`${metrics?.conversionRate || 0}%`}
          icon={TrendingUp}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>
          <p className="text-sm text-muted-text">
            Lead data will appear here once you start capturing leads.
          </p>
        </div>

        <div className="glass rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">Recent Enrollments</h2>
          <p className="text-sm text-muted-text">
            Enrollment data will appear here once students start enrolling.
          </p>
        </div>
      </div>
    </div>
  );
}
