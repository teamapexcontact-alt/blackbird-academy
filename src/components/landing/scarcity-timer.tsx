"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Zap, AlertTriangle } from "lucide-react";

interface ScarcityTimerProps {
  onEnrollClick: () => void;
}

const TOTAL_SECONDS = 15 * 60;

export function ScarcityTimer({ onEnrollClick }: ScarcityTimerProps) {
  return (
    <section className="py-16 relative overflow-hidden" id="scarcity">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 sm:p-10 border border-accent/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-6 bg-accent/50" />
              <span className="eyebrow flex items-center gap-1.5 text-accent">
                <AlertTriangle className="w-3 h-3" />
                Limited Enrollment
              </span>
              <span className="h-px w-6 bg-accent/50" />
            </div>

            <h3 className="display-heading text-3xl sm:text-4xl mb-3">
              <span className="serif-accent text-accent">Offer</span> ending soon
            </h3>

            <ScarcityCountdown />

            <div className="flex items-center justify-center gap-1.5 mb-6 text-xs text-muted-text">
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>
                Only <span className="text-accent font-bold">18 seats</span> remaining
              </span>
            </div>

            <Button size="xl" onClick={onEnrollClick} className="w-full sm:w-auto font-label uppercase tracking-[0.2em] animate-pulse-glow">
              <Zap className="mr-2 h-4 w-4" />
              Enroll at ₹999
              <span className="text-xs ml-2 line-through opacity-70">₹2,999</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";

function ScarcityCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expired) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) { setExpired(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [expired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  if (expired) {
    return <p className="text-muted-text mb-6">This offer has ended. New batch opening soon.</p>;
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4 mb-6">
      <div className="text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-background border border-accent/30 flex items-center justify-center">
          <span className={`display-heading text-3xl sm:text-4xl ${secondsLeft <= 120 ? "text-accent animate-pulse-soft" : "gradient-text"}`}>
            {pad(minutes)}
          </span>
        </div>
        <p className="text-[10px] font-label uppercase tracking-[0.2em] text-muted-text mt-2">Minutes</p>
      </div>
      <div className="flex items-center text-2xl text-accent/40 pt-1">:</div>
      <div className="text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-background border border-accent/30 flex items-center justify-center">
          <span className={`display-heading text-3xl sm:text-4xl ${secondsLeft <= 120 ? "text-accent animate-pulse-soft" : "gradient-text"}`}>
            {pad(seconds)}
          </span>
        </div>
        <p className="text-[10px] font-label uppercase tracking-[0.2em] text-muted-text mt-2">Seconds</p>
      </div>
    </div>
  );
}
