export type VideoStatus = "in-production" | "planned";

export type VideoEpisode = {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  industry:
    | "Business"
    | "Restaurants"
    | "Hotels"
    | "Real Estate"
    | "Operations";
  summary: string;
  hook: string;
  duration: string;
  status: VideoStatus;
};

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@InnovationByAttaf";

export const VIDEO_EPISODES: readonly VideoEpisode[] = [
  {
    number: 1,
    slug: "practical-ai-curacao-business",
    title: "What Practical AI Can Do for a Curaçao Business",
    shortTitle: "AI for real business",
    industry: "Business",
    summary:
      "Three useful ways AI can support everyday work without removing human approval.",
    hook: "AI should save your team time—not create more confusion.",
    duration: "5 min",
    status: "in-production",
  },
  {
    number: 2,
    slug: "repetitive-tasks-caribbean-business",
    title: "Five Repetitive Tasks Caribbean Businesses Can Automate",
    shortTitle: "Stop doing this manually",
    industry: "Business",
    summary:
      "A practical review of repeat work that may be ready for an AI-assisted workflow.",
    hook: "If your team repeats it every day, it may be ready for a better workflow.",
    duration: "5 min",
    status: "planned",
  },
  {
    number: 3,
    slug: "simple-ai-discovery-workflow",
    title: "Build a Simple AI Discovery Workflow",
    shortTitle: "Find your best AI use case",
    industry: "Operations",
    summary:
      "A privacy-aware walkthrough from business problem to an owner-controlled next step.",
    hook: "The best AI project starts with one expensive business problem.",
    duration: "5 min",
    status: "planned",
  },
  {
    number: 4,
    slug: "ai-restaurant-operations",
    title: "AI for Restaurants: From Repeated Questions to Better Operations",
    shortTitle: "AI for restaurant operations",
    industry: "Restaurants",
    summary:
      "Five restaurant workflows where verified information and manager review matter.",
    hook: "The same answer should not live in five different places.",
    duration: "5 min",
    status: "planned",
  },
  {
    number: 5,
    slug: "ai-hotel-guest-service",
    title: "AI for Hotels: A Better Guest-Service Workflow",
    shortTitle: "Smarter hotel service",
    industry: "Hotels",
    summary:
      "Multilingual guest support, handovers and reporting with authorized human review.",
    hook: "Fast guest service begins before the guest repeats the question.",
    duration: "5 min",
    status: "planned",
  },
  {
    number: 6,
    slug: "ai-real-estate-inquiries",
    title: "AI for Real Estate: From Inquiry to Qualified Conversation",
    shortTitle: "Qualify property leads",
    industry: "Real Estate",
    summary:
      "Organize inquiries and follow-up without inventing availability, prices or returns.",
    hook: "More inquiries do not automatically mean better buyers.",
    duration: "5 min",
    status: "planned",
  },
  {
    number: 7,
    slug: "notion-owner-command-center",
    title: "Turn Notion into an Owner Command Center",
    shortTitle: "Your business command center",
    industry: "Operations",
    summary:
      "Organize trusted decisions, tasks, risks, SOPs and KPIs in one operating view.",
    hook: "A dashboard is useful only when the information can be trusted.",
    duration: "6 min",
    status: "planned",
  },
  {
    number: 8,
    slug: "30-day-ai-plan",
    title: "My 30-Day AI Plan for a Small Caribbean Business",
    shortTitle: "Your 30-day AI plan",
    industry: "Business",
    summary:
      "A four-week path to identify, prototype, test and evaluate one useful workflow.",
    hook: "Do not automate everything. Fix one workflow that matters.",
    duration: "5 min",
    status: "planned",
  },
] as const;
