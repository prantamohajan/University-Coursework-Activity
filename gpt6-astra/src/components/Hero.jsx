import { useEffect, useRef, useState } from "react";
import Galaxy from "./Galaxy.jsx";

export default function Hero() {
  const heroRef = useRef(null);
  const galaxyRef = useRef(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    const onMove = (e) => {
      el.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
      el.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
    };
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      el.style.setProperty("--p", p.toFixed(3));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const replay = () => {
    galaxyRef.current?.replay();
    setRun((n) => n + 1);
  };

  return (
    <section className="hero" id="top" ref={heroRef}>
      <Galaxy ref={galaxyRef} />
      <h1 className="hero__words container">
        <span className="hero__word hero__word--left">
          <span key={`l${run}`} className="hero__in">GPT</span>
        </span>
        <span className="hero__word hero__word--right">
          <span key={`r${run}`} className="hero__in">Astra</span>
        </span>
        <span className="sr-only">GPT-6 Astra</span>
      </h1>
      <button className="hero__replay" type="button" onClick={replay} aria-label="Replay animation">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4.2 10a5.8 5.8 0 1 0 1.9-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4.4 3.2v3.2h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
