import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const upperCode = code.toUpperCase();
    const snapshot = await firestore
      .collection("coupons")
      .where("code", "==", upperCode)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { valid: false, error: "Invalid coupon code" },
        { status: 200 }
      );
    }

    const doc = snapshot.docs[0];
    const coupon = doc.data();

    if (!coupon.isActive) {
      return NextResponse.json(
        { valid: false, error: "This coupon is no longer active" },
        { status: 200 }
      );
    }

    if (coupon.expiryDate?.toDate?.() < new Date()) {
      return NextResponse.json(
        { valid: false, error: "This coupon has expired" },
        { status: 200 }
      );
    }

    if (coupon.currentUses >= coupon.maxUses) {
      return NextResponse.json(
        { valid: false, error: "This coupon has reached its usage limit" },
        { status: 200 }
      );
    }

    const DEFAULT_PRICE = 999;
    let discountAmount = 0;

    if (coupon.discountType === "fixed") {
      discountAmount = Math.min(coupon.discount, DEFAULT_PRICE);
    } else if (coupon.discountType === "percentage") {
      discountAmount = Math.round((DEFAULT_PRICE * coupon.discount) / 100);
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discount: discountAmount,
      discountType: coupon.discountType,
      discountedPrice: DEFAULT_PRICE - discountAmount,
    });
  } catch (error) {
    console.error("Validate coupon error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
