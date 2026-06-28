import SquareImage from "../common/squareimage";
import { Game, iconPlaceholder } from "../../models";
import Link from "next/link";

export default function GameIcon({game}: {game: Game | undefined}) {
    return <Link href="/mods"><SquareImage src={game?.icon || iconPlaceholder}
    size="normal"></SquareImage></Link>
}