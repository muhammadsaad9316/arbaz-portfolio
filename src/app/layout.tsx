import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arbaz Shah | Sr. Creative Developer",
  description: "Portfolio of Arbaz Shah, a Senior Creative Developer building immersive digital experiences with Next.js, WebGL, and Framer Motion.",
  openGraph: {
    title: "Arbaz Shah | Sr. Creative Developer",
    description: "Constructing digital reality from code.",
    type: "website",
    locale: "en_US",
    images: ["/og-image.jpg"], // Ensure this exists or leave as placeholders
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Shah | Creative Developer",
    description: "Constructing digital reality from code.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1 removed for accessibility (allows pinch-to-zoom)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/sequence/optimized/arba_000001.webp"
          as="image"
          type="image/webp"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          href="/sequence/optimized/mobile/arba_000001.webp"
          as="image"
          type="image/webp"
          media="(max-width: 767px)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
