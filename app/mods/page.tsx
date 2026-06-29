'use client'

import ModPreview from "@/app/components/common/modpreview";
import { Suspense, useEffect, useRef, useState } from "react";
import { FeedFilter,  Mod, modsPerPage, requestMods } from "@/app/models";
import { getGame } from "@/app/storage";
import { useParams, useSearchParams } from "next/navigation";
import { useVar } from "@/lib/useVar";
import { useActionOnScrollBottom } from "@/lib/useActionOnScrollBottom";
import { EndOfScroll } from "../components/common/endofscroll";
import { useLimitlessContent } from "@/lib/useLimitlessContent";
import { useSearchbarResults } from "@/lib/useSearchbarResult";

function Mods() {
  const [getFilter, setFilter] = useVar(FeedFilter.Featured)

  const [mods, loadMoreMods, {getItems, reset, noMoreItems}] = useLimitlessContent(requestItems)

  const [getSearch] = useSearchbarResults(() => {
    reset()
    loadMoreMods()
  })

  async function requestItems(page: number) {
    let result = await requestMods(getGame(), page, getFilter(), getSearch())
    if (getItems().length == 0 && result.length == 0) {
      setFilter(FeedFilter.Popular)
      result = await requestMods(getGame(), page, FeedFilter.Popular, getSearch())
    }
    return result
  }

  const onScrollBottom = () => {
    loadMoreMods()
  }

  useActionOnScrollBottom(onScrollBottom)

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-8 p-3">
        {mods.map((mod, index) => 
          <ModPreview mod = {mod} key={`${index}-${mod?.title}`}></ModPreview>
        )}
      </div>
      <EndOfScroll noMoreContent={noMoreItems} message="It looks like there's no more mods!"/>
    </div>
  );
}

export default function ModsPage() {
  return <Suspense>
    <Mods/>
  </Suspense>
}
