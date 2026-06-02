"use client";

import { motion } from "framer-motion";
import { Users, Film, TrendingUp, Award } from "lucide-react";

const metrics = [
  { icon: Users, value: "1000+", label: "Students" },
  { icon: Film, value: "500+", label: "Reels Made" },
  { icon: TrendingUp, value: "1M+", label: "Total Reach" },
  { icon: Award, value: "4.9/5", label: "Rated" },
];

export function TrustMetrics() {
  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-6 text-center group"
            >
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <metric.icon className="w-4 h-4 text-accent" />
              </div>
              <div className="display-heading text-3xl sm:text-4xl gradient-text mb-1">
                {metric.value}
              </div>
              <div className="text-[10px] font-label uppercase tracking-[0.2em] text-muted-text">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
