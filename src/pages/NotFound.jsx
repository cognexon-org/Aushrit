import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <section className="flex min-h-[80vh] items-center bg-pine-950 pt-[72px] text-white">
    <div className="container-site">
      <p className="font-display text-[15px] font-semibold text-marigold-400">Error 404</p>
      <h1 className="mt-3 font-display text-[clamp(36px,5vw,60px)] font-extrabold">This page isn't on the ward.</h1>
      <p className="mt-4 max-w-[50ch] text-[17px] text-white/70">The link may be old or mistyped. Head back to the home page or look at our plans.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn-primary">Go to home page</Link>
        <Link to="/pricing" className="btn-ghost-dark">See pricing</Link>
      </div>
    </div>
  </section>
)

export default NotFound
