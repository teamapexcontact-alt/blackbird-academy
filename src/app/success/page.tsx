"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  MessageCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://whatsapp.com";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>

          <Badge variant="success" className="mb-4">
            Payment Successful
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Welcome to{" "}
            <span className="gradient-text">BlackBird Academy</span>
          </h1>

          <p className="text-lg text-muted-text mb-2">
            You&apos;re now part of an elite community of 1000+ creators.
          </p>
          <p className="text-muted-text mb-8">
            Your course access details have been sent to your email.
          </p>

          <div className="glass rounded-xl p-6 mb-8 border border-border">
            <h3 className="font-semibold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Your Next Steps
            </h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs text-accent font-bold">1</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Join WhatsApp Community</div>
                  <div className="text-xs text-muted-text">
                    Connect with Jay and fellow students
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs text-accent font-bold">2</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Access Course Materials</div>
                  <div className="text-xs text-muted-text">
                    Start learning at your own pace
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs text-accent font-bold">3</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Create Your First Viral Reel</div>
                  <div className="text-xs text-muted-text">
                    Apply what you learn immediately
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Community
              </Button>
            </a>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <BookOpen className="mr-2 h-5 w-5" />
              Access Course
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
