import React, { useEffect, useState } from "react";
import GameIcon from "./gameicon";
import Logo from "./logo";
import Searchbar from "./searchbar";
import { getGame } from "../storage";
import { Game } from "../models";
import { usePathname } from "next/navigation";
import ActionButton from "./actionbutton";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";

function NavbarItem({children}: {children: React.ReactNode}) {
    return <div className="flex flex-col justify-center p-2">{children}</div>
}

export default function Navbar() {
    const [currentGame, setCurrentGame] = useState<Game | undefined>()
    const pathname = usePathname()

    useEffect(() => {
        setCurrentGame(getGame())
    }, [])

    const isLandingPage = pathname === '/';

    return <div className="flex flex-row justify-items-center fixed w-full h-15 z-50 bg-bglite">
        <div className="flex flex-row flex-1 justify-start">
            <NavbarItem>
                <Logo></Logo>
            </NavbarItem>
            <NavbarItem>
                <GameIcon game={currentGame}></GameIcon>
            </NavbarItem>
        </div>
        <div className="flex flex-row flex-1 justify-center">
            <NavbarItem>
                {!isLandingPage && <Searchbar />}
            </NavbarItem>
        </div>
        <div className="flex flex-row flex-1 justify-end pr-10">
            <NavbarItem>
                <ActionButton
                    href="/collection"
                    className="bg-cart hover:bg-cart-hover px-4"
                >
                    <ArchiveBoxArrowDownIcon className="size-8 stroke-icons text-font-dark" />
                    <span className="text-font-dark text-xl font-semibold space-grotesk-bold">
                        Collection
                    </span>
                </ActionButton>
            </NavbarItem>
        </div>
    </div>
}