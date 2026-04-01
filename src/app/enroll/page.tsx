"use client"

import { useState } from "react"
import { compareRhythm } from "../lib/compareRhythm";
import KeystrokeInput from "../components/KeystrokeInput";

const PHRASE = "open sesame rhythm"

export default function EnrollPage() {

  const [step, setStep] = useState <1 | 2>(1)
  const [text, setText] = useState("")
  const [firstTiming, setFirstTiming] = useState<any[]>([])
  const [secondTiming, setSecondTiming] = useState<any>([])
  const [status, setStatus] = useState<"idle" | "analysing" | "success" | "fail">("idle")

  const handleFirstSubmit = () => {
    if (text !== PHRASE) return
    setStep(2)
    setText("")
  }

  const handleSecondSubmit = () => {
    if (text !== PHRASE) return

    setStatus("analysing")

    setTimeout(() => {
      const score = compareRhythm(firstTiming, secondTiming)

    if (score < 0.5) {
      setStatus("fail")
      setTimeout(() => {
        setStatus("idle")
        setText("")
        setStep(1)
      }, 2000)
      
      return
    }

    localStorage.setItem("rhythmProfile", JSON.stringify(firstTiming))
    setStatus("success")

    }, 1500)

  }


  return (
    <main className="font-mono min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center gap-6 p-8">
      
      <h1 className="text-2xl font-bold text-[#f0fdf4]">Enroll Your Rhythm</h1>
      <span className="text-[#4ade80] border border-[#2d2d2d] text-xs px-3 py-1 rounded-sm">
        STEP_{step === 1 ? "01" : "02"} / 02
      </span>
      <p className="text-[#94a3b8] text-sm">Phrase: <span className="text-[#f0fdf4] font-mono font-bold text-grey">{PHRASE}</span></p>

      {step === 1 && (
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p className="text-sm text-[#86efac] text-center">Type the phrase above to record your first timing</p>
          <KeystrokeInput
            value={text}
            onChange={setText}
            onTimingUpdate={setFirstTiming}
            placeholder="Type here..."
          />
          <button
            onClick={handleFirstSubmit}
            disabled={text !== PHRASE}
            className="bg-[#1a1a1a] border border-[#2d2d2d] text-[#4ade80] text-sm px-4 py-2 rounded-sm hover:border-[#4ade80] transition-colors disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p className="text-sm text-[#86efac] text-center">Type the phrase again to confirm your rhythm</p>
          <KeystrokeInput
            value={text}
            onChange={setText}
            onTimingUpdate={setSecondTiming}
            placeholder="Type again..."
          />
          <button
            onClick={handleSecondSubmit}
            disabled={text !== PHRASE}
            className="bg-[#1a1a1a] border border-[#2d2d2d] text-[#4ade80] text-sm px-4 py-2 rounded-sm hover:border-[#4ade80] transition-colors disabled:opacity-30"
          >
            Confirm Enrollment →
          </button>
        </div>
      )}

      {status === "analysing" && (
        <p className="font-mono text-[#94a3b8] text-sm">
          analysing rhythm...
          <span className="inline-block w-2 h-4 bg-[#4ade80] animate-blink align-middle ml-1" />
        </p>
      )}

      {status === "success" && (
        <p className="font-mono text-[#4ade80] text-sm"> access granted.</p>
      )}

      {status === "fail" && (
        <p className="font-mono text-[#f87171] text-sm"> mismatch detected. resetting...</p>
      )}
    </main>
  );
}
