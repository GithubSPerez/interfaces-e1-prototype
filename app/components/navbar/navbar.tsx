import React, { useContext, useEffect, useState, useRef } from "react";
import GameIcon from "./gameicon";
import Logo from "./logo";
import Searchbar from "./searchbar";
import { getGame, setGame } from "../../storage";
import { Game, requestGames } from "../../models";
import { useRouter, usePathname } from "next/navigation";

import ActionButton from "../common/actionbutton";
import { CurrentGame } from "@/app/context";
import { ArchiveBoxArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Dropwdown from "./dropdown";

function NavbarItem({children}: {children: React.ReactNode}) {
    return <div className="flex flex-col justify-center p-2">{children}</div>
}

export default function Navbar() {
    const [currentGame] = useContext(CurrentGame)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isModsSelected, setIsModsSelected] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const dropdownSelected = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (dropdownSelected.current && !dropdownSelected.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideDropdown);
        return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }, [])

    const isLandingPage = pathname === '/';

    return <div className="flex flex-row justify-items-center fixed w-full h-15 z-50 bg-bglite shrink-0">
        <div className="flex flex-row flex-1 justify-start items-center">
            <NavbarItem>
                <Logo></Logo>
            </NavbarItem>
            <NavbarItem>
                <GameIcon game={currentGame}></GameIcon>
            </NavbarItem>
            <NavbarItem>
                        <Dropwdown dropdownSelected={dropdownSelected} isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen} isModsSelected={isModsSelected} setIsModsSelected={setIsModsSelected}></Dropwdown>
                </NavbarItem>
        </div>


        <div className="flex flex-row flex-1 justify-center">
            <NavbarItem>
                {!isLandingPage && <Searchbar onSubmit={(value) => {router.replace(`/mods/?search=${value}`)}}/>}
            </NavbarItem>
        </div>

        <div className="flex flex-row flex-1 justify-end pr-10">
            <NavbarItem>
                <ActionButton
                    href="/collection"
                    className="bg-cart hover:bg-cart-hover px-4 h-10"
                >
                    <ArchiveBoxArrowDownIcon className="size-8 stroke-1 text-font-dark" />
                    <span className="text-font-dark text-xl font-semibold space-grotesk-bold">
                        Collection
                    </span>
                </ActionButton>
            </NavbarItem>
        </div>
    </div>
}