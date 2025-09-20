import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOID ATELIER - 시간이 멈춘 듯한 공간을 창조하다",
  description: "VOID ATELIER는 절제된 럭셔리와 장인정신이 깃든 공간을 통해 시간을 초월한 디자인을 선보입니다. 당신만의 특별한 공간을 만나보세요.",
  keywords: "인테리어, 럭셔리 인테리어, 주거공간, 맞춤형 디자인, 청담동, 성북동, 프리미엄 공간",
  authors: [{ name: "VOID ATELIER" }],
  creator: "VOID ATELIER",
  publisher: "VOID ATELIER",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "VOID ATELIER - 시간이 멈춘 듯한 공간을 창조하다",
    description: "절제된 럭셔리와 장인정신이 깃든 공간, VOID ATELIER에서 당신만의 특별한 공간을 만나보세요.",
    url: "https://voidatelier.kr",
    siteName: "VOID ATELIER",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VOID ATELIER - 시간이 멈춘 듯한 공간을 창조하다",
    description: "절제된 럭셔리와 장인정신이 깃든 공간, VOID ATELIER",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
