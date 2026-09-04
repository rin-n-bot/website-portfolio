import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, Geist_Pixel, Inter, Libre_Baskerville, Manrope, Onest } from "next/font/google";
import CursorGrid from "@/components/CursorGrid";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistPixel = Geist_Pixel({
  variable: "--font-pixel",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahrone Ambasan",
  description: "Full-stack developer that loves converting ideas to a usable utility.",
  icons: {
    icon: "/9450.png",
    apple: "/9450.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${onest.variable} ${geist.variable} ${geistMono.variable} ${libreBaskerville.variable} ${geistPixel.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <ScrollProgress /> 
        {children}
      </body>
    </html>
  );
  
}
