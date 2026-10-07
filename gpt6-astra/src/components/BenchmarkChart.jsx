import { useState } from "react";
import { CHARTS } from "../data.js";

export default function BenchmarkChart() {
  const [k, setK] = useState(0);
  const [hover, setHover] = useState(-1);
  const d = CHARTS[k];

  return (
    <div className="chart">
      <div className="tabs" role="tablist" aria-label="Benchmarks">
        {CHARTS.map((c, i) => (
          <button
            key={c.name}
            role="tab"
            aria-selected={i === k}
            className={`tab ${i === k ? "tab--on" : ""}`}
            onClick={() => setK(i)}
            type="button"
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="chart__plot" key={k} onMouseLeave={() => setHover(-1)}>
        {d.bars.map((b, i) => (
          <div
            key={b.name}
            className={`bar ${b.hero ? "bar--hero" : ""} ${hover >= 0 && hover !== i ? "bar--dim" : ""}`}
            onMouseEnter={() => setHover(i)}
            style={{ "--n": b.v / 100, "--i": i }}
          >
            <span className="bar__value">{b.v.toFixed(1)}%</span>
            <span className="bar__fill" />
            <span className="bar__label">{b.name}</span>
          </div>
        ))}
      </div>
      <p className="chart__note">{d.note}</p>
    </div>
  );
}
