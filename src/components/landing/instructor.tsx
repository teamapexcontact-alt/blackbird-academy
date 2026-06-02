"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { Film, TrendingUp, Users, Award, Camera, Quote } from "lucide-react";
import { useState } from "react";

const achievements = [
  { icon: Film, label: "500+ Reels", value: "Created" },
  { icon: TrendingUp, label: "1M+ Reach", value: "Generated" },
  { icon: Users, label: "1000+ Students", value: "Taught" },
];

export function Instructor() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-24 relative" id="instructor">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Your Instructor"
          title={<>Meet <span className="serif-accent text-accent">Jay</span>.</>}
          description="From zero to viral — the creator behind Figuring Out With Jay."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto border border-border/60">
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-secondary-bg">
                  <div className="text-center p-8">
                    <Camera className="w-16 h-16 text-accent mx-auto mb-4" />
                    <p className="eyebrow text-muted-text">Instructor Photo</p>
                  </div>
                </div>
              ) : (
                <img
                  src="/images/instructor-placeholder.jpg"
                  alt="Jay - BlackBird Academy Instructor"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 glass rounded-xl p-4 hidden sm:block max-w-[220px] border border-accent/20">
              <Quote className="w-5 h-5 text-accent mb-2" />
              <p className="text-xs text-muted-text leading-relaxed italic">
                &ldquo;I created this system to help you skip the struggle and go straight to viral.&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-accent/50" />
              <span className="eyebrow">Figuring Out With Jay</span>
            </div>
            <h3 className="display-heading text-3xl sm:text-4xl mb-6">
              The system, <span className="serif-accent text-accent">decoded</span>.
            </h3>
            <p className="text-muted-text leading-relaxed mb-5">
              Jay started from zero — no followers, no experience, no clue. Through
              months of trial, error, and relentless experimentation, he cracked the
              code to viral content. Now he&apos;s helped 1000+ students transform their
              content and grow their audiences using the same proven system.
            </p>
            <p className="text-muted-text leading-relaxed mb-8">
              His approach combines AI-powered workflows with deep understanding of
              content psychology, giving students an unfair advantage in the
              attention economy.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.label}
                  className="glass rounded-xl p-4 text-center border border-border/60"
                >
                  <achievement.icon className="w-4 h-4 text-accent mx-auto mb-2" />
                  <div className="display-heading text-base gradient-text">{achievement.label}</div>
                  <div className="text-[10px] font-label uppercase tracking-[0.2em] text-muted-text mt-1">
                    {achievement.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
