import { useSearchParams } from "next/navigation"
import { useVar } from "./useVar"
import { useEffect } from "react"

export function useSearchbarResults(onSearch: (search: string) => void) {
    const [getSearch, setSearch] = useVar<string | undefined>(undefined)

    const params = useSearchParams()
    const search = params.get("search")

    useEffect(() => {
        setSearch(search || undefined)
        onSearch(getSearch() || "")
    }, [search])

    return [getSearch, search] as const
}