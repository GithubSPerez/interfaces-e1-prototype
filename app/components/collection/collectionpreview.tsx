"use client";
import { Mod } from "../../models";
import ActionButton from "../common/actionbutton";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Preview } from "../common/preview";
import { useEffect, useState } from "react";

type Props = {
  hover: string;
  collectionName: string;
  collectionDesc: string;
  collectionSpace: number;
  mods: Mod[];
  handleDownload: () => Promise<void>;
  onClick?: () => void;
};

export default function CollectionPreview({
  hover,
  collectionName,
  collectionSpace,
  collectionDesc,
  mods,
  handleDownload,
  onClick
}: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(0);

  const previews =
    mods
      ?.map((mod) => mod.preview)
      .filter(Boolean) ?? [];

  useEffect(() => {
    if (!isHovered || previews.length <= 1) {
      setCurrentPreview(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentPreview((prev) => (prev + 1) % previews.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, previews.length]);

  const downloadCollection = async () => {
    try {
      setIsDownloading(true);
      await handleDownload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const classname = `group flex flex-col gap-4 overflow-hidden px-5 py-10 rounded-border-outer w-full h-full ${hover}`;

  return (
    <div
      className={classname}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full px-4">
        <div className="relative flex w-full rounded-border-inner shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="relative w-full">
            {previews.map((preview, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentPreview ? "opacity-100" : "opacity-0"
                }`}
              >
                <Preview src={preview} onClick={onClick} inner />
              </div>
            ))}
            <div className="opacity-0">
              <Preview src={previews[0] || ""} onClick={onClick} inner />
            </div>
          </div>

          <ActionButton
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-3 right-3 w-2/7 h-3/10 cursor-pointer bg-download hover:bg-download-hover text-base text-center text-font-dark font-bold flex flex-row items-center justify-center rounded-border-inner p-6"
            onClick={downloadCollection}
            loading={isDownloading}
            loadingClassName="
              absolute opacity-0 group-hover:opacity-30
              transition-opacity duration-200
              bottom-3 right-3 w-2/7 h-3/10
              bg-download
              text-base text-center text-font-dark font-bold
              flex flex-row items-center justify-center
              rounded-border-inner p-6
            "
            disabled={isDownloading}
          >
            <ArrowDownTrayIcon className="size-fill stroke-icons rounded-border-inner" />
          </ActionButton>
        </div>
      </div>

      <div className="flex flex-col px-4 gap-3 flex-1">
        <h2 className="font-bold text-xl text-font">
          {collectionName || "Name"}
        </h2>

        <div className="text-[15px] text-font font-bold">
          <p>{mods?.length || 0} mods in the collection</p>
          <p>{collectionSpace} MB in total</p>
        </div>

        <div className="flex-1 overflow-hidden">
          <p className="text-[13px] text-font">
            {collectionDesc || "Description"}
          </p>
        </div>
      </div>
    </div>
  );
}