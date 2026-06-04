"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash2, Film, Loader2 } from "lucide-react";

interface Reel {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  url?: string;
  secureUrl?: string;
  resourceType?: string;
  publicId: string;
  views: string;
  likes: string;
}

export default function ContentPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [reelTitle, setReelTitle] = useState("");
  const [reelCreator, setReelCreator] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const res = await fetch("/api/reels");
      const data = await res.json();
      if (data.reels) setReels(data.reels);
    } catch (err) {
      console.error("Fetch reels error:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
      const signData = await signRes.json();
      if (!signData.signature) throw new Error("Failed to get signature");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const resourceType = file.type.startsWith("video/") ? "video" : "image";
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`,
        { method: "POST", body: formData }
      );
      const uploaded = await uploadRes.json();

      if (!uploadRes.ok || !uploaded.secure_url) {
        throw new Error(uploaded.error?.message || "Cloudinary upload failed");
      }

      const thumbnail = resourceType === "video"
        ? `https://res.cloudinary.com/${signData.cloudName}/video/upload/${uploaded.public_id}.jpg`
        : (uploaded.secure_url || uploaded.url);

      await fetch("/api/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: reelTitle || uploaded.original_filename,
          creator: reelCreator || "Student",
          publicId: uploaded.public_id,
          url: uploaded.url,
          secureUrl: uploaded.secure_url,
          thumbnail,
          resourceType,
          width: uploaded.width,
          height: uploaded.height,
        }),
      });

      setReelTitle("");
      setReelCreator("");
      fetchReels();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteReel = async (id: string) => {
    try {
      await fetch(`/api/reels?id=${id}`, { method: "DELETE" });
      fetchReels();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Reel Management</h1>
          <p className="text-sm text-muted-text mt-1">
            Upload and manage student reels
          </p>
        </div>
      </div>

      <div className="glass rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Film className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold">Student Reels</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="reel-title" className="mb-2 block">Reel Title</Label>
            <Input
              id="reel-title"
              value={reelTitle}
              onChange={(e) => setReelTitle(e.target.value)}
              placeholder="Travel Vlog"
            />
          </div>
          <div>
            <Label htmlFor="reel-creator" className="mb-2 block">Creator Name</Label>
            <Input
              id="reel-creator"
              value={reelCreator}
              onChange={(e) => setReelCreator(e.target.value)}
              placeholder="Student 1"
            />
          </div>
          <div className="flex items-end">
            <Button variant="outline" className="relative" disabled={uploading}>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {uploading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="mr-2 h-4 w-4" /> Upload Reel</>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {reels.map((reel) => (
            <div key={reel.id} className="group relative glass rounded-lg overflow-hidden border border-border">
              <div className="aspect-[9/16] bg-secondary-bg">
                {reel.resourceType === "video" ? (
                  <video
                    src={reel.secureUrl || reel.url || reel.thumbnail}
                    poster={reel.thumbnail}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                  />
                ) : (
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">{reel.title}</p>
                <p className="text-[10px] text-muted-text">{reel.creator}</p>
              </div>
              <button
                onClick={() => handleDeleteReel(reel.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
              >
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ))}
          {reels.length === 0 && (
            <p className="col-span-full text-sm text-muted-text text-center py-8">
              No reels yet. Upload your first student reel above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
