import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function Searchbar({onChange = () => {}}) {
    return <input
        type="text"
        onChange={onChange}
        placeholder="Search"
        className="outline-0 bg-bglitest pl-2 pt-1 pb-1 rounded-border-inner w-[32em]"
    >
    </input>
}