import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    const db = firestore;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const snapshot = await db.collection("reels").orderBy("createdAt", "desc").get();
    const reels = snapshot.docs.map((doc) => {
      const data = doc.data();

      const inferredResourceType =
        data.resourceType ||
        (data.thumbnail?.match(/\.(mp4|webm|mov|avi|mkv)$/i) ? "video" : "image");

      const isVideo = inferredResourceType === "video";
      const videoUrl = isVideo && data.publicId
        ? `https://res.cloudinary.com/${cloudName}/video/upload/${data.publicId}.mp4`
        : "";
      const videoThumbnail = isVideo && data.publicId
        ? `https://res.cloudinary.com/${cloudName}/video/upload/${data.publicId}.jpg`
        : "";

      return {
        id: doc.id,
        ...data,
        resourceType: inferredResourceType,
        url: data.url || videoUrl,
        secureUrl: data.secureUrl || videoUrl || data.thumbnail,
        thumbnail: isVideo ? (data.thumbnail?.match(/\.(jpg|jpeg|png|webp)$/i) ? data.thumbnail : videoThumbnail) : data.thumbnail,
      };
    });

    return NextResponse.json({ reels });
  } catch (error) {
    console.error("Fetch reels error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, creator, publicId, url, secureUrl, thumbnail, resourceType, width, height } = body;

    if (!title || !url) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }

    const docRef = await firestore.collection("reels").add({
      title,
      creator: creator || "Student",
      thumbnail: thumbnail || secureUrl || url,
      url: url || "",
      secureUrl: secureUrl || "",
      resourceType: resourceType || (url?.includes(".mp4") ? "video" : "image"),
      publicId: publicId || "",
      width: width || 0,
      height: height || 0,
      views: "0",
      likes: "0",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Create reel error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await firestore.collection("reels").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete reel error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
