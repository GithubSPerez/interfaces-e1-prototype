import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/16/solid";
import { Mod } from "../models";

export default function LikeBar({mod}: {mod: Mod}) {
    return <div className="flex flex-row w-full text-xl">
        <button className="flex flex-row flex-1 w-full outline-2 outline-neutral-800 rounded-l-xl p-2">
            <HandThumbUpIcon className="size-8"/> <p className="flex flex-col justify-center pl-2">{mod.likes}</p>
        </button>
        <button className="flex flex-row flex-1 w-full outline-2 outline-neutral-800 rounded-r-xl p-2">
            <HandThumbDownIcon className="size-8"/> <p className="flex flex-col justify-center pl-2">{mod.dislikes}</p>
        </button>
    </div>
}