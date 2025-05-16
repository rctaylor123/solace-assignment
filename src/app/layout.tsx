import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50"}>
      <div className="max-w-8xl flex flex-col mx-auto size-full">
        <main id="content">
          {children}
        </main>
      </div>
      </body>
    </html>
  );
}
