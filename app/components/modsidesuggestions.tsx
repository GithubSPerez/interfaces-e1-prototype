import ModPreview from "./modpreview";

export default function ModSideSuggestions() {
    return <div className="flex flex-col w-full">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(n => <ModPreview sideview/>)}
        
    </div>
}