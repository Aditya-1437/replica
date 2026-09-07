import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { SessionProvider } from "@/context/SessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Replica | Master Your Next Interview",
  description: "A private, text-based AI environment to sharpen your interview responses without the pressure of a camera.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${bricolage.variable} antialiased min-h-screen bg-sage-bg selection:bg-orange-500/20 selection:text-orange-600`}
      >
        <UserProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </UserProvider>
      </body>
    </html>
  );
}


