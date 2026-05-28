'use client';

import { useEffect, useState } from "react";
import GamePreview from "../gamepreview";
import { Game, requestGames } from "../../models";
import { APP_TEXTS } from "../../../lib/constants";
import Text from "../text";

export default function GameGrid({ initialRows = 1 }: { initialRows?: number }) {
  const [games, setGames] = useState<Game[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { loadingGames, viewAllGames, showLess } = APP_TEXTS.landing;

  const collapsedGamesCount = (initialRows + 1) * 3;

  useEffect(() => {
    requestGames().then((result) => {
      setGames(result.slice(0, 18));
    });
  }, []);

  const visibleGames = isExpanded ? games : games.slice(0, collapsedGamesCount);

  return (
    <div className="w-full py-4 flex flex-col items-center">
      {games.length > 0 ? (
        <div className="relative w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {visibleGames.map((game, i) => (
              <div key={`${game.name}-${i}`} className="w-[320px]">
                <GamePreview game={game} />
              </div>
            ))}
          </div>

          {!isExpanded && games.length > initialRows * 3 && (
            <div
              className="absolute bottom-0 left-0 w-full h-[280px] flex items-center justify-center cursor-pointer z-10 group"
              onClick={() => setIsExpanded(true)}
            >
              <div className="fade-overlay"></div>

              <Text variant="p" className="text-xl text-link-hover relative z-20">
                {viewAllGames}
              </Text>
            </div>
          )}

          {isExpanded && games.length > collapsedGamesCount && (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-link-hover"
              >
                {showLess}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <Text variant="p" className="text-font-disabled">
            {loadingGames}
          </Text>
        </div>
      )}
    </div>
  );
}
