"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

const directionVariants = {
  up: { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -40 }, whileInView: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 } },
  none: { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const variant = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      initial={variant.initial}
      whileInView={variant.whileInView}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
