'use client';

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import SquareImage from "./squareimage";
import { useRouter } from "next/navigation";
import { Mod } from "../../models";
import { Preview } from "./preview";

export function ModThumbnail({src, reduced = false, containerClass = ""}: {src: string | undefined, reduced?: boolean, containerClass?: string}) {
    return Preview({src, reduced, containerClass})
}

function ModInfo({mod, reduced = false}: {mod: Mod, reduced?: boolean}) {
    const titleSize = reduced ? "" : "text-xl"
    const iconSize = reduced ? "size-4" : "size-5"
    const infoSize = reduced ? "text-sm" : ""
    const infoClass = `${infoSize} text-font-secondary`
    return <div className="flex flex-col justify-start text-left">
        <p className={titleSize}>
            <b>{mod.title}</b>
        </p>
        <p className={"hidden sm:block" + infoClass}>
            {mod.user.name}
        </p>
        <div className={`flex flex-row align-middle ${infoClass}`}>
            <p className={"sm:hidden" + infoClass}>
                {mod.user.name}
            </p>
            <p className={"px-2 sm:hidden" + infoClass}>•</p>
            <ArrowDownTrayIcon className={iconSize}/>
            {mod.downloads}
        </div>
    </div>
}

function ModNormalPreviewContents({mod}: {mod: Mod | undefined}) {
    return <div className="p-0 sm:p-4">
        <div className="pb-4">
            <Preview src={mod?.preview} inner/>
        </div>
        
        <div className="px-4 sm:px-0">
            <div className="flex flex-row w-full">
                <div className="pr-3">
                    <SquareImage size="plus" src={mod?.user.pfp}></SquareImage>
                </div>
                {mod && <ModInfo mod={mod}/>}
            </div>
        </div>
    </div>
}

function ModSideviewPreviewContents({mod}: {mod: Mod | undefined}) {
    return <div className="flex flex-row">
        <div className="p-3 pr-1.5">
            <Preview reduced src={mod?.preview} inner/>
        </div>
        
        <div className="p-3 pl-1.5">
            <div className="flex flex-row w-full">
                {mod && <ModInfo mod={mod} reduced/>}
            </div>
        </div>
    </div>
}

export default function ModPreview({mod, sideview = false}: {mod: Mod | undefined, sideview?: boolean}) {
    const router = useRouter()

    const mainWidth = sideview ? "w-full" : "w-[25%]"
    return <div className={`p-0 sm:p-1 shrink`}>
        <button className={`cursor-pointer bg-transparent sm:hover:bg-container rounded-xl w-full transition-colors`}
        disabled={!mod}
        onClick={() => {router.push(`/mods/${mod?.id}`)}}>
            {sideview ? <ModSideviewPreviewContents mod={mod}/> : <ModNormalPreviewContents mod={mod}/>}
        </button>
    </div>
}