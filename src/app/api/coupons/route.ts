import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const snapshot = await firestore
      .collection("coupons")
      .orderBy("createdAt", "desc")
      .get();

    const coupons = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        expiryDate: data.expiryDate?.toDate?.()?.toISOString() || null,
      };
    });

    return NextResponse.json({ coupons });
  } catch (error) {
    console.error("Fetch coupons error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { code, discount, discountType, expiryDate, maxUses } = body;

    if (!code || discount == null || !discountType || !expiryDate || maxUses == null) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const upperCode = code.toUpperCase();

    const existing = await firestore
      .collection("coupons")
      .where("code", "==", upperCode)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { error: "Coupon code already exists" },
        { status: 409 }
      );
    }

    const docRef = await firestore.collection("coupons").add({
      code: upperCode,
      discount: Number(discount),
      discountType,
      expiryDate: Timestamp.fromDate(new Date(expiryDate)),
      maxUses: Number(maxUses),
      currentUses: 0,
      isActive: true,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id, code: upperCode }, { status: 201 });
  } catch (error) {
    console.error("Create coupon error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Coupon ID is required" },
        { status: 400 }
      );
    }

    await firestore.collection("coupons").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete coupon error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
