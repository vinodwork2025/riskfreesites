'use client'

import { useState } from 'react'

interface Props {
  businessName: string
}

export default function DemoBanner({ businessName }: Props) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-amber-400 text-amber-900 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm font-medium flex-1 text-center">
          <span className="font-bold">This is a demo preview</span> for {businessName}.{' '}
          <a href="/" className="underline hover:no-underline font-semibold">
            Get your real site for free →
          </a>
        </p>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss banner"
          className="flex-shrink-0 text-amber-700 hover:text-amber-900 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}
