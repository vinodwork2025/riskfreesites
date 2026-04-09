'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Analysing your industry…',
  'Crafting your homepage headline…',
  'Building your services section…',
  'Designing your about section…',
  'Adding your call-to-action…',
  'Finalising your demo site…',
  'Almost there…',
]

interface Props {
  onComplete: () => void
  demoReady: boolean
}

export default function LoadingScreen({ onComplete, demoReady }: Props) {
  const [messageIdx, setMessageIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  // Cycle through messages
  useEffect(() => {
    const id = setInterval(() => {
      setMessageIdx((i) => Math.min(i + 1, MESSAGES.length - 1))
    }, 1400)
    return () => clearInterval(id)
  }, [])

  // Track elapsed seconds
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // Once demo is ready AND minimum display time has passed → complete
  useEffect(() => {
    if (demoReady && elapsed >= 4) {
      const id = setTimeout(onComplete, 800)
      return () => clearTimeout(id)
    }
  }, [demoReady, elapsed, onComplete])

  return (
    <div className="w-full max-w-md text-center animate-[fadeIn_0.5s_ease-out]">
      {/* Animated icon */}
      <div className="relative w-20 h-20 mx-auto mb-10">
        <div className="absolute inset-0 rounded-full bg-brand-100 animate-ping opacity-60" />
        <div className="relative w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center">
          <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
        We're preparing your<br />website preview…
      </h1>

      <p className="text-gray-500 mb-10 text-lg">Takes ~10 minutes for a real build. Your demo is almost instant.</p>

      {/* Progress bar */}
      <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden mb-5">
        <div className="h-full bg-brand-500 rounded-full animate-progress" />
      </div>

      {/* Cycling status message */}
      <p className="text-sm font-medium text-brand-600 h-5 transition-all duration-500">
        {MESSAGES[messageIdx]}
      </p>
    </div>
  )
}
