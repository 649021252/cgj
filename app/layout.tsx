import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "曹国军｜数字产品作品集",
  description: "AI应用、产业互联网与企业数字化产品作品展示，提供从业务规划、产品设计到技术落地的完整服务。",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
