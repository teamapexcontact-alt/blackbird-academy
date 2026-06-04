import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { firestore } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function GET() {
  try {
    const snapshot = await firestore.collection("content").get();
    const contentMap: Record<string, string> = {};

    snapshot.forEach((doc) => {
      contentMap[doc.id] = doc.data().value;
    });

    return NextResponse.json({ contents: contentMap });
  } catch (error) {
    console.error("Fetch content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { key, value } = body;

    await firestore.collection("content").doc(key).set(
      {
        value,
        type: "text",
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true, key, value });
  } catch (error) {
    console.error("Update content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
