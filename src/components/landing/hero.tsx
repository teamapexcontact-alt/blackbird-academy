"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Users, Film, TrendingUp, Sparkles, Star } from "lucide-react";
import { useState, useRef, useCallback } from "react";

interface HeroProps {
  onEnrollClick: () => void;
}

export function Hero({ onEnrollClick }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current?.style.setProperty("--mouse-x", `${x}%`);
    sectionRef.current?.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

      <div className="ambient-orb bg-accent w-[600px] h-[600px] -top-40 -left-40 animate-orb-drift" />
      <div className="ambient-orb bg-accent-glow w-[500px] h-[500px] top-1/2 -right-40 animate-orb-drift" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-border bg-secondary-bg/50 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
              </span>
              <span className="eyebrow !text-[10px] !tracking-[0.2em]">Cohort 2026 Now Open</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-primary-text mb-6"
            >
              Create reels that
              <br />
              <span className="serif-accent text-accent">command</span> attention.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-muted-text max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              The complete system for mastering AI-powered editing, viral
              frameworks, and retention psychology. Built for the next generation
              of Indian creators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
            >
              <Button
                size="xl"
                onClick={onEnrollClick}
                className="bg-accent text-white hover:bg-accent-hover font-medium rounded-lg group animate-pulse-glow"
              >
                <span className="flex items-center">
                  Start Creating — ₹999
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="group border-border hover:border-accent/50 hover:bg-accent/5 font-medium"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Showreel
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#F59E0B", "#8B5CF6", "#EC4899"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-background"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span className="text-primary-text font-medium">1,000+ creators</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-primary-text font-medium">4.9</span>
                <span className="text-muted-text">rating</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent rounded-3xl blur-2xl" />

              <div className="relative glass rounded-2xl overflow-hidden aspect-[4/5] border border-border/60 group">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-secondary-bg">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4 border border-accent/30">
                        <Film className="w-8 h-8 text-accent" />
                      </div>
                      <p className="eyebrow text-muted-text">Course Preview</p>
                      <p className="text-xs text-muted-text mt-2">Curriculum walkthrough</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src="/images/hero-placeholder.jpg"
                    alt="BlackBird Academy Course Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-label uppercase tracking-wider text-white">Live</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-white/60 mb-1">Now Playing</p>
                  <p className="display-heading text-lg text-white">
                    Mastering the <span className="serif-accent text-accent">algorithm</span>
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 sm:-left-6 glass rounded-xl p-3 flex items-center gap-3 border border-border/60">
                <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center border border-accent/20">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="display-heading text-sm text-primary-text">1,000+</div>
                  <div className="text-[10px] text-muted-text uppercase tracking-wider">Students</div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 sm:-right-6 glass rounded-xl p-3 flex items-center gap-3 border border-border/60">
                <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center border border-accent/20">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="display-heading text-sm text-primary-text">1M+</div>
                  <div className="text-[10px] text-muted-text uppercase tracking-wider">Reach</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
