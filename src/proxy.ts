import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Protect Admin Routes
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. Protect Staff Routes
    if (path.startsWith("/staff") && token?.role !== "staff" && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 3. Protect User Dashboard (My Bookings)
    if (path.startsWith("/user") && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      // FIX: Change this to true. 
      // We handle the specific redirections inside the middleware function above.
      authorized: () => true, 
    },
  }
);

// Define which paths this middleware should run on
export const config = {
  // Ensure your /api/auth paths are NOT matched here if you add more general patterns
  matcher: ["/admin/:path*", "/staff/:path*", "/user/:path*", "/checkout/:path*"],
};