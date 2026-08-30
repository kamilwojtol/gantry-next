import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gantry - Kanban for your project",
  description: "Plan and manage your project using Kanban board",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <Providers>
      <html lang="en" className={`${roboto.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </Providers>
  );
}
