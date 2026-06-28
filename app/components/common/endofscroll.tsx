export function EndOfScroll({noMoreContent, message} : {noMoreContent: boolean, message: string}) {
    return noMoreContent ? <div className="flex w-full justify-center text-lg text-font-disabled pt-8 pb-12"><p>{message}</p></div> : undefined
}