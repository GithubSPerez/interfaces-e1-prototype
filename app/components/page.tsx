import React from "react";

export default function Page({children}: {children: React.ReactNode}) {
    return <div className="bg-neutral-950 object-fill">
        {children}
    </div>
}