import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucas-hunter.com"),
  title: "Lucas Hunter — AI Engineer / Designer",
  description:
    "Lucas Hunter builds AI systems and the interfaces that control them. Frontend & design lead at ProDex Labs.",
  openGraph: {
    title: "Lucas Hunter — AI Engineer / Designer",
    description:
      "AI systems and the interfaces that control them. Frontend & design lead at ProDex Labs.",
    url: "https://lucas-hunter.com",
    siteName: "Lucas Hunter",
    type: "website",
  },
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
    <html lang="en" suppressHydrationWarning className={raleway.variable}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
