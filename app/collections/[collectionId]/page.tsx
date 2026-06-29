'use client'

import { useEffect, useState } from "react";
import { Mod, Collection } from "@/app/models";
import { DocumentIcon, Cog6ToothIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ActionButton from "@/app/components/common/actionbutton";
import ModInCollection from "@/app/components/collection/modincollection";
import { handleDownloadAll } from "@/lib/download";

export default function CollectionPage() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedCollection");

    if (saved) {
      setCollection(JSON.parse(saved));
    }
  }, []);

  if (!collection) {
    return <div className="p-10">Loading...</div>;
  }

  const modsMB = collection.mods.reduce(
    (acc, mod) => acc + Math.floor(mod.fileSize / 1024 / 1024),
    0
  );

  const handleDownloadCollection = async () => {
    try {
      setIsDownloading(true);
      await handleDownloadAll(collection.mods, collection.nombre);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgcolor font-grotesk">
      <div className="flex gap-12 p-10 items-start">

        <div className="flex-1 bg-bglite rounded-[13px] p-4 overflow-y-auto max-h-150 h-fit">
          {collection.mods.map((mod) => (
            <ModInCollection
              key={mod.id}
              modSpace={mod.fileSize / 1024 / 1024}
              mod={mod}
            />
          ))}
        </div>

        <div className="w-95 h-fit bg-bglite rounded-[13px] p-10 flex flex-col gap-6">

          <div className="border-b border-separator pb-2">
            <h1 className="text-3xl font-bold">Overview</h1>
          </div>

          <div className="flex items-center gap-2 border-b border-separator pb-2">
            <Cog6ToothIcon className="w-6 h-6" />
            <div className="flex items-center gap-1">
              <span className="text-font font-bold">
                {collection.mods.length}
              </span>
              <span className="text-font">
                mods added to the collection
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-separator pb-2">
            <DocumentIcon className="w-6 h-6" />
            <div className="flex items-center gap-1">
              <span className="text-font font-bold">{modsMB} MB</span>
              <span className="text-font">of estimated space</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <label className="w-full rounded-border-inner bg-bgcolor border border-separator px-4 py-3">
              {collection.nombre}
            </label>

            <label className="w-full rounded-border-inner bg-bgcolor border border-separator px-4 py-3">
              {collection.descripcion}
            </label>

            <ActionButton
              onClick={handleDownloadCollection}
              loading={isDownloading}
              loadingChildren="Downloading..."
              className="bg-download rounded-lg py-3 text-font-dark hover:bg-download-hover gap-3"
              loadingClassName="bg-download rounded-lg py-3 text-font-dark opacity-30"
              disabled={isDownloading}
            >
              <div className="size-8">
                <ArrowDownTrayIcon className="stroke-icons" />
              </div>
              Download
            </ActionButton>
          </div>

        </div>
      </div>
    </div>
  );
}