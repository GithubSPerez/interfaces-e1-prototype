'use client'

import { Game, iconPlaceholder, previewPlaceholder } from "./models";

export function getGame() {
    let game: Game = {id: 7692, name: "PT", icon: iconPlaceholder, preview: previewPlaceholder, modCount: 0}
    if (typeof localStorage == "undefined") return game

    const gameString = localStorage.getItem("game")
    
    if (gameString) game = JSON.parse(gameString)

    return game
}

export function setGame(game: Game) {
    localStorage.setItem("game", JSON.stringify(game))
}