'use client'
import LikeBar from "@/app/components/likebar";
import ModSideSuggestions from "@/app/components/modsidesuggestions";
import { Mod, requestMod } from "@/app/models";
import SquareImage from "@/app/components/squareimage";
//import { ArrowDownTrayIcon, ClockIcon, DocumentTextIcon, HeartIcon, InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
//import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ModThumbnail } from "@/app/components/modpreview";
import { ArrowDownCircleIcon, ArrowDownTrayIcon, ClockIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function ModPage() {
    const params = useParams<{modId: string}>()
    const [mod, setMod] = useState<Mod | undefined>(undefined)

    useEffect(() => {
        requestMod(Number(params.modId)).then(mod => setMod(mod))
    })

    return <div className="flex flex-row">
        {
            mod ? (
                <div className="flex flex-5 flex-col p-5">
            <div className="flex flex-row">
                <ModThumbnail src={mod.preview} containerClass="flex-5"/>
                <div className="flex flex-col w-full bg-bglite ml-6 rounded-xl p-4 min-h-0 flex-2">
                    <div className="flex flex-row">
                        <button className="cursor-pointer bg-download hover:bg-download-hover transition-colors text-2xl text-font-dark font-bold flex flex-row justify-center rounded-border-inner p-3 w-full">
                            <ArrowDownTrayIcon className="size-8 stroke-icons"/>
                            <p className="pl-1">
                            Download
                            </p>
                        </button>
                        <button className="cursor-pointer flex flex-row justify-center bg-cart hover:bg-cart-hover text-font-dark transition-colors aspect-square ml-3 rounded-border-inner">
                            <div className="flex flex-col justify-center h-full">
                            <PlusCircleIcon className="size-8 stroke-icons"/>
                            </div>
                        </button>
                    </div>
                    <div className="pt-3 pb-3">
                        <LikeBar mod={mod}/>
                    </div>
                    <p className="flex flex-row text-xl">
                        <ArrowDownCircleIcon className="size-7 pr-1"/>{mod.downloads} Downloads
                    </p>
                    <p className="flex flex-row text-xl">
                        <ClockIcon className="size-7 pr-1"/>Updated 3 weeks ago
                    </p>
                    <div className="h-full"></div>
                    <div className="pb-1 flex flex-row">
                        <SquareImage src={mod.user.pfp} size="big"/>
                        <h3 className="ml-2 text-xl font-bold">{mod.user.name}</h3>
                    </div>
                </div>
            </div>
            <h1 className="text-4xl font-bold pt-3">{mod.title}</h1>
            <div className="text-xl text-neutral-300">
                <Markdown rehypePlugins={[rehypeRaw]}>{mod.description}</Markdown>
            </div>
        </div>
            ) : <></>
        }
        
        <div className="flex-2">
            <ModSideSuggestions/>
        </div>
    </div>
}