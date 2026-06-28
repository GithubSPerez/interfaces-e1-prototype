import { useRef, useState } from "react";

export function useVar<T>(defaultValue: T) {
    const [varState, setVarState] = useState(defaultValue)
    const varRef = useRef(defaultValue)

    return [
        () => varRef.current,
        (newValue: T) => {
            varRef.current = newValue
            setVarState(newValue)
        },
        varState
    ] as const
}