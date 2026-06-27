import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Searchbar({onSubmit, show, className = ""}: {onSubmit: (value: string) => void, show: boolean, className?: string}) {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    const [searchInput, setSearchInput] = useState(params.get("search") || "")

    if (!show) return
    return <form onSubmit={() => {onSubmit(searchInput)}} className={className}><input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search"
        className="outline-0 bg-bglitest pl-2 pt-1 pb-1 rounded-border-inner w-full"
    >
    </input>
    </form>
}