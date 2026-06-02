"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Timer, Users, Zap, ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";

interface StickyTimerBarProps {
  onEnrollClick: () => void;
}

const TOTAL_SECONDS = 15 * 60;

export function StickyTimerBar({ onEnrollClick }: StickyTimerBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [expired, setExpired] = useState(false);
  const [seatsLeft] = useState(18);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500 && !dismissed) setVisible(true);
      else if (window.scrollY <= 500) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

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
  const progress = secondsLeft / TOTAL_SECONDS;

  return (
    <AnimatePresence>
      {visible && !dismissed && !expired && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-accent/20 bg-background/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute top-0 left-0 h-0.5 bg-accent/50" style={{ width: `${(1 - progress) * 100}%`, transition: "width 1s linear" }} />

          <button
            onClick={() => setDismissed(true)}
            className="absolute top-1 right-1 z-10 p-1 rounded-full bg-secondary-bg border border-border text-muted-text hover:text-primary-text transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="container mx-auto px-3 py-2 sm:py-3">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                <Timer className={`w-3.5 h-3.5 text-accent shrink-0 ${secondsLeft <= 120 ? "animate-pulse-soft" : ""}`} />
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <span className={`bg-accent/10 text-accent display-heading text-sm sm:text-base px-1.5 py-0.5 rounded min-w-[24px] sm:min-w-[30px] text-center tabular-nums ${secondsLeft <= 120 ? "animate-pulse-soft" : ""}`}>
                    {pad(minutes)}
                  </span>
                  <span className="text-accent/40 mx-0.5 text-xs">:</span>
                  <span className={`bg-accent/10 text-accent display-heading text-sm sm:text-base px-1.5 py-0.5 rounded min-w-[24px] sm:min-w-[30px] text-center tabular-nums ${secondsLeft <= 120 ? "animate-pulse-soft" : ""}`}>
                    {pad(seconds)}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-muted-text ml-1">
                  <Users className="w-3 h-3 text-accent" />
                  <span><span className="text-accent font-bold">{seatsLeft}</span> left</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <div className="text-right leading-tight">
                  <div className="display-heading text-sm sm:text-base text-accent">₹999</div>
                  <div className="text-[10px] text-muted-text line-through">₹2,999</div>
                </div>
                <Button size="sm" onClick={onEnrollClick} className="animate-pulse-glow text-xs whitespace-nowrap h-8 sm:h-9 px-3 sm:px-4 font-label uppercase tracking-wider">
                  <Zap className="w-3 h-3 mr-1" />
                  Enroll
                  <ArrowRight className="w-3 h-3 ml-1 hidden sm:inline" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
