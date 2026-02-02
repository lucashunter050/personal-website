import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucas Hunter - Software Engineer",
  description:
    "Portfolio of Lucas Hunter, Software Engineer at ProDex Labs",
  icons: {
    icon: "/favicon-16x16.png",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
