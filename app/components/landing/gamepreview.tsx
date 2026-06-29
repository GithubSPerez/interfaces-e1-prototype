'use client';

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import SquareImage from "../common/squareimage";
import { Game } from "../../models";
import { Preview } from "../common/preview";
import { useRouter } from "next/navigation";
import { setGame } from "../../storage";
import { useContext } from "react";
import { CurrentGame } from "@/app/context";
import { SkeletonText } from "../common/skeletontext";

export function GamePreviewImage({src, reduced = false, containerClass = ""}: {src: string | undefined, reduced?: boolean, containerClass?: string}) {
    const sizeClasses = {
        normal: "w-full rounded-border-outer",
        reduced: "w-[10em] rounded-border-inner"
    }
    const sizeClass = sizeClasses[reduced ? "reduced" : "normal"]
    return <div className={`overflow-hidden ${sizeClass} ${containerClass} ${!src ? "skeleton-loading" : "bg-bglite"} aspect-video`}>
        {src && <img src={src} className="object-cover w-full h-full"></img>}
    </div>
}

function GameInfo({game, reduced = false}: {game: Game, reduced?: boolean}) {
    const titleSize = reduced ? "" : "text-xl"
    const iconSize = reduced ? "size-4" : "size-5"
    const infoSize = reduced ? "text-sm" : ""
    const infoClass = `${infoSize} text-neutral-300`
    return <div className="flex flex-col justify-start text-left">
        <p className={titleSize}>
            <b>{game.name}</b>
        </p>
        <div className={`flex flex-row align-middle mt-1 ${infoClass}`}>
            <Square3Stack3DIcon className={`${iconSize} mr-1`}/>
            {game.modCount.toLocaleString()} Mods
        </div>
    </div>
}

function GameNormalPreviewContents({game}: {game: Game | undefined}) {
    return <>
    <div className="p-3 pb-1.5">
        <GamePreviewImage src={game?.preview}/>
    </div>
    
    <div className="p-3 pt-1.5">
        <div className="flex flex-row w-full items-center">
            <div className="pr-3">
                <SquareImage size="plus" src={game?.icon}></SquareImage>
            </div>
            {game ? <GameInfo game={game}/> : <SkeletonText wClass="w-1/2 !h-10"/>}
        </div>
    </div>
    </>
}

function GameSideviewPreviewContents({game}: {game: Game}) {
    return <div className="flex flex-row items-center">
    <div className="p-3 pr-1.5">
        <GamePreviewImage reduced src={game.preview}/>
    </div>
    
    <div className="p-3 pl-1.5 w-full">
        <GameInfo game={game} reduced/>
    </div>
    </div>
}

export default function GamePreview({game}: {game: Game | undefined, sideview?: boolean}) {
    const setCurrentGame = useContext(CurrentGame)[1]
    const router = useRouter();

    return <div className={`p-1 shrink`}>
        <button className={`cursor-pointer bg-transparent hover:bg-container rounded-xl w-full transition-colors`}
        onClick={() => {
            if (!game) return
            setCurrentGame(game);
            router.push('/mods');
        }}>
            <GameNormalPreviewContents game={game}/>
        </button>
    </div>
}
