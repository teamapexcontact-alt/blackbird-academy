import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, instagram, experience, couponCode, discountAmount } = body;

    if (!name || !email || !phone || !instagram || !experience) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (couponCode) {
      const upperCode = couponCode.toUpperCase();
      const couponSnapshot = await firestore
        .collection("coupons")
        .where("code", "==", upperCode)
        .limit(1)
        .get();

      if (couponSnapshot.empty) {
        return NextResponse.json(
          { error: "Invalid coupon code" },
          { status: 400 }
        );
      }

      const couponDoc = couponSnapshot.docs[0];
      const coupon = couponDoc.data();

      if (!coupon.isActive) {
        return NextResponse.json(
          { error: "This coupon is no longer active" },
          { status: 400 }
        );
      }

      if (coupon.expiryDate?.toDate?.() < new Date()) {
        return NextResponse.json(
          { error: "This coupon has expired" },
          { status: 400 }
        );
      }

      if (coupon.currentUses >= coupon.maxUses) {
        return NextResponse.json(
          { error: "This coupon has reached its usage limit" },
          { status: 400 }
        );
      }

      if (coupon.discountType === "fixed") {
        const expectedDiscount = Math.min(coupon.discount, 999);
        if (Number(discountAmount) !== expectedDiscount) {
          return NextResponse.json(
            { error: "Coupon validation failed" },
            { status: 400 }
          );
        }
      } else if (coupon.discountType === "percentage") {
        const expectedDiscount = Math.round((999 * coupon.discount) / 100);
        if (Number(discountAmount) !== expectedDiscount) {
          return NextResponse.json(
            { error: "Coupon validation failed" },
            { status: 400 }
          );
        }
      }

      await couponDoc.ref.update({
        currentUses: coupon.currentUses + 1,
      });
    }

    const leadsRef = firestore.collection("leads");
    const existingSnapshot = await leadsRef
      .where("email", "==", email)
      .limit(1)
      .get();

    let leadId: string;

    if (!existingSnapshot.empty) {
      const existingDoc = existingSnapshot.docs[0];

      const enrollmentsRef = firestore.collection("enrollments");
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
        status: "REGISTERED",
        updatedAt: Timestamp.now(),
      });

      leadId = existingDoc.id;
    } else {
      const docRef = await leadsRef.add({
        name,
        email,
        phone,
        instagram,
        experience,
        status: "REGISTERED",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      leadId = docRef.id;
    }

    const enrollmentsRef = firestore.collection("enrollments");
    const existingEnrollmentSnapshot = await enrollmentsRef
      .where("leadId", "==", leadId)
      .limit(1)
      .get();

    const enrollmentData: Record<string, any> = {
      status: "REGISTERED",
      updatedAt: Timestamp.now(),
    };

    if (couponCode) {
      enrollmentData.couponCode = couponCode.toUpperCase();
      enrollmentData.discountAmount = Number(discountAmount) || 0;
    }

    if (!existingEnrollmentSnapshot.empty) {
      await existingEnrollmentSnapshot.docs[0].ref.update(enrollmentData);
    } else {
      await enrollmentsRef.add({
        leadId,
        ...enrollmentData,
        createdAt: Timestamp.now(),
      });
    }

    return NextResponse.json({ success: true });
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

    let query: FirebaseFirestore.Query = firestore.collection("leads");

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
      const enrollmentsSnapshot = await firestore
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
