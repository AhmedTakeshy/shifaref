import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/_components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"

const urbanist = Urbanist({
  subsets: ["latin"],
  display: 'swap',
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SHIFAREF",
  description: `SHIFAREF is a platform specializing in food and dietary supplements, alternative and complementary medicine, herbal remedies, skincare and cosmetics, and sports nutrition. We are dedicated to providing high-quality products that promote holistic health and well-being. Our journey began with a passion for natural remedies and a commitment to offering products that enhance both physical health and beauty.
  At SHIFAREF, we believe in the power of nature to heal and rejuvenate, guided by the principle of holistic wellness. Join us on our mission to promote health, beauty, and vitality through our carefully curated range of products. Don't forget to invoke “the healing prayers”. We are an exceptional platform that can supply a wide range of perfumes, cosmetics, beauty, skincare. We deals with international trade in Europe, America, and the Middle East. We are dedicated to providing high-quality products that promote holistic health and well- being. Our commitments to excellency is reflected on customer satisfaction, transparency, and high standards of service. Our expertise depends on a long way of research, consulting and publishing scientific papers during the last four decades.`,
  keywords: ["SHIFAREF", "food", "dietary supplements", "alternative medicine", "complementary medicine", "herbal remedies", "skincare", "cosmetics", "sports nutrition", "holistic health", "well-being", "natural remedies", "physical health", "beauty", "holistic wellness", "health", "vitality", "healing prayers", "perfumes", "international trade", "Europe", "America", "Middle East", "customer satisfaction", "transparency", "high standards of service", "expertise", "research", "consulting", "scientific papers", "four decades"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shifaref.com",
    title: "SHIFAREF",
    description: `SHIFAREF is a platform specializing in food and dietary supplements, alternative and complementary medicine, herbal remedies, skincare and cosmetics, and sports nutrition. We are dedicated to providing high-quality products that promote holistic health and well-being. Our journey began with a passion for natural remedies and a commitment to offering products that enhance both physical health and beauty.`,
    images: [
      {
        url: "/imgs/logo.png",
        alt: "SHIFAREF",
        width: 800,
        height: 600,
      },
    ],
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicons/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      type: "application/manifest+json",
      url: "/manifest.json",
    },
  ],
  applicationName: "SHIFAREF",
  generator: "Next.js",
  referrer: 'origin-when-cross-origin',
  authors: { name: "Ahmed Takeshy", url: "https://takeshy.tech" },
  creator: "Ahmed Takeshy",
  publisher: "Ahmed Takeshy",
  metadataBase: new URL('https://shifaref.com'),
  alternates: {
    canonical: '/',
  },
  twitter: {
    site: "https://shifaref.com",
    card: "summary_large_image",
    siteId: "https://shifaref.com",
    creatorId: "SHIFAREF",
    creator: "https://shifaref.com",
    title: "SHIFAREF",
    description: "SHIFAREF is a platform specializing in food and dietary supplements, alternative and complementary medicine, herbal remedies, skincare and cosmetics, and sports nutrition. We are dedicated to providing high-quality products that promote holistic health and well-being. Our journey began with a passion for natural remedies and a commitment to offering products that enhance both physical health and beauty.",
  },
  robots: "index, follow",
  classification: "Health",
  category: "Health",
  other: {
    copyRight: "2024 SHIFAREF",
    rating: "General",
    Distribution: "global",
    Revisit: "1 day",
    language: "English",
    resourceType: "document",
    referrer: "origin",
    "og:type": "website",
    "og:locale": "en_US",
    "og:url": "https://shifaref.com",
    "og:title": "SHIFAREF",
    "og:description": "SHIFAREF is a platform specializing in food and dietary supplements, alternative and complementary medicine, herbal remedies, skincare and cosmetics, and sports nutrition. We are dedicated to providing high-quality products that promote holistic health and well-being. Our journey began with a passion for natural remedies and a commitment to offering products that enhance both physical health and beauty.",
    "og:image": "/imgs/logo.png",
    "og:image:width": "800",
    "og:image:height": "600",
    "og:image:alt": "SHIFAREF logo",
    "og:site_name": "SHIFAREF",
    "google-site-verification": "n9XI0HxVZaOBfVRdXxFVX3E71gSbJQy30sP-GAnjLko",
  },
  appLinks: {
    web: { url: "https://shifaref.com" },
  },

};


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.className} antialiased dark:bg-slate-900`}
      >
        <Toaster richColors />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
