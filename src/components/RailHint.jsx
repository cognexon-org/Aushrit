import React from 'react'
import { ArrowRight } from 'lucide-react'

/** "Swipe" cue shown under card carousels on phones only. */
const RailHint = ({ dark = false, label = 'Swipe to see more' }) => (
  <p className={`rail-hint ${dark ? '!text-white/45' : ''}`} aria-hidden="true">
    {label} <ArrowRight size={14} className="animate-pulse" />
  </p>
)

export default RailHint
