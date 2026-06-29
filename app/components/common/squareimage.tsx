export default function SquareImage({src, size} : {src: string | undefined, size: "small" | "normal" | "plus" | "big"}) {
    const sizeClass = {
        small: "h-6 w-6",
        normal: "h-9 w-9",
        plus: "h-11 w-11",
        big: "h-15 w-15"
    }

    return <div className={`${sizeClass[size]} overflow-hidden rounded-border-inner ${!src ? "skeleton-loading" : "bg-bglite"} pointer-events-none`}>
        {src && <img src={src} alt="image" className="object-scale-up h-full m-auto"/>}
    </div>
}