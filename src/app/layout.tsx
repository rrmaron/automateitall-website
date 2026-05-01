import type { Metadata } from "next";
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
  title: "AutomateItAll — Automate Any Business Process",
  description:
    "We build end-to-end automation platforms for any industry. Sales, scheduling, inventory, commissions, customer communication — fully integrated and tailored to how your business actually runs.",
  openGraph: {
    title: "AutomateItAll — Automate Any Business Process",
    description:
      "End-to-end automation platforms for any industry. See how we transformed a national bath remodeling operation — then imagine what we can do for yours.",
    url: "https://automateitall.ai",
    siteName: "AutomateItAll",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#020817] text-slate-100">{children}</body>
    </html>
  );
}
