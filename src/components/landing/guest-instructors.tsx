"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { useState } from "react";

const guestInstructors = [
  { name: "Staff 1", role: "Video Editing Expert", image: "" },
  { name: "Staff 2", role: "Content Strategy", image: "" },
  { name: "Staff 3", role: "Viral Marketing", image: "" },
  { name: "Staff 4", role: "Personal Branding", image: "" },
  { name: "Staff 5", role: "Cinematography", image: "" },
  { name: "Staff 6", role: "Fashion & Lifestyle", image: "" },
];

export function GuestInstructors() {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  return (
    <section className="py-24 relative overflow-hidden" id="instructors">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Guest Faculty"
          title={<>Learn from industry <span className="serif-accent text-accent">experts</span>.</>}
          description="Successful creators and industry experts join as guest instructors to give you diverse perspectives and proven strategies."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {guestInstructors.map((instructor, index) => (
            <StaggerItem key={instructor.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass rounded-xl p-6 border border-border hover:border-accent/30 transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-warm mx-auto mb-4 p-0.5 group-hover:scale-110 transition-transform duration-300">
                  {imgErrors[index] ? (
                    <div className="w-full h-full rounded-full bg-secondary-bg flex items-center justify-center">
                      <span className="text-2xl font-display font-bold text-accent">
                        {instructor.name.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={instructor.image || `/images/instructor-${index + 1}.jpg`}
                      alt={instructor.name}
                      className="w-full h-full rounded-full object-cover"
                      onError={() => setImgErrors((prev) => ({ ...prev, [index]: true }))}
                    />
                  )}
                </div>
                <h3 className="font-display font-bold text-base mb-0.5">{instructor.name}</h3>
                <p className="text-xs text-muted-text">{instructor.role}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
