'use client';

import { APP_TEXTS } from "../lib/constants";
import TetrisBackground from "./components/landing/tetris-background";
import FunctionalityOverview from "./components/landing/functionality-overview";
import ModCarousel from "./components/landing/mod-carousel";
import GameGrid from "./components/landing/game-grid";
import Text from "./components/common/text";
import BrowseButtons from "./components/landing/browse-buttons";

export default function Landing() {
  const { landing } = APP_TEXTS;

  return (
    <div className="relative flex flex-col items-center justify-start pt-8 pb-16 overflow-hidden min-h-screen">
      <TetrisBackground />

      <div className="relative z-10 max-w-4xl w-full text-center px-6 mb-4 mt-2">
        <Text variant="h1" className="!text-4xl md:!text-5xl mb-4 tracking-tight font-bold">
          {landing.heroTitle}
        </Text>
        <Text variant="p" className="!text-xl text-font-disabled mb-6 max-w-2xl mx-auto">
          {landing.heroSubtitle}
        </Text>
      </div>

      <FunctionalityOverview />

      <div className="flex py-16 w-full justify-center align-middle">
        <BrowseButtons/>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <Text variant="h2" className="text-center mb-10">
          {landing.trendingGamesTitle}
        </Text>

        <GameGrid />
      </div>

      <div className="relative z-10 mt-20 w-full max-w-[1400px] mx-auto">
        <Text variant="h2" className="text-center mb-12">
          {landing.featuresTitle}
        </Text>

        <ModCarousel />
      </div>
    </div>
  );
}
