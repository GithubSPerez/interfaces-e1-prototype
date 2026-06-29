/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Mod } from "../models";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  DocumentIcon,
  Cog6ToothIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import ActionButton from "../components/common/actionbutton";
import ModInCollection from "../components/collection/modincollection";
import axios, { AxiosResponse } from "axios";
import { getUserId } from "@/lib/api";
import { CurrentGame } from "@/app/context";
import { handleDownloadAll } from "@/lib/download";

export default function Collection() {
  const [savedMods, setSavedMods] = useState<Mod[]>([]);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishMessage, setPublishMessage] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionDesc, setCollectionDesc] = useState("");
  const [currentGame] = useContext(CurrentGame);

  useEffect(() => {
    const modsInCollection = localStorage.getItem("savedMods");
    if (modsInCollection) {
      setSavedMods(JSON.parse(modsInCollection));
    }
  }, []);

  useEffect(() => {
    if (!publishMessage) return;

    const timeout = setTimeout(() => {
      setPublishMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [publishMessage]);

  const calculateModSpaceInMB = (mod: Mod) => {
    return mod.fileSize / 1024 / 1024;
  };

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
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      setPublishMessage("");

      const userId = getUserId();

      const collectionsResponse: AxiosResponse<any[]> = await axios.get(
        `https://gbisand.pythonanywhere.com/user/modpacks`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
          },
          withCredentials: true,
        }
      );

      const alreadyExists = collectionsResponse.data.some(
        (collection) =>
          collection.nombre.trim().toLowerCase() ===
          collectionName.trim().toLowerCase()
      );

      if (alreadyExists) {
        setPublishMessage("A collection with this name already exists.");
        return;
      }

      let desc = collectionDesc;

      if (desc === "") {
        desc = "Description";
      }

      await axios.post(
        `https://gbisand.pythonanywhere.com/game/${currentGame.id}/modpacks`,
        {
          nombre: collectionName,
          descripcion: desc,
          mods: savedMods,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
          },
          withCredentials: true,
        }
      );

      setPublishMessage("Collection published successfully.");
    } catch (error) {
      console.error(error);
      setPublishMessage("Error publishing collection.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDownloadCollection = async () => {
    try {
      setIsDownloading(true);
      await handleDownloadAll(savedMods, collectionName);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgcolor font-grotesk">
      <div className="flex gap-12 p-10 items-start">
        <div className="flex-1 bg-bglite rounded-[13px] p-4 overflow-y-auto max-h-150 h-fit">
          {savedMods.length > 0 ? (
            savedMods.map((mod) => (
              <ModInCollection
                key={mod.id}
                modSpace={calculateModSpaceInMB(mod)}
                mod={mod}
                handleDeleteSavedMod={handleDeleteSavedMod}
              />
            ))
          ) : (
            <h1 className="text-3xl space-grotesk-bold">
              There are no mods in the collection.
            </h1>
          )}
        </div>

        <div className="w-95 h-fit bg-bglite rounded-[13px] p-10 flex flex-col gap-6">
          <div className="border-b border-separator pb-2">
            <h1 className="text-3xl font-bold space-grotesk-bold">
              Overview
            </h1>
          </div>

          <div className="flex items-center gap-2 border-b border-separator pb-2">
            <Cog6ToothIcon className="w-6 h-6" />
            <div className="flex items-center gap-1">
              <span className="text-font font-bold">{modsAddedCount}</span>
              {modsAddedCount > 1 ? (
                <span className="text-font">
                  mods added to the collection
                </span>
              ) : (
                <span className="text-font">
                  mod added to the collection
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-separator pb-2">
            <DocumentIcon className="w-6 h-6" />
            <div className="flex items-center gap-1">
              <span className="text-font font-bold">
                {estimatedSpace.toFixed(2)} MB
              </span>
              <span className="text-font">of estimated space</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Collection name (required)"
              required={true}
              className="w-full rounded-border-inner bg-bgcolor border border-separator px-4 py-3 text-font outline-none focus:border-download"
            />

            <input
              type="text"
              value={collectionDesc}
              onChange={(e) => setCollectionDesc(e.target.value)}
              placeholder="Collection description"
              className="w-full rounded-border-inner bg-bgcolor border border-separator px-4 py-3 text-font outline-none focus:border-download"
            />

            <ActionButton
              onClick={handleDownloadCollection}
              loading={isDownloading}
              loadingChildren="Downloading..."
              className="bg-download rounded-lg py-3 text-font-dark cursor-pointer hover:bg-download-hover gap-3"
              loadingClassName="bg-download rounded-lg py-3 text-font-dark opacity-30"
              disabled={
                (isDownloading || modsAddedCount === 0) ||
                collectionName === ""
              }
            >
              <div className="size-8">
                <ArrowDownTrayIcon className="stroke-icons" />
              </div>
              Download
            </ActionButton>

            <ActionButton
              onClick={handlePublish}
              loading={isPublishing}
              loadingChildren="Publishing..."
              className="bg-cart rounded-lg py-3 text-font-dark cursor-pointer hover:bg-cart-hover gap-3"
              loadingClassName="bg-cart rounded-lg py-3 text-font-dark opacity-30"
              disabled={
                isPublishing ||
                modsAddedCount === 0 ||
                collectionName === ""
              }
            >
              <div className="size-8">
                <ArrowUpTrayIcon className="stroke-icons" />
              </div>
              Publish
            </ActionButton>
          </div>
        </div>
      </div>

      {publishMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-bglitest text-font px-5 py-3 rounded-border-inner flex items-center gap-3 animate-fade-in shadow-lg z-50">
          {publishMessage.includes("successfully") ? (
            <CheckCircleIcon className="size-6 stroke-icons text-cart" />
          ) : (
            <ExclamationCircleIcon className="size-6 text-red-400" />
          )}

          <span className="font-medium">
            {publishMessage}
          </span>
        </div>
      )}
    </div>
  );
}