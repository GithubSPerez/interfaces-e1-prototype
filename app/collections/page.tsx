"use client";
import { Collection, Mod } from "../models";
import { useContext, useEffect, useMemo, useState } from "react";
import axios, { AxiosResponse } from "axios";
import CollectionPreview from "../components/collection/collectionpreview";
import { useVar } from "@/lib/useVar";
import { getUserId } from "@/lib/api";
import { getGame } from "../storage";
import { handleDownloadAll } from "@/lib/download";
import { useRouter } from "next/navigation";

export default function Collections() {
  const router = useRouter();
  const [getOtherCollections, setOtherCollections, otherCollections] = useVar<
    Collection[]
  >([]);
  const [getUserCollections, setUserCollections, userCollections] = useVar<
    Collection[]
  >([]);

  async function loadCollections() {
    const userId = getUserId();
    const result: AxiosResponse<Collection[]> = await axios.get(
      `https://gbisand.pythonanywhere.com/game/${getGame().id}/modpacks`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId,
        },
        withCredentials: true,
      },
    );

    setOtherCollections(result.data);
  }

  async function loadUserCollections() {
    const userId = getUserId();
    const result: AxiosResponse<Collection[]> = await axios.get(
      `https://gbisand.pythonanywhere.com/user/modpacks`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId,
        },
        withCredentials: true,
      },
    );

    setUserCollections(result.data);
  }

  useEffect(() => {
    loadUserCollections();
    loadCollections();
    console.info(otherCollections)
  }, []);

  const calculateModSpaceInMB = (mod: Mod) => {
    return Math.floor(mod.fileSize / 1024 / 1024);
  };

  const collectionEstimatedSpace = (collection: Collection) => {
    let collectionSpace = 0;
    collection.mods.forEach((mod) => {
      collectionSpace += calculateModSpaceInMB(mod);
    });

    return collectionSpace;
  };

  return (
    <div className="flex flex-col min-h-screen w-full gap-5">
      <div className="flex bg-bgcolor h-fit flex-col w-full px-10">
        <div className="flex flex-col">
          <h1 className="space-grotesk-bold text-font text-3xl pt-10 pl-10">
            All my collections
          </h1>

          <div className="overflow-hidden hover:overflow-scroll justify-center px-10 py-5">
            <div className="flex flex-row gap-10 pb-4">
              {userCollections.map((collection, index) => (
                <div
                  key={`my_collection_wrapper_${index}`}
                  className="w-80 shrink-0"
                >
                  <CollectionPreview
                    hover="hover:bg-bglite-hover"
                    collectionName={collection.nombre || "Name"}
                    collectionSpace={collectionEstimatedSpace(collection)}
                    collectionDesc={collection.descripcion || "Description"}
                    mods={collection.mods || []}
                    handleDownload={() => handleDownloadAll(collection.mods, collection.nombre)}
                    onClick={() => {
                      localStorage.setItem(
                        "selectedCollection",
                        JSON.stringify(collection)
                      );

                      router.push(`/collections/${collection.id}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-5 bg-bglite w-full px-10 py-5">
        <h1 className="space-grotesk-bold text-font text-3xl px-10 py-5">
          {getGame().name} users collections
        </h1>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-10">
          {otherCollections.map((collection, index) => (
            <div key={`other_collection_wrapper_${index}`}>
              <CollectionPreview
                hover="hover:bg-bglite-hover"
                collectionName={collection.nombre || "Name"}
                collectionSpace={collectionEstimatedSpace(collection)}
                collectionDesc={collection.descripcion || "Description"}
                mods={collection.mods || []}
                handleDownload={() => handleDownloadAll(collection.mods, collection.nombre)}
                onClick={() => {
                  localStorage.setItem(
                    "selectedCollection",
                    JSON.stringify(collection)
                  );

                  router.push(`/collections/${collection.id}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
