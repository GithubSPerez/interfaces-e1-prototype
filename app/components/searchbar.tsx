import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchbarProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function Searchbar({ onChange = () => { }, placeholder = "Search" }: SearchbarProps) {
    return <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className="outline-0 bg-bglitest pl-2 pt-1 pb-1 rounded-border-inner w-[32em] transition-colors hover:bg-bglitest-hover"
    >
    </input>
}