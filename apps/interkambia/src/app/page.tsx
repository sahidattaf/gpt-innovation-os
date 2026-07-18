const corridors = [
  {
    number: "01",
    title: "AI & digital services",
    description:
      "Automation, websites, AI workflows, content systems, marketing operations, and remote administration.",
  },
  {
    number: "02",
    title: "Hospitality & Caribbean operations",
    description:
      "Tourism research, local representation, hospitality systems, supplier discovery, and partnership support.",
  },
  {
    number: "03",
    title: "Netherlands expertise for Curaçao",
    description:
      "Training, procurement, business systems, sustainability, technical consulting, and process improvement.",
  },
];

const pilotSteps = [
  "Tell us the business outcome you need.",
  "We qualify the request and verify fit.",
  "A human operator selects a short list of verified providers.",
  "You agree scope, milestones, acceptance criteria, and direct payment or service-swap terms.",
  "InterKambia follows the work through completion and review.",
];

const principles = [
  "Invite-only and B2B-first",
  "Human approval for every pilot match",
  "No platform custody of funds during the pilot",
  "Papiamentu, Dutch, and English by design",
  "No unsupported regulated-service categories",
  "AI assists; people approve",
];

export default function HomePage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="InterKambia home">
          <span className="brandMark">IK</span>
          <span>
            <strong>InterKambia</strong>
            <small>Curaçao ↔ Netherlands</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#corridors">Services</a>
          <a href="#pilot">Pilot</a>
          <a href="#trust">Trust</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Invite-only B2B pilot</p>
          <h1>
            Trusted service exchange between <em>Curaçao</em> and the <em>Netherlands</em>.
          </h1>
          <p className="heroText">
            InterKambia helps verified businesses and professionals find the right cross-border expertise, define the work clearly, and complete it with human guidance.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#pilot">
              Explore the pilot
            </a>
            <a
              className="button secondary"
              href="https://app.notion.com/p/3a1a269fc947817e9298ffbb1721e890"
              target="_blank"
              rel="noreferrer"
            >
              Open command center
            </a>
          </div>
        </div>
        <aside className="pilotCard" aria-label="Pilot rules">
          <span className="statusDot" />
          <p className="cardLabel">Current stage</p>
          <h2>Validation & concierge matching</h2>
          <p>
            No open marketplace. No automated approval. No platform-held escrow. We prove demand and trust manually before scaling.
          </p>
          <div className="route">
            <span>Curaçao</span>
            <i aria-hidden="true">↔</i>
            <span>Netherlands</span>
          </div>
        </aside>
      </section>

      <section className="section" id="corridors">
        <div className="sectionHeading">
          <p className="eyebrow">Launch corridors</p>
          <h2>Start narrow. Deliver real value.</h2>
          <p>
            The first pilot focuses on service categories already connected to GPT Innovation by Attaf, Hospitality OS, and Curaçao business needs.
          </p>
        </div>
        <div className="corridorGrid">
          {corridors.map((corridor) => (
            <article className="corridorCard" key={corridor.number}>
              <span>{corridor.number}</span>
              <h3>{corridor.title}</h3>
              <p>{corridor.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section splitSection" id="pilot">
        <div className="sectionHeading stickyHeading">
          <p className="eyebrow">Concierge workflow</p>
          <h2>A marketplace operator stays involved.</h2>
          <p>
            During the pilot, AI can classify, translate, draft, and rank. A human operator verifies providers, approves matches, and handles escalation.
          </p>
        </div>
        <ol className="stepList">
          {pilotSteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section trustSection" id="trust">
        <div className="sectionHeading">
          <p className="eyebrow">Trust architecture</p>
          <h2>Built around verification, clarity, and human control.</h2>
        </div>
        <div className="principleGrid">
          {principles.map((principle) => (
            <div className="principle" key={principle}>
              <span aria-hidden="true">✓</span>
              <p>{principle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ctaSection">
        <p className="eyebrow">Founding pilot</p>
        <h2>Five providers. Five clients. Five completed matches.</h2>
        <p>
          The first 90 days are designed to collect evidence before deeper product or payment automation is approved.
        </p>
        <a
          className="button primary"
          href="https://github.com/sahidattaf/gpt-innovation-os/tree/agent/interkambia-foundation/docs/interkambia"
          target="_blank"
          rel="noreferrer"
        >
          Review the operating plan
        </a>
      </section>

      <footer>
        <div>
          <strong>InterKambia</strong>
          <p>A GPT Innovation by Attaf venture.</p>
        </div>
        <p>Strategic economic-empowerment link: Digital Kòrsou.</p>
      </footer>
    </main>
  );
}
