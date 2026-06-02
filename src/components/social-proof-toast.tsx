"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const names = [
  "Ananya from Mumbai",
  "Rohit from Delhi",
  "Priya from Bangalore",
  "Arjun from Pune",
  "Neha from Hyderabad",
  "Vikram from Chennai",
  "Sarah from Kolkata",
  "Amit from Jaipur",
];

export function SocialProofToast() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % names.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-28 left-4 z-30 max-w-[260px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass rounded-xl p-3 border border-green-500/20 shadow-lg shadow-green-900/10"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                {names[current].charAt(0)}
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background">
                <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            <div className="text-xs">
              <p className="text-primary-text font-medium leading-tight">
                {names[current]}
              </p>
              <p className="text-green-400 text-[10px] font-medium">
                Just enrolled
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
