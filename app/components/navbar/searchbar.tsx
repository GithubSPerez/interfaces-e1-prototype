import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { APP_TEXTS } from "../../../lib/constants";

export default function Searchbar({onSubmit}: {onSubmit: (value: string) => void}) {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    const [searchInput, setSearchInput] = useState(params.get("search") || "")
    const { searchPlaceholder } = APP_TEXTS.navbar;

    return <form onSubmit={() => {onSubmit(searchInput)}}><input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={searchPlaceholder}
        className="outline-0 bg-bglitest pl-2 pt-1 pb-1 rounded-border-inner w-[32em]"
    >
    </input>
    </form>
}