"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, RefreshCw, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onEnrollClick: () => void;
}

export function FinalCTA({ onEnrollClick }: FinalCTAProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/5 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-accent/50" />
            <span className="eyebrow flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Limited Enrollment
            </span>
            <span className="h-px w-8 bg-accent/50" />
          </div>

          <h2 className="display-heading text-5xl sm:text-6xl lg:text-7xl mb-6">
            Ready to create <span className="serif-accent text-accent">viral</span> content?
          </h2>

          <p className="text-lg text-muted-text mb-10 max-w-xl mx-auto leading-relaxed">
            Join 1000+ creators who have transformed their content and their lives.
            The next viral reel is waiting to be created by you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button
              size="xl"
              onClick={onEnrollClick}
              className="font-label uppercase tracking-[0.2em] animate-pulse-glow"
            >
              Enroll Now — ₹999
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-muted-text">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-accent" />
              Secure Payment
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-accent" />
              7-Day Money-Back
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              Lifetime Access
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
