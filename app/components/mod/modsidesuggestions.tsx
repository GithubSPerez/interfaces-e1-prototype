'use client'

import { useEffect, useState } from "react";
import ModPreview from "../common/modpreview";
import { FeedFilter, Mod, requestMods } from "../../models";
import { getGame } from "../../storage";

export default function ModSideSuggestions({currentMod}: {currentMod: Mod | undefined}) {
    const [mods, setMods] = useState<(Mod | undefined)[]>(Array(20).fill(undefined))

    useEffect(() => {
        console.log(currentMod)
        if (currentMod) {
            const terms = currentMod.title.split(" ")
            const search = terms[Math.floor(Math.random() * (terms.length - 0.01))]
            requestMods(getGame(), 1, FeedFilter.Recent, search).then((result) => {
                const index = result.findIndex((mod) => mod.title == currentMod.title)
                if (index != -1) result.splice(index, 1)
                setMods(result)
            })
        }
            
    }, [currentMod])

    return <div className="flex flex-col w-full">
        {mods.map((mod, i) => <ModPreview sideview mod={mod} key={mod?.title || `mod-${i}`}/>)}
        
    </div>
}