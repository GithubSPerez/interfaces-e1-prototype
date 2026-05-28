'use client';

import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Page from "./components/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`font-space-grotesk h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <Page>
          {children}
        </Page>
        
      </body>
    </html>
  );
}
