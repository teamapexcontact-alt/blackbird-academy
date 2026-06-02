"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { EyeOff, TrendingDown, Clock, Target, Users, CalendarX, X } from "lucide-react";

const problems = [
  { icon: EyeOff, title: "Low Views", description: "Your reels are stuck at 200-500 views no matter what you try" },
  { icon: TrendingDown, title: "No Growth", description: "Your follower count hasn't moved in months" },
  { icon: Clock, title: "Slow Editing", description: "Spending 4-6 hours editing a single reel" },
  { icon: Target, title: "No Strategy", description: "Posting randomly without a proven content system" },
  { icon: Users, title: "Poor Retention", description: "People scroll past your content in under 2 seconds" },
  { icon: CalendarX, title: "No Consistency", description: "Struggling to maintain a regular posting schedule" },
];

export function Problem() {
  return (
    <section className="py-24 relative" id="problems">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="The Problem"
          title={<>Your content isn&apos;t the <span className="serif-accent text-accent">problem</span>.</>}
          description="If any of these sound familiar, you're not alone. Every creator faces these before finding the right system."
        />

        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative flex items-start gap-3 p-4 border-l-2 border-accent/20 hover:border-accent/60 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                <problem.icon className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-display font-bold text-primary-text">{problem.title}</h3>
                  <X className="w-3.5 h-3.5 text-accent/40 shrink-0" />
                </div>
                <p className="text-xs text-muted-text leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
