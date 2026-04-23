import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "RacketMatch – Znajdź partnerów do tenisa i padla w Polsce",
  description:
    "Dołącz do waitlisty RacketMatch. Dobieramy partnerów na Twoim poziomie — nieważne czy grasz od lat, czy nigdy nie trzymałeś rakiety. Szczecin już live.",
  keywords: ["tenis", "padel", "partner do gry", "kortmatch", "polska", "aplikacja"],
  openGraph: {
    title: "RacketMatch — Zacznij grać w tenisa albo padla",
    description: "Dobieramy partnerów na Twoim poziomie. W Twoim mieście.",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
