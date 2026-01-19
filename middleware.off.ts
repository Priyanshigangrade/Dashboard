import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ✅ Allow everything in dev (so you can build UI)
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value

  // ✅ Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // ✅ If user is logged in, don't allow going to login/signup again
  if (pathname === "/login" || pathname === "/signup") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
}
