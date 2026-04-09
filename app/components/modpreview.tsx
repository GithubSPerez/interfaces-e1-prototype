'use client';

import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import SquareImage from "./squareimage";
import { useState } from "react";
import { useRouter } from "next/navigation";

function ModThumbnail({src, reduced = false}) {
    const sizeClasses = {
        normal: "w-full",
        reduced: "w-[10em]"
    }
    const sizeClass = sizeClasses[reduced ? "reduced" : "normal"]
    return <div className={`overflow-hidden rounded-xl ${sizeClass}`}>
        <img src={src} className="object-fill"></img>
    </div>
}

function ModInfo({title = "Untitled Mod", reduced = false}) {
    const titleSize = reduced ? "" : "text-xl"
    const iconSize = reduced ? "size-4" : "size-5"
    const infoSize = reduced ? "text-sm" : ""
    const infoClass = `${infoSize} text-neutral-300`
    return <div className="flex flex-col justify-start text-left">
        <p className={titleSize}>
            <b>{title}</b>
        </p>
        <p className={infoClass}>
            Mod Owner
        </p>
        <div className={`flex flex-row align-middle ${infoClass}`}>
            <ArrowDownTrayIcon className={iconSize}/>
            3M 
        </div>
    </div>
}

function ModNormalPreviewContents({title = "Untitled Mod"}) {
    return <>
    <div className="p-3 pb-1.5">
        <ModThumbnail src="https://elitescreens.com/wp-content/uploads/16by10.jpg"/>
    </div>
    
    <div className="p-3 pt-1.5">
        <div className="flex flex-row w-full">
            <div className="pr-3">
                <SquareImage size="plus" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></SquareImage>
            </div>
            <ModInfo title={title}/>
        </div>
    </div>
    </>
}

function ModSideviewPreviewContents({title = "Untitled Mod"}) {
    return <div className="flex flex-row">
    <div className="p-3 pr-1.5">
        <ModThumbnail reduced src="https://elitescreens.com/wp-content/uploads/16by10.jpg"/>
    </div>
    
    <div className="p-3 pl-1.5">
        <div className="flex flex-row w-full">
            <ModInfo title={title} reduced/>
        </div>
    </div>
    </div>
}

export default function ModPreview({sideview = false}) {
    const [title, setTitle] = useState("The Amazing Digital Mod")
    const router = useRouter()

    const mainWidth = sideview ? "w-full" : "w-[25%]"
    return <div className={`p-1 shrink`}>
        <button className={`cursor-pointer bg-transparent hover:bg-cyan-950 rounded-xl w-full transition-colors`}
        onClick={() => {router.push("/mod/1")}}>
            {sideview ? <ModSideviewPreviewContents/> : <ModNormalPreviewContents/>}
        </button>
    </div>
}