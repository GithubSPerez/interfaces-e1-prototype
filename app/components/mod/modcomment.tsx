import { Comment } from "@/app/models";
import SquareImage from "../common/squareimage";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { SkeletonText } from "../common/skeletontext";

export default function ModComment({comment}: {comment: Comment | undefined}) {
    return <div className="flex flex-row gap-3">
        <SquareImage src={comment?.poster.pfp} size="plus"/>
        <div className="flex flex-col w-full gap-y-1">
            {comment ? <b>{comment.poster.name}</b> : <SkeletonText wClass="w-1/4"/>}
            {comment ? <Markdown rehypePlugins={[rehypeRaw]}>{comment.content}</Markdown> : <SkeletonText wClass="w-1/2"/>}
        </div>
    </div>
}