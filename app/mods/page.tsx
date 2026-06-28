'use client'

import ModPreview from "@/app/components/common/modpreview";
import { Suspense, useEffect, useRef, useState } from "react";
import { FeedFilter,  Mod, modsPerPage, requestMods } from "@/app/models";
import { getGame } from "@/app/storage";
import { useParams, useSearchParams } from "next/navigation";
import { useVar } from "@/lib/useVar";

function Mods() {
  const [getMods, setMods, mods] = useVar<(Mod | undefined)[]>([])
  const [getPage, setPage] = useVar(1)
  const [getNoMoreMods, setNoMoreMods, noMoreMods] = useVar(false)
  const [getIsLoadingMore, setIsLoadingMore] = useVar(false)
  const [getSearch, setSearch] = useVar<string | undefined>(undefined)

  const params = useSearchParams()
  const search = params.get("search")

  function advancePage() {
    setPage(getPage() + 1)
  }

  function appendMods(newMods: Mod[]) {
    setMods(getMods().concat(newMods))
  }

  async function loadMoreMods() {
    if (getIsLoadingMore()) return
    setIsLoadingMore(true)
    console.log(getSearch())

    const result = await requestMods(getGame(), getPage(), FeedFilter.Featured, getSearch())

    appendMods(result)
    if (result.length == 0) {
      setNoMoreMods(true)
    }
    advancePage()
    setIsLoadingMore(false)
  }

  const handleScroll = () => {
    if (getIsLoadingMore() || getNoMoreMods()) return

    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - window.outerHeight

    if (bottom) {
      loadMoreMods()
    }
  }

  useEffect(() => {
    setSearch(search || undefined)
    setPage(1)
    setMods([])
    loadMoreMods()
    
  }, [search])

  useEffect(() => {
    const ev = () => handleScroll()
    console.log("added listener", ev)
    window.addEventListener('scroll', ev, {
      passive: true
    })

    return () => {
      console.log("removed listener", ev)
      window.removeEventListener('scroll', ev);
    }
    
  }, [])

  return (
    <div className="grid grid-cols-3 gap-y-8 p-3">
      {mods.concat(noMoreMods ? [] : [undefined, undefined, undefined]).map((mod, index) => 
        <ModPreview mod = {mod} key={`${index}-${mod?.title}`}></ModPreview>
      )}
    </div>
  );
}

export default function ModsPage() {
  return <Suspense>
    <Mods/>
  </Suspense>
}
