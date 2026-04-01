"use client"

import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="font-mono min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center gap-6 p-8">
      
      <span className="text-[#4ade80] border border-[#2d2d2d] text-2xl px-3 py-1 rounded-sm">
        KEYSTROKE_AUTH
      </span>

      <h1 className="text-2xl font-bold text-[#f0fdf4] text-center">
        Your rhythm is your password
      </h1>

      <p className="text-[#94a3b8] text-sm text-center max-w-sm leading-relaxed">
        We authenticate you using the unique timing patterns between your keystrokes.
      </p>

      <button
        onClick={() => router.push("/enroll")}
        className="bg-[#1a1a1a] border border-[#2d2d2d] text-[#4ade80] text-sm px-6 py-2 rounded-sm hover:border-[#4ade80] transition-colors mt-2"
      >
        Begin Enrollment
      </button>

    </main>
  )
}