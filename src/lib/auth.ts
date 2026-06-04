import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { firestore } from "@/lib/firebase";

const DEV_ADMIN = {
  id: "admin-dev",
  email: "admin@blackbird.academy",
  name: "Admin",
  role: "admin",
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (email === DEV_ADMIN.email && password === "admin@123") {
          return DEV_ADMIN;
        }

        try {
          const db = firestore;
          const usersRef = db.collection("users");
          const snapshot = await usersRef
            .where("email", "==", email)
            .limit(1)
            .get();

          if (snapshot.empty) return null;

          const userDoc = snapshot.docs[0];
          const user = userDoc.data();

          if (user.password !== password) return null;

          return {
            id: userDoc.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
});
