import React from "react";
import { APP_TEXTS } from "../../../lib/constants";
import { ArrowDownTrayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

interface FunctionalityCardProps {
  title: string;
  desc: string;
  buttonText: string;
  icon: React.ElementType;
  buttonColorClass: string;
}

function FunctionalityCard({ title, desc, buttonText, icon: Icon, buttonColorClass }: FunctionalityCardProps) {
  return (
    <div className="px-8 py-5 rounded-border-outer transition-colors cursor-default bg-bglite group flex flex-col justify-center">
      <div
        className={`h-12 rounded-border-inner flex items-center justify-start mb-4 transition-all duration-300 w-12 overflow-hidden px-3 ${buttonColorClass} group-hover:w-[140px] group-hover:px-4`}
      >
        <Icon className="w-6 h-6 shrink-0 transition-transform text-font-dark stroke-icons" />
        <span className="text-font-dark font-bold whitespace-nowrap ml-0 group-hover:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {buttonText}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-xl font-bold text-font">{title}</h3>
      </div>
      <p className="text-sm text-font-disabled leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function FunctionalityOverview() {
  const { landing } = APP_TEXTS;

  return (
    <div className="relative z-10 mt-6 w-full max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FunctionalityCard
          title={landing.functionalities[0].title}
          desc={landing.functionalities[0].desc}
          buttonText={landing.downloadButton}
          icon={ArrowDownTrayIcon}
          buttonColorClass="bg-download"
        />
        <FunctionalityCard
          title={landing.functionalities[1].title}
          desc={landing.functionalities[1].desc}
          buttonText={landing.collectButton}
          icon={PlusCircleIcon}
          buttonColorClass="bg-cart"
        />
      </div>
    </div>
  );
}
