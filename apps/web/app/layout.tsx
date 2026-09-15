import type { Metadata } from "next";
import "@livekit/components-styles";
import {
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ClientStoreProvider } from "../providers/clientStoreProvider";
import { MeetingStoreProvider } from "../providers/meetingStoreProvider";
import { TRPCReactProvider } from "../trpc/client";
import { ToastContainer } from "../components/ui/Toast";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const sansGrotesk = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aakaar — In-Browser Podcast Studio & Video Engine",
  description: "Record together. Edit without leaving. Low-latency multitrack studio and lightweight browser video editor with developer-grade precision.",
  openGraph: {
    title: "Aakaar — In-Browser Podcast Studio & Video Engine",
    description: "Record together. Edit without leaving. Zero desktop installs, local multitrack audio isolation, and instant timeline assembly.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakaar — In-Browser Podcast Studio & Video Engine",
    description: "Record together. Edit without leaving. Zero desktop installs, local multitrack audio isolation, and instant timeline assembly.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
      className={`${sansGrotesk.variable} ${monoFont.variable} dark`}
    >
      <body className="font-sans antialiased bg-[#131415] text-[#F2F1ED] min-h-screen selection:bg-[#FA5089] selection:text-white">
        <SessionProvider>
          <TRPCReactProvider>
            <ClientStoreProvider>
              <MeetingStoreProvider>
                {children}
                <ToastContainer />
              </MeetingStoreProvider>
            </ClientStoreProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
