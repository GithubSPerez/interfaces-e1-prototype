import Page from "./components/page";
import ModPreview from "./components/modpreview";

export default function Home() {

  return (
    <div className="grid-cols-4">
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(n => 
        <ModPreview></ModPreview>
      )}
    </div>
  );
}
