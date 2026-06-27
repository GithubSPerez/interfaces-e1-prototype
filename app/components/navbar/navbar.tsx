/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import GameIcon from "./gameicon";
import Logo from "./logo";
import Searchbar from "./searchbar";
import { getGame, getMobileSearch, setGame, switchMobileSearch } from "../../storage";
import { Game, requestGames } from "../../models";
import { useRouter, usePathname } from "next/navigation";

import ActionButton from "../common/actionbutton";
import { ArchiveBoxArrowDownIcon, ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function NavbarItem({children, className = ""}: {children: React.ReactNode, className?: string}) {
    return <div className={"flex flex-col justify-center p-2 " + className}>{children}</div>
}

export default function Navbar() {
    const [mobileSearch, setMobileSearch] = useState(false)
    const [currentGame, setCurrentGame] = useState<Game | undefined>()

    const router = useRouter()
    const pathname = usePathname()

    const submitFunc = (value: string) => {router.replace(`/mods/?search=${value}`)}

    useEffect(() => {
        setCurrentGame(getGame())
        setMobileSearch(getMobileSearch())
    }, [])

    const clickMobileSearch = () => {
        switchMobileSearch()
        setMobileSearch(getMobileSearch())
    }

    const isLandingPage = pathname === '/';

    return <div className="flex flex-row justify-items-center fixed w-full h-15 z-50 bg-bglite shadow-lg">
        {
            !mobileSearch ?
            ([
            <div className="flex flex-row flex-1 justify-start" key="left-nav">
                <NavbarItem>
                    <Logo></Logo>
                </NavbarItem>
                <NavbarItem>
                    <GameIcon game={currentGame}></GameIcon>
                </NavbarItem>
            </div>,
            <div className="hidden sm:flex flex-row flex-1 justify-center" key="center-nav">
                <NavbarItem>
                    <Searchbar onSubmit={submitFunc} show={!isLandingPage}/>
                </NavbarItem>
            </div>,
            <div className="flex flex-row flex-1 justify-end pr-2 sm:pr-10" key="right-nav">
                <NavbarItem className="sm:hidden">
                    <button className="h-full p-1" onClick={clickMobileSearch}>
                        <MagnifyingGlassIcon className="h-full"></MagnifyingGlassIcon>
                    </button>
                </NavbarItem>
                <NavbarItem>
                    <ActionButton
                        href="/collection"
                        className="bg-cart hover:bg-cart-hover px-4 h-10"
                    >
                        <ArchiveBoxArrowDownIcon className="size-8 stroke-1 text-font-dark" />
                        <span className="hidden sm:visible text-font-dark text-xl font-semibold space-grotesk-bold">
                            Collection
                        </span>
                    </ActionButton>
                </NavbarItem>
            </div>
            ]
        ) : (
             <div className="flex flex-row flex-1 justify-center" key="center-nav">
                <NavbarItem>
                    <button className="h-full" onClick={clickMobileSearch}>
                        <ArrowLeftIcon className="h-full p-2"/>
                    </button>
                </NavbarItem>
                <NavbarItem className="w-full pr-4">
                    <Searchbar onSubmit={submitFunc} show={!isLandingPage}/>
                </NavbarItem>
            </div>
        )
        }
        
    </div>
}