import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { firestore } from "@/lib/firebase";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [leadsSnapshot, enrollmentsSnapshot] = await Promise.all([
      firestore.collection("leads").get(),
      firestore.collection("enrollments").get(),
    ]);

    const totalLeads = leadsSnapshot.size;

    const enrollments = enrollmentsSnapshot.docs.map((doc) => doc.data());
    const totalEnrollments = enrollments.length;
    const completedEnrollments = enrollments.filter(
      (e) => e.status === "COMPLETED"
    ).length;
    const totalRevenue = enrollments
      .filter((e) => e.status === "COMPLETED")
      .reduce((sum, e) => sum + (e.amount || 0), 0);

    const recentLeadsQuery = await firestore
      .collection("leads")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const recentLeads = recentLeadsQuery.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
    }));

    const recentEnrollmentsQuery = await firestore
      .collection("enrollments")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const recentEnrollmentLeadIds = recentEnrollmentsQuery.docs.map(
      (doc) => doc.data().leadId
    );
    const leadsMap: Record<string, any> = {};

    if (recentEnrollmentLeadIds.length > 0) {
      const leadsSnapshot = await firestore
        .collection("leads")
        .where("__name__", "in", recentEnrollmentLeadIds)
        .get();
      leadsSnapshot.forEach((doc) => {
        leadsMap[doc.id] = { id: doc.id, name: doc.data().name, email: doc.data().email };
      });
    }

    const recentEnrollments = recentEnrollmentsQuery.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        orderId: data.orderId,
        paymentId: data.paymentId,
        amount: data.amount,
        status: data.status,
        createdAt: data.createdAt?.toDate?.()?.toISOString(),
        lead: leadsMap[data.leadId] || null,
      };
    });

    return NextResponse.json({
      metrics: {
        totalLeads,
        totalEnrollments,
        completedEnrollments,
        totalRevenue,
        conversionRate:
          totalLeads > 0
            ? ((completedEnrollments / totalLeads) * 100).toFixed(1)
            : "0",
      },
      recentLeads,
      recentEnrollments,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
