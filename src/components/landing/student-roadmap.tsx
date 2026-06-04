"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { BookOpen, Wrench, TrendingUp, Wallet } from "lucide-react";
import { useRef, useState } from "react";

const steps = [
  { icon: BookOpen, title: "No Knowledge", description: "Complete beginner with no editing or content creation experience" },
  { icon: Wrench, title: "Learning the System", description: "Master AI editing, viral frameworks, and retention psychology" },
  { icon: TrendingUp, title: "Skill Building", description: "Apply what you learn, create consistent content, build your audience" },
  { icon: Wallet, title: "Earning & Scaling", description: "Monetize your skills, land clients, build a sustainable creator career" },
];

function StepBadge({ index, isActive }: { index: number; isActive: boolean }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className={`absolute inset-1 rounded-full bg-background transition-all duration-500 ${isActive ? "shadow-[0_0_30px_rgba(245,158,11,0.5)]" : ""}`} />
      <div className={`relative z-10 w-11 h-11 rounded-full bg-background border-2 flex items-center justify-center transition-all duration-500 ${
        isActive ? "border-accent scale-110" : "border-accent/40"
      }`}>
        <span className={`display-heading text-base transition-colors duration-500 ${isActive ? "text-accent" : "text-accent/60"}`}>
          {index + 1}
        </span>
      </div>
    </div>
  );
}

function StepCard({ step, index, side, isActive }: { step: typeof steps[0]; index: number; side: "left" | "right"; isActive: boolean }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="group relative"
    >
      <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/40 via-accent/0 to-accent/20 blur-sm transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />
      <div className={`relative glass rounded-2xl p-6 border transition-all duration-500 ${
        isActive
          ? "border-accent/60 shadow-[0_20px_60px_-20px_rgba(245,158,11,0.3)] -translate-y-1"
          : "border-border"
      }`}>
        <div className="flex items-center gap-4 mb-3">
          <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
            isActive
              ? "bg-gradient-to-br from-accent/30 to-accent/5 border-accent/50"
              : "bg-gradient-to-br from-accent/15 to-accent/5 border-accent/20"
          }`}>
            <Icon className="w-7 h-7 text-accent" />
          </div>
          <div>
            <div className={`text-[10px] font-label uppercase tracking-[0.25em] mb-0.5 transition-colors duration-500 ${
              isActive ? "text-accent" : "text-accent/60"
            }`}>
              Step {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="display-heading text-xl text-primary-text">{step.title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-text leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

function MobileStep({ step, index, totalSteps }: { step: typeof steps[0]; index: number; totalSteps: number }) {
  const Icon = step.icon;
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center shrink-0">
        <StepBadge index={index} isActive={false} />
        {index < totalSteps - 1 && <div className="w-0.5 flex-1 min-h-[40px] bg-gradient-to-b from-accent/40 to-accent/10" />}
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
            <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 border border-accent/20">
              <Icon className="w-5 h-5 text-accent" />
            </div>
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

function RoadmapDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const cometY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const cometOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.3]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (v < 0.2) setActiveStep(0);
    else if (v < 0.45) setActiveStep(1);
    else if (v < 0.7) setActiveStep(2);
    else setActiveStep(3);
  });

  return (
    <div ref={sectionRef} className="hidden lg:block relative max-w-6xl mx-auto">
      <div className="grid grid-cols-[1fr_80px_1fr] gap-x-8 relative">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          const isActive = activeStep === index;

          return (
            <div key={step.title} className="contents">
              <div className={`flex ${isLeft ? "justify-end" : "invisible"} pr-2`}>
                {isLeft && <StepCard step={step} index={index} side="left" isActive={isActive} />}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="relative z-10">
                  <StepBadge index={index} isActive={isActive} />
                </div>
              </div>

              <div className={`flex ${!isLeft ? "justify-start" : "invisible"} pl-2`}>
                {!isLeft && <StepCard step={step} index={index} side="right" isActive={isActive} />}
              </div>
            </div>
          );
        })}

        <div
          className="absolute top-0 bottom-0 w-0.5 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="absolute inset-0 bg-accent/10" />

          <motion.div
            className="absolute top-0 left-0 w-full origin-top"
            style={{ height: beamHeight }}
          >
            <div className="w-full h-full bg-gradient-to-b from-accent via-accent/80 to-accent/30 shadow-[0_0_20px_rgba(245,158,11,0.6),0_0_40px_rgba(245,158,11,0.3)]" />
          </motion.div>

          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent -translate-y-1/2 pointer-events-none"
            style={{
              top: cometY,
              opacity: cometOpacity,
              boxShadow: "0 0 20px 4px rgba(245, 158, 11, 0.8), 0 0 40px 8px rgba(245, 158, 11, 0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function StudentRoadmap() {
  return (
    <section className="py-24 relative" id="roadmap">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Student Journey"
          title={<>From beginner to <span className="serif-accent text-accent">earning</span> creator.</>}
          description="A proven roadmap that takes you from zero knowledge to a skilled creator generating income."
        />

        <RoadmapDesktop />

        <div className="lg:hidden max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <MobileStep key={step.title} step={step} index={index} totalSteps={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
