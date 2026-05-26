'use client'

import { Game, iconPlaceholder, previewPlaceholder } from "./models";

export function getGame() {
    const gameString = localStorage.getItem("game")
    let game: Game = {id: 7692, name: "PT", icon: iconPlaceholder, preview: previewPlaceholder, modCount: 0};
    if (gameString) game = JSON.parse(gameString)

    return game
}

export function setGame(game: Game) {
    localStorage.setItem("game", JSON.stringify(game))
}