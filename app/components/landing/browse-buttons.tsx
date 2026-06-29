import { CurrentGame } from "@/app/context"
import { defaultGame } from "@/app/storage"
import { useRouter } from "next/navigation"
import { useContext } from "react"

function Btt({text, color, url}: {text: string, color: "neutral" | "action", url: string}) {
    const router = useRouter()
    const colorStyle = {
        "neutral": "bg-neutral hover:bg-neutral-hover",
        "action": "bg-action hover:bg-action-hover"
    }
    return <button className={`p-3 rounded-border-inner justify-center ${colorStyle[color]} cursor-pointer transition-colors`} onClick={() => router.replace(url)}>
        <b>{text}</b>
    </button>
}
export default function BrowseButtons() {
    const [currentGame] = useContext(CurrentGame)
    let gridStyle = "grid-cols-1"
    const showModsButton = currentGame != defaultGame
    if (showModsButton) gridStyle += " sm:grid-cols-2"

    return <div className={`grid ${gridStyle} gap-x-8 gap-y-8 text-2xl ${showModsButton ? "w-1/2" : "w-1/4"} text-font-dark`}>
        <Btt text="Browse Games" color="neutral" url="/games"/>
        {showModsButton && <Btt text="Browse Mods" color="action" url="/mods"/>}
    </div>
}