import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Cake Drama | Since 2000 — Амтат мөчүүдийг урлана",
  description:
    "Cake Drama Co., Ltd. — 2000 оноос хойш 25 жилийн турш амт, чанар, инновацийг хослуулсан дээд зэрэглэлийн нарийн боов, амттан үйлдвэрлэдэг Өмнөд Солонгосын тэргүүлэгч брэнд.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface wheat-watermark antialiased">
        {children}
      </body>
    </html>
  );
}
