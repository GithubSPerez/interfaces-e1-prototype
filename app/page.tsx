'use client'

import ModPreview from "./components/modpreview";
import { useEffect, useState } from "react";
import { FeedFilter,  Mod, requestMods } from "./models";
import { getGame } from "./storage";

export default function Home() {
  const [mods, setMods] = useState<(Mod | undefined)[]>([])
  const [page, setPage] = useState<number>(1)

  function advancePage() {
    setPage(page + 1)
  }

  function appendMods(newMods: Mod[]) {
    setMods(mods.concat(newMods))
  }

  function loadMoreMods() {
    requestMods(getGame(), page, FeedFilter.Featured).then((result) => {
      appendMods(result)
      advancePage()
    })
  }

  useEffect(() => {
    loadMoreMods()
  }, [])

  return (
    <div className="grid grid-cols-3 gap-y-8 p-3">
      {mods.concat([undefined, undefined, undefined]).map((mod, index) => 
        <ModPreview mod = {mod} key={`${index}-${mod?.title}`}></ModPreview>
      )}
    </div>
  );
}
