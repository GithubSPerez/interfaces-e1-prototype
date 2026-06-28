import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Searchbar({onSubmit}: {onSubmit: (value: string) => void}) {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    const [searchInput, setSearchInput] = useState(params.get("search") || "")

    return <form onSubmit={(e) => {e.preventDefault(); onSubmit(searchInput)}}><input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search"
        className="outline-0 bg-bglitest pl-2 pt-1 pb-1 rounded-border-inner w-[32em]"
    >
    </input>
    </form>
}