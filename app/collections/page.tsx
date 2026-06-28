'use client'
import { Mod } from "../models";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CollectionPreview from "../components/collection/collectionpreview";
// Tengo q hacer el fetch a la api del gabi asi q puse un bucle noma pa mostrar placeholders JSDGJSD
export default function Collections() {
  return (
    <div className="flex flex-col min-h-screen w-full gap-5">
      <div className="flex bg-bgcolor h-fit flex-col w-full px-10">
        <div className="flex flex-col">
          <h1 className="space-grotesk-bold text-font text-3xl pt-10 pl-10">
            My collections
          </h1>

          <div className="overflow-hidden hover:overflow-scroll justify-center px-10 py-5">
            <div className="flex gap-10 w-max pb-2 justify-center">
              {Array.from({ length: 6 }).map((_, index) => ( 
                <div key={index} className={`w-[clamp(260px,25vw,360px)] shrink-0 `}>
                  <CollectionPreview hover="hover:bg-container"/>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col flex-1 gap-5 bg-bglite w-full px-10 py-5">
        <h1 className="space-grotesk-bold text-font text-3xl px-10 py-5">
          Users collections
        </h1>

        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(400px,500px))] justify-center gap-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full">
              <CollectionPreview hover="hover:bg-bglite-hover"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}