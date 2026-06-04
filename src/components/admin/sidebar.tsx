"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Tag,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/leads", label: "Leads", icon: Users },
  { href: "/admin/dashboard/enrollments", label: "Enrollments", icon: CreditCard },
  { href: "/admin/dashboard/content", label: "Content", icon: FileText },
  { href: "/admin/dashboard/coupons", label: "Coupons", icon: Tag },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border min-h-screen bg-secondary-bg p-4 flex flex-col">
      <div className="mb-8 px-3">
        <span className="font-heading font-bold text-lg">
          <img src="/images/logo.png" alt="BlackBird Academy" className="h-7" />
          <span className="text-xs text-muted-text font-normal ml-auto">Admin</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              pathname === link.href
                ? "bg-accent/10 text-accent"
                : "text-muted-text hover:text-primary-text hover:bg-secondary-bg/80"
            )}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <form action="/api/auth/signout" method="POST">
        <button
          type="submit"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-text hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </form>
    </aside>
  );
}
