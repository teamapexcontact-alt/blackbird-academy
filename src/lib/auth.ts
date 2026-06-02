import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getFirestore } from "firebase-admin/firestore";

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

        const db = getFirestore();
        const usersRef = db.collection("users");
        const snapshot = await usersRef
          .where("email", "==", credentials.email as string)
          .limit(1)
          .get();

        if (snapshot.empty) return null;

        const userDoc = snapshot.docs[0];
        const user = userDoc.data();

        const passwordMatch = await compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) return null;

        return {
          id: userDoc.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
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
