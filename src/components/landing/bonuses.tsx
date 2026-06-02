"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { Gift, Sparkles, BookOpen, Calendar, Wrench } from "lucide-react";

const bonuses = [
  { icon: Sparkles, title: "AI Prompt Library", value: "₹2,999", description: "200+ proven AI prompts for content creation, editing, and strategy" },
  { icon: BookOpen, title: "Viral Hooks Database", value: "₹1,999", description: "500+ swipe-ready viral hooks categorized by niche and emotion" },
  { icon: Calendar, title: "Content Planner", value: "₹1,499", description: "30-day content planner with templates and scheduling framework" },
  { icon: Wrench, title: "Creator Toolkit", value: "₹3,999", description: "Curated collection of the best free and paid creator tools" },
];

export function Bonuses() {
  return (
    <section className="py-24 relative" id="bonuses">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Bonuses Included"
          title={<>Everything <span className="serif-accent text-accent">included</span>.</>}
          description="These bonuses alone are worth more than the course price. Free for every student."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {bonuses.map((bonus, index) => (
            <motion.div
              key={bonus.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 border border-border hover:border-accent/30 transition-all duration-300 relative"
            >
              <div className="absolute top-3 right-3">
                <Gift className="w-4 h-4 text-accent" />
              </div>
              <div className="text-[10px] font-label uppercase tracking-[0.2em] text-accent/60 mb-3">
                Bonus 0{index + 1}
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <bonus.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-bold text-sm mb-1.5">{bonus.title}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <div className="text-xs text-muted-text line-through">{bonus.value}</div>
                <div className="text-[10px] text-accent font-label uppercase tracking-wider font-bold">Free</div>
              </div>
              <p className="text-xs text-muted-text leading-relaxed">
                {bonus.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="display-heading text-xl gradient-text">
            Total value: ₹10,496
            <span className="block text-xs font-label uppercase tracking-[0.2em] text-muted-text mt-1">Yours today for ₹999</span>
          </p>
        </div>
      </div>
    </section>
  );
}
