'use client';

import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Page from "./components/page";
import { CurrentGame } from "./context";
import { useEffect, useState } from "react";
import { Game } from "./models";
import { defaultGame, getGame, setGame } from "./storage";
import { getOrCreateUserId } from "../lib/api";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentGame, setCurrentGame] = useState<Game>(defaultGame)

  useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentGame(getGame())
        
        // Ensure user-id cookie is set on load
        getOrCreateUserId()
    }, [])

  return (
    <html
      lang="en"
      className={`font-space-grotesk h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CurrentGame value={[currentGame, (g) => {setCurrentGame(g); setGame(g)}]}>
          <Navbar></Navbar>
          <Page>
            {children}
          </Page>
        </CurrentGame>
        
      </body>
    </html>
  );
}
