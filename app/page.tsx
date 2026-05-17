'use client'

import Page from "./components/page";
import ModPreview from "./components/modpreview";
import { useEffect, useState } from "react";
import { FeedFilter, Mod, requestMods } from "./models";

export default function Home() {
  const [mods, setMods] = useState<Mod[]>([])

  useEffect(() => {
    requestMods(1, FeedFilter.Featured).then((result) => setMods(result))
  }, [])

  return (
    <div className="grid grid-cols-4">
      {mods.map(mod => 
        <ModPreview mod = {mod} key={mod.title}></ModPreview>
      )}
    </div>
  );
}
