import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "FTBL.APP | Premium Match Tracker",
  description: "Advanced performance diagnostics and match tracking for elite amateurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans`}>
        <div className="scene-bg">
          <div className="glow-blob blob-pink" />
          <div className="glow-blob blob-blue" />
          <div className="glow-blob blob-lemon" />
        </div>
        {children}
      </body>
    </html>
  );
}
