"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, RefreshCw } from "lucide-react";

interface FinalCTAProps {
  onEnrollClick: () => void;
}

export function FinalCTA({ onEnrollClick }: FinalCTAProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="ambient-orb bg-accent w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-border bg-secondary-bg/50 backdrop-blur-sm">
            <span className="eyebrow !text-[10px] !tracking-[0.2em]">Limited Enrollment</span>
          </div>

          <h2 className="display-heading text-4xl sm:text-5xl lg:text-6xl mb-6">
            Ready to create <span className="serif-accent text-accent">viral</span> content?
          </h2>

          <p className="text-lg text-muted-text mb-10 max-w-xl mx-auto leading-relaxed">
            Join 1,000+ creators who have transformed their content and their
            lives. The next viral reel is waiting to be created by you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button
              size="xl"
              onClick={onEnrollClick}
              className="bg-accent text-white hover:bg-accent-hover font-medium rounded-lg animate-pulse-glow group"
            >
              Enroll Now — ₹999
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-text">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-accent" />
              7-Day Money-Back
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              Lifetime Access
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
