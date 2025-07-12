import { NextRequest, NextResponse } from "next/server";

import * as nosecone from "@nosecone/next";

import { updateSession } from "@/lib/supabase/middleware";
import { generateNonce } from "@/lib/utils";

// Generate nonce directly in CSP configuration per request
function createNoseconeConfig(nonce: string): nosecone.NoseconeOptions {
  return {
    ...nosecone.defaults,
    contentSecurityPolicy: {
      ...nosecone.defaults.contentSecurityPolicy,
      directives: {
        ...nosecone.defaults.contentSecurityPolicy.directives,
        scriptSrc: [
          "'self'",
          `'nonce-${nonce}'`,
          "https://fonts.googleapis.com",
          "https://va.vercel-scripts.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", "https://*.supabase.co"],
        upgradeInsecureRequests: process.env.NODE_ENV === "production",
      },
    },
  } as const;
}

export async function middleware(request: NextRequest) {
  // Performance optimization: Skip middleware for static assets
  // This prevents unnecessary session checks and header processing for static files
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Update session and handle authentication
  let sessionResponse;
  try {
    sessionResponse = await updateSession(request);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Session update failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  // Return early if session update requires special handling
  if (sessionResponse.status !== 200) {
    return sessionResponse;
  }

  // Preserve cookies from session response
  // Note: Headers.getSetCookie() requires Node.js >=19.7.0 (specified in package.json engines)
  const upstreamCookies = sessionResponse.headers.getSetCookie?.() ?? [];

  // Generate a fresh nonce for this request
  let requestNonce: string;
  try {
    requestNonce = generateNonce();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to generate nonce:", error);
    // Fallback to a timestamp-based nonce or reject the request
    return new Response("Internal Server Error", { status: 500 });
  }

  // Create request-specific nosecone config with the generated nonce
  const noseconeConfig = createNoseconeConfig(requestNonce);

  // Apply nosecone security headers to the response
  const noseconeHeaders = nosecone.default(noseconeConfig);

  // Create a response that will be modified with security headers
  // but still allow the request to continue to the next middleware
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Apply nosecone security headers to the response
  noseconeHeaders.forEach((value: string, key: string) => {
    response.headers.set(key, value);
  });

  // Add nonce to response headers for client-side access
  response.headers.set("x-nonce", requestNonce);

  // Merge cookies from session response to preserve authentication
  upstreamCookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}
