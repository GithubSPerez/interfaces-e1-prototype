export function Preview({src, reduced = false, containerClass = "", inner = false}: {src?: string, reduced?: boolean, containerClass?: string, inner?: boolean}) {
    const sizeClasses = {
        normal: "w-full",
        reduced: "w-[10em]"
    }
    const borderClass = inner ? "rounded-border-inner" : "rounded-border-outer"
    const sizeClass = sizeClasses[reduced ? "reduced" : "normal"]
    return <div className={`overflow-hidden ${sizeClass} ${borderClass} ${containerClass} ${!src ? "skeleton-loading" : "bg-bglite"} aspect-video`}>
        {src && <img src={src} className="object-scale-up max-h-full m-auto"/>}
    </div>
}