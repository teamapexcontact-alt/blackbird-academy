"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { Sparkles, Film, Brain, Layers, Workflow, LineChart, Check } from "lucide-react";

const solutions = [
  {
    icon: Sparkles,
    title: "AI Editing",
    description: "Leverage AI tools to edit reels in minutes, not hours. Learn prompt engineering and automated workflows.",
  },
  {
    icon: Film,
    title: "Viral Frameworks",
    description: "Proven reel structures that hook viewers in the first 3 seconds and keep them watching till the end.",
  },
  {
    icon: Brain,
    title: "Content Psychology",
    description: "Understand the psychology behind viral content. Learn what makes people watch, share, and follow.",
  },
  {
    icon: Layers,
    title: "Retention Systems",
    description: "Advanced editing patterns and pacing techniques that maximize audience retention rates.",
  },
  {
    icon: Workflow,
    title: "Creator Workflow",
    description: "End-to-end content creation system from ideation to publishing. Post consistently without burnout.",
  },
  {
    icon: LineChart,
    title: "Growth Blueprint",
    description: "Strategic growth framework combining content, trends, and platform algorithms for maximum reach.",
  },
];

export function Solution() {
  return (
    <section className="py-24 relative" id="solution">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/3 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="The Solution"
          title={<>The complete <span className="serif-accent text-accent">creator</span> system.</>}
          description="Everything you need to go from struggling creator to viral content machine."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {solutions.map((solution) => (
            <StaggerItem key={solution.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass rounded-xl p-6 group cursor-default border border-border hover:border-accent/30 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <solution.icon className="w-5 h-5 text-accent" />
                  </div>
                  <Check className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-base font-display font-bold text-primary-text mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
