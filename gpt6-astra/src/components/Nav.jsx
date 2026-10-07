import { useEffect, useState } from "react";

const LINKS = ["Research", "Products", "Business", "Developers", "Company", "Foundation"];

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="5.6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.3 13.3 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Chevron = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3.2 8.8 8.8 3.2M4 3.2h4.8V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${solid ? "nav--solid" : ""} ${open ? "nav--open" : ""}`}>
      <div className="container nav__inner">
        <a className="nav__logo" href="#top" aria-label="OpenAI">
          OpenAI
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l} href="#top" onClick={(e) => e.preventDefault()}>
              {l}
            </a>
          ))}
          <button className="nav__icon" aria-label="Search" type="button">
            <SearchIcon />
          </button>
        </nav>
        <div className="nav__actions">
          <button className="pill pill--ghost" type="button">
            Log in <Chevron />
          </button>
          <button className="pill pill--solid" type="button">
            Try ChatGPT <ArrowUpRight />
          </button>
          <button
            className="nav__burger"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="nav__sheet">
        {LINKS.map((l) => (
          <a key={l} href="#top" onClick={(e) => e.preventDefault()}>
            {l}
          </a>
        ))}
      </div>
    </header>
  );
}
