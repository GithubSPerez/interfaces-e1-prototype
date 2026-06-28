import { useRouter } from "next/navigation"

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
    return <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 text-2xl w-1/2 text-font-dark">
        <Btt text="Browse Games" color="neutral" url="/games"/>
        <Btt text="Browse Mods" color="action" url="/mods"/>
    </div>
}