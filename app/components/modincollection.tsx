import { ModThumbnail } from "./modpreview";
import { Mod } from "../models";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
type Params = {
    mod: Mod,
    modSpace: number,
    handleDeleteSavedMod: (mod: Mod) => void;
}

export default function ModInCollection({mod, modSpace, handleDeleteSavedMod} : Params) {
    const router = useRouter()

    return <div className="flex items-center w-full justify-between border-b border-separator p-4 rounded-border-inner hover:bg-bglite-hover">
              <div className="flex gap-5 items-center cursor-pointer" onClick={() => {router.push(`/mod/${mod.id}`)}}>
                <ModThumbnail src={mod.preview} containerClass="" reduced={true}/>

                <div className="flex flex-col gap-2">
                  <h2 className="text-white font-bold text-lg">{mod.title}</h2>

                  <div className="flex text-sm text-font divide-x divide-separator">
                    <div>
                      <span className="space-grotesk-bold">Author: </span>
                      <span className="pr-2">{mod.user?.name}</span>  
                    </div>
                    <span className="pl-2">{Number(modSpace).toFixed(2)} MB</span>
                  </div>
                </div>
              </div>

              <TrashIcon className="w-8 h-8 text-neutral hover:text-neutral-hovered cursor-pointer" onClick={() => handleDeleteSavedMod(mod)}/>

    </div>
}