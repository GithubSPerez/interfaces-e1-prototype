'use client'

import { useVar } from "@/lib/useVar"
import { Game, requestAllGames, requestGames, requestGameSearch } from "../models"
import GamePreview from "../components/landing/gamepreview"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useActionOnScrollBottom } from "@/lib/useActionOnScrollBottom"
import { EndOfScroll } from "../components/common/endofscroll"
import { useLimitlessContent } from "@/lib/useLimitlessContent"
import { useSearchbarResults } from "@/lib/useSearchbarResult"

function Games() {
    const [games, loadMoreGames, {getPage, setPage, reset, getItems, noMoreItems}] = useLimitlessContent(requestItems)
    const [getSearch] = useSearchbarResults(() => {
        reset()
        loadMoreGames()
    })

    async function requestItems(page: number) {
        let result: Game[]
        if (!getSearch()) {
            if (getPage() == 1 && getItems().length == 0) {
                result = await requestGames()
                setPage(getPage() - 1)
            } else {
                result = await requestAllGames(getPage())
            }
        }
        else {
            result = await requestGameSearch(getSearch() || "", getPage())
        }
    
        const goodGames: Game[] = []
        result.forEach((game) => {
            if (!game.preview.includes("_.gif")) goodGames.push(game)
        })

        return goodGames
    }

    useActionOnScrollBottom(() => {
        loadMoreGames()
    })

    return <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 p-3">
            {games.map((game, index) => 
                <GamePreview game={game} key={`${index}-${game?.name}`}/>
            )}
        </div>
        <EndOfScroll noMoreContent={noMoreItems} message="It looks like there's no more games!"/>
    </div>
}

export default function GamesPage() {
    return <Suspense>
        <Games/>
    </Suspense>
}