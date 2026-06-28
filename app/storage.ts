'use client'

import { Game, iconPlaceholder, previewPlaceholder } from "./models";

export const defaultGame: Game = {id: 7692, name: "PT", icon: iconPlaceholder, preview: previewPlaceholder, modCount: 0}

export function getGame() {
    let game: Game = defaultGame
    if (typeof localStorage == "undefined") return game

    const gameString = localStorage.getItem("game")
    
    if (gameString) game = JSON.parse(gameString)

    return game
}

export function setGame(game: Game) {
    localStorage.setItem("game", JSON.stringify(game))
}

export function getMobileSearch() {
    if (typeof localStorage == "undefined") return false
    return JSON.parse(localStorage.getItem("mobileSearch") || "false")
}

export function switchMobileSearch() {
    console.log(getMobileSearch(), localStorage.getItem("mobileSearch"))
    localStorage.setItem("mobileSearch", String(!getMobileSearch()))
    console.log(getMobileSearch())
}