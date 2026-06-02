import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
      className={`mb-14 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <div
        className={`flex items-center gap-3 mb-5 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-accent/50" />
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px w-8 bg-accent/50" />
      </div>
      <h2 className="display-heading text-4xl sm:text-5xl lg:text-6xl text-primary-text mb-5">
        {title}
      </h2>
      {description && (
        <p
          className={`text-muted-text text-lg max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
