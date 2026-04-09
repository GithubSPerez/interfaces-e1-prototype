import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function Searchbar({onChange = () => {}}) {
    return <input
        type="text"
        onChange={onChange}
        placeholder="Search"
        className="outline-2 outline-neutral-800 pl-2 pt-1 pb-1 rounded-md w-[32em]"
    >
    </input>
}