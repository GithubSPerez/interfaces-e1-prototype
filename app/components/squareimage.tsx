export default function SquareImage({src, size} : {src: string, size: "small" | "normal" | "plus" | "big"}) {
    const sizeClass = {
        small: "h-6 w-6 rounded-sm",
        normal: "h-9 w-9 rounded-md",
        plus: "h-11 w-11 rounded-md",
        big: "h-15 w-15 rounded-xl"
    }

    return <div className={`${sizeClass[size]} overflow-hidden`}>
        <img src={src} alt="image" className="object-fill"/>
    </div>
}