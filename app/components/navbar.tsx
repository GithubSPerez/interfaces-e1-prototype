/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from "react";
import GameIcon from "./gameicon";
import Logo from "./logo";
import Searchbar from "./searchbar";
import { getGame, setGame } from "../storage";
import { Game, requestGames } from "../models";
import ActionButton from "./actionbutton";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
function NavbarItem({children}: {children: React.ReactElement}) {
    return <div className="flex flex-col justify-center p-2">{children}</div>
}

export default function Navbar() {
    const [currentGame, setCurrentGame] = useState<Game | undefined>()

    useEffect(() => {
        setCurrentGame(getGame())
    }, [])

    return <div className="flex flex-row bg-bglite justify-items-center fixed w-full h-15">
        <div className="flex flex-row w-fit">
            <NavbarItem>
                <Logo></Logo>
            </NavbarItem>
            <NavbarItem>
                <GameIcon game={currentGame}></GameIcon>
            </NavbarItem>
        </div>
        <div className="flex flex-1 flex-row justify-center w-fit">
            <NavbarItem>
                <Searchbar></Searchbar>
            </NavbarItem>
        </div>
        <div className="flex items-center justify-center bg-cart hover:bg-cart-hover m-2 rounded-border-inner w-fit mr-10 p-3">
            <NavbarItem>
                <ActionButton
                    href="/collection"
                    className="flex items-center gap-2"
                >
                    <ArchiveBoxArrowDownIcon className="size-8 stroke-icons dark-icons" />
                    <span className="text-font-dark text-xl font-semibold">
                        Collection
                    </span>
                </ActionButton>
            </NavbarItem>
        </div>
    
    </div>
}