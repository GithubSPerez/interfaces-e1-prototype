import React from "react";

export default function Page({children}: {children: React.ReactNode}) {
    return <div className="bg-bgcolor object-fill pt-[60px]">
        {children}
    </div>
}