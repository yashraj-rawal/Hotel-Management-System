"use client";

import { SessionProvider } from "next-auth/react";
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      // Re-fetches the session when the window is refocused (useful for luxury apps)
      refetchOnWindowFocus={true} 
      // Ensures the session stays fresh every 5 minutes
      refetchInterval={5 * 60}
    >
      {children}
    </SessionProvider>
  );
}