import { CurrentGame } from "@/app/context";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

export default function Searchbar({onSubmit}: {onSubmit: (value: string) => void}) {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    const [searchInput, setSearchInput] = useState(params.get("search") || "")

    const [currentGame] = useContext(CurrentGame)

    const pathname = usePathname()
    
    const placeholder: Record<string, string> = {
        "mods": `for ${currentGame.name} mods`,
        "games": "for games"
    }

    return <form onSubmit={(e) => {e.preventDefault(); onSubmit(searchInput)}}><input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={`Search ${placeholder[pathname.split("/")[1]] || ""}`}
        className="outline-0 bg-bglitest pl-2 pt-1 pb-1 rounded-border-inner w-[32em]"
    >
    </input>
    </form>
}