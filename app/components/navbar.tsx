/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from "react";
import GameIcon from "./gameicon";
import Logo from "./logo";
import Searchbar from "./searchbar";
import { getGame, setGame } from "../storage";
import { Game, requestGames } from "../models";
import { useRouter } from "next/navigation";

function NavbarItem({children}: {children: React.ReactElement}) {
    return <div className="flex flex-col justify-center p-2">{children}</div>
}


export default function Navbar() {
    const [currentGame, setCurrentGame] = useState<Game | undefined>()
    const router = useRouter()

    useEffect(() => {
        setCurrentGame(getGame())
    }, [])

    return <div className="flex flex-row bg-bglite justify-items-center fixed w-full h-15">
        <div className="flex flex-row flex-1">
            <NavbarItem>
                <Logo></Logo>
            </NavbarItem>
            <NavbarItem>
                <GameIcon game={currentGame}></GameIcon>
            </NavbarItem>
        </div>
        <div className="flex flex-row justify-center flex-3">
            <NavbarItem>
                <Searchbar onSubmit={(value) => {router.replace(`/mod/?search=${value}`)}}></Searchbar>
            </NavbarItem>
        </div>
        <div className="flex-1">

        </div>
        
    </div>
}