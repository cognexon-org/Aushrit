import React from 'react'

/**
 * Section heading with optional eyebrow label and lead paragraph.
 * `dark` flips colours for pine sections.
 */
const SectionHeader = ({ eyebrow, title, lead, dark = false, align = 'left', className = '' }) => (
  <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-[760px] ${className}`}>
    {eyebrow && (
      <p className={`mb-5 ${dark ? 'eyebrow-dark' : 'eyebrow'}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-marigold-500" aria-hidden="true" />
        {eyebrow}
      </p>
    )}
    <h2 className={`section-title ${dark ? '!text-white' : ''}`}>{title}</h2>
    {lead && (
      <p className={`section-lead ${align === 'center' ? 'mx-auto' : ''} ${dark ? '!text-white/70' : ''}`}>{lead}</p>
    )}
  </div>
)

export default SectionHeader
