"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Settings, Upload, Trash2, Film, Loader2 } from "lucide-react";

const contentFields = [
  { key: "course_price", label: "Course Price (₹)", type: "number", defaultValue: "2999" },
  { key: "seats_remaining", label: "Seats Remaining", type: "number", defaultValue: "18" },
  { key: "whatsapp_link", label: "WhatsApp Community Link", type: "text", defaultValue: "https://chat.whatsapp.com/" },
  { key: "hero_headline", label: "Hero Headline", type: "text", defaultValue: "Learn The Viral Reel System Used To Generate 1M+ Reach" },
  { key: "hero_subheadline", label: "Hero Subheadline", type: "text", defaultValue: "Master editing, AI workflows, retention psychology and viral frameworks used by Jay." },
];

interface Reel {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  publicId: string;
  views: string;
  likes: string;
}

export default function ContentPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [reels, setReels] = useState<Reel[]>([]);
  const [reelTitle, setReelTitle] = useState("");
  const [reelCreator, setReelCreator] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadPreset, setUploadPreset] = useState("");
  const [cloudName, setCloudName] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.contents) setValues(data.contents);
      })
      .catch(console.error);
    fetchReels();
    fetchCloudinaryConfig();
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

  const fetchCloudinaryConfig = async () => {
    try {
      const res = await fetch("/api/cloudinary/sign", { method: "POST" });
      const data = await res.json();
      if (data.cloudName) {
        setCloudName(data.cloudName);
        setUploadPreset(data.uploadPreset || "");
      }
    } catch (err) {
      console.error("Fetch cloudinary config error:", err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(values)) {
        await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setSaving(false);
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

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
        { method: "POST", body: formData }
      );
      const uploaded = await uploadRes.json();

      await fetch("/api/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: reelTitle || uploaded.original_filename,
          creator: reelCreator || "Student",
          publicId: uploaded.public_id,
          url: uploaded.url,
          secureUrl: uploaded.secure_url,
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
          <h1 className="text-2xl font-heading font-bold">Content Management</h1>
          <p className="text-sm text-muted-text mt-1">
            Edit your site content and manage reels
          </p>
        </div>
      </div>

      <div className="glass rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold">Content Fields</h2>
        </div>
        <div className="space-y-6">
          {contentFields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key} className="mb-2 block">
                {field.label}
              </Label>
              <Input
                id={field.key}
                type={field.type}
                value={values[field.key] || field.defaultValue}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSave} disabled={saving} className="mt-6">
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
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
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />
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
