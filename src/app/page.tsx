"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustMetrics } from "@/components/landing/trust-metrics";
import { Problem } from "@/components/landing/problem";
import { Solution } from "@/components/landing/solution";
import { GuestInstructors } from "@/components/landing/guest-instructors";
import { StudentReels } from "@/components/landing/student-reels";
import { StudentRoadmap } from "@/components/landing/student-roadmap";
import { ScarcityTimer } from "@/components/landing/scarcity-timer";
import { Curriculum } from "@/components/landing/curriculum";
import { Instructor } from "@/components/landing/instructor";
import { StudentResults } from "@/components/landing/student-results";
import { Testimonials } from "@/components/landing/testimonials";
import { Bonuses } from "@/components/landing/bonuses";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { StickyTimerBar } from "@/components/sticky-timer-bar";
import { SocialProofToast } from "@/components/social-proof-toast";
import { EnrollmentModal } from "@/components/enrollment-modal";

export default function Home() {
  const [enrollOpen, setEnrollOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Navbar onEnrollClick={() => setEnrollOpen(true)} />

      <main>
        <Hero onEnrollClick={() => setEnrollOpen(true)} />
        <TrustMetrics />
        <Problem />
        <Solution />
        <GuestInstructors />
        <StudentReels />
        <StudentRoadmap />
        <Curriculum />
        <Instructor />
        <ScarcityTimer onEnrollClick={() => setEnrollOpen(true)} />
        <StudentResults />
        <Testimonials />
        <Bonuses />
        <FAQ />
        <FinalCTA onEnrollClick={() => setEnrollOpen(true)} />
      </main>

      <Footer />
      <StickyTimerBar onEnrollClick={() => setEnrollOpen(true)} />
      <SocialProofToast />
      <EnrollmentModal open={enrollOpen} onOpenChange={setEnrollOpen} />
    </>
  );
}
