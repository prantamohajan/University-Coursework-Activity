const COLUMNS = [
  { title: "Research", links: ["Research Index", "Research Overview", "Economic Research", "Latest Advancements", "GPT-6.1 Sol", "GPT-6 Astra", "GPT-5.6", "GPT-5.5"] },
  { title: "Safety", links: ["Safety Approach", "Deployment Safety", "Security & Privacy", "Trust & Transparency"] },
  { title: "Products", links: ["ChatGPT", "ChatGPT Business", "ChatGPT Enterprise", "ChatGPT for Education", "Codex", "Dots", "Release Notes"] },
  { title: "API Platform", links: ["Overview", "API Log In", "Docs"] },
  { title: "Business", links: ["Overview", "Solutions", "Resources", "Plugins", "Customer Stories", "Partner Network", "Contact Sales"] },
  { title: "Developers", links: ["Apps SDK", "Open Models", "Docs", "Resources", "Developer Forum"] },
  { title: "Company", links: ["About Us", "Our Charter", "Careers", "News"] },
  { title: "Support", links: ["Help Center", "OpenAI Status"] },
  { title: "More", links: ["Stories", "Academy", "Supply Co.", "Livestreams", "Podcast", "RSS"] },
  { title: "Terms & Policies", links: ["Terms of Use", "Privacy Policy", "Other Policies"] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {COLUMNS.map((c) => (
            <div key={c.title} className="footer__col">
              <h3>{c.title}</h3>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#top" onClick={(e) => e.preventDefault()}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span>OpenAI © 2015–2026</span>
          <span>Your privacy choices · English · United States</span>
        </div>
      </div>
    </footer>
  );
}
