import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protect /admin routes
    if (path.startsWith("/admin")) {
        // Check for admin_session cookie
        const adminSession = request.cookies.get("admin_session")?.value;

        // Allow access to login page
        if (path === "/admin/login") {
            if (adminSession === "true") {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            return NextResponse.next();
        }

        // Redirect to login if no session
        if (adminSession !== "true") {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
