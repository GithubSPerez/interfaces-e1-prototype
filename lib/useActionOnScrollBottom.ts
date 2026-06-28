import { useEffect } from "react"

export function useActionOnScrollBottom(onScrollBottom: () => void) {
    function handleScroll() {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - window.outerHeight

        if (bottom) {
            onScrollBottom()
        }
    }

    useEffect(() => {
        const ev = () => handleScroll()
        console.log("added listener", ev)
        window.addEventListener('scroll', ev, {
        passive: true
        })

        return () => {
        console.log("removed listener", ev)
        window.removeEventListener('scroll', ev);
        }
            
    }, [])
}