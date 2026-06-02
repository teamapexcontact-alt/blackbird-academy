"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "#curriculum", label: "Curriculum" },
  { href: "#instructors", label: "Instructors" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
];

interface NavbarProps {
  onEnrollClick: () => void;
}

export function Navbar({ onEnrollClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="BlackBird Academy" className="h-7 w-7" />
          <span className="display-heading text-base text-primary-text font-extrabold tracking-tight hidden sm:inline">
            BlackBird
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-label uppercase tracking-[0.2em] text-muted-text hover:text-primary-text transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onEnrollClick}
            className="group bg-accent hover:bg-accent-hover text-white text-xs font-label uppercase tracking-[0.2em] px-5 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 shadow-lg shadow-accent/30 hover:shadow-accent/50"
          >
            Enroll Now
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </nav>

        <button
          className="md:hidden p-2 text-muted-text hover:text-primary-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-label uppercase tracking-[0.2em] text-muted-text hover:text-primary-text py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onEnrollClick();
                }}
                className="bg-accent hover:bg-accent-hover text-white text-xs font-label uppercase tracking-[0.2em] py-3 rounded-full transition-colors text-center mt-2"
              >
                Enroll Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
