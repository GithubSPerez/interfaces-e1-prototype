import React from "react";
import { APP_TEXTS } from "../../lib/constants";
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
    <div className="p-8 rounded-border-outer transition-colors cursor-default bg-bglite group">
      <div
        className={`h-14 rounded-border-inner flex items-center justify-start mb-6 transition-all duration-300 w-14 overflow-hidden px-[14px] ${buttonColorClass} group-hover:w-[140px] group-hover:px-4`}
      >
        <Icon className="w-7 h-7 shrink-0 transition-transform text-font-dark" />
        <span className="text-font-dark font-bold whitespace-nowrap ml-0 group-hover:ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {buttonText}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-2xl font-bold text-font">{title}</h3>
      </div>
      <p className="text-base text-font-disabled leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function FunctionalityOverview() {
  const { landing } = APP_TEXTS;

  return (
    <div className="relative z-10 mt-32 w-full max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-8">
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
