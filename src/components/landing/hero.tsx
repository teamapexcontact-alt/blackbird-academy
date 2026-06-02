"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Users, Film, TrendingUp, Sparkles, Zap, Clock, Star, Award } from "lucide-react";
import { useState, useRef, useCallback } from "react";

interface HeroProps {
  onEnrollClick: () => void;
}

export function Hero({ onEnrollClick }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlightX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const spotlightY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-background pointer-events-none"
        style={{ y: backgroundY }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(700px circle at ${x}% ${y}%, rgba(212, 120, 61, 0.12), transparent 55%)`
          ),
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="absolute top-20 left-10 w-2 h-2 bg-accent/40 rounded-full animate-float pointer-events-none" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-accent/30 rounded-full animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-accent/50 rounded-full animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <span className="h-px w-8 bg-accent/50" />
              <span className="eyebrow flex items-center gap-2">
                <Zap className="w-3 h-3" />
                Blackbird Academy 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-primary-text mb-6"
            >
              Create <span className="serif-accent text-accent">viral</span> reels
              <br />
              that generate <span className="serif-accent text-accent">millions</span> of views.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-muted-text max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Master AI-powered editing, viral frameworks, and retention psychology
              used by India&apos;s top creators. Join 1000+ students who&apos;ve
              transformed their content and their lives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6"
            >
              <Button
                size="xl"
                onClick={onEnrollClick}
                className="relative overflow-hidden group animate-pulse-glow font-label uppercase tracking-wider"
              >
                <span className="relative z-10 flex items-center">
                  Enroll Now — ₹999
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="group border-accent/30 hover:border-accent/60 hover:bg-accent/5 font-label uppercase tracking-wider"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Preview
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mb-10 text-xs"
            >
              <div className="flex items-center gap-1.5 text-accent">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">18 seats left</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1.5 text-muted-text">
                <Users className="w-3.5 h-3.5" />
                <span>1,000+ students</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1.5 text-muted-text">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="grid grid-cols-3 gap-px bg-border/40 max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: "1000+", label: "Students" },
                { value: "500+", label: "Reels" },
                { value: "1M+", label: "Reach" },
              ].map((metric) => (
                <div key={metric.label} className="bg-background p-3 text-left">
                  <div className="display-heading text-2xl sm:text-3xl gradient-text">
                    {metric.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-text mt-0.5 font-label">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="relative"
          >
            <div className="relative glass rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto border border-accent/15 group">
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-secondary-bg">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Film className="w-16 h-16 text-accent mx-auto mb-4" />
                    </motion.div>
                    <p className="eyebrow text-muted-text">Course Preview</p>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="eyebrow text-white/90">Live Now</span>
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-label uppercase tracking-wider text-white">Live</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="display-heading text-2xl sm:text-3xl text-white mb-1">
                  Master the <span className="serif-accent text-accent">algorithm</span>
                </p>
                <p className="text-xs text-white/70">Inside BlackBird Academy</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 glass rounded-xl p-3 hidden sm:flex items-center gap-2.5 border border-accent/20"
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="display-heading text-sm text-primary-text">4.9/5</div>
                <div className="text-[10px] text-muted-text uppercase tracking-wider font-label">Rated</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -top-4 -right-4 glass rounded-xl p-3 hidden sm:flex items-center gap-2.5 border border-accent/20"
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="display-heading text-sm text-primary-text">1M+</div>
                <div className="text-[10px] text-muted-text uppercase tracking-wider font-label">Reach</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
