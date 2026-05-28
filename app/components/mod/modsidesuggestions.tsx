'use client'

import { useEffect, useState } from "react";
import ModPreview from "../common/modpreview";
import { FeedFilter, Mod, requestMods } from "../../models";
import { getGame } from "../../storage";

export default function ModSideSuggestions() {
    const [mods, setMods] = useState<(Mod | undefined)[]>(Array(20).fill(undefined))

    useEffect(() => {
        requestMods(getGame(), 2, FeedFilter.Recent).then((result) => setMods(result))
    }, [])

    return <div className="flex flex-col w-full">
        {mods.map((mod, i) => <ModPreview sideview mod={mod} key={mod?.title || `mod-${i}`}/>)}
        
    </div>
}