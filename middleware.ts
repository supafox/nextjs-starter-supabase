import { NextRequest } from "next/server";

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
  // Update session and handle authentication
  const sessionResponse = await updateSession(request);

  // Return early if session update requires special handling
  if (sessionResponse.status !== 200) {
    return sessionResponse;
  }

  // Preserve cookies from session response
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

  // Create middleware with request-specific config
  // Add Vercel toolbar in preview environments
  const noseconeMiddleware = nosecone.createMiddleware(
    process.env.VERCEL_ENV === "preview"
      ? nosecone.withVercelToolbar(noseconeConfig)
      : noseconeConfig
  ) as (req: NextRequest) => Promise<Response>;

  // Add nonce to request headers for downstream use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", requestNonce);

  // Create a new request with the updated headers
  const clonedRequest = new NextRequest(request.url, {
    headers: requestHeaders,
    method: request.method,
    body: request.clone().body,
  });

  // Process the request through nosecone middleware
  const response = await noseconeMiddleware(clonedRequest);

  // Add nonce to response headers for client-side access
  response.headers.set("x-nonce", requestNonce);

  // Merge cookies from session response to preserve authentication
  upstreamCookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}
