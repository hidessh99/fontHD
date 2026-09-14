import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonical protected routes requiring active session in GoVPN
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/vpn",
  "/billing",
  "/servers",
  "/monitor",
  "/dns",
  "/ai",
  "/kubernetes",
  "/k8s",
  "/subscription",
  "/support",
  "/settings",
  "/profile",
  "/notifications",
];

// Seller partner protected routes requiring SELLER, ADMIN, or SUPERADMIN role
const SELLER_PREFIXES = ["/seller"];

// Superadmin protected routes requiring SUPERADMIN / ADMIN role
const ADMIN_PREFIXES = ["/admin"];

// Public auth routes (redirect to dashboard if already authenticated)
const AUTH_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get("hide-jwt")?.value ||
    request.cookies.get("govpn_session_token")?.value ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  const userRole = (
    request.cookies.get("govpn_user_role")?.value || ""
  ).toUpperCase();

  // 1. Guard Member Protected Dashboard Routes (0ms Edge Redirect, Zero FOUC)
  if (PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Guard Seller Partner Routes (Role-Based Access Control at Edge)
  if (SELLER_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isSellerOrAdmin =
      userRole === "SELLER" ||
      userRole === "ADMIN" ||
      userRole === "SUPERADMIN" ||
      userRole === "SUPER_ADMIN";

    if (!isSellerOrAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 3. Guard Superadmin Routes (Role-Based Access Control at Edge)
  if (ADMIN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isSuperAdmin =
      userRole === "SUPERADMIN" ||
      userRole === "SUPER_ADMIN" ||
      userRole === "ADMIN";

    if (!isSuperAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 4. Prevent Authenticated Users from Accessing Login/Register
  if (AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (sessionToken) {
      const redirectUrl =
        request.nextUrl.searchParams.get("from") || "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

// Edge matcher ignoring static files, images, favicons, robots, sitemaps
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.svg|icon\\.svg|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|manifest\\.json).*)",
  ],
};
