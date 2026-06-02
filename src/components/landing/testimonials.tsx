"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  { name: "Student", location: "Mumbai", result: "100K Views in 2 Weeks", review: "This course completely changed how I approach content creation. I went from 200 views to 100K in just 2 weeks. The AI editing module alone is worth the price.", rating: 5 },
  { name: "Student", location: "Delhi", result: "Grew to 50K Followers", review: "I was stuck at 500 followers for 6 months. After taking this course, I hit 50K in 3 months. The psychology frameworks are absolutely game-changing.", rating: 5 },
  { name: "Student", location: "Bangalore", result: "10X Editing Speed", review: "I used to spend 4-5 hours on a single reel. Now I can edit and publish in under 30 minutes. The AI workflows saved me so much time and energy.", rating: 5 },
  { name: "Student", location: "Pune", result: "5M+ Total Reach", review: "The viral framework module is worth 10x the course price. I applied the 3-second hook formula and my reach exploded. Best investment in my creator journey.", rating: 5 },
  { name: "Student", location: "Hyderabad", result: "Consistent 50K+ Views", review: "Finally, a course that delivers on its promises. The step-by-step system is so easy to follow. I now get consistent views on every reel I post.", rating: 5 },
  { name: "Student", location: "Chennai", result: "Quit My Job to Create Full-Time", review: "This course gave me the confidence and skills to pursue content creation full-time. The growth blueprint helped me build a sustainable income from my content.", rating: 5 },
];

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Student Stories"
          title={<>What our students <span className="serif-accent text-accent">say</span>.</>}
          description="Join 1000+ creators who transformed their content and their lives."
        />
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-5 w-max px-4" style={{ animation: `scroll ${isPaused ? "0s" : "40s"} linear infinite` }}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass rounded-xl p-6 w-[320px] sm:w-[380px] shrink-0 border border-border hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <Quote className="w-5 h-5 text-accent/40 mb-3" />
              <p className="text-sm text-muted-text leading-relaxed mb-5 line-clamp-4">
                &ldquo;{testimonial.review}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 pt-4 border-t border-border/60">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-warm flex items-center justify-center text-white text-xs font-display font-bold shrink-0">
                  S
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-display font-bold text-primary-text">{testimonial.name}</div>
                  <div className="text-xs text-muted-text">{testimonial.location}</div>
                </div>
                <div className="ml-auto text-[11px] text-accent font-medium shrink-0">
                  {testimonial.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
