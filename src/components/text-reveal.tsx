"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  y?: number;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  once = true,
  y = 110,
  as: Tag = "div",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag>
        <motion.span
          className="inline-block will-change-transform"
          initial={{ y: `${y}%` }}
          animate={isInView ? { y: "0%" } : { y: `${y}%` }}
          transition={{
            duration,
            delay,
            ease: [0.25, 0.4, 0.25, 1] as const,
          }}
        >
          {children}
        </motion.span>
      </Tag>
    </div>
  );
}

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.05,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0"
        >
          <motion.span
            className={`inline-block will-change-transform ${wordClassName}`}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.25, 0.4, 0.25, 1] as const,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
