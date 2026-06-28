import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ActionButton from "../common/actionbutton";
import { RefObject } from "react";

type Props = {
  dropdownSelected: RefObject<HTMLDivElement | null>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  isModsSelected: boolean;
  setIsModsSelected: (v: boolean) => void;
};

export default function Dropwdown({
  dropdownSelected,
  isDropdownOpen,
  setIsDropdownOpen,
  isModsSelected,
  setIsModsSelected,
}: Props) {
  const router = useRouter();

  return (
    <div className="relative" ref={dropdownSelected}>
      <ActionButton
        onClick={() => setIsDropdownOpen((v) => !v)}
        className="bg-cart hover:bg-cart-hover px-4 h-10 flex items-center gap-2"
      >
        {isModsSelected ? (
          <span className="text-font-dark text-xl font-semibold space-grotesk-bold">
            Mods
          </span>
        ) : (
          <span className="text-font-dark text-xl font-semibold space-grotesk-bold">
            Collections
          </span>
        )}

        <ChevronDownIcon className="size-5 text-font-dark" />
      </ActionButton>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-4 w-48 bg-bglite border border-black/20 rounded-border-inner shadow-lg overflow-hidden">
          <button
            onClick={() => {
              router.push("/mods");
              setIsModsSelected(true);
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-container transition-colors text-font"
          >
            Mods
          </button>

          <button
            onClick={() => {
              router.push("/collections");
              setIsModsSelected(false);
              setIsDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-container transition-colors text-font"
          >
            Collections
          </button>
        </div>
      )}
    </div>
  );
}
