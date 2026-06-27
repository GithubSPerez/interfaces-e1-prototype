'use client'

import ModPreview from "@/app/components/common/modpreview";
import { useEffect, useState } from "react";
import { FeedFilter,  Mod, requestMods } from "@/app/models";
import { getGame } from "@/app/storage";
import { useParams } from "next/navigation";

export default function Mods() {
  const [mods, setMods] = useState<(Mod | undefined)[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [noMoreMods, setNoMoreMods] = useState(false)

  function advancePage() {
    setPage(page + 1)
  }

  function appendMods(newMods: Mod[]) {
    setMods(mods.concat(newMods))
  }

  function loadMoreMods() {
    const params = new URLSearchParams(window.location.search)
    const search = params.get("search") || undefined
    setIsLoadingMore(true)
    requestMods(getGame(), page, FeedFilter.Featured, search).then((result) => {
      appendMods(result)
      if (result.length == 0) {
        setNoMoreMods(true)
      }
      advancePage()
      setIsLoadingMore(false)
    })
  }

  const handleScroll = (isLoading: boolean) => {
    if (isLoading || noMoreMods) return

    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - window.outerHeight

    if (bottom) {
      console.log("HANDLE", isLoading)
      loadMoreMods()
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMoreMods()
  }, [])

  useEffect(() => {
    console.log(isLoadingMore)
    const ev = () => handleScroll(isLoadingMore)
    window.addEventListener('scroll', ev, {
      passive: true
    })

    return () => {
      window.removeEventListener('scroll', ev);
    }
  }, [isLoadingMore])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-y-8 p-0 sm:p-3">
      {mods.concat(noMoreMods ? [] : [undefined, undefined, undefined]).map((mod, index) => 
        <ModPreview mod = {mod} key={`${index}-${mod?.title}`}></ModPreview>
      )}
    </div>
  );
}
