'use client';

import "./globals.css";
import Navbar from "./components/navbar";
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
        <div className="h-14 bg-transparent"></div>
        <Page>
          {children}
        </Page>
        
      </body>
    </html>
  );
}
