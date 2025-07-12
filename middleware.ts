import { NextRequest } from "next/server";

import * as nosecone from "@nosecone/next";

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
        ],
        imgSrc: ["'self'", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
        upgradeInsecureRequests: process.env.NODE_ENV === "production",
      },
    },
  } as const;
}

export async function middleware(request: NextRequest) {
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

  // Create request-specific nosecone config
  const noseconeConfig = createNoseconeConfig(requestNonce);

  // Create middleware with request-specific config
  const noseconeMiddleware = nosecone.createMiddleware(
    process.env.VERCEL_ENV === "preview"
      ? nosecone.withVercelToolbar(noseconeConfig)
      : noseconeConfig
  ) as (req: NextRequest) => Promise<Response>;

  // Add nonce to request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", requestNonce);

  // Pass the mutated request to the downstream middleware / app
  const clonedRequest = new NextRequest(request.url, {
    headers: requestHeaders,
    method: request.method,
    ...(request.body && { body: request.body }),
  });

  const response = await noseconeMiddleware(clonedRequest);

  // Add nonce to response headers for client-side access
  response.headers.set("x-nonce", requestNonce);

  return response;
}
