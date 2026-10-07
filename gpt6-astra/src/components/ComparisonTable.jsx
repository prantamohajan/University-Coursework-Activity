import { useState } from "react";
import { MODELS, TABLES } from "../data.js";

function fmt(v, row) {
  if (v == null) return "–";
  const d = row.d ?? 1;
  const u = row.u ?? "%";
  return `${v.toFixed(d)}${u}`;
}

export default function ComparisonTable() {
  const [k, setK] = useState(0);
  const t = TABLES[k];

  return (
    <div className="compare">
      <div className="tabs" role="tablist" aria-label="Evaluation categories">
        {TABLES.map((x, i) => (
          <button
            key={x.tab}
            role="tab"
            aria-selected={i === k}
            className={`tab ${i === k ? "tab--on" : ""}`}
            onClick={() => setK(i)}
            type="button"
          >
            {x.tab}
          </button>
        ))}
      </div>
      <div className="compare__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">{t.tab}</th>
              {MODELS.map((m, i) => (
                <th key={m} scope="col" className={i === 0 ? "is-astra" : ""}>{m}</th>
              ))}
            </tr>
          </thead>
          <tbody key={k}>
            {t.rows.map((row) => {
              const nums = row.v.filter((x) => x != null);
              const best = row.low ? Math.min(...nums) : Math.max(...nums);
              return (
                <tr key={row.b}>
                  <th scope="row">{row.b}</th>
                  {row.v.map((x, i) => (
                    <td key={i} className={`${i === 0 ? "is-astra" : ""} ${x === best ? "is-best" : ""}`}>
                      {fmt(x, row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="compare__foot">
        Scores are the maximum at any effort. GPT evaluations were run in OpenAI's research environment or API, which can differ slightly from production ChatGPT.
      </p>
    </div>
  );
}
