"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Video, FileText, Zap, Clock, Layers } from "lucide-react";

const modules = [
  {
    id: "module-1",
    title: "Foundations",
    subtitle: "Building Your Creator Foundation",
    lessons: ["Setting up your creator workspace", "Understanding Instagram algorithm 2026", "Content pillar strategy", "Niche positioning framework", "Content calendar planning"],
    icon: BookOpen,
    duration: "2 hours",
    lessonsCount: 5,
  },
  {
    id: "module-2",
    title: "AI-Powered Editing",
    subtitle: "Edit 10x Faster With AI",
    lessons: ["Introduction to AI editing tools", "Prompt engineering for video edits", "Automated caption & subtitle generation", "AI color grading techniques", "Voiceover & audio AI tools"],
    icon: Zap,
    duration: "3 hours",
    lessonsCount: 5,
  },
  {
    id: "module-3",
    title: "Content Psychology",
    subtitle: "Understanding What Makes Content Viral",
    lessons: ["The psychology of scrolling", "Hook frameworks that work", "Emotional triggers in content", "Storytelling techniques for reels", "Pattern interrupts & retention"],
    icon: FileText,
    duration: "2.5 hours",
    lessonsCount: 5,
  },
  {
    id: "module-4",
    title: "Visual Effects & Transitions",
    subtitle: "Professional Grade Edits",
    lessons: ["Advanced transition patterns", "Motion graphics for reels", "Green screen mastery", "Text animation techniques", "Sound design & audio sync"],
    icon: Video,
    duration: "3 hours",
    lessonsCount: 5,
  },
  {
    id: "module-5",
    title: "Viral Reel Framework",
    subtitle: "The System That Generates Millions of Views",
    lessons: ["The 3-second hook formula", "Retention editing patterns", "Call to action strategies", "Trend jacking framework", "Consistency system for daily posting"],
    icon: Layers,
    duration: "4 hours",
    lessonsCount: 5,
  },
];

export function Curriculum() {
  return (
    <section className="py-24 relative" id="curriculum">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Course Curriculum"
          title={<>What you&apos;ll <span className="serif-accent text-accent">learn</span>.</>}
          description="5 comprehensive modules designed to take you from beginner to viral reel expert."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={module.id}
                  className="glass rounded-xl px-6 border border-border data-[state=open]:border-accent/30 transition-all overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="text-[11px] font-label uppercase tracking-[0.2em] text-accent/60 w-8 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <module.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-base text-primary-text">
                          Module {index + 1}: {module.title}
                        </div>
                        <div className="text-xs text-muted-text mt-0.5">
                          {module.subtitle}
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 text-xs text-muted-text shrink-0 mr-2">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{module.duration}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2.5 pl-16 pr-2 pb-2">
                      {module.lessons.map((lesson, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-muted-text">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {lesson}
                        </div>
                      ))}
                      <div className="flex gap-4 pt-2 text-xs text-muted-text">
                        <span>{module.lessonsCount} lessons</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
