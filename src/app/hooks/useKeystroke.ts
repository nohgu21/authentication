"use client"

import React, {useState, useRef} from "react"

interface KeyStrokeTiming {
    dwell: number
    flight: number
    downTime: number
}


export default function useKeystroke() {
    const [timing, setTiming] = useState<KeyStrokeTiming[]>([])
    const lastKeyDownTime = useRef<number | null>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") return
        lastKeyDownTime.current = performance.now()
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") return
        if (lastKeyDownTime.current === null) return

        const now = performance.now()
        const downTime = lastKeyDownTime.current

        const dwell = now - downTime
        const flight = timing.length > 0
        ? downTime - timing [timing.length - 1].downTime
        : 0

        setTiming (prev => [...prev, {
            dwell,
            flight,
            downTime
        }])

        lastKeyDownTime.current = null

    }

    
    const reset = () => setTiming([])  
    return { timing, handleKeyDown, handleKeyUp, reset } 



}
