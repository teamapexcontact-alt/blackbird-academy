import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const db = getFirestore();
    let query: FirebaseFirestore.Query = db.collection("enrollments");

    if (status) {
      query = query.where("status", "==", status);
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();

    const leadIds = snapshot.docs.map((doc) => doc.data().leadId);
    const leadsMap: Record<string, any> = {};

    if (leadIds.length > 0) {
      const leadsSnapshot = await db
        .collection("leads")
        .where("__name__", "in", leadIds)
        .get();
      leadsSnapshot.forEach((doc) => {
        leadsMap[doc.id] = { id: doc.id, ...doc.data() };
      });
    }

    const enrollments = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        orderId: data.orderId,
        paymentId: data.paymentId || null,
        amount: data.amount,
        currency: data.currency || "INR",
        status: data.status,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        lead: leadsMap[data.leadId]
          ? {
              name: leadsMap[data.leadId].name,
              email: leadsMap[data.leadId].email,
              phone: leadsMap[data.leadId].phone,
              instagram: leadsMap[data.leadId].instagram,
            }
          : { name: "Unknown", email: "", phone: "", instagram: "" },
      };
    });

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
