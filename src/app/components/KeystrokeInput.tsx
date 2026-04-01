"use client"

import React from "react"
import useKeystroke  from "../hooks/useKeystroke"

interface KeystrokeInputProps {
    value: string
    onChange: (value: string) => void
    onTimingUpdate: (timings: any[]) => void
    placeholder?: string
}

export default function KeystrokeInput ({
    value,
    onChange,
    onTimingUpdate,
    placeholder
} : KeystrokeInputProps) {

    const {timing, handleKeyDown, handleKeyUp, reset} = useKeystroke()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        onTimingUpdate(timing)
    }

    return (
        <input
        type = "password"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"

        />
    )
}