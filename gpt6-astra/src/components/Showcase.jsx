import { useRef, useState } from "react";

export default function Showcase({ items }) {
  const [i, setI] = useState(0);
  const stage = useRef(null);

  const onMove = (e) => {
    const r = stage.current.getBoundingClientRect();
    stage.current.style.setProperty("--sx", `${e.clientX - r.left}px`);
    stage.current.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <div className="showcase">
      <div
        className="showcase__stage"
        ref={stage}
        onPointerMove={onMove}
        style={{ "--hue": 205 + i * 22 }}
      >
        <div className="showcase__spot" />
        <div className="showcase__panel" key={i}>
          <p className="showcase__title">{items[i].title}</p>
          <p className="showcase__caption">{items[i].caption}</p>
        </div>
      </div>
      <div className="chips" role="tablist">
        {items.map((it, idx) => (
          <button
            key={it.title}
            role="tab"
            aria-selected={idx === i}
            className={`chip ${idx === i ? "chip--on" : ""}`}
            onClick={() => setI(idx)}
            type="button"
          >
            {it.title}
          </button>
        ))}
      </div>
    </div>
  );
}
