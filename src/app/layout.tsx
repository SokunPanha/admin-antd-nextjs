import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import themeConfig from "@/theme/themeConfig";
import "@/utils/suppress-console-warnings";
import "./globals.css";
import LocaleProvider from "@/components/providers/LocaleProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js with Ant Design",
  description: "Next.js application integrated with Ant Design and Pro Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ThemeProvider>
            <LocaleProvider themeConfig={themeConfig}>
              {children}
            </LocaleProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
