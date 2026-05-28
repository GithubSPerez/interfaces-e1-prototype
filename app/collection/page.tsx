'use client'
import { Mod } from "../models";
import { useEffect, useMemo, useState } from "react";
import { DocumentIcon, Cog6ToothIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import ActionButton from "../components/actionbutton";
import ModInCollection from "../components/modincollection";
import axios from "axios";

export default function Collection() {
  const [savedMods, setSavedMods] = useState<Mod[]>([]);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    const modsInCollection = localStorage.getItem("savedMods");
    if (modsInCollection) {
      setSavedMods(JSON.parse(modsInCollection));
    }
  }, []);

  const calculateModSpaceInMB = (mod: Mod) => {
    return mod.fileSize / 1024 / 1024;
  }

  const modsAddedCount = useMemo(() => {
    return savedMods.length;
  }, [savedMods]);

  const estimatedSpace = useMemo(() => {
    return savedMods.reduce((acc, mod) => {
      return acc + Number(calculateModSpaceInMB(mod));
    }, 0);
  }, [savedMods]);

  const handleDeleteSavedMod = (deletedMod: Mod) => {
    const remainingMods = savedMods.filter(mod => mod !== deletedMod);

    setSavedMods(remainingMods);
    localStorage.setItem("savedMods", JSON.stringify(remainingMods));
  }

  const handleDownloadAll = async () => {
    try {
      setIsDownloading(true);
      const createZip = await axios.post("/api/zip", {
        files: savedMods.map(mod => ({
          url: mod.file,
          filename: `${mod.title}.zip`
        })),

        expires_in: 500,
      });

      const createdData = createZip.data;
      const jobId = createdData.job_id;

      let job;

      while (true) {
        const result = await axios.get(`/api/zip?jobId=${jobId}`);
        const data = result.data;

        if (data.job.status === "completed") {
          job = data.job;
          break;
        }

        if (data.job.status === "failed") {
          throw new Error("Error while generating ZIP");
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const zipUrl = job.zips[0].download_url;

      // Lo convertí a blob para poder colocarle nombre al zip, ya que
      // por la API de EaZip se colocaba como nombre el id del job asignado
      const downloadResponseBlob = await axios.get(zipUrl, {
        responseType: "blob",
      });

      const blobUrlForZip = window.URL.createObjectURL(downloadResponseBlob.data);

      const link = document.createElement("a");
      link.href = blobUrlForZip;
      link.download = "modpack.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrlForZip);
    } catch (error) {
      console.error(error);
    } finally 
    {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgcolor font-grotesk">

      <div className="flex gap-12 p-10 items-start">

        <div className="flex-1 bg-bglite rounded-[13px] p-4 overflow-y-auto max-h-150 h-fit">

          { savedMods.length > 0 ? (
            savedMods.map((mod) => (
            <ModInCollection key={mod.id} modSpace={calculateModSpaceInMB(mod)} mod={mod} handleDeleteSavedMod={handleDeleteSavedMod}></ModInCollection>))

          ) : (
            <h1 className="text-3xl space-grotesk-bold">There are no mods in the collection.</h1>
          )}
          
        </div>

        <div className="w-95 h-fit bg-bglite rounded-[13px] p-10 flex flex-col gap-6">

          <div className="border-b border-separator pb-2">
            <h1 className="text-3xl font-bold space-grotesk-bold">Overview</h1>
          </div>

          <div className="flex items-center gap-2 border-b border-separator pb-2">
            <Cog6ToothIcon className="w-6 h-6"></Cog6ToothIcon>
            <div className="flex items-center gap-1">
              <span className="text-font font-bold">{modsAddedCount}</span>
              {modsAddedCount > 1 ? (
                <span className="text-font">mods added to the collection</span>
              ) : (
                <span className="text-font">mod added to the collection</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-separator pb-2">
            <DocumentIcon className="w-6 h-6"></DocumentIcon>
            <div className="flex items-center gap-1">
              <span className="text-font font-bold">{estimatedSpace.toFixed(2)} MB</span>
              <span className="text-font">of estimated space</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <ActionButton onClick={handleDownloadAll} 
            loading={isDownloading} 
            loadingChildren="Downloading..." 
            className="bg-download rounded-lg py-3 text-font-dark cursor-pointer hover:bg-download-hover gap-3"
            loadingClassName="bg-download rounded-lg py-3 text-font-dark opacity-30"
            disabled={isDownloading || modsAddedCount == 0}>
              <div className="size-8">
                <ArrowDownTrayIcon className="stroke-icons"></ArrowDownTrayIcon>
              </div>
              Download
            </ActionButton>
            
          </div>

        </div>
      </div>
    </div>
  );
}
