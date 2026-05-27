'use client';

import { APP_TEXTS } from "../lib/constants";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TetrisBackground from "../app/components/tetris-background";
import FunctionalityOverview from "../app/components/functionality-overview";
import BigSearchBar from "../app/components/big-search-bar";
import ModCarousel from "../app/components/mod-carousel";
import Text from "../app/components/text";

export default function Landing() {
  const { landing } = APP_TEXTS;

  return (
    <div className="relative flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden min-h-screen">
      <TetrisBackground />
      <BigSearchBar />

      <FunctionalityOverview />

      <div className="relative z-10 mt-32 w-full max-w-[1400px] mx-auto">
        <Text variant="h2" className="text-center mb-12">
          {landing.featuresTitle}
        </Text>

        <ModCarousel />
      </div>
    </div>
  );
}
