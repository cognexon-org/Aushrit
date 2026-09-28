import React from 'react'
import { SITE } from '../config/site'

/**
 * Standalone Aushrit emblem mark (gradient teal-emerald "A" with leaf & medical cross).
 * Source: /AUSHRIT_logo (1).png
 */
export const LogoMark = ({
  className = 'h-10 w-10',
  alt = `${SITE.name} mark`,
  src = '/AUSHRIT_logo (1).png',
}) => (
  <img
    src={src}
    alt={alt}
    className={`object-contain ${className}`}
    loading="eager"
    decoding="async"
  />
)

/**
 * Full Aushrit brand logo lockup with official typography.
 * tone='light' (default) -> for dark backgrounds (uses AUSHRIT_logo (3).png with crisp white text)
 * tone='dark' -> for light backgrounds (uses AUSHRIT_logo1.png with dark text)
 */
const Logo = ({
  tone = 'light',
  className = 'h-12 sm:h-14 lg:h-16 w-auto max-w-[260px]',
  showDevanagari = false,
  showMarkOnly = false,
}) => {
  const onDark = tone === 'light'

  if (showMarkOnly) {
    return <LogoMark className="h-10 w-10" />
  }

  // AUSHRIT_logo (3).png is designed for dark backgrounds (navbar, footer, dark sections)
  // AUSHRIT_logo1.png is designed for light backgrounds
  const logoSrc = onDark ? '/AUSHRIT_logo (3).png' : '/AUSHRIT_logo1.png'

  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={logoSrc}
        alt={`${SITE.name} — Hospital ERP`}
        className={`object-contain transition-transform duration-200 hover:scale-[1.02] ${className}`}
        loading="eager"
        decoding="async"
      />
      {showDevanagari && (
        <span
          className={`font-deva text-[13px] tracking-wide ${
            onDark ? 'border-l border-white/20 pl-2.5 text-pine-200' : 'border-l border-pine-200 pl-2.5 text-pine-700'
          }`}
          lang="hi"
        >
          {SITE.nameDevanagari}
        </span>
      )}
    </span>
  )
}

export default Logo
