import type { Metadata } from "next";

import { ThemeProvider } from "@/context/theme-context";

import "@/assets/styles/globals.css";

import { headers } from "next/headers";

import { fontMono, fontSans } from "@/assets/fonts";
import { defaultMeta } from "@/data/metadata";
import MainLayout from "@/layouts/main-layout";

export const metadata: Metadata = {
  ...defaultMeta,
};

/**
 * Root layout component for the application, providing global HTML structure, theme support, and font styling.
 *
 * Wraps all pages with a consistent layout, applies global fonts and background, and configures the theme provider with system theme support. If a valid nonce is present in the request headers, it is passed to the theme provider for enhanced CSP compatibility.
 *
 * @param children - The content to render within the layout.
 *
 * @remark
 * If the `x-nonce` header is present but does not match the expected format, a warning is logged and the nonce is not applied.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce");

  // Validate nonce format if present
  // Base64 string with variable length and optional padding
  let validNonce: string | undefined;
  if (nonce) {
    if (/^[A-Za-z0-9+/]+={0,2}$/.test(nonce)) {
      validNonce = nonce;
    } else {
      // eslint-disable-next-line no-console
      console.warn("Invalid nonce format detected, nonce will be omitted");
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} min-h-screen bg-background font-sans text-copy-16 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          nonce={validNonce}
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
