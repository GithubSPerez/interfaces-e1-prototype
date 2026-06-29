/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import LikeBar from "@/app/components/mod/likebar";
import ModSideSuggestions from "@/app/components/mod/modsidesuggestions";
import { Mod, requestMod } from "@/app/models";
import SquareImage from "@/app/components/common/squareimage";
//import { ArrowDownTrayIcon, ClockIcon, DocumentTextIcon, HeartIcon, InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
//import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ModThumbnail } from "@/app/components/common/modpreview";
import { ArrowDownCircleIcon, ArrowDownTrayIcon, ClockIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import ActionButton from "@/app/components/common/actionbutton";
import axios from "axios";
import ModCommentsPanel from "@/app/components/mod/modcommentspanel";
import { useVar } from "@/lib/useVar";
import Text from "@/app/components/common/text";

export default function ModPage() {
    const params = useParams<{modId: string}>()
    const [getMod, setMod, mod] = useVar<Mod | undefined>(undefined)
    const [showAddedNonModal, setShowAddedNonModal] = useState<boolean>(false);
    const [alreadySavedMod, setAlreadySavedMod] = useState<boolean>(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [hideShowMore, setHideShowMore] = useState(false)

    const descDiv = useRef<HTMLDivElement>(null)

    const [showDesc, setShowDesc] = useState(false)

    const getSavedMods = (): Mod[] => {
        const localStorageMods = localStorage.getItem("savedMods");
        return localStorageMods ? JSON.parse(localStorageMods) : [];
    }

    useEffect(() => {
        requestMod(Number(params.modId)).then(mod => {
            setMod(mod);
            const alreadyAdded = getSavedMods().some(m => m.id === mod.id);
            setAlreadySavedMod(alreadyAdded);
        })
    }, [params.modId])

    useEffect(() => {
        if (mod) {
            if (descDiv.current) {
                if (descDiv.current.offsetHeight < 240) {
                    console.log(descDiv.current.offsetHeight)
                    setHideShowMore(true)
                    setShowDesc(true)
                }
            }
        }
    }, [mod])

    const handleAddToCollection = () => {
        if (!mod) return;
        const modsInCollection: Mod[] = getSavedMods();
        const alreadyAdded = modsInCollection.some(existingMod => existingMod.id === mod.id);
        if (alreadyAdded) 
        {
            setAlreadySavedMod(true);
            return;
        }
        
        modsInCollection.push(mod);

        localStorage.setItem("savedMods", JSON.stringify(modsInCollection));
        setAlreadySavedMod(true);
        setShowAddedNonModal(true);

        setTimeout(() => {
            setShowAddedNonModal(false);
        }, 3000);   
    };

    const handleDownload = async () => {
        if (!mod) return;

        setIsDownloading(true);

        try {
            const fileResponse = await axios.get(
                `/api/downloadMod?url=${encodeURIComponent(mod.file)}&name=${encodeURIComponent(mod.title + ".zip")}`,
                {
                    responseType: "blob",
                }
            );

            const blobFile = fileResponse.data;

            const url = window.URL.createObjectURL(blobFile);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${mod.title}.zip`;
            a.click();

            window.URL.revokeObjectURL(url);
            setIsDownloading(false);
        } catch (error) {
            console.error(error);
            setIsDownloading(false);
        }
    };

    return <div className="flex flex-row">
        <div className="flex flex-5 flex-col p-5">
            <div className="flex flex-row">
                <ModThumbnail src={mod?.preview} containerClass="flex-5"/>
                <div className="flex flex-col w-full bg-bglite ml-6 rounded-xl p-4 min-h-0 flex-2">
                    <div className="flex flex-row">
                        <ActionButton
                            onClick={handleDownload}
                            loading={isDownloading}
                            disabled={!mod}
                            loadingChildren={
                                <span className="flex items-center gap-2">
                                    Downloading...
                                </span>
                            }
                            className="min-w-50 cursor-pointer bg-download hover:bg-download-hover transition-colors text-2xl text-font-dark font-bold flex flex-row justify-center rounded-border-inner p-3 w-full"
                            loadingClassName="min-w-50 bg-download transition-colors text-xl text-font-dark font-bold flex flex-row justify-center rounded-border-inner p-3 w-full"
                        >
                            <ArrowDownTrayIcon className="size-8 stroke-icons"/>
                            <span className="pl-1">Download</span>
                        </ActionButton>
                        
                        <ActionButton onClick={handleAddToCollection} 
                        loading={alreadySavedMod} 
                        className="cursor-pointer flex flex-row justify-center bg-cart hover:bg-cart-hover text-font-dark transition-colors aspect-square ml-3 p-3"
                        loadingClassName="flex flex-row justify-center bg-cart opacity-30 text-font-dark transition-colors aspect-square ml-3 p-3"
                        loadingChildren={
                            <div className="flex flex-col justify-center h-full">
                                <PlusCircleIcon className="size-8 stroke-icons "/>
                            </div>
                        }
                        disabled={alreadySavedMod || !mod}>
                            <div className="flex flex-col justify-center h-full">
                                <PlusCircleIcon className="size-8 stroke-icons "/>
                            </div>
                        </ActionButton>
                        
                    </div>
                    
                    {
                        mod ? [
                            <div className="pt-3 pb-3" key="likebar">
                                <LikeBar mod={mod}/>
                            </div>,
                            <p className="flex flex-row text-xl" key="dwnlds">
                                <ArrowDownCircleIcon className="size-7 pr-1"/>{mod.downloads} Downloads
                            </p>,
                            <p className="flex flex-row text-xl" key="clk">
                                <ClockIcon className="size-7 pr-1"/>Updated 3 weeks ago
                            </p>,
                            <div className="h-full" key="pdd"></div>,
                            <div className="pb-1 flex flex-row" key="submitter">
                                <SquareImage src={mod.user.pfp} size="big"/>
                                <h3 className="ml-2 text-xl font-bold">{mod.user.name}</h3>
                            </div>
                        ] : undefined
                    }
                    
                </div> 
            </div>
            <h1 className="text-4xl font-bold pt-3 pb-8">{mod?.title}</h1>
            <div className="flex flex-col text-xl text-neutral-300 bg-bglite rounded-border-outer p-4 gap-y-3">
                <div className={showDesc ? "" : "fade-overlay-relative"}>
                    <div ref={descDiv} className={showDesc ? "" : "overflow-hidden max-h-60"}>
                        <Markdown rehypePlugins={[rehypeRaw]}>{mod?.description}</Markdown>
                    </div>
                </div>
                {!hideShowMore && <button
                        onClick={() => {setShowDesc(!showDesc)}}
                    >
                        <Text variant="p" className="text-xl text-link-hover hover:text-neutral-hover relative z-20">
                            {showDesc ? "show less" : "show more"}
                        </Text>
                </button>
                }
                
            </div>

            <ModCommentsPanel mod={mod} getMod={getMod}/>
        </div>
        
        
        <div className="flex-2">
            <ModSideSuggestions currentMod={mod}/>
        </div>
        {showAddedNonModal && (
            <div className="fixed bottom-6 right-6 bg-bglite text-font px-5 py-3 rounded-border-inner flex items-center gap-3 animate-fade-in">
                <PlusCircleIcon className="size-6 stroke-icons text-cart" />
                <span className="font-medium">Added to collection</span>
            </div>
        )}
    </div>
}