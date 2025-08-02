import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { BotProvider } from "./context/BotContext";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/Navbar";
import { ChatBot } from "./components/ChatBot";
import { ThemeScript } from "./components/ThemeScript";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistWorkSans = Work_Sans({
  variable: "--font-work-sans",
  weight: '400',
  subsets: ['latin'],
})

 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahul Lalwani - Portfolio",
  description: "Rahul Lalwani - AI Developer & Web Enthusiast",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
        className={`${geistWorkSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <BotProvider>
            <ThemeScript />
            <NavBar height="h-24"/>
            {children}
            <Footer height="h-42"/>
            <ChatBot />
            <Analytics/>
            <SpeedInsights/>
          </BotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
