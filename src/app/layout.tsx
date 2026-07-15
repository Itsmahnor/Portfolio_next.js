import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahnoor Sarfraz",
  description: "Junior Frontend Engineer portfolio showcasing projects, technical blog posts, and an interactive AI chatbot built with Next.js 15, TypeScript, and Tailwind CSS.",
  keywords: ["Mahnoor", "Frontend Engineer", "Junior Software Engineer", "React Developer", "Next.js 15", "TypeScript Portfolio"],
  authors: [{ name: "Mahnoor" }],
  creator: "Mahnoor",
  metadataBase: new URL("https://portfolio-nextjs.vercel.app"), // Placeholder, will work with Vercel deployment
  openGraph: {
    title: "Mahnoor | Junior Frontend Engineer",
    description: "Junior Frontend Engineer portfolio showcasing projects, technical blog posts, and an interactive AI chatbot.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahnoor | Junior Frontend Engineer",
    description: "Junior Frontend Engineer portfolio showcasing projects, technical blog posts, and an interactive AI chatbot.",
  },
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="antialiased bg-background text-primary flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
