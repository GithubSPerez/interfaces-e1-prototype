/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { useVar } from "./useVar"

export function useLimitlessContent<TItem>(requestItems: (page: number) => Promise<TItem[]>, skeletonFill = 3) {
    const [getItems, setItems] = useVar<(TItem | undefined)[]>([])
    const [getPage, setPage] = useVar(1)
    const [getNoMoreItems, setNoMoreItems, noMoreItems] = useVar(false)
    const [getIsLoadingMore, setIsLoadingMore] = useVar(false)

    const [displayItems, setDisplayItems] = useState<(TItem | undefined)[]>([])

    function advancePage() {
        setPage(getPage() + 1)
    }

    function appendItems(newItems: TItem[]) {
        setItems(getItems().concat(newItems))
    }

    function updateDisplayItems() {
        let skeletons = (skeletonFill - getItems().length % skeletonFill)
        if (skeletons < skeletonFill) skeletons += skeletonFill
        setDisplayItems(getItems().concat(getNoMoreItems() ? [] : Array(skeletons).fill(undefined)))
    }

    async function loadMoreItems() {
        if (getIsLoadingMore()) return
        setIsLoadingMore(true)

        const result = await requestItems(getPage())

        if (result.length == 0) {
            console.log("finished")
            setNoMoreItems(true)
        }

        appendItems(result)
        
        advancePage()
        setIsLoadingMore(false)
        updateDisplayItems()
    }

    function reset() {
        setNoMoreItems(false)
        setPage(1)
        setItems([])
        updateDisplayItems()
    }

    useEffect(() => {
        updateDisplayItems()
    }, [])

    return [displayItems, loadMoreItems, {reset, getPage, setPage, getIsLoadingMore, getItems, noMoreItems}] as const
}