'use client'
import { Mod } from "../../models";
import { useRouter } from "next/navigation";
import ActionButton from "../common/actionbutton";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function CollectionPreview({hover}: {hover: string}) {
    const classname = `group flex flex-col gap-4 overflow-hidden px-5 py-10 rounded-border-outer w-full h-full ${hover}`;
  return (
    <div className={classname}>
      <div className="w-full px-4">
        <div className="relative flex w-full rounded-border-inner shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <img
            alt="collection"
            className="w-full"
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=302&h=202&fit=crop"
          />

          <ActionButton
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-3 right-3 w-1/6 h-1/5 cursor-pointer bg-download hover:bg-download-hover text-base text-center text-font-dark font-bold flex flex-row items-center justify-center rounded-border-inner p-3"
            >
                <ArrowDownTrayIcon className="size-8 stroke-icons" />
            </ActionButton>
        </div>
      </div>

      <div className="flex flex-col px-4 gap-3 flex-1 ">
        <h2 className="font-bold text-xl text-font">
          Lorem ipsum dolor sit amet
        </h2>

        <div className="text-[15px] text-font font-bold">
          <p>10 mods in the collection</p>
          <p>325 MB in total</p>
        </div>

        <div className="flex-1 overflow-hidden">
          <p className="text-[13px] text-font">
            Lorem ipsum dolor sit amet consectetur. Vitae volutpat 
            ut cursus egestas mauris at at mauris. Massa amet
            ultricies tortor sociis quis a consequat.
          </p>
        </div>
      </div>
    </div>
  );
}


    