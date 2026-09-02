
import "@livekit/components-styles";
import {
  JetBrains_Mono,
  Newsreader,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ClientStoreProvider } from "../providers/clientStoreProvider";
import { MeetingStoreProvider } from "../providers/meetingStoreProvider";
import { TRPCReactProvider } from "../trpc/client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const editorialSerif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-editorial-serif",
  display: "swap",
});

const sansGrotesk = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-grotesk",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Aakaar — Local Podcast Studio & In-Browser Video Editor",
//   description: "Record together. Edit without leaving. A Kanso-inspired browser studio for remote creators.",
//   openGraph: {
//     title: "Aakaar — Local Podcast Studio & In-Browser Video Editor",
//     description: "Record together. Edit without leaving. A Kanso-inspired browser studio for remote creators.",
//     images: ["/og-image.jpg"],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Aakaar — Local Podcast Studio & In-Browser Video Editor",
//     description: "Record together. Edit without leaving. A Kanso-inspired browser studio for remote creators.",
//     images: ["/og-image.jpg"],
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${editorialSerif.variable} ${sansGrotesk.variable} ${monoFont.variable}`}
    >
      <body className="font-sans antialiased bg-[#F7F6F2] text-[#141413]">
        <SessionProvider>
          <TRPCReactProvider>
            <ClientStoreProvider>
              <MeetingStoreProvider>
                {children}
              </MeetingStoreProvider>
            </ClientStoreProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
