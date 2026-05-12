"use client"

import React from "react"
import useKeystroke from "../hooks/useKeystroke"

interface KeystrokeInputProps {
    value: string
    onChange: (value: string) => void
    onTimingUpdate: (timings: any[]) => void
    placeholder?: string
    onEnter?: () => void
    type?: "text" | "password"
}

export default function KeystrokeInput({
    value,
    onChange,
    onTimingUpdate,
    placeholder,
    onEnter,
    type = "text"
}: KeystrokeInputProps) {

    const { timing, handleKeyDown, handleKeyUp, reset } = useKeystroke()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const handleKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnter) {
            onEnter()
            return
        }
        handleKeyDown(e)
    }

    const handleKeyUpWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
        handleKeyUp(e)
        setTimeout(() => onTimingUpdate(timing), 0)
    }

    return (
        <input
            type={type}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDownWrapper}
            onKeyUp={handleKeyUpWrapper}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
    )
}