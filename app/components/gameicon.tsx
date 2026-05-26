import SquareImage from "./squareimage";
import { Game, iconPlaceholder } from "../models";

export default function GameIcon({game}: {game: Game | undefined}) {
    return <SquareImage src={game?.icon || iconPlaceholder}
    size="normal"></SquareImage>
}