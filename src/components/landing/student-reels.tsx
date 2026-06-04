"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { Play, Heart, Eye, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Reel {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  views: string;
  likes: string;
}

export function StudentReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch("/api/reels")
      .then((res) => res.json())
      .then((data) => {
        if (data.reels) setReels(data.reels);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 relative" id="student-reels">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Student Creations"
            title={<>Reels created by our <span className="serif-accent text-accent">students</span>.</>}
            description="Real reels made using the BlackBird system. These are the results you can expect."
          />
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 text-accent animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  const displayReels = reels.length > 0 ? reels : [];

  return (
    <section className="py-24 relative" id="student-reels">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Student Creations"
          title={<>Reels created by our <span className="serif-accent text-accent">students</span>.</>}
          description="Real reels made using the BlackBird system. These are the results you can expect."
        />

        {displayReels.length === 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <StaggerItem key={index}>
                <motion.div className="glass rounded-xl overflow-hidden border border-border group">
                  <div className="aspect-[9/16] bg-gradient-to-br from-secondary-bg to-background flex items-center justify-center">
                    <Play className="w-12 h-12 text-accent/40" />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between text-xs text-muted-text">
                    <span>Upload reels in admin</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {displayReels.map((reel, index) => (
              <StaggerItem key={reel.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="aspect-[9/16] bg-gradient-to-br from-secondary-bg to-background relative overflow-hidden">
                    {imgErrors[index] ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-12 h-12 text-accent/40" />
                      </div>
                    ) : (
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImgErrors((prev) => ({ ...prev, [index]: true }))}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-sm font-display font-bold text-white">{reel.title}</p>
                      <p className="text-xs text-white/70">{reel.creator}</p>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between text-xs text-muted-text">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{reel.views}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{reel.likes}</span>
                    </div>
                    <span className="flex items-center gap-1 text-accent font-medium">
                      <TrendingUp className="w-3 h-3" />
                      Viral
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
