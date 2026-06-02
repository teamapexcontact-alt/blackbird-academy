import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
}

export function MetricsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendUp,
}: MetricsCardProps) {
  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trendUp ? "text-green-400" : "text-red-400"
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-text">{title}</div>
      {description && (
        <div className="text-xs text-muted-text mt-1">{description}</div>
      )}
    </div>
  );
}
