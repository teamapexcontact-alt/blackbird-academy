import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    const db = getFirestore();
    const snapshot = await db.collection("reels").orderBy("createdAt", "desc").get();
    const reels = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ reels });
  } catch (error) {
    console.error("Fetch reels error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, creator, publicId, url, secureUrl, width, height } = body;

    if (!title || !url) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }

    const db = getFirestore();
    const docRef = await db.collection("reels").add({
      title,
      creator: creator || "Student",
      thumbnail: secureUrl || url,
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

    const db = getFirestore();
    await db.collection("reels").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete reel error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
