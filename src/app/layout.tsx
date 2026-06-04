import type { Metadata } from "next";
import { Inter, Space_Grotesk, DM_Serif_Display, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blackbirdacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BlackBird Academy | AI-Powered Viral Content Creation",
    template: "%s | BlackBird Academy",
  },
  description:
    "Master editing, AI workflows, retention psychology and viral frameworks to generate 1M+ reach. Join 1000+ students today.",
  keywords: [
    "blackbird academy",
    "viral reels course",
    "content creation",
    "AI editing",
    "Instagram growth",
    "video editing course",
    "learn reels",
    "content creator course",
    "reel making course India",
    "viral content",
  ],
  authors: [{ name: "Jay" }],
  creator: "BlackBird Academy",
  publisher: "BlackBird Academy",
  openGraph: {
    title: "BlackBird Academy | AI-Powered Viral Content Creation",
    description:
      "Master editing, AI workflows, retention psychology and viral frameworks used by Jay to generate 1M+ reach.",
    type: "website",
    locale: "en_IN",
    siteName: "BlackBird Academy",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "BlackBird Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackBird Academy",
    description:
      "Master editing, AI workflows, retention psychology and viral frameworks.",
    images: ["/images/logo.png"],
    creator: "@blackbirdacademy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${spaceGrotesk.variable} ${syne.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#080808" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Course",
                name: "BlackBird Academy - Viral Reel Creation Course",
                description:
                  "Master AI-powered editing, viral frameworks, and retention psychology used by India's top creators.",
                provider: {
                  "@type": "Person",
                  name: "Jay",
                  jobTitle: "Content Creator & Instructor",
                },
                educationalCredentialAwarded: "Certificate of Completion",
                teaches: [
                  "AI-powered video editing",
                  "Viral reel frameworks",
                  "Content psychology",
                  "Audience retention",
                  "Creator workflow optimization",
                ],
                offers: {
                  "@type": "Offer",
                  price: "999",
                  priceCurrency: "INR",
                  priceValidUntil: "2026-12-31",
                  availability: "https://schema.org/LimitedAvailability",
                  url: siteUrl,
                },
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: "Online",
                  location: {
                    "@type": "Place",
                    name: "Online",
                  },
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  reviewCount: "1000",
                  bestRating: "5",
                  worstRating: "1",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "BlackBird Academy",
                url: siteUrl,
                logo: `${siteUrl}/images/logo.png`,
                sameAs: [
                  "https://instagram.com",
                  "https://youtube.com",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  availableLanguage: ["English", "Hindi"],
                },
              },
            ]),
          }}
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || ""}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || ""}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ""}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-primary-text font-sans">
        {children}
      </body>
    </html>
  );
}
