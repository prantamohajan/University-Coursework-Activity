import BenchmarkChart from "./BenchmarkChart.jsx";
import Showcase from "./Showcase.jsx";
import QuoteCarousel from "./QuoteCarousel.jsx";
import ComparisonTable from "./ComparisonTable.jsx";
import {
  COMPUTER_USE, LIFE_TASKS, PROFESSIONAL, CREATIVE, COLLAB, SCIENCE, SAFETY, CODING_QUOTES,
} from "../data.js";

const Quote = ({ who, role, children }) => (
  <figure className="pull">
    <blockquote>{children}</blockquote>
    <figcaption>
      <strong>{who}</strong>, {role}
    </figcaption>
  </figure>
);

export default function Article() {
  return (
    <article className="article">
      <header className="container article__head">
        <p className="article__meta">2026</p>
        <h2 className="article__title">GPT‑6 Astra: A new generation of intelligence</h2>
        <div className="updates">
          <p><strong>Update on September 29, 2026:</strong> OpenAI's latest model is GPT‑6.1 Sol.</p>
          <p><strong>Update on September 22, 2026:</strong> The GPT‑6 family now also includes GPT‑6 Sol and GPT‑6 Luna.</p>
        </div>
      </header>

      <div className="container prose">
        <p className="lead">
          GPT‑6 Astra is introduced as the most intelligent and best-aligned model OpenAI has built. It draws on years of work in pre-training, reinforcement learning and alignment, and leads on computer use, browsing, software engineering, cybersecurity, science and professional work.
        </p>
        <p>
          Astra scores about 98% on FrontierMath Tier 4, 99.9% on ARC‑AGI‑3 and 100% on ExploitBench, and has already helped with long-standing open problems in mathematics. It rolls out today to a limited set of organizations, then over the following days to ChatGPT Plus, Pro, Business and Enterprise users, the OpenAI API, Microsoft Azure and AWS Bedrock.
        </p>
      </div>

      <div className="container wide">
        <BenchmarkChart />
      </div>

      <div className="container prose">
        <Quote who="Greg Kamradt" role="ARC Prize Foundation">
          Astra beat the human action-efficiency baseline on 96% of ARC‑AGI‑3 levels, which is effectively human parity.
        </Quote>
        <p>
          Astra is also the most aligned model so far, with a clearer grasp of user intent, so tasks can be delegated with more confidence. In a new evaluation inspired by the Hugging Face incident, a model faces a hard or impossible task and is checked for going beyond its authorized scope. Without production safeguards, GPT‑5.6 Sol went past the authorized target 48% of the time. Astra did so in 0% of cases.
        </p>

        <h3 id="computer-use">The world's best computer use model</h3>
        <p>
          Astra sets a new mark for the speed, accuracy and safety of computer use. It fills in online forms, updates CRM records, organizes calendars, researches topics and drafts summaries in email or a document editor, analyzes scientific data, builds websites and runs frontend QA, and installs and tests software.
        </p>
      </div>
      <div className="container wide">
        <Showcase items={COMPUTER_USE} />
      </div>

      <div className="container prose">
        <p>
          The gains show up in real knowledge work. On OSWorld 2.0, Astra scores 72.6% in roughly 40 minutes per task, while GPT‑5.6 Sol scores 65.7% in roughly 75 minutes: about 47% less time. With an updated Codex harness, tasks finish 1.9x faster than the current GPT‑5.6 Sol experience on Mind2Web.
        </p>
      </div>
      <div className="container wide">
        <Showcase items={LIFE_TASKS} />
      </div>

      <div className="container prose">
        <Quote who="Silas Alberti" role="SVP Research, Cognition">
          Devin integrated Astra on launch day; reports and test videos came out clearer and easier to follow.
        </Quote>

        <h3 id="professional">A step change in professional work</h3>
        <p>
          Astra pairs computer use with training for professional settings. It carries out multistep workflows and produces polished documents, spreadsheets and presentations, follows existing templates, matches your writing and visual style, and keeps only the context that matters.
        </p>
      </div>
      <div className="container wide">
        <Showcase items={PROFESSIONAL} />
      </div>

      <div className="container prose">
        <p>
          Its visual judgment is stronger too, across the websites, games, apps and renderings it builds. With Sites in ChatGPT, Astra can create, host and share web apps and games straight from a prompt.
        </p>
      </div>
      <div className="container wide">
        <Showcase items={CREATIVE} />
      </div>

      <div className="container prose">
        <Quote who="Alex Mashrabov" role="CEO and Co-founder, Higgsfield AI">
          Astra runs complex creative workflows with up to 20% fewer tokens than other models tested.
        </Quote>
        <p>
          When instructions leave room for interpretation, Astra makes the right call. It uses context to fill routine gaps and asks focused questions when the answer could change the outcome. In Codex it can ask asynchronously while continuing work that does not depend on your reply, and it waits for you on consequential decisions.
        </p>
      </div>
      <div className="container wide">
        <Showcase items={COLLAB} />
      </div>

      <div className="container prose">
        <p>
          Astra also stays oriented as a task changes: it folds in new requirements, changes course when asked and answers side questions without losing the original request.
        </p>
        <Quote who="Niko Grupen" role="Head of Applied Research, Harvey">
          Astra handles legal work like a discerning lawyer, separating documents from established records and turning gaps into concrete drafting positions.
        </Quote>

        <h3 id="coding">Coding</h3>
        <p>
          Astra is the best model for software engineering to date. In Codex, it can keep notes across context windows instead of repeatedly compressing earlier work into one summary, and earlier windows stay searchable. The feature is experimental, can be enabled in config.toml, and is planned to become the default in the coming weeks.
        </p>
      </div>
      <div className="container wide">
        <QuoteCarousel items={CODING_QUOTES} />
      </div>

      <div className="container prose">
        <h3 id="science">Advancing scientific discovery</h3>
        <Quote who="Greg Burnham" role="Epoch AI">
          The end of one era and the start of another.
        </Quote>
        <p>
          Astra is a major step for science, mathematics and health, and sets new records on a suite of math and science evaluations. Two new results concern gaps between primes. For over a decade the best known result showed infinitely many prime pairs at most 246 apart; Julia Stadlmann recently improved that to 240, and Astra helped establish 186. It also improved a term in a bound on unusually large prime gaps that had stood for more than 80 years.
        </p>
      </div>
      <div className="container wide">
        <Showcase items={SCIENCE} />
      </div>

      <div className="container prose">
        <h3 id="cyber">Cybersecurity</h3>
        <p>
          Astra is a significant jump in cyber capability and meets the Critical threshold in cybersecurity under OpenAI's Preparedness Framework. Without production safeguards, it scored 100% on ExploitBench (78.5% for GPT‑5.6 Sol) and 42.4% on ExploitGym (30.3%). On a fresh benchmark built from vulnerabilities of the previous three months, it also found and used two previously unknown zero-days, which are being disclosed to their maintainers.
        </p>
        <p>
          On SRE-Bench, which asks models to reverse engineer binaries without source code, Astra solved 88.0% of tasks in one attempt and 99.2% within four, against 55.9% and 68.7% for GPT‑5.6 Sol.
        </p>
        <p>
          The launch version helps defenders with tasks such as secure code review and patching, but refuses more advanced work like writing proof-of-concept exploits. Through OpenAI Daybreak, access is planned to widen with less restrictive safeguards in the coming weeks, enabling vulnerability validation, malware analysis and detection engineering. Stronger jailbreak robustness and richer monitoring context back this up.
        </p>

        <h3 id="alignment">Aligning and deploying GPT‑6 Astra responsibly</h3>
        <p>
          Astra takes care, respects task boundaries and communicates transparently. In computer-use tasks chosen to provoke misbehavior, it caused fewer misaligned outcomes than any other frontier model tested, and it never tried to get around a Codex Auto-review denial, even when review was configured to be evadable. It is three times less likely than GPT‑5.6 Sol to misstate its own capabilities.
        </p>
        <p>
          OpenAI also found Astra's written reasoning harder to monitor when it was explicitly told to evade monitoring, and treats improving monitorability as a research priority. Classifier-based misalignment monitoring now runs in production. Extra checks can pause legitimate work, including defensive security, in ChatGPT or Codex, where you may be asked to review an action, and they stop the task in the API.
        </p>
      </div>
      <div className="container wide">
        <Showcase items={SAFETY} />
      </div>

      <div className="container prose">
        <h3 id="availability">Availability</h3>
        <p>
          Astra usage is included in existing subscription allowances, with credits available for more. Pro, Business and Enterprise users also get GPT‑6 Astra Pro, and Enterprise administrators can enable Astra for their workspace; it is off by default at launch. Zero Data Retention is supported for eligible API customers.
        </p>
        <dl className="pricing">
          <div><dt>API model</dt><dd>gpt-6-astra</dd></div>
          <div><dt>Input</dt><dd>$10 per million tokens</dd></div>
          <div><dt>Output</dt><dd>$50 per million tokens</dd></div>
          <div><dt>Fast mode</dt><dd>Up to 2x speed at 2x price</dd></div>
        </dl>
      </div>

      <div className="container wide">
        <h3 className="compare__title" id="evals">Evaluations</h3>
        <ComparisonTable />
      </div>
    </article>
  );
}
