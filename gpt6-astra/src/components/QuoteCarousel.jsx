import { useState } from "react";

export default function QuoteCarousel({ items }) {
  const [i, setI] = useState(0);
  const go = (d) => setI((v) => (v + d + items.length) % items.length);
  const q = items[i];

  return (
    <figure className="carousel">
      <blockquote key={i} className="carousel__body">
        <p>{q.text}</p>
        <figcaption>
          <strong>{q.who}</strong>, {q.role}
        </figcaption>
      </blockquote>
      <div className="carousel__ctl">
        <button type="button" onClick={() => go(-1)} aria-label="Previous">←</button>
        <span>{i + 1} of {items.length}</span>
        <button type="button" onClick={() => go(1)} aria-label="Next">→</button>
      </div>
    </figure>
  );
}
