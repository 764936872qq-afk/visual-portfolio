import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "王兴 VISUAL DESIGN PORTFOLIO",
  description:
    "王兴个人作品集，展示品牌VI、电商设计、包装设计、AIGC视觉和Logo设计作品。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
