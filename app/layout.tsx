import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veo 3 - إنشاء فيديو بالذكاء الاصطناعي",
  description: "إنشاء مقاطع فيديو عالية الجودة باستخدام الذكاء الاصطناعي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
