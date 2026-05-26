'use client';

import { useEffect, useState } from "react";
import ModPreview from "./modpreview";
import { FeedFilter, Mod, requestMods } from "../models";
import { APP_SETTINGS, APP_TEXTS } from "../../lib/constants";

export default function ModCarousel() {
  const [mods, setMods] = useState<Mod[]>([]);
  const { marqueeSpeed } = APP_SETTINGS.landing;
  const { loadingMods } = APP_TEXTS.landing;

  useEffect(() => {
    requestMods(1, FeedFilter.Featured).then((result) => {
      setMods(result);
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee ${marqueeSpeed} linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* fade out */
        .marquee-mask {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }
      `}</style>

      {mods.length > 0 ? (
        <div className="marquee-mask w-full overflow-hidden flex mx-auto">
          <div className="flex w-max animate-marquee">
            {[...mods, ...mods].map((mod, i) => (
              <div key={`${mod.title}-${i}`} className="w-[320px] shrink-0 mx-2">
                <ModPreview mod={mod} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48 text-font-disabled">
          {loadingMods}
        </div>
      )}
    </div>
  );
}
