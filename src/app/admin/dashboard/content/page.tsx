"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, Settings } from "lucide-react";

const contentFields = [
  { key: "course_price", label: "Course Price (₹)", type: "number", defaultValue: "2999" },
  { key: "seats_remaining", label: "Seats Remaining", type: "number", defaultValue: "18" },
  { key: "whatsapp_link", label: "WhatsApp Community Link", type: "text", defaultValue: "https://chat.whatsapp.com/" },
  { key: "hero_headline", label: "Hero Headline", type: "text", defaultValue: "Learn The Viral Reel System Used To Generate 1M+ Reach" },
  { key: "hero_subheadline", label: "Hero Subheadline", type: "text", defaultValue: "Master editing, AI workflows, retention psychology and viral frameworks used by Jay." },
];

export default function ContentPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.contents) {
          setValues(data.contents);
        }
      })
      .catch(console.error);
  }, []);

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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Content Management</h1>
          <p className="text-sm text-muted-text mt-1">
            Edit your site content without touching code
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
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
      </div>
    </div>
  );
}
