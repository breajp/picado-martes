import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "FULBITO FOR EVER",
  description: "Estadísticas y perfiles del picado de los martes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Fulbito",
  },
  icons: {
    apple: "/icons/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
