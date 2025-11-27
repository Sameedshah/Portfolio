import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";

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
  title: "Muhammad Sameed Shah | AI-Driven Full Stack Developer (Next.js, Supabase, n8n, Python)",
  description:
    "AI-Driven Full Stack Developer specializing in Next.js, Supabase, Tailwind CSS, and n8n automation. Experienced in building modern web applications using specs-driven development powered by Agentic AI. Currently learning Agentic AI, OpenAI SDK, Multi-Agent Systems, and Python.",
  keywords: [
    "Next.js Developer",
    "Supabase Developer",
    "AI Automation Developer",
    "n8n Developer",
    "Full Stack Developer",
    "OpenAI SDK",
    "Agentic AI",
    "Multi-Agent Systems",
    "Tailwind CSS",
    "Python Developer",
    "SaaS Developer",
    "AI Integration",
    "Workflow Automation",
  ],
  authors: [{ name: "Muhammad Sameed Shah" }],
  openGraph: {
    title: "Muhammad Sameed Shah | AI-Driven Full Stack Developer",
    description:
      "Building modern web applications and intelligent automation systems using Next.js, Supabase, n8n, and AI technologies.",
    url: "https://sameedshah.vercel.app",
    siteName: "Sameed Shah Portfolio",
    images: [
      {
        url: "https://media.licdn.com/dms/image/v2/D4D03AQHnFgKMIlIUeA/profile-displayphoto-shrink_200_200/B4DZZ7Ep6dHIAY-/0/1745821540649?e=2147483647&v=beta&t=Su0pO-9C9B3VQ6Die8fA66tcayjgEzAMka8z2ky9YPQ",
        width: 1200,
        height: 630,
        alt: "Muhammad Sameed Shah | Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Sameed Shah | AI-Driven Full Stack Developer",
    description:
      "AI-Driven Full Stack Developer specializing in Next.js, Supabase, n8n Automation, and Agentic AI.",
    images: ["https://media.licdn.com/dms/image/v2/D4D03AQHnFgKMIlIUeA/profile-displayphoto-shrink_200_200/B4DZZ7Ep6dHIAY-/0/1745821540649?e=2147483647&v=beta&t=Su0pO-9C9B3VQ6Die8fA66tcayjgEzAMka8z2ky9YPQ"],
  },
  themeColor: "#0f172a",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark hydrated">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-card text-card-foreground min-h-screen`}
      >
        <Navbar />
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {children}
        </div>
      </body>
    </html>
  );
}
