import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: String,
    role?: string;
  }
  interface Session {
    user: {
      id: String,  
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: String,
    role?: string;
  }
}