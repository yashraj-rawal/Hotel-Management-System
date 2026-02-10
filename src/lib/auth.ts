import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("--- Auth Debug Start ---");
        try {
          await dbConnect();
          console.log("1. Database connected");

          if (!credentials?.email || !credentials?.password) {
            console.log("2. Error: Missing fields");
            throw new Error("Please enter an email and password");
          }

          // Use .select("+password") in case it's hidden in your Mongoose Schema
          const user = await User.findOne({ email: credentials.email }).select("+password");

          console.log("3. User found in DB:", user ? "YES" : "NO");

          if (!user) {
            console.log("4. Error: No user found for", credentials.email);
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("5. Password match result:", isPasswordCorrect);

          if (!isPasswordCorrect) {
            console.log("6. DB Hash prefix:", user.password.substring(0, 10));
            throw new Error("Invalid password");
          }

          console.log("7. Login Successful:", user.email);
          console.log("--- Auth Debug End ---");

          // The object returned here is saved in the JWT
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          console.error("Auth Catch Error:", error.message);
          console.log("--- Auth Debug End ---");
          return null; // This triggers the 401 Unauthorized
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only available the first time the JWT is created (on login)
      if (user) {
        token.id = user.id; // Map the ID here
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id; // Map the ID to the session object
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
}