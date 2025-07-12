import type { Metadata } from "next";

import { publicUrl } from "@/lib/utils";

const baseUrl = publicUrl();

export const defaultMeta: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "SupaFox",
    template: "%s | SupaFox",
  },
  description:
    "SupaFox is a modern and clean Next.js template for building fast and scalable web applications.",
  authors: [{ name: "SupaFox", url: baseUrl.href }],
  creator: "SupaFox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SupaFox",
    description:
      "SupaFox is a modern and clean Next.js template for building fast and scalable web applications.",
    url: baseUrl.href,
    siteName: "SupaFox",
    images: [
      {
        url: new URL("/opengraph/og-image.jpg", baseUrl).toString(),
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SupaFox",
    description:
      "SupaFox is a modern and clean Next.js template for building fast and scalable web applications.",
    site: "@supafox",
    creator: "@supafox",
    images: [
      {
        url: new URL("/opengraph/twitter-image.jpg", baseUrl).toString(),
        width: 1600,
        height: 800,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/favicon/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/web-app/web-app-manifest-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/web-app/web-app-manifest-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/web-app/manifest.json",
  appleWebApp: {
    title: "SupaFox",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};
