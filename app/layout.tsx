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
  title: "InternLink NG",
  description:
    "Find SIWES and internship opportunities for Nigerian students.",
  icons: {
    icon: "/icon.svg",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "InternLink",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>

        <footer className="w-full py-8 flex flex-col items-center justify-center gap-2">
          <img
            src="/icons/apple-touch-icon.png"
            alt="InternLink"
            className="w-10 h-10"
          />
          <p className="text-sm text-gray-500">InternLink NG</p>
        </footer>
      </body>
    </html>
  );
}
