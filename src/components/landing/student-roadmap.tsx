"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { BookOpen, Wrench, TrendingUp, Wallet } from "lucide-react";
import { useRef, type ReactNode } from "react";

const steps = [
  { icon: BookOpen, title: "No Knowledge", description: "Complete beginner with no editing or content creation experience" },
  { icon: Wrench, title: "Learning the System", description: "Master AI editing, viral frameworks, and retention psychology" },
  { icon: TrendingUp, title: "Skill Building", description: "Apply what you learn, create consistent content, build your audience" },
  { icon: Wallet, title: "Earning & Scaling", description: "Monetize your skills, land clients, build a sustainable creator career" },
];

function StepBadge({ index }: { index: number }) {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, rgba(212, 120, 61, 0.6) 25%, transparent 50%, rgba(212, 120, 61, 0.6) 75%, transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-1 rounded-full bg-background"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 w-10 h-10 rounded-full bg-background border-2 border-accent flex items-center justify-center shadow-[0_0_25px_rgba(212,120,61,0.45)]">
        <span className="display-heading text-base text-accent">{index + 1}</span>
      </div>
    </div>
  );
}

function StepCard({ step, index, side }: { step: typeof steps[0]; index: number; side: "left" | "right" }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/30 via-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      <div className="relative glass rounded-2xl p-6 border border-border group-hover:border-accent/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_-20px_rgba(212,120,61,0.4)]">
        <div className="flex items-center gap-4 mb-3">
          <motion.div
            className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-accent/25 to-accent/5 flex items-center justify-center shrink-0 border border-accent/30"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Icon className="w-7 h-7 text-accent" />
            </motion.div>
          </motion.div>
          <div>
            <div className="text-[10px] font-label uppercase tracking-[0.25em] text-accent/70 mb-0.5">
              Step {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="display-heading text-xl text-primary-text">{step.title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-text leading-relaxed">{step.description}</p>
        <motion.div
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function MobileStep({ step, index, totalSteps }: { step: typeof steps[0]; index: number; totalSteps: number }) {
  const Icon = step.icon;
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center shrink-0">
        <StepBadge index={index} />
        {index < totalSteps - 1 && <div className="w-px flex-1 min-h-[40px] bg-border/40" />}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group flex-1 pb-8"
      >
        <div className="glass rounded-xl p-5 border border-border group-hover:border-accent/40 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 border border-accent/20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Icon className="w-5 h-5 text-accent" />
            </motion.div>
            <div>
              <div className="text-[10px] font-label uppercase tracking-[0.2em] text-accent/70">
                Step {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="display-heading text-lg text-primary-text">{step.title}</h3>
            </div>
          </div>
          <p className="text-sm text-muted-text leading-relaxed">{step.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function StudentRoadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const renderCard = (side: "left" | "right", index: number): ReactNode => {
    const step = steps[index];
    if (!step) return null;
    return <StepCard step={step} index={index} side={side} />;
  };

  return (
    <section ref={sectionRef} className="py-24 relative" id="roadmap">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Student Journey"
          title={<>From beginner to <span className="serif-accent text-accent">earning</span> creator.</>}
          description="A proven roadmap that takes you from zero knowledge to a skilled creator generating income."
        />

        <div className="hidden lg:grid max-w-6xl mx-auto grid-cols-[1fr_80px_1fr] gap-x-8 relative">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={step.title} className="contents">
                <div className={`flex ${isLeft ? "justify-end" : "invisible"} pr-2`}>
                  {isLeft && renderCard("left", index)}
                </div>

                <div className="relative flex flex-col items-center">
                  {index === 0 && <div className="w-px h-6 bg-border/40" />}
                  <StepBadge index={index} />
                  {index < steps.length - 1 && (
                    <div className="w-px flex-1 min-h-[80px] relative bg-border/30 overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent via-accent/50 to-transparent"
                        style={{ height: lineHeight }}
                      />
                    </div>
                  )}
                  {index === steps.length - 1 && <div className="w-px h-6 bg-border/40" />}
                </div>

                <div className={`flex ${!isLeft ? "justify-start" : "invisible"} pl-2`}>
                  {!isLeft && renderCard("right", index)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:hidden max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <MobileStep key={step.title} step={step} index={index} totalSteps={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
