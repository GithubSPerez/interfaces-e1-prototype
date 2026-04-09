import LikeBar from "@/app/components/likebar";
import ModSideSuggestions from "@/app/components/modsidesuggestions";
import SquareImage from "@/app/components/squareimage";
import { ArrowDownTrayIcon, ClockIcon, DocumentTextIcon, HeartIcon, InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

export default function ModPage() {
    return <div className="flex flex-row">
        <div className="flex flex-5 flex-col p-5">
            <div className="flex flex-row">
                <div className="overflow-hidden rounded-xl flex-5">
                    <img src="https://elitescreens.com/wp-content/uploads/16by10.jpg" className="object-fill"></img>
                </div>
                <div className="flex flex-col w-full bg-neutral-900 ml-6 rounded-xl p-4 min-h-0 flex-2">
                    <div className="flex flex-row">
                        <button className="cursor-pointer bg-green-700 hover:bg-green-800 transition-colors text-2xl font-bold flex flex-row justify-center rounded-xl p-3 w-full">
                            <ArrowDownTrayIcon className="size-8"/>
                            <p className="pl-1">
                            Download
                            </p>
                        </button>
                        <button className="cursor-pointer flex flex-row justify-center bg-blue-400 hover:bg-blue-500 transition-colors aspect-square ml-3 rounded-2xl">
                            <div className="flex flex-col justify-center h-full">
                            <PlusCircleIcon className="size-8"/>
                            </div>
                        </button>
                    </div>
                    <div className="pt-3 pb-3">
                        <LikeBar/>
                    </div>
                    <p className="flex flex-row text-xl">
                        <ArrowDownCircleIcon className="size-7 pr-1"/>3.3M Downloads
                    </p>
                    <p className="flex flex-row text-xl">
                        <ClockIcon className="size-7 pr-1"/>Updated 3 weeks ago
                    </p>
                    <div className="h-full"></div>
                    <div className="pb-1 flex flex-row">
                        <SquareImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" size="big"/>
                        <h3 className="ml-2 text-xl font-bold">Mod Owner</h3>
                    </div>
                </div>
            </div>
            <h1 className="text-4xl font-bold pt-3">Untitled Mod for Geometry Dash</h1>
            <p className="text-xl text-neutral-300">
                Esta es la descripción del mod que acabas de clickear.<br/>
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
        <div className="flex-2">
            <ModSideSuggestions/>
        </div>
    </div>
}