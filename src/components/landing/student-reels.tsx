"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { Play, Pause, Heart, Eye, TrendingUp, Loader2, Volume2, VolumeX, Rewind, FastForward } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface Reel {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  url?: string;
  secureUrl?: string;
  resourceType?: string;
  views: string;
  likes: string;
}

function VideoReelCard({ reel, index }: { reel: Reel; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        setHasError(true);
      });
    }
  }, [isPlaying]);

  const skipBackward = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
  }, []);

  const skipForward = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.duration && videoRef.current.currentTime + 5 < videoRef.current.duration) {
      videoRef.current.currentTime = videoRef.current.currentTime + 5;
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (videoRef.current) videoRef.current.muted = newMuted;
      return newMuted;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    setShowControls(true);
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => setShowControls(false), 2000);
    }
  }, [isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => setShowControls(false), 300);
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const onError = () => setHasError(true);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("error", onError);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  const isVideo = reel.resourceType === "video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300"
    >
      <div
        className="aspect-[9/16] bg-gradient-to-br from-secondary-bg to-background relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="w-12 h-12 text-accent/40" />
          </div>
        ) : isVideo ? (
          <>
            <video
              ref={videoRef}
              key={reel.id}
              src={reel.secureUrl || reel.url || reel.thumbnail}
              poster={reel.thumbnail}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              onClick={togglePlay}
            />

            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`} />

            {(!isPlaying || showControls) && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="flex items-center gap-3 sm:gap-5">
                  <button
                    onClick={skipBackward}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all"
                    aria-label="Back 5 seconds"
                  >
                    <Rewind className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/90 backdrop-blur-md flex items-center justify-center hover:bg-accent hover:scale-110 transition-all shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-black fill-black" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 text-black fill-black ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={skipForward}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all"
                    aria-label="Forward 5 seconds"
                  >
                    <FastForward className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={toggleMute}
              className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 transition-colors z-30"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-20">
              <div
                className="h-full bg-accent transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <img
            src={reel.thumbnail}
            alt={reel.title}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        )}

        <div className="absolute bottom-4 left-3 right-3 z-20 pointer-events-none">
          <p className="text-sm font-display font-bold text-white">{reel.title}</p>
          <p className="text-xs text-white/70">{reel.creator}</p>
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
  );
}

export function StudentReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {displayReels.map((reel, index) => (
              <VideoReelCard key={reel.id} reel={reel} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
