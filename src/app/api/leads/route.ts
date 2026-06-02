import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { getFirestore } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";

const COURSE_PRICE = 999;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, instagram, experience } = body;

    if (!name || !email || !phone || !instagram || !experience) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const leadsRef = db.collection("leads");
    const existingSnapshot = await leadsRef
      .where("email", "==", email)
      .limit(1)
      .get();

    let leadId: string;
    let leadEmail: string;

    if (!existingSnapshot.empty) {
      const existingDoc = existingSnapshot.docs[0];
      const existingData = existingDoc.data();

      const enrollmentsRef = db.collection("enrollments");
      const enrollmentSnapshot = await enrollmentsRef
        .where("leadId", "==", existingDoc.id)
        .where("status", "==", "COMPLETED")
        .limit(1)
        .get();

      if (!enrollmentSnapshot.empty) {
        return NextResponse.json(
          { error: "Already enrolled" },
          { status: 409 }
        );
      }

      await existingDoc.ref.update({
        name,
        phone,
        instagram,
        experience,
        status: "NEW",
        updatedAt: Timestamp.now(),
      });

      leadId = existingDoc.id;
      leadEmail = existingData.email;
    } else {
      const docRef = await leadsRef.add({
        name,
        email,
        phone,
        instagram,
        experience,
        status: "NEW",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      leadId = docRef.id;
      leadEmail = email;
    }

    const order = await razorpay.orders.create({
      amount: COURSE_PRICE * 100,
      currency: "INR",
      receipt: `lead_${leadId}`,
      notes: {
        leadId,
        email: leadEmail,
      },
    });

    const enrollmentsRef = db.collection("enrollments");
    const existingEnrollmentSnapshot = await enrollmentsRef
      .where("leadId", "==", leadId)
      .limit(1)
      .get();

    if (!existingEnrollmentSnapshot.empty) {
      await existingEnrollmentSnapshot.docs[0].ref.update({
        orderId: order.id,
        amount: COURSE_PRICE * 100,
        status: "PENDING",
        updatedAt: Timestamp.now(),
      });
    } else {
      await enrollmentsRef.add({
        leadId,
        orderId: order.id,
        amount: COURSE_PRICE * 100,
        currency: "INR",
        status: "PENDING",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const db = getFirestore();
    let query: FirebaseFirestore.Query = db.collection("leads");

    if (status) {
      query = query.where("status", "==", status);
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();

    let leads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));

    if (search) {
      const lowerSearch = search.toLowerCase();
      leads = leads.filter(
        (lead: any) =>
          lead.name?.toLowerCase().includes(lowerSearch) ||
          lead.email?.toLowerCase().includes(lowerSearch)
      );
    }

    const leadIds = leads.map((l: any) => l.id);
    const enrollmentsMap: Record<string, any> = {};

    if (leadIds.length > 0) {
      const enrollmentsSnapshot = await db
        .collection("enrollments")
        .where("leadId", "in", leadIds)
        .get();
      enrollmentsSnapshot.forEach((doc) => {
        enrollmentsMap[doc.data().leadId] = { id: doc.id, status: doc.data().status };
      });
    }

    const leadsWithEnrollments = leads.map((lead: any) => ({
      ...lead,
      enrollment: enrollmentsMap[lead.id] || null,
    }));

    return NextResponse.json({ leads: leadsWithEnrollments });
  } catch (error) {
    console.error("Fetch leads error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
