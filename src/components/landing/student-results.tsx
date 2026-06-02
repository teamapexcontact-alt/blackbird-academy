"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { TrendingUp, Eye, Users, Zap } from "lucide-react";

const results = [
  { icon: Eye, value: "100K+", label: "Views in 2 Weeks", description: "Student reached 100K views within 2 weeks of implementing the system" },
  { icon: Users, value: "50K+", label: "Followers Gained", description: "Student grew from 200 to 50K followers in 3 months using viral frameworks" },
  { icon: TrendingUp, value: "5M+", label: "Total Reach", description: "Combined reach across all students who completed the program" },
  { icon: Zap, value: "10X", label: "Editing Speed", description: "Average editing time reduced from 4 hours to under 25 minutes" },
];

export function StudentResults() {
  return (
    <section className="py-24 relative" id="results">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Student Results"
          title={<>Real results from <span className="serif-accent text-accent">real</span> students.</>}
          description="See what our students have achieved using the BlackBird system."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 border border-border hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <result.icon className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-label uppercase tracking-[0.2em] text-muted-text">
                  0{index + 1}
                </span>
              </div>
              <div className="display-heading text-4xl gradient-text mb-1">
                {result.value}
              </div>
              <div className="text-sm font-display font-bold text-primary-text mb-2">
                {result.label}
              </div>
              <p className="text-xs text-muted-text leading-relaxed">
                {result.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
