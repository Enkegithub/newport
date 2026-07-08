import '../styles.css';
import Script from 'next/script';
import PersonSchema from "./person-schema";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  metadataBase: new URL("https://www.niteshkushwaha.com.np"),

  title: {
    default: "Nitesh Kushwaha | Full Stack Developer, AI Engineer & Researcher",
    template: "%s | Nitesh Kushwaha",
  },

  description:
    "Official portfolio of Nitesh Kushwaha. Full Stack Developer, Flutter Developer, Android Developer, AI & Machine Learning Engineer, and Researcher.",

  keywords: [
    "Nitesh Kushwaha",
    "Nitesh Kushwaha Portfolio",
    "Full Stack Developer",
    "Flutter Developer",
    "Android Developer",
    "Machine Learning",
    "Artificial Intelligence",
    "AI Engineer",
    "Researcher",
    "Computer Engineering",
    "Next.js",
    "React Developer",
    "Nepal",
  ],

  authors: [{ name: "Nitesh Kushwaha" }],

  creator: "Nitesh Kushwaha",

  publisher: "Nitesh Kushwaha",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.niteshkushwaha.com.np",
  },

  openGraph: {
    title: "Nitesh Kushwaha | Full Stack Developer, AI Engineer & Researcher",
    description:
      "Official portfolio of Nitesh Kushwaha showcasing projects, research, publications, certifications, and technical skills.",
    url: "https://www.niteshkushwaha.com.np",
    siteName: "Nitesh Kushwaha Portfolio",
    images: [
      {
        url: "/icon.jpg",
        width: 1200,
        height: 630,
        alt: "Nitesh Kushwaha",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nitesh Kushwaha | Full Stack Developer & AI Engineer",
    description:
      "Official portfolio of Nitesh Kushwaha.",
    images: ["/icon.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>

        {/* Structured Data for Google */}
        <PersonSchema />

        {children}

        <Script
          src="/portfolio-runtime.js"
          strategy="afterInteractive"
        />

        <SpeedInsights />

      </body>
    </html>
  );
}
