import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Mod } from "../../models";

function countDisplay(ammount: number) {
    if (ammount >= 1100)
        return `${ammount / 1000}K`
    return ammount
}
export default function LikeBar({mod}: {mod: Mod}) {
    const likes = mod.likes
    const dislikes = mod.dislikes

    const total = likes + dislikes

    const likeDisplay = countDisplay(likes)
    const dislikeDisplay = countDisplay(dislikes)

    const sizePercent = total > 0 ? (likes / total) * 100 : 100

    const likeBtt = (like = true) => {
        const Icon = like ? HandThumbUpIcon : HandThumbDownIcon
        const display = like ? likeDisplay : dislikeDisplay
        const borderClass = like ? "rounded-l-border-inner" : "rounded-r-border-inner"

        return <button className={"flex flex-row flex-1 w-full outline-3 bg-bglitest outline-bglite p-1 sm:p-2 " + borderClass}>
            <div className="flex flex-col align-middle justify-center h-full"><Icon className="size-6 sm:size-8"/></div> <p className="flex flex-col justify-center pl-2">{display}</p>
        </button>
    }
        
    return <div className="flex flex-col w-full">
        <div className="flex flex-row w-full text-lg sm:text-xl">
            {likeBtt()}
            {likeBtt(false)}
        </div>
        <div className="mt-2 rounded-4xl flex flex-row w-full h-1 outline-3 overflow-hidden outline-bgcolor">
            <div className="bg-green-600 h-full" style={{width: `${sizePercent}%`}}></div>
            <div className="bg-red-500 h-full w-full" style={{width: `${100 - sizePercent}%`}}></div>
        </div>
    </div>
}