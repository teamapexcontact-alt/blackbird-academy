import { NextResponse } from "next/server";
import crypto from "crypto";
import { firestore } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const enrollmentsRef = firestore.collection("enrollments");
    const enrollmentSnapshot = await enrollmentsRef
      .where("orderId", "==", razorpay_order_id)
      .limit(1)
      .get();

    if (enrollmentSnapshot.empty) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    const enrollmentDoc = enrollmentSnapshot.docs[0];
    const enrollmentData = enrollmentDoc.data();

    await enrollmentDoc.ref.update({
      paymentId: razorpay_payment_id,
      status: "COMPLETED",
      updatedAt: Timestamp.now(),
    });

    await firestore.collection("leads").doc(enrollmentData.leadId).update({
      status: "ENROLLED",
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
