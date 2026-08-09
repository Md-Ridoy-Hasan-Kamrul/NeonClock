import { useEffect, useState } from 'react'

const pad = (n: number): string => String(n).padStart(2, '0')

function useNow(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return now
}

export default function NeonClock() {
  const now = useNow()
  const [use24h, setUse24h] = useState(true)

  let hours = now.getHours()
  const meridiem = hours >= 12 ? 'PM' : 'AM'
  if (!use24h) {
    hours = hours % 12
    if (hours === 0) hours = 12
  }

  const minutes = pad(now.getMinutes())
  const seconds = pad(now.getSeconds())
  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.03] px-10 py-12 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:px-16 sm:py-14">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400/70">
        Local Time
      </span>

      <div className="flex items-baseline font-mono text-5xl font-semibold tracking-wide text-cyan-300 text-glow-cyan tabular-nums sm:text-7xl">
        <span>{pad(hours)}</span>
        <span className="animate-blink px-1 text-cyan-400/60">:</span>
        <span>{minutes}</span>
        <span className="animate-blink px-1 text-cyan-400/60">:</span>
        <span>{seconds}</span>
        {!use24h && (
          <span className="ml-3 self-start text-lg font-medium text-violet-300 text-glow-violet sm:text-xl">
            {meridiem}
          </span>
        )}
      </div>

      <div className="text-center text-sm font-medium uppercase tracking-[0.2em] text-violet-300/80 sm:text-base">
        {dateLabel}
      </div>

      <button
        type="button"
        onClick={() => setUse24h((v) => !v)}
        className="rounded-full border border-cyan-400/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300 transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:text-sm"
      >
        {use24h ? 'Switch to 12h' : 'Switch to 24h'}
      </button>
    </div>
  )
}
