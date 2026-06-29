import { Comment, Mod, requestComments } from "@/app/models";
import { useActionOnScrollBottom } from "@/lib/useActionOnScrollBottom";
import { useLimitlessContent } from "@/lib/useLimitlessContent";
import { useVar } from "@/lib/useVar";
import { useEffect } from "react";
import ModComment from "./modcomment";
import Text from "../common/text";

export default function ModCommentsPanel({getMod, mod}: {getMod: () => Mod | undefined, mod: Mod | undefined}) {
    const [comments, loadMoreComments] = useLimitlessContent(requestItems)

    async function requestItems(page: number) {
        const result = await requestComments(getMod()!.id, page)
        return result
    }

    useActionOnScrollBottom(() => {
        if (getMod()) loadMoreComments()
    })

    useEffect(() => {
        if (getMod()) loadMoreComments()
    }, [mod])

    return <div className="flex flex-col pt-10 gap-y-5">
        <Text variant="h2">Comments</Text>
        <div className="flex flex-col gap-y-10">
            {comments.map((comment, index) => <ModComment comment={comment} key={`comment-${index}`}/>)}
        </div>
    </div>
}