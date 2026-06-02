"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { question: "Who is this course for?", answer: "This course is designed for content creators, aspiring influencers, video editors, freelancers, and social media managers who want to master viral reel creation. Whether you're a complete beginner or an experienced creator looking to level up, the system works for all skill levels." },
  { question: "Do I need any prior experience?", answer: "No prior experience is required. The course starts with the foundations and progressively builds up to advanced techniques. We've designed the curriculum to be accessible for beginners while still providing value for experienced creators." },
  { question: "What tools do I need?", answer: "You'll need a smartphone or computer with internet access. We'll guide you through setting up all the necessary tools, most of which are free or have free tiers. No expensive equipment needed to get started." },
  { question: "How long will it take to see results?", answer: "Most students see significant improvement in their content within the first week of implementing the system. Many have gone viral within 2-3 weeks of applying the frameworks. Results vary based on consistency and implementation." },
  { question: "Is there a money-back guarantee?", answer: "Yes! We offer a 7-day money-back guarantee. If you complete the first module and don't feel like this course is right for you, we'll refund your investment completely. No questions asked." },
  { question: "Will I get lifetime access?", answer: "Yes, you get lifetime access to all course materials including future updates. You'll also get access to our private community where you can ask questions and get feedback on your content." },
  { question: "How is the course delivered?", answer: "The course is delivered entirely online through our learning platform. You can access it from any device - phone, tablet, or computer. Each module includes video lessons, written guides, and practical assignments." },
  { question: "Do I get personal support?", answer: "Yes! You'll get access to our private WhatsApp community where Jay and other students provide feedback, answer questions, and share insights. We also have regular Q&A sessions." },
];

export function FAQ() {
  return (
    <section className="py-24 relative" id="faq">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Common Questions"
          title={<>Frequently <span className="serif-accent text-accent">asked</span>.</>}
          description="Everything you need to know about BlackBird Academy."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`faq-${index}`}
                  className="glass rounded-xl px-6 border border-border data-[state=open]:border-accent/30 transition-all overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline text-left py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-label uppercase tracking-[0.2em] text-accent/60 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-bold text-sm">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-text leading-relaxed pl-8">
                      {faq.answer}
                    </p>
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
