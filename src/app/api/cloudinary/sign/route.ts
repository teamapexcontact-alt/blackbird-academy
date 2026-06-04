import { NextResponse } from "next/server";
import { cloudinaryV2 } from "@/lib/cloudinary";

export async function POST() {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinaryV2.utils.api_sign_request(
      { timestamp, folder: "blackbird/reels", upload_preset: "blackbird_reels" },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "blackbird/reels",
      uploadPreset: "blackbird_reels",
    });
  } catch (error) {
    console.error("Sign error:", error);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
