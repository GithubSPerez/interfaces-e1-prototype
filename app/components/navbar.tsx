import React from "react";
import GameIcon from "./gameicon";
import Logo from "./logo";
import Searchbar from "./searchbar";

function NavbarItem({children}: {children: React.ReactElement}) {
    return <div className="flex flex-col justify-center p-2">{children}</div>
}


export default function Navbar() {
    return <div className="flex flex-row bg-neutral-900 justify-items-center fixed w-full">
        <div className="flex flex-row flex-1">
            <NavbarItem>
                <Logo></Logo>
            </NavbarItem>
            <NavbarItem>
                <GameIcon></GameIcon>
            </NavbarItem>
        </div>
        <div className="flex flex-row justify-center flex-3">
            <NavbarItem>
                <Searchbar></Searchbar>
            </NavbarItem>
        </div>
        <div className="flex-1">

        </div>
        
    </div>
}