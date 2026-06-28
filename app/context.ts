import { createContext } from "react";
import { defaultGame } from "./storage";
import { Game } from "./models";

export const CurrentGame = createContext([defaultGame, (val: Game) => {}] as const)