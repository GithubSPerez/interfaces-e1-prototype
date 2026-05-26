'use client'

import { useEffect, useState } from "react";
import ModPreview from "./modpreview";
import { FeedFilter, Mod, requestMods } from "../models";
import { getGame } from "../storage";

export default function ModSideSuggestions() {
    const [mods, setMods] = useState<Mod[]>([])

    useEffect(() => {
        requestMods(getGame(), 2, FeedFilter.Recent).then((result) => setMods(result))
    }, [])

    return <div className="flex flex-col w-full">
        {mods.map(mod => <ModPreview sideview mod={mod} key={mod.title}/>)}
        
    </div>
}