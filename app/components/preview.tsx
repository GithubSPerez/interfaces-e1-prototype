export function Preview({src, reduced = false, containerClass = ""}: {src: string, reduced?: boolean, containerClass?: string}) {
    const sizeClasses = {
        normal: "w-full rounded-border-outer",
        reduced: "w-[10em] rounded-border-inner"
    }
    const sizeClass = sizeClasses[reduced ? "reduced" : "normal"]
    return <div className={`overflow-hidden ${sizeClass} ${containerClass} bg-bglite aspect-video`}>
        <img src={src} className="object-scale-up max-h-full m-auto"></img>
    </div>
}