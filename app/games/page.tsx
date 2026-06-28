'use client'

import { useVar } from "@/lib/useVar"
import { Game, requestGames, requestGameSearch } from "../models"
import GamePreview from "../components/landing/gamepreview"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useActionOnScrollBottom } from "@/lib/useActionOnScrollBottom"

function Games() {
    const [getGames, setGames, games] = useVar<(Game | undefined)[]>([])
    const [getPage, setPage] = useVar(1)
    const [getNoMoreGames, setNoMoreGames, noMoreGames] = useVar(false)
    const [getSearch, setSearch] = useVar("")
    const [getIsLoading, setIsLoading] = useVar(false)

    const params = useSearchParams()
    const search = params.get("search")

    function advancePage() {
        setPage(getPage() + 1)
    }

    function appendGames(newGames: Game[]) {
        setGames(getGames().concat(newGames))
    }

    async function loadMoreGames() {
        if (getNoMoreGames() || getIsLoading()) return
        setIsLoading(true)
        let result: Game[]
        if (!getSearch()) {
            result = await requestGames()
        }
        else {
            result = await requestGameSearch(getSearch(), getPage())
        }
        if (result.length == 0) {
            setNoMoreGames(true)
        }

        const goodGames: Game[] = []
        result.forEach((game) => {
            if (!game.preview.includes("_.gif")) goodGames.push(game)
        })

        appendGames(goodGames)
        advancePage()
        setIsLoading(false)
    }

    useActionOnScrollBottom(() => {
        if (getIsLoading() || getNoMoreGames()) return
        loadMoreGames()
    })

    useEffect(() => {
        setSearch(search || "")
        setNoMoreGames(false)
        setGames([])
        setPage(1)
        loadMoreGames()
    }, [search])

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 p-3">
        {games.concat(noMoreGames ? [] : [undefined, undefined, undefined]).map((game, index) => 
            <GamePreview game={game} key={`${index}-${game?.name}`}/>
        )}
    </div>
}

export default function GamesPage() {
    return <Suspense>
        <Games/>
    </Suspense>
}