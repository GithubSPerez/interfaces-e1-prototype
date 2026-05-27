'use client';

import { APP_TEXTS } from "../../lib/constants";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function BigSearchBar() {
  const { landing } = APP_TEXTS;

  return (
    <div className="relative z-10 max-w-4xl w-full text-center px-6">
      <h1 className="text-5xl md:text-7xl font-bold text-font mb-6 tracking-tight">
        {landing.heroTitle}
      </h1>
      <p className="text-xl text-font/70 mb-12 max-w-2xl mx-auto">
        {landing.heroSubtitle}
      </p>

      {/* search bar */}
      <div className="relative max-w-3xl mx-auto group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-7 w-7 text-font/70 group-focus-within:text-font transition-colors" />
        </div>
        <input
          type="text"
          className="w-full bg-bglitest text-font text-lg rounded-border-outer py-5 pl-16 pr-32 outline-none hover:bg-bglitest-hover focus:bg-bglitest-hover transition-colors placeholder:text-font/70"
          placeholder={landing.searchPlaceholder}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button className="bg-download text-font-dark px-8 py-3 rounded-border-inner font-bold hover:bg-download-hover transition-colors">
            {landing.searchButton}
          </button>
        </div>
      </div>
    </div>
  );
}
