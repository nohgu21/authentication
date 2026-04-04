"use client"

import { useState } from "react"
import { compareRhythm } from "../lib/compareRhythm"
import KeystrokeInput from "../components/KeystrokeInput"

const PHRASE = "open sesame rhythm"

export default function LoginPage() {
  const [text, setText] = useState("")
  const [timing, setTiming] = useState<any[]>([])
  const [status, setStatus] = useState<"idle" | "analysing" | "success" | "fail">("idle")

  const handleSubmit = () => {
    if (text !== PHRASE) return

    const stored = localStorage.getItem("rhythmProfile")

    if (!stored) {
      alert("No rhythm profile found. Please enroll first.")
      return
    }

    setStatus("analysing")

    setTimeout(() => {
      const profile = JSON.parse(stored)
      const score = compareRhythm(profile, timing)

      if (score >= 0.7) {
        setStatus("success")
      } else {
        setStatus("fail")
        setTimeout(() => {
          setStatus("idle")
          setText("")
          setTiming([])
        }, 2000)
      }
    }, 1500)
  }

  return (
    <main className="font-mono min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center gap-6 p-8">

      <span className="text-[#4ade80] border border-[#2d2d2d] text-xs px-3 py-1 rounded-sm">
        AUTHENTICATE
      </span>

      <h1 className="text-2xl font-bold text-[#f0fdf4]">Verify Your Rhythm</h1>

      <p className="text-[#94a3b8] text-sm">
        Phrase: <span className="text-[#f0fdf4] font-bold">{PHRASE}</span>
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <p className="text-sm text-[#86efac] text-center">
          Type the phrase to authenticate
        </p>

        <KeystrokeInput
          value={text}
          onChange={setText}
          onTimingUpdate={setTiming}
          placeholder="Type here..."
          onEnter={handleSubmit}
        />

        <button
          onClick={handleSubmit}
          disabled={text !== PHRASE || status === "analysing"}
          className="bg-[#1a1a1a] border border-[#2d2d2d] text-[#4ade80] text-sm px-4 py-2 rounded-sm hover:border-[#4ade80] transition-colors disabled:opacity-30"
        >
          Authenticate
        </button>
      </div>

      {status === "analysing" && (
        <p className="font-mono text-[#94a3b8] text-sm">
          analysing rhythm...
          <span className="inline-block w-2 h-4 bg-[#4ade80] animate-blink align-middle ml-1" />
        </p>
      )}

      {status === "success" && (
        <p className="font-mono text-[#4ade80] text-sm">
          access granted. welcome back.
        </p>
      )}

      {status === "fail" && (
        <p className="font-mono text-[#f87171] text-sm">
          rhythm mismatch. access denied.
        </p>
      )}

    </main>
  )
}