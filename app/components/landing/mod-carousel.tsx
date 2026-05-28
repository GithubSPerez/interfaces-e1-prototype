'use client';

import { useEffect, useState } from "react";
import ModPreview from "../modpreview";
import { FeedFilter, Mod, requestMods } from "../../models";
import { getGame } from "../../storage";
import { APP_SETTINGS, APP_TEXTS } from "../../../lib/constants";
import Text from "../text";

export default function ModCarousel() {
  const [mods, setMods] = useState<Mod[]>([]);
  const { carouselSpeed } = APP_SETTINGS.landing;
  const { loadingMods } = APP_TEXTS.landing;

  useEffect(() => {
    requestMods(getGame(), 1, FeedFilter.Featured).then((result) => {
      setMods(result);
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-4" style={{ '--carousel-speed': carouselSpeed } as React.CSSProperties}>
      {mods.length > 0 ? (
        <div className="carousel-mask w-full overflow-hidden flex mx-auto">
          <div className="flex w-max animate-carousel">
            {[...mods, ...mods].map((mod, i) => (
              <div key={`${mod.title}-${i}`} className="w-[320px] shrink-0 mx-2">
                <ModPreview mod={mod} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <Text variant="p" className="text-font-disabled">
            {loadingMods}
          </Text>
        </div>
      )}
    </div>
  );
}
