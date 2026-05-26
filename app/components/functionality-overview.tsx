import { APP_TEXTS } from "../../lib/constants";
import { ArrowDownTrayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function FunctionalityOverview() {
  const { landing } = APP_TEXTS;

  return (
    <div className="relative z-10 mt-32 w-full max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Download */}
        <div className="bg-bglite p-8 rounded-border-outer transition-colors group cursor-default">
          <div className="h-14 rounded-border-inner bg-download flex items-center justify-start mb-6 transition-all duration-300 w-14 group-hover:w-[140px] overflow-hidden px-[14px] group-hover:px-4">
            <ArrowDownTrayIcon className="w-7 h-7 text-font-dark shrink-0 transition-transform" />
            <span className="text-font-dark font-bold whitespace-nowrap ml-0 group-hover:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              Download
            </span>
          </div>
          <h3 className="text-2xl font-bold text-font mb-4">{landing.functionalities[0].title}</h3>
          <p className="text-base text-font-disabled leading-relaxed">
            {landing.functionalities[0].desc}
          </p>
        </div>

        {/* Mod Packs */}
        <div className="bg-bglite p-8 rounded-border-outer transition-colors group cursor-default">
          <div className="h-14 rounded-border-inner bg-cart flex items-center justify-start mb-6 transition-all duration-300 w-14 group-hover:w-[140px] overflow-hidden px-[14px] group-hover:px-4">
            <PlusCircleIcon className="w-7 h-7 text-font-dark shrink-0 transition-transform" />
            <span className="text-font-dark font-bold whitespace-nowrap ml-0 group-hover:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              Collection
            </span>
          </div>
          <h3 className="text-2xl font-bold text-font mb-4">{landing.functionalities[1].title}</h3>
          <p className="text-base text-font-disabled leading-relaxed">
            {landing.functionalities[1].desc}
          </p>
        </div>
      </div>
    </div>
  );
}
